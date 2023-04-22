<template>
  <div>
    <b-overlay :show="showSpiner" rounded="sm" class="product-loader">
    <div class="block-colis">
      <Colis :GlobalColis="10" :ColisArrive="10" :ColisLivre="10" :ColisReception="10" :ColisTransit="10"/>
    </div>
 </b-overlay>
  </div>
</template>

<script>
import Colis from '../components/Dashboard/Colis.vue'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      showSpiner:false,
      
    }
    
  },
  computed: {
    ...mapGetters([
    ])
  },

  methods:{
  },
  components:{
    Colis,
  },

  mounted(){
    
    
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