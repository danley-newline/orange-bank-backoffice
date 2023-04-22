<template>
  <div class="login-page">
    <div class="row block-content">
      <div class="col-md-6 img-side">
        <div class="">
          <div class="img-space">
            <img src="../assets/obk/obk_logo.png" alt="" />
          </div>
          <div>
            <h1>Bienvenue</h1>
            <h1>connectez-vous</h1>
          </div>
        </div>
      </div>
      <div class="col-md-6 espace-form">
        <div class="form-block">
          <form @submit.prevent="LoginField">
            <b-overlay :show="showSpiner" rounded="sm" class="product-loader">
              <label for="">Nom d'utilisateur </label>
              <div class="">
                <input
                  type="text"
                  class="form-control"
                  required
                  v-model="userLog.username"
                />
              </div>

              <label for="">Mot de passe</label>
              <div class="">
                <input
                  type="password"
                  class="form-control"
                  required
                  v-model="userLog.password"
                />
              </div>

              <div class="text-center">
                <button class="btn btn-success">Connexion</button>
              </div>
            </b-overlay>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../services/index.js";
import setAuthHeader from "../services/setAuthHeaders.js"

export default {
  data() {
    return {
      showSpiner: false,
      userLog: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    LoginField() {
      this.showSpiner = true;

      if (this.userLog.username !== "" && this.userLog.username !== "") {
        axios
          .post("/auth/login", this.userLog)
          .then((data) => {
            console.log("UserLog", data);

            if (data.status === 200) {

              localStorage.setItem("token", data.data.token);
              setAuthHeader(data.data.token)

              setTimeout(() => {
                this.$store.commit("MutLogedUser", data.data);
              }, 100);

              setTimeout(() => {
                this.showSpiner = false;
                 this.$router.push({name:"dashboard"});
                this.$store.commit("mutLogin", true);
               
              }, 1000);

            }
          })
          .catch((error) => {

            // console.log(error);
            // console.log("FIRST ERROR ", error.response.status); // 401

            if (error.response.status == 401 || error.response.status == 404  ) {
              setTimeout(() => {
                this.showSpiner = false;
                this.$fire({
                  text: "Vérifiez votre nom d'utilisateur ou votre mot de passe.",
                  type: "error",confirmButtonText:'ok',
                  timer: 5000,
                });
              }, 1000);
              
            }

          });
      }
    },
  },
};
</script>

<style lang="scss">
.login-page {
  .img-side {
    background: #f16e01;
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;

    h1 {
      color: #fff;
      text-transform: capitalize;
    }

    .img-space {
      position: absolute;
      top: 10%;
      background: #000;
      padding: 2vw;
      border-radius: 10px;

      img{
        width: 130px;
        height: auto;
      }
    }
  }



  .espace-form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-block {
    width: 80%;

    input {
      border-radius: 10px;
      outline: none;
      background: #e2e3e3;
      height: 40px;
      margin-bottom: 1rem;
    }

    label {
      font-size: 1vw;
      font-weight: bold;
      margin-bottom: 1vh;
    }

    button.btn.btn-success {
      font-size: 1.1vw;
      font-weight: bold;
      padding: 10px 20px;
      border-radius: 10px;
    }
  }
}
</style>