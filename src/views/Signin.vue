<template>
  <div class="main h-100 d-flex justify-content-center align-items-center">
      <div class="card" >
          <div class="pb-0 card-header text-start">
              <h4 class="font-weight-bolder">Sign In</h4>
              <p class="mb-0">Enter your email and password to sign in</p>
          </div>
          <div class="card-body">
            <form role="form">
              <div class="mb-3">
                  <input type="email" class="form-control" placeholder="Email" v-model="this.email" size="lg"/>
              </div>
              <div class="mb-3">
                  <input type="password" class="form-control" placeholder="Password" v-model="this.password" size="lg" />
              </div>
              <div class="text-center">
                  <input type="submit" class="form-control" value="Sign In" @click.prevent="checkValidUser">
              </div>
            </form>
          </div>
        </div>
  </div>
</template>

<script>
// import jwt_decode from "jwt-decode";
import axios from "axios";
import APIs from "../../config";
// import Vue from "vue";
const body = document.getElementsByTagName("body")[0];
export default {
  name: "signin",
  data() {
    return {
      email : "" , 
      password : ""
    }
  },
  components: {
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods : {
    checkValidUser() {
      axios
      .post(`${APIs.API_URL}/user/signin`, {
        email: this.email,
        password: this.password
      })
      .then((response) => {
          localStorage.setItem("user_id", response.data._id)
          localStorage.setItem("token", response.data.token)
           this.$router.push({ path: "/" });
           })
           .catch(err => {
           if (err.message) {
              this.$toast.error( err.response.data.error);
           }
       });
      } 
  }
};
</script>
<style scoped>
.card {
  max-width: 900px;
}
.main {
  background-color: #D87D4A ;
  height: 100vh !important;
}
</style>