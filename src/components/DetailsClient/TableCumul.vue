<template>
  <div class="details-date-table mt-5">
    <b-overlay :show="show" rounded="sm" class="product-loader">
          <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center ">
                <h3 class="fw-bold">Cumul du client</h3>

                
              </div>

                <div class="search-block d-flex box-shadow-d3">
                    <button class="search-btn">
                        <b-icon icon="search"></b-icon>
                    </button>
                    <input
                    v-model="filter"
                    type="search"
                    class="search-input mx-2"
                    placeholder="Rechercher de colis"
                  />
                </div>
        </div>
            
        
          <div class="zone-tables box-shadow-d3">

            <div class="d-flex px-4 mb-2 pt-3 bd-btm-blue-light">
              
              
              <div class="liste-tables pb-2 " :class="{'active' : listActive == item.id}" 
              
              v-for="(item,i) in ListTable" :key="i" @click="showSpecificData(item.label)">
                <p class="hover-cursor"> {{item.label}}</p>
              </div>
            </div>
            

            <b-table
              border
              label-sort-asc=""
              label-sort-desc=""
              label-sort-clear=""
              hover
              @filtered="onFiltered"
              :items="TableData"
              :fields="fields"
              class="product-table"
              :filter="filter"
              :per-page="perPage"
              :current-page="currentPage"
              foot-clone
            >

              <!-- THEAD date  -->

            <template #head(createdAt)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort-white.svg" alt=""> </span>
                </div>
              </template>

            <!-- TBODY createdAt  -->
              <template #cell(createdAt)="data">
                    <span class="marron-4d" >{{data.item.createdAt | moment(`DD/MM/YYYY`)}}</span>
              </template>

            <!-- TFOOT createdAt  -->
              <template #foot(createdAt)="data">
                    <span class="marron-4d d-none" >{{data.label}}</span>
                    <h4 class="fw-bold">TOTAL</h4>
              </template>




             <!-- THEAD code  -->
            <template #head(code)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort-white.svg" alt=""> </span>
                </div>
              </template>
              <!-- TBODY code  -->
              <template #cell(code)="data">
                    <span class="marron-4d fw-bold" >{{data.item.code}}</span>
              </template>

              <template #foot(code)="data">
                    <span class="marron-4d d-none" >{{data.label}}</span>
              </template>


               <!-- THEAD poids  -->
            <template #head(poids)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort-white.svg" alt=""> </span>
                </div>
              </template>
              <!-- TBODY poids  -->
              <template #cell(poids)="data">
                  <div class="mx-4">
                    <span class="fw-bold marron-4d" >{{Number(data.item.transactLinePoids).toLocaleString()}}</span>
                  </div>
              </template>

              <template #foot(poids)="data">
                    <span class="marron-4d d-none" >{{data.label}}</span>
                      <button class="btn text-white fw-bold bg-blue-fort px-4">{{Number(totalPoids).toLocaleString()}}</button>
              </template>

              
             <!-- THEAD LIVRÉS  -->
             <template #head(amount)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort-white.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(amount)="data">
                  <div class="mx-1">
                    <span class="fw-bold blue-color-0f" >{{Number(data.item.amount).toLocaleString()}}</span>

                  </div>
              </template>

              <template #foot(amount)="data">
                    <span class="marron-4d d-none" >{{data.label}}</span>
                      <!-- <button class="btn text-white fw-bold bg-color-49">150 000</button> -->
              </template>

              <!-- THEAD PAYÉ -->
             <template #head(paymentType)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort-white.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(paymentType)="data">
                    <span class="green-color-78 fw-bold mx-2" >{{data.item.paymentType.labelle}}</span>
              </template>
              <template #foot(paymentType)="data">
                    <span class="marron-4d d-none" >{{data.label}}</span>
                      <!-- <button class="btn text-white fw-bold bg-green-78">220</button> -->
              </template>
              

              <!-- THEAD NON PAYÉ -->
             <template #head(versements)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort-white.svg" alt=""> </span>
                </div>
              </template>

              <!-- TBODY ETAT DU COLIS  -->
              <template #cell(versements)="data">
                    <span class="green-color-60 fw-bold mx-2"  >{{Number(data.item.globalVerse).toLocaleString()}}</span>
                    <!-- <span class="green-color-60 fw-bold mx-2" v-else >{{Number(0).toLocaleString()}}</span> -->
              </template>
              <template #foot(versements)="data">
                    <span class="marron-4d d-none" >{{data.label}}</span>
                      <button class="btn text-white fw-bold bg-green-color-60">{{Number(totalVersement).toLocaleString()}} </button>
              </template>


              <!-- THEAD isPayed  -->
             <template #head(isNotPay)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort-white.svg" alt=""> </span>
                </div>
              </template>
               <template #cell(isNotPay)="data">
                    <span class="red-color-de fw-bold mx-2 "  >{{Number(data.item.amount - data.item.globalVerse).toLocaleString()}}</span>
                    <!-- <span class="red-color-de fw-bold mx-2" v-else>{{0}}</span> -->
              </template>
              
              <template #foot(isNotPay)="data">
                    <span class="marron-4d d-none" >{{data.label}}</span>
                      <button class="btn text-white fw-bold bg-red-de">{{Number(totalImpayed).toLocaleString()}}</button>
              </template>
            

              <!-- THEAD actions  -->
             <template #head(actions)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort-white.svg" alt=""> </span>
                </div>
              </template>
                
             <!-- TBODY actions  -->
             <template #cell(actions)="data">
                 <span class="d-none">{{data.item.actions}}</span>
                 <span v-if="retCurrentUserRole.roleAdmin == 'ROLE_ADMIN' ||  retCurrentUserRole.roleCaisse == 'ROLE_CAISSE' ">
                  <div v-if="data.item.isPayed == false" class="d-flex bg-white caisse-btn align-items-center" @click="goToEncaisse(data.item)">
                      <img src="../../assets/icons/add-to-list.svg" alt="">
                      <p class="fw-bold blue-color-0f">Encaisser</p>
                  </div>
                  <div v-if="data.item.isPayed == true"  >
                      <img src="../../assets/icons/check-success.svg" class="img-1vw" alt="">
                      <!-- <p class="fw-bold ">À jour</p> -->
                  </div>
                  </span>

                   <span v-else class="h6 mx-3">
                  X
                </span>
              </template>
              <template #foot(actions)="data">
                    <span class="marron-4d d-none" >{{data.label}}</span>
              </template>
              

              

            </b-table>

            <div v-if="filter && rows === 0" class="text-center">
              <p class="fw-bold">
                Aucun resultat trouvé pour {{ filter }} , veuillez réessayer avec un
                autre  !
              </p>
            </div>

          </div>

          <!-- <div class="d-flex justify-content-end my-4">
              

              <b-pagination
             
              @change="showLoader"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                class="mb-0"
              ></b-pagination>
            </div> -->
    </b-overlay>


    
  </div>


