#!/bin/bash
set -e

# Only tag a release if this is a push
# to master and it's NOT a pull request.
# This way we avoid duplicate tagging
if [ $TRAVIS_BRANCH != "master" ] || [ $TRAVIS_PULL_REQUEST != "false" ]; then

  echo "Not pushing image to docker because branch '$TRAVIS_BRANCH' is not master branch"
  exit 0
fi

# Message for the JSON payload
# that will be sent to Github API
readonly text="Automated release from Travis CI"
readonly branch="master"
readonly repo_full_name=$(git config --get remote.origin.url | sed 's/.*:\/\/github.com\///;s/.git$//')
readonly token="${GITHUB_TOKEN}"

# Get the latest version from GitHub API
readonly result=$(curl -X GET \
  https://api.github.com/repos/$TRAVIS_REPO_SLUG/releases/latest \
  -H 'Accept: application/vnd.github.v3+json' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache')

# Strip off last number, and increment by one
# to bump the version up by one
version=$(echo $result |  jq '.["name"]' | tr -d '"')

# TODO - If condition for version is null? If true, set version to v0.0.0
# otherwise, manually bump the version up

old=$(echo "$version" | awk -F '\\.' '{print $NF}')
new=$(( $old + 1 ))

echo "Latest version found: $version"

version="${version%.*}.$new"

# Generates the JSON payload
generate_post_data() {
  cat <<EOF
{
  "tag_name": "$version",
  "target_commitish": "$branch",
  "name": "$version",
  "body": "$text",
  "draft": false,
  "prerelease": false
}
EOF
}

# Make a new release via POST request to GitHub API
echo "Creating release $version for repo: $repo_full_name branch: $branch"
curl --data "$(generate_post_data)" "https://api.github.com/repos/$repo_full_name/releases?access_token=$token"

# Build docker images with the same version number
echo "Building docker images"
docker build -t vguillaume/eop-tracking-server:$version server
docker build -t vguillaume/eop-tracking-client:$version  client

# Push them to docker hub
echo "Pushing docker images"
docker push vguillaume/eop-tracking-server:$version
docker push vguillaume/eop-tracking-client:$version