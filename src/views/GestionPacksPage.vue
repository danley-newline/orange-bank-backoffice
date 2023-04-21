<template>
  <div>
     <b-overlay :show="showSpiner" rounded="sm" class="product-loader">
      <div class="head-block">
        <div class="d-flex justify-content-between">
          <div class="left-block d-flex align-items-center">
              <p class="fw-bold fs-5"> Date</p>

              <DatePick @twoDaysEmited="userDateToParse"  />
          </div>

          <div class="right-block">
              <button class="custom-btn box-shadow-d3 bg-blue-fort" @click="addColisPage">
                   <img src="../assets/icons/colis-white.svg" class="img-1-2vw" alt="">
                   <span class="date-text">Créer un pack</span>
              </button>
          </div>
          
      </div>
      </div>
      <div class="table-colis mt-5">
        <TablePacks :TableDatas="packTableDatas" :Periode="periode" @seeMore="seeMoreInfo" />
      </div>


      <b-modal id="modal-1" v-model="showPackModal">
      <template #modal-title>
        <div
          class="d-flex align-items-center titre-prin hover-cursor"
        >
          <!-- <img src="../assets/images/out-modal.svg" alt="" /> -->
          <p class="mx-3">Packs OBK</p>
        </div>
      </template>
      <div class="mx-3" v-if="detailsDatas">

          <!-- EDITION CREATION FORME -->
      </div>
      
    </b-modal>


     </b-overlay>
  </div>
</template>

<script>
import TablePacks from '../components/Gestion/TablePacks.vue'
import DatePick from '../components/Date/ChooseTwoDatePick.vue'
import axios from "../services/index.js"

import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      showPackModal: false,
      packTableDatas:[],
      detailsDatas:'',
      globalTransDatas:'',
      showSpiner:false,
      periode:''
    }
  },
  components:{
    TablePacks,
    DatePick
  },
  computed:{
   ...mapGetters([
      'retAllTransaction',
    ]),
    
  },
  methods:{


    addColisPage(){
      console.log("ok");

      this.showPackModal = true;
    },
    
    seeMoreInfo(e){
      this.showPackModal = true;
      this.globalTransDatas = e;
      this.detailsDatas = e.colis;
      // console.log("A VOIR colis ", this.detailsDatas);
    },

    userDateToParse(e){
      console.log("LES DATES ", e);
    }

  },

  mounted(){
    this.$store.dispatch("getAlltransactions");
    this.$store.commit("MutFilterStatus", false);
  }
}
</script>

<style>

</style>