</template>

<script>
import { mapGetters } from 'vuex'


export default {
  props:{
    TableDataExpediteur:{
      type: Array
    },
    TableDataDestinataire:{
      type: Array
    },
    
   
  },
  data() {
    return {
      show: false,
      perPage: 14,
      currentPage: 1,
      rows: 1,
      filter: null,
      listActive:0,
      totalVersement:0,
      totalPoids:0,
      totalMontant:0,
      totalImpayed:0,
      TableData:[],
      ListTable:[
        {
          id:0,
          label:"Expéditeur"
        },
        {
          id:1,
          label:"Destinataire"
        }
      ],
     

      fields: [
        {
          key: "createdAt",
          sortable: true,
          label: "Date",
        },
        {
          key: "code",
          sortable: true,
          label: "Code",
        },
        
        {
          key: "amount",
          sortable: true,
          label: " Mont.transact..(Fcfa)",
        },
        {
          key: "paymentType",
          sortable: true,
          label: "M.payement",
        },
        {
          key: "poids",
          sortable: true,
          label: "Poids (Kg)",
        },
        {
          key: "versements",
          sortable: true,
          label: "Versements",
        },
        {
          key: "isNotPay",
          sortable: true,
          label: "Impayé",
        },
        {
          key: "actions",
          sortable: true,
          label: "Action",
        }
      ],

    };
  },

  computed:{
  ...mapGetters([
      'retCurrentUserRole'
    ]),
    
},
  
  created() {
    // this.getAllProduct = this.$store.state.AllProductList;
    this.show = true;
    setTimeout(() => (this.show = false), 2000);
    
  },
  methods: {
    showSpecificData(e){
      if (e == "Expéditeur") {
        this.listActive = 0;
        this.TableData = this.TableDataExpediteur;
        this.totalPoids = this.TableDataExpediteur.colisPoidsCumul;
        this.totalVersement = this.TableDataExpediteur.allCumulVersement;
        this.totalImpayed = this.TableDataExpediteur.allCumulImpayed;

      }
      else if (e == "Destinataire") {
        this.listActive = 1;
        this.TableData = this.TableDataDestinataire;
        this.totalPoids = this.TableDataDestinataire.colisPoidsCumul;
        this.totalVersement = this.TableDataDestinataire.allCumulVersement;
        this.totalImpayed = this.TableDataDestinataire.allCumulImpayed;
      }
    },
    goToEncaisse(e) {
      // console.log("client clické clické", e)
      this.$store.commit("MutTransactForPay", e)
      this.$emit("showModal", true)
      
    },
    onFiltered(filteredItems) {
      // this.rows = filteredItems.length;
      // this.currentPage = 1;
    },
    showLoader(){
    this.show = true;
    setTimeout(() => (this.show = false), 2000);
  },


  //SHOW MODAL OR HIDE IT
    
  
  },
  mounted() {
    setTimeout(() => {
      this.showSpecificData('Expéditeur');
      
    }, 1000);
    
  },
  
};
</script>


