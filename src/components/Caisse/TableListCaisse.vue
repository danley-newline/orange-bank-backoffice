<template>
  <div class="caisse-table mt-5">
    <!-- CE BLOCK DE CODE PERMET DACUTALISER LA  PAGE LORSUE LETAT DE LA VALEUR CHANGE  ET APPELER LA FONCTION SE TROUVANT LE DANS CYCLE DE VIE  DANS LUPDATE  -->
<p class="invisible"> {{retDateFilterStatus}} IS OK </p>
<p class="invisible"> {{retIsToPrint}} IS OK </p>
<!-- FIN BLOCK  -->
    <b-overlay :show="show" rounded="sm" class="product-loader">
          <div class="d-flex justify-content-between align-items-center ">
              <div class="d-flex align-items-center ">
                <h3 v-if="isTransactTable == true" class="fw-bold">Liste  des Transactions</h3>
                <h3 v-else class="fw-bold">Liste des  versements</h3>

                <div class="search-block d-flex box-shadow-d3" v-if="isTransactTable == true">
                    <button class="search-btn">
                        <b-icon icon="search"></b-icon>
                    </button>
                    <input
                    v-model="filterTab"
                     @input="sendForFilterTheTableData(filterTab)"
                    type="search"
                    class="search-input mx-2"
                    placeholder="Rechercher, expéditeur, Payé,facture"
                  />
                </div>

                <div class="">
                  <p class="reload-historic box-shadow-d3 mx-3 hover-cursor" @click="reloadPage()">
                    <img src="../../assets/icons/history.svg" class="img-1-1vw" alt="" />
                  </p>
                </div>

              </div>

          </div>
            
        <div v-if="isTransactTable == true">

        
          <div class="zone-tables box-shadow-d3" >
            
            <div class="d-flex px-4 mb-2 bd-btm-blue-light">

              <div class="liste-tables pb-2 " :class="{'active' : listActive == 0}" >
                <p @click="updateTableData(0)">Tout</p>
              </div>
              
              <div class="liste-tables pb-2 " :class="{'active' : listActive == item.id}" 
              
              v-for="(item,i) in ListTable" :key="i" @click="updateTableData(item.id)">
                <p>{{item.label}}</p>
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
                    <span class="fw-bold" >{{data.item.expediteur.nom}} {{data.item.expediteur.prenoms}}</span>
              </template>


             <!-- THEAD paymentFrom  -->
            <template #head(paymentFrom)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <!-- TBODY paymentFrom  -->
              <template #cell(paymentFrom)="data">
                    <span class="green-color-78" >{{data.item.paymentFrom.libelle}}</span>
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
                    <span class="" >{{data.item.recepteur.nom}} {{data.item.recepteur.prenoms}} </span>

                  </div>
              </template>


              <template #cell(paymentType)="data">
                  <div class="">
                    <span class="" >{{data.item.paymentType.labelle}}</span>

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
                    <span class="" >{{data.item.code}}</span>
                    <!-- <span class="" >{{0}}</span> -->

                  </div>
              </template>

              <!-- THEAD PAYÉ -->
             <template #head(isPayed)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>
              <template #cell(isPayed)="data">
                    <span class="orange-color-df  fw-bold mx-2" v-if="data.item.isPayed == false" >Non</span>
                    <span class="green-color-60  fw-bold mx-2" v-if="data.item.isPayed == true" >Oui</span>
              </template>
              

              <!-- THEAD NON PAYÉ -->
             <template #head(typeFacturation)="data">
                <div class="pd-table-thead">
                    <span >{{data.label}}</span>
                    <span class="mx-2"> <img src="../../assets/icons/sort.svg" alt=""> </span>
                </div>
              </template>

              <!-- TBODY ETAT DU COLIS  -->
              <template #cell(typeFacturation)="data">
                    <span class="fw-bold mx-2" >{{data.item.typeFacturation.libelle}}</span>
              </template>
              

              <!-- THEAD actions  -->
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

                <span v-if="retCurrentUserRole.roleAdmin == 'ROLE_ADMIN' ||  retCurrentUserRole.roleCaisse == 'ROLE_CAISSE' ">

                   <span class="hover-cursor" v-if="data.item.isPayed == false" @click="goToPayClientTransact(data.item)">
                     <img
                  src="../../assets/icons/add-to-list.svg"
                  alt=""
                  class="img-1vw"
                />
                   </span>

                  
                   <span class="hover-cursor" v-else >
                     <img
                  src="../../assets/icons/check-success.svg"
                  alt=""
                  class="img-1vw"
                />
                   </span>

                    

                   <span v-if="data.item.versements[0]"  class="hover-cursor mx-2"  @click="clickPrintFact(data.item)" >
                   <img src="../../assets/icons/print.svg" class="img-1vw" alt="">
                  </span> 

                </span>

                <span v-else class="h6 mx-3">
                  X
                </span>

                     
                 </div>
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
      </div>
          
          <div class="" v-else>
              <TableListVersement />
            </div>

            


    </b-overlay>

    <b-modal id="modal-1" v-model="caisseModalShow">
        <template #modal-title>
          <p class="blue-color-0f">Encaissement</p>
        </template>

        <CaissePaymentModal :paiement="paymentDatas" :clientPay="clientForPay" />
      </b-modal>


  <RecuCaisseGlobal v-show="paymentIsSubmit == true"  :allTransactDatas="retonlyOneTransaction" :client="retOneClientTransact" :totalVersement="allVersement" id="printFactCaisseTable" />
  </div>
