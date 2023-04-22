<template>
  <div>
    <div class="container-fluid p-0">
      <header class="header-navb p-3">
        <div class="logo-block" @click="$emit('sideBarEvent')">
          <img src="../assets/icons/icon-toggle.svg" alt="" />
          <p class="fw-bold mb-0 mx-3">{{ $route.meta.title }}</p>
        </div>

        <div class="link-user-info">
          <p class="orange-color-0f">
            <span class="mx-2">
              <img src="../assets/icons/location.svg" alt="" />
            </span>
             Abidjan Côte d'ivoire
          </p>
          <p class="user-info">
            <span class="mx-2">
            </span>
              Admin
              {{retLogUser.username}} .
            
          </p>

          <div class="user-img" 
            
           @click="showDropdown = !showDropdown">
            <img
              :class="{'bg-fond-orange' : showDropdown == true}"
              class="pt-2 my-2 img-1-8vw"
              src="../assets/icons/user.png"
              alt=""
            />
            
          </div>
        </div>
        <div class="user-more-action" :class="{'admin-cursor' : userDropClick == true}" v-if="showDropdown" >
          <p >Modifier mes accès</p>
          <p @click="logoutUser">Déconnexion</p>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import axios from "../services/index.js";
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      userTokenDecode: "",
      userRole:"",
      showDropdown:false,
      userDropClick:false,
      
    };
  },

  created() {
    //DECODE TOKEN 
    // this.userTokenDecode = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    // console.log("voir le nouveau user Together ", this.userTokenDecode);
    // this.getCurrentUserInfo(this.userTokenDecode.id);
  },

  computed:{
    
    ...mapGetters([
      'retLogUser'
    ])
  },

  components: {},
  updated(){
    // console.log("LUSER CONNECTÉ", this.retcurrentUserlogedInfo);
  },

  methods: {
    


    logoutUser() {
      this.userDropClick = true;
      setTimeout(() => {
        this.userDropClick = false;
        this.showDropdown = false;
         this.$store.commit("mutLogin", false);
          localStorage.clear();
      }, 2000);
     
    },

  },
  mounted(){
  },
};
</script>

<style lang="scss" scoped>
.header-navb {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #000;
  color: #fff;
  box-shadow: 0px 6px 4px #ccc;
  align-items: center;
  top: 0;
  position: relative;

  .logo-block {
    display: flex;
    align-items: center;

    :hover {
      cursor: pointer;
    }
  }
  .link-user-info {
    margin-right: 1rem;

    .user-img:hover {
      cursor: pointer;
    }
  }

  .user-info{
    text-transform: capitalize;
  }

  .link-user-info {
    display: flex;
    align-items: center;

    .user-img img {
      border-radius: 50%;
    }
    p {
      margin: 10px 1rem;
      font-size: 14px;
    }
  }

  .user-more-action{
        position: absolute;
      right: 3px;
    top: 64px;
    z-index: 1000;
    width: 14vw;
    padding: 7px 14px;
    border-radius: 0px 0px 5px 5px;
  background: #000;
    p{
      margin: 4px 0;
      font-weight: bold;

      &:hover{
        cursor: pointer;
        color: #dc8a19;
      }


    }
    p.no-allow:hover{
      cursor: not-allowed;

    }
  }
}

.mx-20 {
  margin: 0 20px;
}

.side-link-crop {
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  display: flex;
  flex-direction: column;
  width: 100%;
  word-break: break-all;
  height: 70% !important;
  overflow-y: auto;
}

.admin-cursor{
  p{
    cursor: progress !important;

  }
}
</style>