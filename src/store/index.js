import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from '../services/index.js'
import _ from 'lodash';

Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [createPersistedState()],
    state:{
        userLogStatus:false,
        logedUser: null,
        packList: null,
        creditList: null,
        adminUser: null,
        creditAccepted:null,
        creditRejected:null,


    }, 
    mutations:{
      
         MutAdminUser(state, payload){
            state.adminUser = payload;
         },

         MutLogedUser(state, payload){
            state.logedUser = payload;
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

         MutCreditAccepted(state, payload){
            state.creditAccepted = payload;
         },

         MutCreditRejected(state, payload){
            state.creditRejected = payload;
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
         const copie = _.cloneDeep(response.data.data);
         let accepted = [];
         let rejected = [];
         copie.map((e) => {
            if (e.isGranted == true) accepted.push(e);
            if (e.isGranted == false) rejected.push(e);
         });
         commit("MutCreditList", response.data.data);
         commit("MutCreditAccepted", accepted);
         commit("MutCreditRejected", rejected);
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
         commit("MutAdminUser", response.data.data);
      })
      .catch((error) => {
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

      retcreditAccepted(state){
         return state.creditAccepted || [];
      }, 

      retcreditRejected(state){
         return state.creditRejected || [];
      }, 
      
      
    }
})