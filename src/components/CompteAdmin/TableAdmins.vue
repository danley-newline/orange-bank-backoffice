<template>
  <div class="gestion-table">
    <b-overlay :show="show" rounded="sm" class="product-loader">            
            <div class="d-flex align-items-center ">
            <h3 class="fw-bold">Liste Des Admins  </h3>

            <div class="search-block d-flex box-shadow-d3">
                <button class="search-btn">
                    <b-icon icon="search"></b-icon>
                </button>
                <input
                v-model="filterTab"
                 @input="sendForFilterTheTableData(filterTab)"
                type="search"
                class="search-input mx-2"
                placeholder="Rechercher un admin"

              />
            </div>

               <div class="">
                    <p class="reload-historic box-shadow-d3 mx-3 hover-cursor" >
                    
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


            


              <template #cell(numeroClient)="data">
                    <span class=" fw-bold" >{{data.item.numeroClient}}</span>
              </template>



            <template #head(username)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(username)="data">
                    <span class=" fw-bold" >{{data.item.username}}</span>
              </template>


              <template #cell(email)="data">
                    <span class=" fw-bold" >{{data.item.email}}</span>
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
                :per-page="perPage"
                aria-controls="my-table"
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

      perPage: 1,
      currentPage: 1,
      rows: 3,


      colisIsSubmit:false,
      filterTab:'',
      allInfo:{},
      TableData:[],
      periodeDate:{},
      filter: null,
      listActive:0,
      

      fields: [
       
        {
          key: "username",
          sortable: true,
          label: "Nom d'utilisateur",
        },
        {
          key: "email",
          sortable: true,
          label: "Adresse mail",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],

      
    };
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
    },



    onFiltered(filteredItems) {
      // this.rows = filteredItems.length;
      // this.currentPage = 1;
    },
    


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