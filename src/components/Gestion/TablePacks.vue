<template>
  <div class="gestion-table">
    <b-overlay :show="show" rounded="sm" class="product-loader">            
            <div class="d-flex align-items-center ">
            <h3 class="fw-bold">Liste Des packs  </h3>

            <div class="search-block d-flex box-shadow-d3">
                <button class="search-btn">
                    <b-icon icon="search"></b-icon>
                </button>
                <input
                v-model="filterTab"
                 @input="sendForFilterTheTableData(filterTab)"
                type="search"
                class="search-input mx-2"
                placeholder="Rechercher un pack"

              />
            </div>

               <div class="">
                    <p class="reload-historic box-shadow-d3 mx-3 hover-cursor" @click="reloadPage()">
                    
                  </p>
                </div>

            </div>
            
          
        <!-- CE BLOCK DE CODE PERMET DACUTALISER LA  PAGE LORSUE LETAT DE LA VALEUR CHANGE  ET APPELER LA FONCTION SE TROUVANT LE DANS CYCLE DE VIE  DANS LUPDATE  -->
<p class="invisible"> {{retDateFilterStatus}} IS OK </p>
<!-- FIN BLOCK  -->

          <div class="zone-tables box-shadow-d3">
            <!-- <div class="d-flex px-4 mb-2 bd-btm-blue-light">
              <div class="liste-tables pb-2 " :class="{'active' : listActive == i}" 
              v-for="(item,i) in ListTable" :key="i" @click="ListClass(i), updateTableData(item.entete)">
                <p>{{item.text}}</p>
              </div>
            </div> -->

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
                    <span class="fw-bold" >{{data.item.expediteur.nom}} {{data.item.expediteur.prenoms}}</span>
              </template>


             <!-- THEAD CODE  -->
            <template #head(code)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <!-- TBODY CODE  -->
              <template #cell(code)="data">
                    <span class="green-color-78" >{{data.item.code}}</span>
              </template>


               <!-- THEAD POIDS  -->
            <template #head(poids)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <!-- TBODY POIDS  -->
              <template #cell(poids)="data">
                  <div class="mx-4">
                    <span class="" >{{data.item.colis[0].poids}}</span>

                  </div>
              </template>

              <template #cell(createdAt)="data">
                  <div class="">
                    <span class="" >{{data.item.createdAt | moment('DD/MM/YYYY')}}</span>

                  </div>
              </template>

              
             <!-- THEAD ACTIONs  -->
             <template #head(nature)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(nature)="data">
                  <div class="mx-1">
                    <span class="" >{{data.item.colis[0].typeContenu[0]?data.item.colis[0].typeContenu[0].libelle : ''}}</span>

                  </div>
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
                    <span class="fw-bold" >{{data.item.recepteur.nom}} {{data.item.recepteur.prenoms}}</span>
              </template>

              <!-- THEAD ETAT DU COLIS  -->
             <template #head(isPayed)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>

              <!-- TBODY ETAT DU COLIS  -->
              <template #cell(isPayed)="data">
                    <!-- <span > <img src="../../assets/icons/green-point.svg" alt=""> </span> -->
                    <span class="green-color-60 fw-bold mx-2" v-if="data.item.isPayed == true">Payé</span>
                    <span class="orange-color-df fw-bold mx-2"  v-if="data.item.isPayed == false">En cours</span>
              </template>
              

              <!-- THEAD ACTIONs  -->
             <template #head(actions)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
                
             <!-- TBODY ACTIONs  -->
             <template #cell(actions)="data">
                 <div class="mx-2">
                   <img
                   class="d-none"
                  :src="require(`../../assets/icons/${data.item.actions}`)"
                  alt=""
                />
                  

                   <span class="hover-cursor mx-2" @click="$emit('seeMore', data.item)">
                     <img
                  src="../../assets/icons/edit_compta.svg"
                  alt=""
                  class="img-1-2vw"
                />
                   </span>

                  
                  <span class="delete-action hover-cursor mx-3" @click="deletePack(data.item)">
                     <img
                  src="../../assets/icons/delete.svg"
                  alt=""
                  class="img-1vw"
                />
                   </span>

                     
                 </div>
                
              </template>

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

import { mapGetters } from 'vuex'
import axios from "../../services/index.js"

