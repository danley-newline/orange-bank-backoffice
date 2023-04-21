<template>
  <div>
    <ClientHead :clientByType="totalClientByType" :clientNumber="countStats.totalGlobalClient" />
    <div class="">
      <TableCompte />
    </div>
  </div>
</template>

<script>
import ClientHead from "../components/CompteClient/ClientHead.vue";
import TableCompte from "../components/CompteClient/TableCompteClient.vue";
import { mapGetters } from 'vuex'

export default {
   data(){
    return {
      totalClientByType:'',
      clientCountTableDatas:[],
      countStats:"",
    }
  },
  components:{
    ClientHead,
    TableCompte
  },
  computed: {
    ...mapGetters([
      'retAllTransaction', 
      'retdashDatas',
    ])
  },
  methods:{
    
    headCountClientStat(e){
      this.countStats = e;
      this.totalClientByType = this.countStats.totalClientByType["hydra:member"];

      // console.log("voir les head ", this.countStats)
      
    },
  },


  mounted(){
    this.$store.dispatch("getAlltransactions");
    this.$store.dispatch("getDasboardDatas");
    this.$store.dispatch("getAllClientData");
    // this.$store.dispatch("getAllClientData");


    setTimeout(() => {
    this.headCountClientStat(this.retdashDatas);
    }, 100);

    // console.log("VOIR LES COLIS ", this.$store.state.allTransactionInfo);
  }
}
</script>

<style lang="scss">

</style>