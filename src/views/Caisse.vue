<template>
  <div>
     <b-overlay :show="showSpiner" rounded="sm" class="product-loader">
      <div class="block-head-caisse">
               

          <HeadCaisse 
            :ColisArrive="headOfCaisse.currentTotal" 
            :ColisLivre="isPayTrans"
             :ColisNonLivre="isNotPayTrans" 
             :GlobalMount="headOfCaisse.ca" 
             @dateIsClicked="SendfilterBY" />
      </div>
      <div class="block-table-client">
          <TableListCaisse  :getFilterTableData="caisseDatas" :Periode="periode" />
      </div>

     </b-overlay>
  </div>
</template>

<script>
import HeadCaisse from '../components/Caisse/HeadCaisse.vue'
import TableListCaisse from '../components/Caisse/TableListCaisse.vue'
import { mapGetters } from 'vuex'
import _ from 'lodash';
import axios from "../services/index.js"

export default {
    data(){
        return {
          showSpiner:false,
            caisseDatas:[],
            headOfCaisse:{
              currentTotal:0,
              ca:0,
            },
            periode:"",
            isPayTrans:0,
            isNotPayTrans:0,
            isPayTransTable:[],
            isNoPayTransTable:[],

        }
    },
components:{
    HeadCaisse,
    TableListCaisse
},

computed:{
  ...mapGetters([
      'retAllTransaction',
      'retdashDatas',
    ])
},

methods:{

    getHeadOfCaisse(e){
      this.headOfCaisse.ca = e.ca;
    },

    getTableTrans(e){
      this.headOfCaisse.currentTotal = e.length;

       const transact = e;
      // console.log("LENSEMBLED DES TRAN ", transact);
        this.isNoPayTransTable = [];
        this.isPayTransTable = [];
      for (let i = 0; i < transact.length; i++) {
        const payementStatus = transact[i];
        if (payementStatus.isPayed == false) {
          this.isNoPayTransTable.push(payementStatus)
        }
        else if (payementStatus.isPayed == true) {
          this.isPayTransTable.push(payementStatus)
        }
        
      }

      this.isPayTrans = this.isPayTransTable.length;
      this.isNotPayTrans = this.isNoPayTransTable.length;

      //  console.log("VALEUR PAYER ", this.isPayTrans);
      // console.log("VALEUR NO PAYER ", this.isNotPayTrans);
    },

    SendfilterBY(event){
      this.headCaisseStats(event);
      this.filterTableCaisse(event);
      this.filterTableVersement(event);
      
    },

   
     headCaisseStats(e){
      this.showSpiner = true;
      this.periode = e;
      axios.get(`/transactions/dashboards?sartDate=${e.dateStart}&endDate=${e.dateEnd}`)
           .then(data => {
            // console.log('LES GENS BACK MUT DASHBOARD  ', data.data)
            // this.headOfCaisse = "";
              this.getHeadOfCaisse(data.data);
            
              // commit('MutAllDashboardDatas', data.data)
           })
           .catch(error => {
               // console.log(error)
          })
    },

    filterTableCaisse(e){
      //FILTRE DES TRANSACTION EN FONCTION DES HEURES
      axios.get(`/transactions?createdAt[before]=${e.dateEnd}&createdAt[after]=${e.dateStart}`)
           .then(data => {
            
            this.getTableTrans(data.data[`hydra:member`]);
            this.caisseDatas = data.data[`hydra:member`];

            // console.log("lelleldledle tra", this.caisseDatas);
            this.$store.commit("MutFilterStatus", true);
            // this.getAllCaisse(data.data[`hydra:member`])
            
            setTimeout(() => {
              this.showSpiner = false;
            }, 100);

           })
           .catch(error => {
               // console.log(error)
          })

    },

    filterTableVersement(e){
      //FILTRE DES TRANSACTION EN FONCTION DES HEURES
      axios.get(`/versements?createdAt[before]=${e.dateEnd}&createdAt[after]=${e.dateStart}`)
           .then(data => {
            // console.log('LA LISTE DES VERSEMEBTS  FILTRE ', data.data[`hydra:member`])
            //VIDER LES VALEURS DU TABLEAU PASSÉ EN PROPS
           
           this.$store.commit("MutAllVersements",data.data)
           this.$store.commit("MutFilterStatus", true);

            
            
            setTimeout(() => {
              this.showSpiner = false;
            }, 100);

           })
           .catch(error => {
               // console.log(error)
          })

    },
  },
   mounted(){
    this.$store.dispatch("getAlltransactions");
    this.$store.dispatch("getDasboardDatas");
    this.$store.dispatch("getVersementsDatas");
    this.$store.commit("MutFilterStatus", false);
    
    // this.getAllCaisse();
    
    
    this.getHeadOfCaisse(this.retdashDatas);
    this.getTableTrans(this.retAllTransaction[`hydra:member`]);
    
  }
}
</script>

<style lang="scss">

</style>