</template>

<script>
import RecuCaisseGlobal from './RecuCaisseGlobal.vue'
import CaissePaymentModal from "./CaissePaymentModal.vue"
import TableListVersement from "./TableListVersement.vue"
import _ from 'lodash';
import { mapGetters } from 'vuex'
import axios from "../../services/index.js"


export default {
   props:["getFilterTableData", 'Periode'],
   
  data() {
    return {
      caisseModalShow:false,
      filterTab:"",
      paymentDatas:{},
      clientForPay:{},
      isTransactTable:true,
       paymentIsSubmit:false,
      TableData:[],
      allVersement:0,

      impayedTable:[],
            payedTable:[],
            tableWithInvoice:[],
            tableNoInvoice:[],
            caisseTableDatas:[],


      show: false,
      currentPage: 1,
      rows: 1,
      filter: "",
      listActive:0,
      periodeDate:{},

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
          label: "Code",
        },
        {
          key: "expediteur",
          sortable: true,
          label: "Expediteur",
        },
        {
          key: "paymentFrom",
          sortable: true,
          label: "Debiteur",
        },
        {
          key: "recepteur",
          sortable: true,
          label: "Destinataire",
        },
        {
          key: "paymentType",
          sortable: true,
          label: "Règlement",
        },
        {
          key: "createdAt",
          sortable: true,
          label: "Créé-le",
        },
        
        {
          key: "isPayed",
          sortable: true,
          label: "Payés",
        },
        {
          key: "typeFacturation",
          sortable: true,
          label: "Facturation",
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
      'retAllTransaction',
      'retDateFilterStatus',
      'retonlyOneTransaction',
      'retIsToPrint',
      'retOneClientTransact',
      'retCurrentUserRole'
    ]),
    
},
  components:{
    CaissePaymentModal,
    TableListVersement,
    RecuCaisseGlobal
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

    setTimeout(() => {
      if (this.retIsToPrint == true) {
      this.printThisFact();
      this.$store.commit('MutIsClickToPrint', false)
      }
    }, 1000);
  },
  methods: {
       reloadPage(){
      window.location.reload();
    },
     sendForFilterTheTableData(e){

      if (this.Periode == "") {
      this.periodeDate.dateStart = new Date().toISOString().substr(0, 10);
      this.periodeDate.dateEnd = new Date().toISOString().substr(0, 10);
      }
      if (this.Periode != "") {
         this.periodeDate = this.Periode;
      }


      // console.log("VOIR LA DATE ACTU ", this.periodeDate);
    
        this.show = true;
        this.rows = 1;

        axios.get(`/transactions/search?start=${this.periodeDate.dateStart}&end=${this.periodeDate.dateEnd}&search=${e}`)
                 .then(data => {
                    
                   
                  //  console.log("LE RETOUR ",data.data['hydra:member']);
                   this.putFirstAllCaisse(data.data['hydra:member']);
                   setTimeout(() => {
                       this.show = false;
                   }, 1500);
                  
                    
                 })
                 .catch(error => {
                  this.$fire({
                      text: `Veuillez revoir votre connexion.`,
                      type: "warning",
                      timer: 5000,
                    }); 
                    console.log(error)
                     this.show = false;
                })


      },

    checkTableFilter(){
      if (this.retDateFilterStatus == true) {
        this.TableData = [];

        setTimeout(() => {
          this.putFirstAllCaisse(this.getFilterTableData);
          this.$store.commit("MutFilterStatus", false);
        }, 100);

      }

    },

    printThisFact(){
     
      this.allVersement = 0;
      for (let i = 0; i < this.retonlyOneTransaction.versements.length; i++) {
         this.allVersement += this.retonlyOneTransaction.versements[i].montant;
      }


      setTimeout(() => {
         this.show = false;

         var divElementContents = document.getElementById("printFactCaisseTable").innerHTML;
      var windows = window.open("", "", "height=400, width=400");
      windows.document.write("<html>");
      windows.document.write(divElementContents);
      windows.document.write("</body></html>");
      windows.document.close();
      windows.print();  
      }, 1000);
        
    },


    clickPrintFact(e){
      // console.log("IL A ", e);
      this.show = true;
      this.$store.dispatch("getOnetransactionInfos", e.id);
      this.whichClientForPay(e);

      setTimeout(() => {
        this.$store.dispatch("getCurrentClientDatas", this.clientForPay.id)
      }, 100);

      setTimeout(() => {
        this.$store.commit('MutIsClickToPrint', true)
      }, 1000);
      
      
      
    },

    whichClientForPay(e){
      this.paymentDatas = e;
      

      switch (this.paymentDatas.paymentFrom.libelle) {
        case 'DESTINATAIRE':
          this.clientForPay = this.paymentDatas.recepteur;
          // console.log("JE SUIS LE DESTINATAIRE ", this.clientForPay);

          break;

        case "EXPEDITEUR":
          this.clientForPay = this.paymentDatas.expediteur;
          // console.log("JE SUIS LEXPEDITEUR ", this.clientForPay);
          break;
      
        default:
          break;
      }
    },
    goToPayClientTransact(e) {
      this.whichClientForPay(e);
      setTimeout(() => {
        this.caisseModalShow = true
      }, 100);


      
      
    },
    onFiltered(filteredItems) {
      // this.rows = filteredItems.length;
      // this.currentPage = 1;
    },
    showLoader(e){
      // console.log("VOIR LE CLICK CAISSE ", e);
       this.show = true;
       

     axios.get(`/transactions?page=${e}`)
                 .then(data => {
                    this.show = false;
                    this.putFirstAllCaisse(data.data['hydra:member']);
                    
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
  changeTransactTable(e){
    this.show = true;
    setTimeout(() => {
      this.isTransactTable = e;
      this.show = false;
      
    }, 1000);
    // window.location.reload();
  },
  updateTableData(e){
    // alert("ok monte")
      // console.log("voir lequel est clické ",e);
      // console.log("JE VUEX VOIR ", this.allDatas);
      this.listActive = e;      
      switch (e) {
        case 0:
          this.TableData = this.caisseTableDatas;
          break;
        case 1:
          this.TableData = this.impayedTable;
          break;
        case 2:
          this.TableData = this.payedTable;
          break;
        case 3:
          this.TableData = this.tableWithInvoice;
          break;
        case 4:
          this.TableData = this.tableNoInvoice;
          break;
      
        default:
          break;
      }
    },


    putFirstAllCaisse(e){


      this.impayedTable = [];
      this.payedTable = [];
      this.tableWithInvoice = [];
      this.tableNoInvoice = [];


      const datas = e;
      for (let i = 0; i < datas.length; i++) {
        datas[i].actions = "more-vertical.svg";
        
      }
      this.caisseTableDatas = datas;
      this.TableData = _.cloneDeep(this.caisseTableDatas);


      //RETOUR TABLEAU DE LA LISTE TRANSACTION IMPAYÉ
      const cloneImpayed = _.cloneDeep(this.TableData);
      for (let i = 0; i < cloneImpayed.length; i++) {
        if (cloneImpayed[i].isPayed == false ) {
          this.impayedTable.push(cloneImpayed[i])
        }
      }

      //RETOUR TABLEAU DE LA LISTE TRANSACTION PAYÉ
      const clonePayed = _.cloneDeep(this.TableData);
      for (let i = 0; i < clonePayed.length; i++) {
        if (clonePayed[i].isPayed == true ) {
          this.payedTable.push(clonePayed[i])
        }
      }

      //RETOUR TABLEAU DE LA LISTE TRANSACTION SANS FACTURE
      const cloneNoInvoice = _.cloneDeep(this.TableData);
      for (let i = 0; i < cloneNoInvoice.length; i++) {
        if (cloneNoInvoice[i].invoices.length == 0 ) {
          this.tableNoInvoice.push(cloneNoInvoice[i])
        }
      }

      //RETOUR TABLEAU DE LA LISTE TRANSACTION AVEC FACTURE
      const cloneWithInvoice = _.cloneDeep(this.TableData);
      for (let i = 0; i < cloneWithInvoice.length; i++) {
        if (cloneWithInvoice[i].invoices.length > 0 ) {
          this.tableWithInvoice.push(cloneWithInvoice[i])
        }
      }

    },

    
  
  },
  mounted() {
    this.putFirstAllCaisse(this.retAllTransaction[`hydra:member`]);
    this.rows = this.retAllTransaction['hydra:totalItems'];
    this.Periode = '';
    // console.log("VOIR LES NOMBRE ", this.retAllTransaction[`hydra:member`].length);
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

.caisse-table{
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