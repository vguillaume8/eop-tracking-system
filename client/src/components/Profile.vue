<template>
  <section id="profile">
    <div class="container-fluid">

      <!--Section: Team v.1-->
      <section class="section team-section">

        <!--Grid row-->
        <div class="row text-center">

          <!-- Grid column -->
          <div class="col-md-8 mb-4">

            <!--Card-->
            <div class="card card-cascade cascading-admin-card user-card">

              <!--Card Data-->
              <div class="admin-up d-flex justify-content-start">
                <i class="fas fa-users info-color py-4"></i>
                <div class="data">
                  <h5 class="font-weight-bold dark-grey-text">Profile - <span class="text-muted">Edit Information</span></h5>
                </div>
              </div>
              <!--/.Card Data-->

              <!--Card content-->
              <div class="card-body card-body-cascade">

                <!-- Grid row -->
                <div class="row">

                  <!-- Grid column -->
                  <div class="col-lg-4">

                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form12" class="form-control form-control-sm" v-model="userData.n_id" placeholder="N-ID">
                      <label for="form12" class=""></label>
                    </div>

                  </div>
                  <!-- Grid column -->

                  <!-- Grid column -->
                  <div class="col-lg-4">
                    
                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form3" class="form-control form-control-sm" v-model="userData.email" placeholder="Hawk Mail">
                      <label for="form6" class=""></label>
                    </div>

                  </div>
                  <!-- Grid column -->

                  <!-- Grid column -->
                  <div class="col-lg-4">

                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form4" class="form-control form-control-sm" v-model="userData.year">
                      <label for="form4" class="disabled"></label>
                    </div>

                  </div>
                  <!-- Grid column -->

                </div>
                <!-- Grid row -->

                <!-- Grid row -->
                <div class="row">

                  <!-- Grid column -->
                  <div class="col-md-6">

                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form5" class="form-control form-control-sm" v-model="userData.firstname" placeholder="First Name">
                      <label for="form5" class=""></label>
                    </div>

                  </div>
                  <!-- Grid column -->

                  <!-- Grid column -->
                  <div class="col-md-6">

                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form5" class="form-control form-control-sm" v-model="userData.lastname" placeholder="Last Name">
                      <label for="form5" class=""></label>
                    </div>

                  </div>
                  <!-- Grid column -->

                </div>
                <!-- Grid row -->

                <!-- Grid row -->
                <div class="row">

                  <!-- Grid column -->
                  <div class="col-md-12">

                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form6" class="form-control form-control-sm">
                      <label for="form6" class="">Address</label>
                    </div>

                  </div>
                  <!-- Grid column -->

                </div>
                <!-- Grid row -->

                <!-- Grid row -->
                <div class="row">

                  <!-- Grid column -->
                  <div class="col-lg-4 col-md-12">

                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form7" class="form-control form-control-sm">
                      <label for="form7" class="">City</label>
                    </div>

                  </div>
                  <!-- Grid column -->

                  <!-- Grid column -->
                  <div class="col-lg-4 col-md-6">

                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form8" class="form-control form-control-sm">
                      <label for="form8" class="">Country</label>
                    </div>

                  </div>
                  <!-- Grid column -->

                  <!-- Grid column -->
                  <div class="col-lg-4 col-md-6">

                    <div class="md-form form-sm mb-0">
                      <input type="text" id="form9" class="form-control form-control-sm">
                      <label for="form9" class="">Postal Code</label>
                    </div>

                  </div>
                  <!-- Grid column -->

                </div>
                <!-- Grid row -->

                <!-- Grid row -->
                <div class="row">

                  <!-- Grid column -->
                  <div class="col-md-12 about-text">

                    <h4 class="text-muted text-left my-4"><strong>About me</strong></h4>

                    <!--Basic textarea-->
                    <div class="md-form mb-0">
                      <textarea type="text" id="form10" class="md-textarea form-control" rows="3"></textarea>
                      <label for="form10">Basic textarea</label>
                    </div>
                  <button class="btn btn-primary" type="submit" @click.prevent="updateUser(userData.n_id)">Save</button>

                  </div>
                  <!-- Grid column -->

                </div>
                <!-- Grid row -->

              </div>
              <!--/.Card content-->

            </div>
            <!--/.Card-->

          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-4 mb-4">

            <!--Card-->
            <div class="card profile-card">

              <!--Avatar-->
              <div class="avatar z-depth-1-half mb-4">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLHx8fq6ur8/PzJycnPz8/5+fnz8/Pe3t7S0tLc3Nzv7+/j4+Ps7OyAOEhDAAAFSklEQVR4nO2d2XarMAxFgwEzw///7YWU3obEScHWcKDaj3nKWbIta7C43QzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDkMdt0f47tMyC8m4sHhm7/DIyZyFjMzR1tqWefxur86t0zrd1XWZhyrpu+lNrdL5v3oh7oMhPqzHvnpfmG0afa//XCFw17pN3p6n8yQzpfHdA38LUncqOeTcdFDgfO/PJqv2/9+KqYucG3NL0ZzFjt+MADZtxOMVudGOUAVczdvgS3Vv/vs+MLbhEVyXpWwCX2CULnFcqsETfJ2zBHwbYK44/7gTDlKDnDZnA+YLjtcUE6ckEzndxbTEhPMkeXClbbTkBYi8ybyR22nqecUdipV0S0Q6bilhgltVYEh25wPm0gZJYMCisgVyG6wkua6802roeoD1Hv6l7lHXKZMIlP6UtbaXiMWEGE0m5lktgNmAYkc+EWQaxEx3ljfuZESFS9By+8D+9trzZhEeT28dAMCLfObMAcLGpKMPCAPrLlHeRzkbUXqY56zmzoK6QW2CmHezzKyx0nT6ru19RVjhcXiG/wD+gUPf2LaFwUFXoBRSqLlPG4PcH1dwweabbFMorZEqymUJTaAoPKBQQqKyQMVUKovD63kIgPFSud3PnofQVihw1l1eoW8+XUKhbYfsDWQyBAFG5hMifL9XuHOJPY2j3ml6/bsHQ0LalubxC/UZTz5zX1+83Ya7jD/pVbpInFu9p1bfhfJq2jBIxOtsu3xPF0z77RaNd4l7Z+6D5OIW2tG+4duIAcMx8wZRyK0F24Y2tSVi3NLqFpWEBoKXtAdJHTyvKjTRPMCROJyiBs0Rqp4i1Ru/Qva+8ox3aB6BtNNUPCwNQbsUCxtc/QtjSXuBtwjt0WSmcy8wWFz3y4yQCl7k7FFbEHo1BILGGFjhLHBP94gjoCLc4n1LbRzfgShvt+yd4A65Enql1D+oGQ8SUFTEyh3txh0un9SmGYP0nr/qjbqPoK8i7aBDfjTF5m3LsTrEPnW+n2LO0nlr4tepSPf40Qmt0+ZiedBtG2Hmm7tbSxBYNQkktgKvSpu09Mt4AzUicTwQMEamz3oO2oC05Ryct0jTTiqdGWqBcVImmJQbACDZmH8jXqVAC+EbXDpzdJuWgHfS7hvvVTKk7zlTkRYmiRMc99WOlVhv0LSRwkagjkCqHvwOdziFBgToSRQVqJOK8rED5ubsiz/I2CM/ddYw3tbcSJd8/iYxSeEXwApc+PD+KUuy0cVKe/hmpB0Lix+gPjUi8mAsMTnqLSE8tZ2v+rwj4DMfX1L2LmrtK7DifHuyiYQ6lODplD8Lblsn/2nAHrF19Is/vf4VxmWIIZJToiNuAo2FrARcZzrYLpsMmRzHhbESWw0YpZArDEkjl2r7+EY4X3vJ5i48wBPzK99FnavL0IpgJGYwIZkIGIyIdpF8QR4piRZj90JZrcjwTEg8jUEoffoY0uSgxlu04hApzvF24QPhhCP5hUFGUZBuReUBLPGR5N5TQ/hUqhaCLNCObkiXx/YNIiKYu4JqQyIgiU1hjIWklBl6kRMsUIJH/HooUP9vnG0mgGGEDvUhJlql6Oe0z6b1STrXk+zvpT9vJp7JQkz6nByeVH2ZKFSjcgnic1L5MqGJFmMSNCJcIfiUxNcz7GVUS0mbZQN+6v0m61lxfIWAy/5Wk9L5H94YLU8pGhKs4hUiqQqGmEbeYwg/ApoK3JCSGIYtqrySU2bgnyhORMLddsWf9CAn97dzfPaAiPpNhClEwhX9Z4Rlip4X4gv45HH5C/KT6wukIH19D/QOIrmD5nMw36wAAAABJRU5ErkJggg==" class="rounded-circle img" alt="First sample avatar image">
              </div>

              <div class="card-body pt-0 mt-0">
                <!--Name-->
                <h3 class="mb-3 font-weight-bold"><strong>{{userData.firstname + " " + userData.lastname}}</strong></h3>
                <h6 class="font-weight-bold cyan-text mb-4">{{userData.year}}</h6>

                <p class="mt-4 text-muted">discription</p>
                
                <a class="btn btn-info btn-rounded waves-effect waves-light"> Email</a>

              </div>

            </div>
            <!--Card-->

          </div>
          <!-- Grid column -->

        </div>
        <!--Grid row-->

      </section>
      <!--Section: Team v.1-->

    </div>
  </section>
