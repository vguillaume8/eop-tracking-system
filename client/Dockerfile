FROM node:8.7

ADD ./  /source
WORKDIR /source

RUN npm install
#RUN npm install -g serve
RUN npm run build       

#WORKDIR dist

#EXPOSE 5000

#CMD serve