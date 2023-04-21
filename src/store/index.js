import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from '../services/index.js'

Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [createPersistedState()],
    state:{
        infoColisFormDatas:[],
        expediteurColisFormDatas:[],
        destinataireColisFormDatas:[],
        transactForClientInfo:{},
        firstCalendar:"",
        userLogStatus:false,
        currentUserInfo:null,

        //CREATE COLIS
        colisAllClientType:null,
        allClientInfo:null,
        allPayInfo:null,
        allAgenceInfo: null,
        allExpModeInfo: null,
        allPayModeInfo: null,
        allPayFromInfo: null,
        allTypeFactuInfo: null,
        allVillesInfo: null,
        allTypeContenuInfo:null,
        allColisInfo:null,
        allTransactionInfo:null,
        oneTransactInfo:null,
        allInvoicesDatas: null,
        dashDatas:null,
        filterByTwoDate:null,
        InventoryDatas:null,
        InventoryTotalQuantity:null,
        InventoryTotalWeight:null,
        clientToEdition:null,
        oneClientTransact:null,
        expeditorTransaction:null,
        destinatorTransaction:null,
        goPayTransaction:null,
        editFactureInfo:null,
        allVersements:null,
        allClientTotalDatas:null,
        dateFilterStatus: null,
        allRolesInfo: null,
        allAdminUserInfo: null,
        adminToEdition:null,
       
        IsPrintInventory:null,
        onlyOneTransaction:null,



        CurrentUserRole:'',
        // AllProductList:[]
    }, 
    mutations:{
      
        setFirstAddColisForm(state, payload){
            state.infoColisFormDatas = payload;
            // console.log("First Datas Colis Form ", state.infoColisFormDatas)
        },
        setSecondAddColisForm(state, payload){
            state.expediteurColisFormDatas = payload;
            // console.log("Second Datas Colis Form ", state.expediteurColisFormDatas)
        },
        setThirdAddColisForm(state, payload){
            state.destinataireColisFormDatas = payload;
            // console.log("Third Datas Colis Form ", state.destinataireColisFormDatas)
        },
        mutCurrentTransactionCaisse(state, payload){
            state.transactForClient = payload;
            // console.log("Client to see ", state.transactForClientInfo)
        },
        mutFirstOfTwoDate(state, payload){
            state.firstCalendar = payload;

            //ACTUALISER LA PAGE POUR AFFICHER LES VALEURS COMMITÉE
            window.location.reload()
        },
        mutTwoDateFiltre(state, payload){
         state.filterByTwoDate = payload;
         // console.log("les statsuiiiiiii  filter ", state.filterByTwoDate);
      },
        mutCurrentUserInfo(state, payload){
            state.currentUserInfo = payload;
            // console.log("data user now", state.currentUserInfo)
         },
        mutLogin(state, payload){
            state.userLogStatus = payload;
            window.location.reload();
         }, 
         MutColisClientType(state, payload){
            state.colisAllClientType = payload;
            // console.log('les client bien recuperé' , state.colisAllClientType.member)
         },
         MutAllClient(state, payload){
            state.allClientInfo = payload;
            // console.log('TOUTES LES VALEUR DU CLIENT ' , state.allClientInfo)
         },
         mutAdminUserInfo(state, payload){
            state.allAdminUserInfo = payload;
            // console.log('TOUTES LES VALEUR DU CLIENT ' , state.allClientInfo)
         },
         MutAllClientTotalDatas(state, payload){
            state.allClientTotalDatas = payload;
            // console.log('TOUTES LES VALEUR DU CLIENT ' , state.allClientInfo)
         },
         MutFilterStatus(state, payload){
            state.dateFilterStatus = payload;
         },
         MutAllPaysInfo(state, payload){
            state.allPayInfo = payload;
            // console.log('TOUTES LES VALEUR DU CLIENT ' , state.allClientInfo)
         },
         MutAllAgenceInfo(state, payload){
            state.allAgenceInfo = payload;
            // console.log('TOUTES LES VALEUR DU CLIENT ' , state.allClientInfo)
         },
         MutAllVillesInfo(state, payload){
            state.allVillesInfo = payload;
            // console.log('TOUTES LES VALEUR DU CLIENT ' , state.allClientInfo)
         },
         MutAllExpModeInfo(state, payload){
            state.allExpModeInfo = payload;
            // console.log('TOUTES LES VALEUR DU EXPO SUI ' , state.allExpModeInfo)
         },
         MutAllPayModeInfo(state, payload){
            state.allPayModeInfo = payload;
            // console.log('TOUTES LES VALEUR DU EXPO SUI ' , state.allExpModeInfo)
         },
         MutAllPayFromInfo(state, payload){
            state.allPayFromInfo = payload;
            // console.log('TOUTES LES VALEUR DU EXPO SUI ' , state.allExpModeInfo)
         },
         MutAllTypeFactuInfo(state, payload){
            state.allTypeFactuInfo = payload;
            // console.log('TOUTES LES VALEUR DU EXPO SUI ' , state.allExpModeInfo)
         },
         MutAllTypeContenuInfo(state, payload){
            state.allTypeContenuInfo = payload;
            // console.log('TOUTES LES VALEUR DU EXPO SUI ' , state.allExpModeInfo)
         },
         // MutAllColisInfo(state, payload){
         //    state.allColisInfo = payload;
         //    // console.log('TOUTES LES VALEUR DU  ' , state.allColisInfo)
         // },
         MutAllTransactionInfo(state, payload){
            state.allTransactionInfo = payload;
            // console.log('TOUTES LES VALEUR DU  ' , state.allColisInfo)
         },

         MutOneTransact(state, payload){
            state.oneTransactInfo = payload;
            // console.log('TOUTES LES VALEUR DU  ' , state.allColisInfo)
         },

         MutAllInvoicesDatas(state, payload){
            state.allInvoicesDatas = payload;
            // console.log('TOUTES LES VALEUR DU  ' , state.allColisInfo)
         },
         MutAllDashboardDatas(state, payload){
            state.dashDatas = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         MutInventoryDatas(state, payload){
            state.InventoryDatas = payload;
            setTimeout(() => {
               window.location.reload();
            }, 100);
            
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         MutInventoryTotalQuantity(state, payload){
            state.InventoryTotalQuantity = payload;
         },
         MutInventoryTotalWeight(state, payload){
            state.InventoryTotalWeight = payload;
         },
         MutToClientEdition(state, payload){
            state.clientToEdition = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         MutToAdminEdition(state, payload){
            state.adminToEdition = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         MutOneClientAllTransaction(state, payload){
            state.oneClientTransact = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         MutTransactByExped(state, payload){
            state.expeditorTransaction = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         MutTransactByDest(state, payload){
            state.destinatorTransaction = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         

         MutTransactForPay(state, payload){
            state.goPayTransaction = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         MutEditFacture(state, payload){
            state.editFactureInfo = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         MutAllVersements(state, payload){
            state.allVersements = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         MutAllRolesInfo(state, payload){
            state.allRolesInfo = payload;
            // console.log('LES GENS BACK MUT ok ok ', state.dashDatas)
         },
         

         MutIsClickToPrint(state, payload){
            state.IsPrintInventory = payload;
         },
         MutOneTransactInfo(state, payload){
            state.onlyOneTransaction = payload;
         },

         MutCurrentUserRole(state, payload){
            state.CurrentUserRole = payload;
         },


         


        
    },
    actions:{
        

        getCurrentUserInfo({commit}, userID){
         axios.get(`/users/${userID}`)
         .then((data) => {
            // console.log('Get the current user login ',data);
            commit("mutCurrentUserInfo", data.data);



            //RECUPERATION DES ROLES
            let Roles = data.data.roles;
            
            //INITIALISATION DE NOTRE OBJECT ROLE
            let allRoles = {};
               allRoles.roleAdmin = null;
               allRoles.roleColis = null;
               allRoles.roleCaisse = null;
               allRoles.roleCompta = null;
               allRoles.roleCommerce = null;


            //VERIFICATION DES ROLES DE LUTILISATEUR CONNECTÉ ET LE RETOURNÉ
            if (Roles.includes("ROLE_ADMIN")) {
               allRoles.roleAdmin = "ROLE_ADMIN"               
            }

            if (Roles.includes("ROLE_CAISSE")) {
               allRoles.roleCaisse = "ROLE_CAISSE"
               
            }

            if (Roles.includes("ROLE_AGENT")) {
               allRoles.roleColis = "ROLE_AGENT"
               
            }

            if (Roles.includes("ROLE_COMPTA")) {
               allRoles.roleCompta = "ROLE_COMPTA"
               
            }

            if (Roles.includes("ROLE_COMMERCIAL")) {
               allRoles.roleCommerce = "ROLE_COMMERCIAL"
               
            }

            commit("MutCurrentUserRole", allRoles);
            // console.log("VOOIR LE ROLES LLSLSLS ", allRoles);
            
            
            
    
          })
          .catch((error) => {
            // console.log(error);
            if (error.response.status == 401) {
              commit("mutLogin", false);
              localStorage.clear();
            }
          });
     },


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

        ActGetColisClientType({commit}){
            axios.get('/type_clients')
                 .then(data => {
                     // console.log('les types de client', data.data)
                     commit('MutColisClientType', data.data[`hydra:member`])
                 })
                 .catch(error => {
                     // console.log('Recuperation colis client ',error)

                     if (error.response.status == 401) {
                        
                        commit("mutLogin", false);
                        localStorage.clear();
                      }
                })
        },

        getAllClientData({commit}){
            axios.get('/clients')
                 .then(data => {
                  //   console.log('liste des users finaux   ',data.data)
                    commit('MutAllClient', data.data[`hydra:member`])
                    commit('MutAllClientTotalDatas', data.data)
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },
        getVersementsDatas({commit}){
         axios.get('/versements')
              .then(data => {
                 // console.log('liste des users finaux   ',data.data)
                 commit('MutAllVersements', data.data)
              })
              .catch(error => {
                  // console.log(error)
             })
     },


        getAllPaysData({commit}){
            axios.get('/pays')
                 .then(data => {
                    // console.log('liste des users finaux   ',data.data)
                    commit('MutAllPaysInfo', data.data[`hydra:member`])
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },
        getAllUserRoles({commit}){
         axios.get('/roles')
              .then(data => {
                 // console.log('liste des users finaux   ',data.data)
                 commit('MutAllRolesInfo', data.data[`hydra:member`])
              })
              .catch(error => {
                  // console.log(error)
             })
     },

        getAllAgenceData({commit}){
            axios.get('/agences/get')
                 .then(data => {
                    // console.log('liste des users finaux   ',data.data)
                    commit('MutAllAgenceInfo', data.data[`hydra:member`])
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },
        getAllVillesData({commit}){
            axios.get('/villes')
                 .then(data => {
                    // console.log('liste des users finaux   ',data.data)
                    commit('MutAllVillesInfo', data.data[`hydra:member`])
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },
        getAllExpModeData({commit}){
            axios.get('/modes')
                 .then(data => {
                    // console.log('liste des users finaux   ',data.data)
                    commit('MutAllExpModeInfo', data.data[`hydra:member`])
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },

        getAllPayModeData({commit}){
            axios.get('/payment_types')
                 .then(data => {
                    // console.log('liste des users finaux   ',data.data)
                    commit('MutAllPayModeInfo', data.data[`hydra:member`])
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },
        getPayFromData({commit}){
            axios.get('/payment_froms')
                 .then(data => {
                    // console.log('liste des users finaux   ',data.data)
                    commit('MutAllPayFromInfo', data.data[`hydra:member`])
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },
        getTypeFactuData({commit}){
            axios.get('/type_facturations')
                 .then(data => {
                    // console.log('liste des users finaux   ',data.data)
                    commit('MutAllTypeFactuInfo', data.data[`hydra:member`])
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },

        getTypeContenuData({commit}){
            axios.get('/type_contenus')
                 .then(data => {
                    // console.log('liste des users finaux   ',data.data)
                    commit('MutAllTypeContenuInfo', data.data[`hydra:member`])
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },

      //   getAllColisData({commit}){
      //       axios.get('/colis')
      //            .then(data => {
      //               // console.log('liste des users finaux   ',data.data)
      //               commit('MutAllColisInfo', data.data[`hydra:member`])
      //            })
      //            .catch(error => {
       //              console.log(error)
      //           })
      //   },

        getAlltransactions({commit}){
            axios.get('/transactions')
                 .then(data => {
                    // console.log('liste des users finaux   ',data.data)
                    commit('MutAllTransactionInfo', data.data)
                 })
                 .catch(error => {
                     // console.log(error)
                })
        },

        getOnetransactionInfos({commit}, id){
         axios.get(`/transactions/${id}`)
              .then(data => {
                 // console.log('liste des users finaux   ',data.data)
                 commit('MutOneTransactInfo', data.data)
              })
              .catch(error => {
                  // console.log(error)
             })
     },

        getAllInvoicesDatas({commit}){
         axios.get('/invoices')
              .then(data => {
                 // console.log('liste des users finaux   ',data.data)
                 commit('MutAllInvoicesDatas', data.data)
              })
              .catch(error => {
                  // console.log(error)
             })
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

  getCurrentClientDatas({commit},myId){
   // const endDate = new Date().toISOString().substr(0, 10);
   // console.log('LA DATE DE FIN ', endDate);

   // console.log("JE VEUX VOIR SI JAI LA BONNE ID ", myId);
   axios.get(`/clients/${myId}`)
        .then(data => {
         // console.log('LES GENS BACK MUT  ', data.data)

           commit('MutOneClientAllTransaction', data.data)
        })
        .catch(error => {
            // console.log(error)
       })
},
getCurrentInvoice({commit},id){
   axios.get(`${id}`)
        .then(data => {
         // console.log('LA LISTR FINAL DES ELEMENT; ', data.data)

           commit('MutEditFacture', data.data)
        })
        .catch(error => {
            console.log(error)
       })
},

getTransactionById({commit},id){
   axios.get(`${id}`)
        .then(data => {
         console.log('LE CALL DES TRANSACT ; ', data.data)

           commit('MutOneTransact', data.data)
        })
        .catch(error => {
            console.log(error)
       })
},

filterTransactionByExpeditor({commit},payload){
   axios.get(`/transactions?expediteur=${payload}`)
        .then(data => {
         // console.log('LA LISTR FINAL DES ELEMENT; ', data.data)

           commit('MutTransactByExped', data.data["hydra:member"])
        })
        .catch(error => {
            // console.log(error)
       })
},

filterTransactionByDestinator({commit},payload){
   axios.get(`/transactions?recepteur=${payload}`)
        .then(data => {
         // console.log('LA LISTR FINAL DES ELEMENT; ', data.data)

           commit('MutTransactByDest', data.data["hydra:member"])
        })
        .catch(error => {
            // console.log(error)
       })
},

getTransactionByInventaire({commit},periode){
   axios.get(`/transactions/inventaire?sartDate=${periode.dateStart}&endDate=${periode.dateEnd}`)
         .then(data => {
            console.log("VOIR LE CONTENU DES INVENTAIRES ", data.data);
         commit('MutInventoryTotalQuantity', data.data.totalQuantity["hydra:member"])
         commit('MutInventoryTotalWeight', data.data.totalWeight["hydra:member"])
         commit('MutInventoryDatas', data.data.datas["hydra:member"])
            
         //  setTimeout(() => {
         //    this.showSpiner = false;
         //    window.location.reload(true);
              
         //    }, 10);
            
            // console.log('J\'ai recuperer les filtre aujourdgui',data.data)
            // 


         })
         .catch(error => {
          this.showSpiner = false;
            // console.log("ERREUR LIÉ AU DASHBOARD ",error)
      })
},

        
        
    },

    getters: {
      
      retcurrentUserlogedInfo(state){
         return state.currentUserInfo || [];
     },

        retAllClientInfo(state){
            return state.allClientInfo || [];
        },
        retAllClientTotalDatas(state){
         return state.allClientTotalDatas || [];
     },
        retAllTransaction(state){
         return state.allTransactionInfo || [];
     },
     retDateFilterStatus(state){
      return state.dateFilterStatus || false;
  },
     
     retAllClientType(state){
      return state.colisAllClientType || [];
      },
      
      retClientToEdit(state){
         return state.clientToEdition || [];

      },
      retadminToEdit(state){
         return state.adminToEdition || [];

      },

      retAllInvoicesDatas(state){
         return state.allInvoicesDatas || [];
      },
      retdashDatas(state){
         return state.dashDatas || [];
      },
      
      retOneClientTransact(state){
         return state.oneClientTransact || [];
      },

      
      retInventoryDatas(state){
         return state.InventoryDatas || [];
      },
      retInventoryTotalQuantity(state){
         return state.InventoryTotalQuantity || [];
      },

      retInventoryTotalWeight(state){
         return state.InventoryTotalWeight || [];
      },


      retexpeditorTransaction(state){
         return state.expeditorTransaction || [];
      },
      retdestinatorTransaction(state){
         return state.destinatorTransaction || [];
      },
      
      retgoPayTransaction(state){
         return state.goPayTransaction || [];
      },
      

      rettransactForClient(state){
         return state.transactForClient || [];
      },
      retfilterByTwoDate(state){
         return state.filterByTwoDate || [];
      },
      reteditFactureInfo(state){
         return state.editFactureInfo || [];
      },

      retoneTransactInfo(state){
         return state.oneTransactInfo || [];
      },
      retallVersements(state){
         return state.allVersements || [];
      },
      retallRolesInfo(state){
         return state.allRolesInfo || [];
      },
      retallAdminUserInfo(state){
         return state.allAdminUserInfo || [];
      },

      retCurrentUserRole(state){
         return state.CurrentUserRole || [];
      },
      
     
      
      retIsToPrint(state){
         return state.IsPrintInventory || [];
      },

      retonlyOneTransaction(state){
         return state.onlyOneTransaction || [];
      },
      
    }
})