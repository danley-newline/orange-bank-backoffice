import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from '../services/index.js'

Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [createPersistedState()],
    state:{
        allAdminUserInfo: null,
        userLogStatus:false,
        logedUser: null,
        packList: null


    }, 
    mutations:{
      
         mutAdminUserInfo(state, payload){
            state.allAdminUserInfo = payload;
            // console.log('TOUTES LES VALEUR DU CLIENT ' , state.allClientInfo)
         },

         MutLogedUser(state, payload){
            state.logedUser = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },

         mutLogin(state, payload){
            state.userLogStatus = payload;
            window.location.reload();
         },

         MutPacksList(state, payload){
            state.packList = payload;
         },




        
    },
    actions:{
        



     getAllAdminUsersData({commit}){
      axios.get(`/users`)
      .then((data) => {
         // console.log('Get the current user login ',data);
         commit("mutAdminUserInfo", data.data);
 
       })
       .catch((error) => {
         // console.log(error);
         if (error.response.status == 401) {
           commit("mutLogin", false);
           localStorage.clear();
         }
       });
  },

   getPacksList({commit}){
      axios.get(`/product`)
      .then((response) => {
         commit("MutPacksList", response.data.data);
      })
      .catch((error) => {
         // console.log(error);
         if (error.response.status == 401) {
         commit("mutLogin", false);
         localStorage.clear();
         }
      });
   },


        
        
    },

    getters: {
      
      retcurrentUserlogedInfo(state){
         return state.currentUserInfo || [];
     },

     retLogUser(state){
      return state.logedUser || [];
      },

      retpackList(state){
         return state.packList || [];
         },
      
    }
})