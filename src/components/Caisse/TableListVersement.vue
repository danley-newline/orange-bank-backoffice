<template>
  <div class="caisse-versement-table ">

    <b-overlay :show="show" rounded="sm" class="product-loader">
          
            <!-- CE BLOCK DE CODE PERMET DACUTALISER LA  PAGE LORSUE LETAT DE LA VALEUR CHANGE  ET APPELER LA FONCTION SE TROUVANT LE DANS CYCLE DE VIE  DANS LUPDATE  -->
<p class="invisible"> {{retDateFilterStatus}} IS OK </p>
<!-- FIN BLOCK  -->
<!-- <p>{{retDateFilterStatus}} hola</p> -->

        
        
          <div class="zone-tables box-shadow-d3">
        
        <div class="px-2">
            <div class="search-block d-flex box-shadow-d3 px-2">
                    <button class="search-btn">
                        <b-icon icon="search"></b-icon>
                    </button>
                    <input
                    v-model="filter"
                    type="search"
                    class="search-input mx-2"
                    placeholder="Rechercher, expéditeur, Payé,facture"
                  />
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
              :current-page="currentPage"
            >

              <!-- THEAD CLIENT  -->

            <template #head(expediteur)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>

            <!-- TBODY expediteur  -->
              <template #cell(expediteur)="data">
                    <span class="fw-bold" >{{data.item.transaction.expediteur.nom}} {{data.item.transaction.expediteur.prenoms}}</span>
              </template>


             <!-- THEAD code_fact  -->
            <template #head(code_fact)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <!-- TBODY code_fact  -->
              <template #cell(code_fact)="data">
                    <span class="green-color-78" >{{data.item.invoice ? data.item.invoice.code : 'Sans facture'}}</span>
              </template>


               <!-- THEAD recepteur  -->
            <template #head(recepteur)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <!-- TBODY recepteur  -->
              <template #cell(recepteur)="data">
                  <div class="">
                    <span class="" >{{data.item.transaction.recepteur.nom}} {{data.item.transaction.recepteur.prenoms}} </span>

                  </div>
              </template>




              <template #cell(createdAt)="data">
                  <div class="">
                    <span class="" >{{data.item.createdAt | moment(`DD/MM/YYYY`) }}</span>

                  </div>
              </template>

              
             <!-- THEAD LIVRÉS  -->
             <template #head(code)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(code)="data">
                  <div class="mx-1">
                    <span class="" >{{data.item.transaction.code}}</span>
                    <!-- <span class="" >{{0}}</span> -->

                  </div>
              </template>

              <!-- THEAD PAYÉ -->
             <template #head(montant)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(montant)="data">
                    <span class=" fw-bold mx-2" >{{Number(data.item.montant).toLocaleString()}} Fcfa</span>
              </template>
              

                
             <!-- TBODY actions  -->
             <!-- <template #cell(actions)="data">
                 
                
              </template> -->

            </b-table>

            <div v-if="filter && rows === 0" class="text-center">
              <p class="fw-bold">
                Aucun resultat trouvé pour {{ filter }} , veuillez réessayer avec un
                autre  !
              </p>
            </div>

          </div>

          <div class="d-flex justify-content-end my-4">
              

              <b-pagination
             
              @change="showLoader"
                v-model="currentPage"
                :total-rows="rows"
                class="mb-0"
              ></b-pagination>
            </div>
    </b-overlay>

  </div>
</template>

<script>
import axios from "../../services/index.js"
import _ from 'lodash';
import { mapGetters } from 'vuex'

export default {

  props:{
    versByDate:{
      type: Boolean
    }
  },
   
  data() {
    return {
      caisseModalShow:false,
      paymentDatas:{},
      clientWhoPay:{},
      TableData:[],
      isTransactTable:true,
      show: false,
      currentPage: 1,
      rows: 1,
      filter: "",
      listActive:0,
      ListTable:[
        {
          id:1,
          label:"Impayés"
        },
        {
          id:2,
          label:"Payés"
        },
        {
          id:3,
          label:"Avec facture"
        },
        {
          id:4,
          label:"Sans facture"
        }

      ],

      fields: [
        {
          key: "code",
          sortable: true,
          label: "Code transac.",
        },
        {
          key: "code_fact",
          sortable: true,
          label: "Code facture",
        },
        {
          key: "expediteur",
          sortable: true,
          label: "Expediteur",
        },
        
        {
          key: "recepteur",
          sortable: true,
          label: "Destinataire",
        },
        
        {
          key: "createdAt",
          sortable: true,
          label: "Effectué le",
        },
        
        {
          key: "montant",
          sortable: true,
          label: "Montant",
        },
      ],

    };
  },
  
  computed:{
  ...mapGetters([
      'retallVersements',
      'retDateFilterStatus'
    ])
},
  created() {
    // this.getAllProduct = this.$store.state.AllProductList;
    
    this.show = true;
    setTimeout(() => (this.show = false), 2000);
  },
  updated(){
    // this.rows = this.TableData.length;
    setTimeout(() => {
      this.checkTableFilter();
    }, 100);
    
  },
  methods: {
    checkTableFilter(){
      if (this.retDateFilterStatus == true) {
        this.TableData = [];
        setTimeout(() => {
          this.TableData = this.retallVersements[`hydra:member`].reverse();
          this.$store.commit("MutFilterStatus", false);
        }, 100);
        ;
      }
    },
    
    onFiltered(filteredItems) {
      // this.rows = filteredItems.length;
      // this.currentPage = 1;
    },
    putVersementDatas(e){
      this.TableData = e.reverse();
    },
    showLoader(e){
    this.show = true;
   
     axios.get(`/versements?page=${e}`)
                 .then(data => {
                    this.show = false;
                    this.putVersementDatas(data.data['hydra:member']);
                    
                 })
                 .catch(error => {
                  this.$fire({
                      text: `Nous rencontrons un soucis veuillez réessayer ...`,
                      type: "error",confirmButtonText:'ok',
                      timer: 5000,
                    }); 
                     this.showSpiner = false;
                    // console.log("LES ZANIMAUX ZANI ",error)
                })
  },
  
  },
  mounted() {
    this.putVersementDatas(this.retallVersements[`hydra:member`]);
    this.rows = this.retallVersements['hydra:totalItems'];
    // console.log("VOIR LES VERSEMENTS ", this.retallVersements);
  },
  
};
</script>


<style lang="scss">


.liste-tables {
    margin-right: 4rem;
    p{
      color: #7c7373;
    }
    &:hover{
      cursor: pointer;
    }
    &.active{
      border-bottom: 4px solid #0f4476;
      p{
        color: #0f4476;
      font-weight: bold;
      }
      
    }
}

.caisse-versement-table{
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
        width: 100%;
        outline: none;
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
        padding-top: 2rem;
        padding-bottom: 0.5rem;
        border-radius: 10px;


        // height: 550px !important;
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
                background: #000;color:#f16e01 !important;;
                // position: sticky;
                // position: -webkit-sticky;
                top: 0;
                z-index: 2;
            }

            // &:hover{
            //     cursor: pointer;
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
            padding: 0.5rem 0.5rem !important;
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