<style lang="scss">


.liste-tables {
    margin-right: 6rem;
    p{
      color: #7c7373;
    }
   
    &.active{
      border-bottom: 4px solid #0f4476;
      p{
        color: #0f4476;
      font-weight: bold;
      }
      
    }
}

.details-date-table{

    h3{
        text-transform: uppercase;
        margin-right: 20px;
        margin-bottom: 0;
    }

    button.search-btn, .search-input {
        border: none;
        background: transparent;
    }
    .search-block.d-flex {
        background: #fff;
        padding: 8px 12px;
        border-radius: 10px;
        border: 1px solid #000;
    }
    .search-input{
        width: 22vw;
        outline: none;
    }

    .caisse-btn{
      border: 1px solid #0f4476;
      border-radius:5px ;
      padding: 5px;
      width: 7vw;

      &:hover{
        cursor: pointer;
      }

      p{
        margin-left: 0.5vw;
      }
    }

  .reload-historic{
    background: #000;color:#f16e01 !important;;
    padding: 10px;
    border-radius: 5px;
      
    img{
      margin-right: 5px;
    }
  }
    
    .zone-tables{
        background: #fff;
        margin-top: 2rem;
        border-radius: 10px;

        // height: 250px !important;
        // overflow-y: auto;

        // -ms-overflow-style: none; /* for Internet Explorer, Edge */
        // scrollbar-width: none; /* for Firefox */
        // overflow-y: scroll;

        // &::-webkit-scrollbar {
        //     display: none; /* for Chrome, Safari, and Opera */
        // }

        table{
            border: transparent !important;
            
            


            thead {
                background: #0f4476;
                color: #fff;
                // position: sticky;
                // position: -webkit-sticky;
                top: 0;
                z-index: 2;
            }

            tfoot{
              background: #000;color:#f16e01 !important;;
            }

            // tbody{
            //   background: #f8f8f8;
            // }

            
        }

        .table > :not(:first-child) {
            border-top: none;
        }

        .table.b-table > thead > tr > [aria-sort=none],
        .table.b-table > thead > tr > [aria-sort=ascending],
         .table.b-table > tfoot > tr > [aria-sort=none],
         .table.b-table > tfoot > tr > [aria-sort=ascending],
         .table.b-table > thead > tr > [aria-sort=descending], 
         .table.b-table > tfoot > tr > [aria-sort=descending] {
            background-image: none !important;
        }
        
       
        thead, tbody, tr, th{
            padding: 1rem 0.5rem !important;
        }
        td{
            padding: 0.5rem 1rem !important;
        }

    }
}


 



  .page-item.active .page-link {
    background: red;
    border-color: #fff !important;

  }

  button.page-link {
    font-weight: bold;
    color: #000;
  }

  .page-item.disabled:hover {
    cursor: not-allowed;
  }
// }
</style>