export default {
  
  props:["Periode","TableDatas"],
  data() {
    return {
      show: false,
      currentPage: 1,
      colisIsSubmit:false,
      filterTab:'',
      rows: 1,
      allInfo:{},
      TableData:[],
      periodeDate:{},
      filter: null,
      listActive:0,
      ListTable:[
        {
          entete:"all_colis",
          text:"Tous les colis"
        },
        {
          entete:"stock",
          text:"Colis en stock"
        },
        
        {
          entete:"delivered",
          text:"Colis livrés"
        },

      ],
     

      fields: [
        {
          key: "expediteur",
          sortable: true,
          label: "Client",
        },
        {
          key: "code",
          sortable: true,
          label: "Code",
        },
        {
          key: "poids",
          sortable: true,
          label: "Poids (Kg)",
        },
        {
          key: "createdAt",
          sortable: true,
          label: "Date",
        },
        {
          key: "nature",
          sortable: true,
          label: "Nature",
        },
        {
          key: "recepteur",
          sortable: true,
          label: "Destinataire",
        },
        {
          key: "isPayed",
          sortable: true,
          label: "Etat du colis",
        },
        {
          key: "actions",
          sortable: true,
          label: "Actions",
        },
      ],

      
    };
  },

  computed:{
  ...mapGetters([
      'retDateFilterStatus',
      'retAllTransaction',
       'retOneClientTransact',
      'retCurrentUserRole'

    ])
},
  components:{
  },
  created() {
    // this.getAllProduct = this.$store.state.AllProductList;
    this.show = true;
    setTimeout(() => (this.show = false), 2000);
    
  },
  updated(){
    setTimeout(() => {
      this.checkTableFilter();
    }, 100);
  },
  methods: {

    reloadPage(){
      window.location.reload();
    },

    
    checkTableFilter(){
    // retDateFilterStatus RETOURNE TRUE LORSQUE LON FILTRE  LE TABLEAU PAR LES DATES 
      // console.log("voir le state " , this.retDateFilterStatus);
      if (this.retDateFilterStatus == true) {
        this.TableData = [];
        setTimeout(() => {
          this.getAllColis(this.TableDatas);
          this.$store.commit("MutFilterStatus", false);
        }, 100);
        ;
      }
    },

    getAllColis(e){
      // console.log("VOIR LE TOUT DES COLIS ", this.retAllTransaction);
      const datas = e;
      for (let i = 0; i < datas.length; i++) {
        datas[i].actions = "more-vertical.svg";
        
      }
      this.TableData = datas;

      // console.log("VOIR LE TOUT DES COLIS ", this.TableData);
      
    },



    onFiltered(filteredItems) {
      // this.rows = filteredItems.length;
      // this.currentPage = 1;
    },

    showLoader(e){
    
    // console.log("VOIR LE ", e);
    this.show = true;

     axios.get(`/transactions?page=${e}`)
                 .then(data => {
                    this.show = false;
                    this.getAllColis(data.data['hydra:member']);
                    
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
  ListClass(e){
    this.listActive = e;
  },
  updateTableData(e){
    // console.log("voir lequel est clické ",e);
    switch (e) {
      case "all_colis":
        this.filter = "";
        // this.rows = this.TableData.length;
        break;

      case "stock":
        this.filter = "";
        // this.rows = this.TableData.length;
        break;
      
      case "delivered":
        this.filter = "";
        // this.rows = this.TableData.length;
        break;
    
      default:
        break;
    }
  },

  deletePack(e){
    console.log("e", e);
  }


  },
  mounted() {
    this.getAllColis(this.retAllTransaction[`hydra:member`]);
     this.rows = this.retAllTransaction['hydra:totalItems'];

    // setTimeout(() => {
    //   console.log("VOIR LA PERIODE ", this.Periode);
    // }, 2000);
   
  },
  
};
</script>


<style lang="scss">


.liste-tables {
    margin-right: 6rem;
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

.gestion-table{
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
    }
    .search-input{
        width: 35vw;
        outline: none;
    }

    
    .zone-tables{
        background: #fff;
        margin-top: 2rem;
        padding: 2rem 0;
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
            padding: 0.5rem !important;
        }

    }
}

// .product-table {
//   img {
//     height: auto;
//     border-radius: 20px;
//     object-fit: cover !important;
//   }
//   td {
//     cursor: pointer;
//     border: 2px solid !important;
//   }
//   th {
//     padding: 20px 10px !important;
//     border: 2px solid !important;
//   }
// }
// .spinner-border {
//   width: 5rem !important;
//   font-size: 50px !important;
//   height: 5rem !important;
//   color: orange;
// }


 



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

  .seemore-drop{
    .dropdown-toggle img{
      width: 15px;
    }
  }
// }
</style>