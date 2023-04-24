<template>
  <div id="app">
      <div class="block" v-if="!showDash">
        <Login />
      </div>
    <div class="d-flex" v-else>
      
      <div  :class="{'not-colapsed-sidebar' : visible, 'colapsed-sidebar' : !visible}">
        <SideBar :visible="visible" />
      </div>
      <div :class="{'reduiced-topbar' : visible, 'not-reduiced-topbar' : !visible}">
        <TopBar @sideBarEvent="visible = !visible" />
        <div class="px-3 mt-5">
          <router-view></router-view>
        </div>
      
    </div>
    </div>
    
    
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import SideBar from './components/SideBar.vue'
import Login from "./views/Login.vue"
// import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      visible:true,
      showDash:false,

    }
  },
  methods:{
    callSideBar(e){
      this.visible = e;
    },
  },
  components:{
    TopBar,
    Login,
    SideBar
  },
  
  mounted(){
    this.showDash = this.$store.state.userLogStatus;
  },
}
</script>

<style lang="scss">
.dropdown-toggle {
&::after{
  display: none !important;
  
}

&.btn-secondary{
  background: transparent !important;
  border: none !important;
}

&.btn{
  padding: 0 !important;

}

}

//MODAL BLOCK
.modal-bg-gray {
    background: #f1f1f1;
    height: 14px;
}

.modal-dialog {
  // max-width: calc(100% - 280px) !important;
  max-width: 600px !important;
  .titre-prin {
    
    p{
  
    font-size: 1.3vw !important;
    font-weight: bold;
      }
}

}
.modal-title{
  text-transform: uppercase !important;
}

footer.modal-footer {
  display: none;
}
button.close {
  border: none;
  background: no-repeat;
  font-size: 1.5vw;
  font-weight: bold;
  color: red;
  // display: none;
}


#app{
  overflow-x: hidden;
}
  // @font-face {
  // font-family: "Product Sans";
  // src: url("./assets/police/Product-Sans/ProductSans-Bold.ttf"),
  //         url("./assets/police/Product-Sans/ProductSans-Regular.ttf");
  // }

  //FONT SIZE
   h4{
    font-size: 1.1vw !important;
  }
  h3{
    font-size: 1.2vw !important;
  }
  h2{
    font-size: 1.5vw !important;
  }
  h1{
    font-size: 1.9vw !important;
  }
  p{
    font-size: 0.8vw !important;
  }

.text-gray-75.fs-5{
    font-size: 1.1vw !important;
}

thead, tbody, tr, th{
  font-size: 0.8vw;
}

.spinner-border {
  width: 5rem !important;
  font-size: 40px !important;
  height: 5rem !important;
  color: #f16e01;
}

.img-0-9vw{
  width: 0.9vw !important;
}
.img-1vw{
  width: 1vw !important;
}
.img-1-1vw{
  width: 1.1vw !important;
}
.img-1-2vw{
  width: 1.2vw !important;
}

.img-1-3vw{
  width: 1.3vw !important;
}
.img-1-4vw{
  width: 1.4vw !important;
}

.img-1-5vw{
  width: 1.5vw !important;
}
.img-1-6vw{
  width: 1.6vw !important;
}
.img-1-7vw{
  width: 1.7vw !important;
}
.img-1-8vw{
  width: 1.8vw !important;
}
.img-3vw{
  width: 3vw !important;
}
//WIDTH 
.w-32{
  width: 32vw;
}
.w-55{
  width: 55vw;
}
.w-45{
  width: 45vw;
}
.w-60{
  width: 60vw;
}

.w-40{
  width: 40vw;
}

.w-65{
  width: 65vw;
}

.w-24{
  width: 24vw;
}

.w-74{
  width: 74vw;
}


//MARGIN
.ml-1rem{
  margin-left: 1rem;
}

body{
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #f8f8f8;

  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }

  p{
    margin-bottom: 0 !important;
    // font-size: 18px;
  }
}

