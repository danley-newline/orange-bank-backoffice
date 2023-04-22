import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from '../services/index.js'

Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [createPersistedState()],
    state:{
        currentUserInfo:null,
        dashDatas:null,
        allAdminUserInfo: null,
        userLogStatus:false,


    }, 
    mutations:{
      
         mutAdminUserInfo(state, payload){
            state.allAdminUserInfo = payload;
            // console.log('TOUTES LES VALEUR DU CLIENT ' , state.allClientInfo)
         },
         MutAllDashboardDatas(state, payload){
            state.dashDatas = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },

         mutLogin(state, payload){
            state.userLogStatus = payload;
            window.location.reload();
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


     getDasboardDatas({commit}){
      var afterToday = new Date();
      afterToday.setDate(afterToday.getDate() + 1);
      // this.tomorrow = dateOne.toISOString().split('T')[0];
      const endDate = afterToday.toISOString().split('T')[0];
      // console.log('LA DATE DE FIN ', endDate);



      axios.get(`/transactions/dashboards?sartDate=2020-01-01&endDate=${endDate}`)
           .then(data => {
            // console.log('LES GENS BACK MUT  ', data.data)

              commit('MutAllDashboardDatas', data.data)
           })
           .catch(error => {
               // console.log(error)
          })
  },

        
        
    },

    getters: {
      
      retcurrentUserlogedInfo(state){
         return state.currentUserInfo || [];
     },
      
    }
})