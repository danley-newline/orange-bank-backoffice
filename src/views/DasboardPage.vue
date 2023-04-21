<template>
  <div>
                <b-overlay :show="showSpiner" rounded="sm" class="product-loader">


    <div class="block-colis">
      <Colis :GlobalColis="dashInfo.totalGlobalColis" :ColisArrive="dashInfo.totalColisArrive" :ColisLivre="dashInfo.totalColisLivre" :ColisReception="dashInfo.totalColisReception" :ColisTransit="dashInfo.totalColisTransit"/>
    </div>

     
                </b-overlay>
  </div>
</template>

<script>
import TotalClient from '../components/Dashboard/TotalClient.vue'
import Colis from '../components/Dashboard/Colis.vue'
import DatePick from '../components/Date/ChooseTwoDatePick.vue'
import axios from "../services/index.js"
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      showSpiner:false,
      dashInfo:'',
      totalClientByType:'',
      clientByMonth:[],
      colisByMonth:[],
      lastInvoice:[],
      lastTransact:[],
      byFiltre:{
    start: "",
    end: "",
    status: "",
    is_super: true
      }
    }
    
  },
  computed: {
    ...mapGetters([
      'retdashDatas',
      'retCurrentUserRole'
    ])
  },

  methods:{
    headClientStat(e){
      this.dashInfo = e;

      // console.log("JE VEUX VOR LE DASHINFO ", e)

      if (this.dashInfo.length == 0) {
        this.showSpiner = true;
        setTimeout(() => {
            window.location.reload();
        }, 3000);
      }
      else 
      {
      
      this.showSpiner = false;

      this.totalClientByType = this.dashInfo.totalClientByType["hydra:member"];
      this.lastInvoice = this.dashInfo.last10Invoices['hydra:member'];
      this.lastTransact = this.dashInfo.last10Transaction['hydra:member'];

      }


    },
     goToColisPage(){
       this.$router.push({ name: 'createColis' })

    },
    userDateToParse(){
      this.showSpiner = true;
      const periode = this.$store.state.filterByTwoDate;
      

      axios.get(`/transactions/dashboards?sartDate=${periode.dateStart}&endDate=${periode.dateEnd}`)
           .then(data => {
            console.log('LES GENS BACK MUT DASHBOARD  ', data.data)
            this.dashInfo = "";
            this.headClientStat(data.data);
            this.showSpiner = false;
              // commit('MutAllDashboardDatas', data.data)
               this.$store.commit("MutFilterStatus", true);
           })
           .catch(error => {
               // console.log(error)
          })


    },
  },
  components:{
    TotalClient,
    Colis,
    DatePick
  },

  mounted(){
    
    this.headClientStat(this.retdashDatas);
    
  }
}
</script>

<style lang="scss">

.first-head {
  p{
    padding-top: 10px;
  }
}

.bg-yellow{
  background: #fee933;
}




</style>