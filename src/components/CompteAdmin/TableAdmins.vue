<template>
  <div class="compte-table mt-5">
    <b-overlay :show="show" rounded="sm" class="product-loader">
            <div class="d-flex align-items-center ">
            <h3 class="fw-bold">Liste Des Admins</h3>
            <div class="search-block d-flex box-shadow-d3">
                <button class="search-btn">
                    <b-icon icon="search"></b-icon>
                </button>
                <input
                v-model="filter"
                type="search"
                class="search-input mx-2"
                placeholder="Rechercher un admin"
              />
            </div>
              

             
            </div>
        
          <div class="zone-tables box-shadow-d3">
            <div class="d-flex px-4">
              <div class="liste-tables pb-2 " :class="{'active' : filter == ''}" >
                <p @click="updateTableData('')">Tout</p>
              </div>
              <div class="liste-tables pb-2 " :class="{'active' : filter == item.libelle}" 
              
              v-for="(item,i) in retallRolesInfo" :key="i" @click="updateTableData(item.libelle)">
                <p>{{item.libelle}}</p>
              </div>
            </div>

            <b-table
              border
              label-sort-asc=""
              label-sort-desc=""
              label-sort-clear=""
              hover
              :items="TableData"
              :fields="fields"
              class="product-table"
              :filter="filter"
              :current-page="currentPage"
            >

              <!-- THEAD CLIENT  -->

            <template #head(nom)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>

            <!-- TBODY nom  -->
              <template #cell(nom)="data">
                    <span class="fw-bold" >{{data.item.nom}} {{data.item.prenoms}}</span>
              </template>


             <!-- THEAD total_poids  -->
            <template #head(tel)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <!-- TBODY tel  -->
              <template #cell(tel)="data">
                    <span class="green-color-78" >{{data.item.code}}  {{data.item.tel}}</span>
              </template>


               <!-- THEAD username  -->
            <template #head(username)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <!-- TBODY username  -->
              <template #cell(username)="data">
                  <div class="">
                    <span class="" >{{data.item.username}} </span>

                  </div>
              </template>

              
              <!-- TBODY username  -->
              <template #cell(email)="data">
                  <div class="">
                    <span class="" >{{data.item.email ? data.item.email : '...'}} </span>

                  </div>
              </template>


              <template #cell(createdAt)="data">
                  <div class="">
                    <span class="" >{{data.item.createdAt | moment(`DD/MM/YYYY`)}}</span>

                  </div>
              </template>


              <template #cell(sexe)="data">
                  <div class="">
                    <span class="" v-if="data.item.sexe" >{{data.item.sexe}}</span>
                    <span class="" v-else >...</span>

                  </div>
              </template>

              
             <!-- THEAD LIVRÉS  -->
             <template #head(roles)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(roles)="data">
                  <div class="mx-1">
                    <span class="" >{{data.item.roles[0]}} </span>

                  </div>
              </template>

              <!-- THEAD PAYÉ -->
             <template #head(isActive)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(isActive)="data">
                    <span class="green-color-60  fw-bold" v-if="data.item.isActive == true" >Oui</span>
                    <span class="red-color-de  fw-bold" v-if="data.item.isActive == false" >Non</span>
              </template>
              

             

              <!-- THEAD observation  -->
             <template #head(actions)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>


              <template #cell(actions)="data">
                    <!-- <span class="red-color-de  fw-bold mx-2" >{{data.item}}</span> -->
                    <div class="mx-2">
                   <img
                   class="d-none"
                  :src="require(`../../assets/icons/${data.item.actions}`)"
                  alt=""
                />
                <span v-if="retCurrentUserRole.roleAdmin == 'ROLE_ADMIN'">

                   <span class="hover-cursor"  @click="editClient(data.item)">
                     <img
                  src="../../assets/icons/edit_compta.svg"
                  alt=""
                  class="img-1-2vw"
                />
                   </span>

                <span class="delete-action hover-cursor mx-3" @click="deleteFacture(data.item)">
                     <img
                  src="../../assets/icons/delete.svg"
                  alt=""
                  class="img-1vw"
                />
                   </span>

                </span>


                <span v-else class="h6 mx-3">
                  X
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
  
   computed: {
    ...mapGetters([
      'retallAdminUserInfo',
      'retallRolesInfo',
      // 'retcurrentUserlogedInfo',
      'retCurrentUserRole'
    ]),
  },
  data() {
    return {
      show: false,
      isAnAdminUser: false,
      currentPage: 1,
      TableData:[],
      rows: 1,
      filter: '',
      listActive:0,
      
     

       fields: [
        {
          key: "nom",
          sortable: true,
          label: "Nom du client",
        },
        
        {
          key: "username",
          sortable: true,
          label: "Username",
        },
        {
          key: "tel",
          sortable: true,
          label: "Téléphone",
        },
        {
          key: "email",
          sortable: true,
          label: "Email",
        },
        {
          key: "createdAt",
          sortable: true,
          label: "Inscrit le",
        },
        {
          key: "sexe",
          sortable: true,
          label: "Sexe",
        },
        {
          key: "roles",
          sortable: true,
          label: "Roles",
        },
        {
          key: "isActive",
          sortable: true,
          label: "Active",
        },
       
        {
          key: "actions",
          sortable: true,
          label: "Actions",
        },
      ],

      
    };
  },
  components:{
  },

  created() {
    // this.getAllProduct = this.$store.state.AllProductList;
    this.show = true;
    setTimeout(() => (this.show = false), 2000);
    
  },
  //  updated(){
  //   this.rows = this.tableLength;
  // },
  methods: {

    
   
    showLoader(e){
      this.show = true;

      // console.log("VOIR UN TRUC BAMAL ", e);
      // console.log('JE VUEUX VOIR LURL  /clients?page=${e}', e);


      axios.get(`/users?page=${e}`)
                 .then(data => {
                    this.show = false;
                    // this.currentPage = e;
                    // this.TableData = [];
                    this.getAllClientTable(data.data['hydra:member']);
                    // console.log("VOIR LE DATAS ACTU ", data.data['hydra:member']);
                    // console.log("VOIR LE MEC A JOUR ", this.TableData);
                 })
                 .catch(error => {
                  this.$fire({
                      text: `Nous rencontrons un problème veuillez réessayer ...`,
                      type: "error",confirmButtonText:'ok',
                      timer: 5000,
                    }); 
                     this.showSpiner = false;
                    // console.log("LES ZANIMAUX ZANI ",error)
                })
      


    
  },

  updateTableData(e){
    // console.log("voir lequel est clické ",e);
    this.filter = e;
    
  },
  editClient(e){
    // console.log('Client a editer', e);
    this.show = true;
     this.$store.commit("MutToAdminEdition", e);
      setTimeout(() => {
    this.$router.push({name: 'EditAdmin'});
        
      }, 1000);
    
  },

  getAllClientTable(e){

      // console.log("VOIR LES INFOS DU CLIENTS AVEC LE TOTAL DES ITEMS", this.retallAdminUserInfo)

      const datas = e;
      // console.log("VOIR LES INFOS DU CLIENTS", datas)

      for (let i = 0; i < datas.length; i++) {
        datas[i].actions = "more-vertical.svg";
        
      }
      this.TableData = datas;

      
      // console.log("LE NOMBRE DE DATAS ", this.totalClientItems);
      // console.log("LE TAKEAKAAKAK DES COMPTES CLIENTS ", this.clientCountTableDatas);
    },

    deleteFacture(e){
      
      // console.log("ELEENENT ", e);
      this.$confirm("Voulez vous suprimer cet utilisateur ?").then(() => {
          this.show = true;
          axios.delete(`${e['@id']}`)
                 .then(data => {
                    
                    this.$fire({
                      text: `Cet utilisateur a bien été suprimé `,
                      type: "success",confirmButtonText:'ok',
                      timer: 5000,
                    });
                    
                    
          this.$store.dispatch("getAllAdminUsersData");

                    setTimeout(()=>{
                        window.location.reload();
                        this.show = false;
                       },1000);


                    
                    
                 })
                 .catch(error => {
                  this.$fire({
                      text: `Erreur rencontré veuillez réessayer ...`,
                      type: "error",confirmButtonText:'ok',
                      timer: 5000,
                    });
                    this.show = false;
                    console.log(error)
                })
      });

    }

    
  
  },
  mounted() {
    setTimeout(() => {
      this.getAllClientTable(this.retallAdminUserInfo["hydra:member"]);
    this.rows = this.retallAdminUserInfo['hydra:totalItems'];
    
    // console.log("USER CONNECTÉ  OK O K O K K K ",this.retCurrentUserRole)
    }, 200);
    
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

.compte-table{
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
        width: 25vw;
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
            padding: 0.5rem  !important;
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