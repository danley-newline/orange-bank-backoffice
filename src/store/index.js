import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from '../services/index.js'

Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [createPersistedState()],
    state:{
        userLogStatus:false,
        logedUser: null,
        packList: null,
        creditList: null,
        adminUser: null,


    }, 
    mutations:{
      
         MutAdminUser(state, payload){
            state.adminUser = payload;
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

         MutCreditList(state, payload){
            state.creditList = payload;
         },




        
    },
    actions:{
        


   getPacksList({commit}){
      axios.get(`/product`)
      .then((response) => {
         commit("MutPacksList", response.data.data);
      })
      .catch((error) => {
         if (error.response.status == 401) {
         commit("mutLogin", false);
         localStorage.clear();
         }
      });
   },

   getCreditList({commit}){
      axios.get(`/credit`)
      .then((response) => {
         commit("MutCreditList", response.data.data);
      })
      .catch((error) => {
         if (error.response.status == 401) {
         commit("mutLogin", false);
         localStorage.clear();
         }
      });
   },

   getUserList({commit}){
      axios.get(`/users`)
      .then((response) => {

         console.log(response.data.data);
         commit("MutAdminUser", response.data.data);
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
     retLogUser(state){
      return state.logedUser || [];
      },

      retpackList(state){
         return state.packList || [];
      },

      retcreditList(state){
         return state.creditList || [];
      },

      retadminUser(state){
         return state.adminUser || [];
      }, 
      
      
    }
})