//NAVIGATION SIDEBAR AND TOPBAR WIDTH

.colapsed-sidebar{
  padding: 0;
    transition: 0.5s ease;
    width: 100px;
  
   
}


.not-colapsed-sidebar{
    width: 240px;
    padding: 0;
    
    // transition: 0.5s;

}
.not-reduiced-topbar{
  width: calc(100% - 100px);
}

.reduiced-topbar{
  width: calc(100% - 240px);

}

.special-card  {
    padding: 10px;
    border-radius: 10px;
    color: #0f4476;
    img{
      margin-right: 10px;
    }
}

.custom-btn{
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 0.8vw !important;
    img{
      margin-right: 10px;
    }
}
input[type="search"]::-webkit-search-decoration:hover,
    input[type="search"]::-webkit-search-cancel-button:hover {
    cursor: pointer;
}


.reload-historic{
    background: #000;color:#f16e01 !important;;
    padding: 10px;
    border-radius: 5px;
      
    img{
      margin-right: 5px;
    }
  }

.pd-btn{
  // padding: 12px 30px;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
}
.mr-2rem{
        margin-right: 2rem;
    }

.submit-btn{
  background: #000000;
  color: #fff;
  font-weight: bold;
  &:hover{
  background: #f16e01;
  }

}

.orange-color-0f{
  color: #f16e01;
}
.bg-blue-fort{
  background: #f16e01;
}

.bg-fond-orange{
  background: #f16e01;
}
.color-fond-red{
  color: #dc181b !important;
}


.color-violet{
  color: #5e0f76;
}

.bg-blue-fort-1e{
  background-color: #1e6095;
}
.blue-color-49{
  color: #49ace2;
}
.bg-color-49{
  background: #49ace2;
}
.green-color-78{
color: #78d551;
}

.bg-red-de{
  background:  #de4817;;
}
.red-color-de{
  color: #de4817;
}
.orange-color-df{
  color: #df942d;
}
.bg-maron-a0{
  background: #ffebdf;
}

.marron-4d{
  color: #4d4d4d;
}

.marron-9d{
  color: #9d9d9d;
}

.hover-cursor:hover{
  cursor: pointer;
}

.text-yellow-fe{
  color: #fee933 !important;
}
.bg-yellow{
  background: #fee933;
}

.bg-green-78{
  background: #78d551;
}
.bg-green-color-60{
  background: #60b379;
}
.green-color-60{
  color: #60b379;
}
.green-color-56{
  color: #56aa9d;
}

.border-green-78{
  border: 3px solid #78d551;
}

.border-dash-green-78 {
    border: 2px dashed #78d551;
    border-width: 5px;
}

.border-green-56{
  border: 3px solid #56aa9d;
}
.border-dash-green-56 {
    border: 2px dashed #56aa9d;
    border-width: 5px;
}

.green-color-3c{
  color: #3c8293;
}

.bg-brown-fc{
  background: #fcf3e8;
}

.bg-green-f2{
  background: #f2fbee;
}

.border-rad-10{
  border-radius: 10px;
}

.text-gray-75{
  color: #737271;
}

.text-gray-d3{
  color: #d3d0d0b8;
}
.text-gray-8f{
  color: #8f8e8e;
}
.bg-violet-light-e2{
  background: #000;color:#f16e01 !important;;
}
.bd-btm-blue-light{
  border-bottom: 2px solid #000;color:#f16e01 !important;;
}

.bg-gray-sm-light{
  background: #f8f9fa;
}

.box-shadow-d3{
  box-shadow: 0px 0px 8px #edededb8;
}
.mb-2rem{
  margin-bottom: 2rem !important;
}
.fw-bold{
    font-weight: bold !important;
}

.form-label-style{
  label{
    font-style: italic;
    font-weight: bold;
    color: #f16e01;
    margin: 5px 0;
  }

  .form-div{
    margin-bottom: 5px;
  }
}

</style>
