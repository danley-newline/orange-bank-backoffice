<template>
  <div>
    <div class="d-flex justify-content-between">
          <div class="left-block d-flex align-items-center">
              <p class="fw-bold">Espaces administrateur</p>

              <!-- <DatePick /> -->
          </div>
          <div class="right-block">
              
               <button class="custom-btn box-shadow-d3 bg-blue-fort" @click="createNewUser">
                   <img src="../assets/icons/colis-white.svg" class="img-1-2vw" alt="">
                   <span class="date-text">Nouvel admin</span>
              </button>
          </div>
      </div>

      <b-modal id="modal-1" v-model="showUserModal">
      <template #modal-title>
        <div
          class="d-flex align-items-center titre-prin hover-cursor"
        >
          <p class="mx-3">Creation admin OBK</p>
        </div>
      </template>
      <div class="mx-3" >

        <form @submit.prevent="userFormSubmit">

        
      <div class="px-5 pb-5 pt-3 form-label-style">
              <div class="form-div">
                <label for="">Username <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <input
                      type="text"
                      v-model="user.username"
                      class="form-control"
                      placeholder="Nom d'utilisateur"
                      required
                    />
                </div>
              </div>
              <div class="form-div">
                <label for="">email <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <input
                      type="email"
                      v-model="user.email"
                      class="form-control"
                      placeholder="obkmail@gmail.com"
                      required
                    />
                </div>
              </div>
               <div class="form-div" v-if="formAction == 'for-creation'">
                <label for="">Mot de passe <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <input
                      type="password"
                      v-model="user.password"
                      class="form-control"
                      required
                      placeholder="Ex: HJ7mO9x"
                    />
                </div>
              </div>



      </div>

      <div class="d-flex justify-content-end pb-3 px-5 " >
        <button type="submit" class="pd-btn submit-btn text-white px-5">Soumettre</button>
      </div>


    </form>

          
      </div>
      
    </b-modal>
    <div class="">
      <TableAdmins :TableDatas="retadminUser" @seeMore="editUser"/>
    </div>
  </div>
</template>

<script>
import TableAdmins from "../components/CompteAdmin/TableAdmins.vue";
import { mapGetters } from 'vuex'
import axios from "../services/index.js";
import _ from 'lodash';


export default {
   data(){
    return {
      showUserModal: false,
      user:{
        username:"",
        email:"",
        password:"",
      }
    }
  },
  components:{
    TableAdmins
  },
  computed: {
    ...mapGetters([
      'retadminUser', 
    ])
  },
  methods:{
    createNewUser(){
      console.log("ok");
      this.initUser()
      this.showUserModal = true;
      this.formAction = "for-creation";
    },

    editUser(e){
      this.showUserModal = true;
      let getClickedUser = _.cloneDeep(e);
      this.user = getClickedUser;
      this.formAction = "for-edition";

      console.log("A VOIR colis ", this.user);
    },

    initUser(){
      this.user.username = '';
      this.user.email = '';
      this.user.password = '';
    },

    userFormSubmit(){
      this.formAction == "for-creation" ? this.postUser() : this.updateUser();
    },

    postUser(){
      axios
          .post("/auth/register", this.user)
          .then((res) => {
            
            this.showUserModal = false;
             setTimeout(() => {
              location.reload();
            }, 1500);            

            this.$fire({
                      text: `Admin Créée avec succès`,
                      type: "success",
                      confirmButtonText:'ok',
                      timer: 5000,
                    });

          })
          .catch((error) => {
            this.$fire({
                      text: `${error}`,
                      type: "error",
                      confirmButtonText:'ok',
                      timer: 5000,
                    });
          }); 
    },

    updateUser(){
      axios
          .put(`/users/${this.user._id}`, this.user)
          .then((res) => {
            this.showUserModal = false;
            setTimeout(() => {
              location.reload();
            }, 1500);
            this.$fire({
                      text: `Admin modifié avec succès`,
                      type: "success",
                      confirmButtonText:'ok',
                      timer: 5000,
                    });

          })
          .catch((error) => {
            this.$fire({
                      text: `${error}`,
                      type: "error",
                      confirmButtonText:'ok',
                      timer: 5000,
                  });
            }); 
    }
    
  },


  mounted(){
    this.$store.dispatch("getUserList");
    
  }
}
</script>

<style lang="scss">

</style>