</template>

<script>
export default {
    name: "EditUser",
    data(){
        return{
            userData: {}
        }
    },

    mounted(){
        this.getUser();
    },

    methods: {
        async getUser(){
            let editUserID = JSON.parse(localStorage.getItem('editUserId'));

            await this.$http.get(`http://localhost:3000/api/v1/user/${editUserID.id}`).then(result => {
                this.userData = result.body;
            })
        },

        async updateUser(n_id){
            if (confirm("Do you want to update this User's information?")) {
                await this.$http.post(`http://localhost:3000/api/v1/user/${n_id}`, this.userData).then(result => {
                    if(result.body.success == true){
                        alert("User's information was updated!");
                        this.userData = result.body.user;
                        this.$router.push('/admin');
                    }else{
                        alert(result.body.message);
                    }
                })
            }else{
                alert("User's information was not changed");
            }  
        },

        deleteUser(n_id){
            if(confirm("Do you want to delete this User?")){
                this.$http.delete(`http://localhost:3000/api/v1/user/${n_id}`).then(result => {
                    if(result.body.success == true){
                        alert("User account was deleted!");
                        this.$router.push('/admin');
                    }else{
                        alert(result.body.methods);
                    }
                })
            }else{
                alert("User's information was not changed");
            }
        }
    }
}
</script>


<style scoped>
.profile-card-footer {
  background-color: #F7F7F7 !important;
  padding: 1.25rem;
}
.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
}
</style>
