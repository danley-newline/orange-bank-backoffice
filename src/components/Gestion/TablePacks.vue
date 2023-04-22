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
            

          <div class="zone-tables box-shadow-d3">
            
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


            


            <template #head(code)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(code)="data">
                    <span class=" fw-bold" >{{data.item.code}}</span>
              </template>


              <template #head(minAmount)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(minAmount)="data">
                    <span class="fw-bold" >{{ Number(data.item.minAmount).toLocaleString() }} Fcfa</span>
              </template>

               <template #head(maxAmount)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(maxAmount)="data">
                    <span class="fw-bold" >{{ Number(data.item.maxAmount).toLocaleString() }} Fcfa</span>
              </template>

             
              <template #cell(creditFeesAmount)="data">
                    <span class="fw-bold" >{{ Number(data.item.creditFeesAmount).toLocaleString() }} Fcfa</span>
              </template>
              <template #cell(interestRate)="data">
                    <span class="fw-bold green-color-78" >{{ data.item.interestRate }} </span>
              </template>


              <template #head(durationInDays)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(durationInDays)="data">
                    <span class="fw-bold orange-color-0f" >{{ data.item.durationInDays }} Jours</span>
              </template>



                
             <template #cell(actions)="data">
                 <div >
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
          key: "code",
          sortable: true,
          label: "Code du pack",
        },
        {
          key: "minAmount",
          sortable: true,
          label: "Montant minimal",
        },
        {
          key: "maxAmount",
          sortable: true,
          label: "Montant maximal",
        },
        {
          key: "creditFeesAmount",
          sortable: true,
          label: "Frais de dossier",
        },
        {
          key: "interestRate",
          sortable: true,
          label: "Taux d'intérêt",
        },
        {
          key: "durationInDays",
          sortable: true,
          label: "Délai de remboursement ",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],

      
    };
  },

  computed:{
  ...mapGetters([
     

    ])
},
  components:{
  },
  created() {
    this.show = true;
    setTimeout(() => (this.show = false), 2000);
    
  },
  methods: {

    showLoader(){

    },
    

    getAllPackds(e){
      const datas = e;
      for (let i = 0; i < datas.length; i++) {
        datas[i].actions = "more-vertical.svg";
        
      }
      this.TableData = datas;

      console.log("VOIR LE TOUT DES COLIS ", this.TableData);
      
    },



    onFiltered(filteredItems) {
      // this.rows = filteredItems.length;
      // this.currentPage = 1;
    },

  ListClass(e){
    this.listActive = e;
  },

  deletePack(e){
    // return console.log("e", e);

    axios.delete(`/product/${e._id}`)
                 .then(data => {
                    
                    console.log("DONNEES REUSSI ", data);
                    window.location.reload();
                    
                 })
                 .catch(error => {
                  
                    this.show = false;
                    console.log(error)
                })
  }


  },
  mounted() {
    setTimeout(() => {
    this.getAllPackds(this.TableDatas);
      
    }, 2000);

   
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

        table{
            border: transparent !important;
            


            thead {
                background: #000;color:#f16e01 !important;;
                top: 0;
                z-index: 2;
            }
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
  .page-item.active .page-link {
    background: #ff7901;
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