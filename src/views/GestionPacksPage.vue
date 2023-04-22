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
              <button class="custom-btn box-shadow-d3 bg-blue-fort" @click="createNewPack">
                   <img src="../assets/icons/colis-white.svg" class="img-1-2vw" alt="">
                   <span class="date-text">Créer un pack</span>
              </button>
          </div>
          
      </div>
      </div>
      <div class="table-colis mt-5">
        <TablePacks :TableDatas="retpackList" :Periode="periode" @seeMore="editNewPack" />
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
      <div class="mx-3" >

        <form @submit.prevent="packsFormSubmit">

        
      <div class="px-5 pb-5 pt-3 form-label-style">
          
        <div class="form-div">
          <label for="">Code <span class="text-danger">*</span></label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model="packs.code"
                placeholder="Code"
                required
              />
            </div>
        </div>

        <div class="form-div">
          <label for="">Montant minimal <span class="text-danger">*</span></label>
            <div class="input-group">
              <input
                type="number"
                v-model.number="packs.minAmount"
                class="form-control"
                placeholder="Montant minimal"
                required
              />
            </div>
        </div>

        <div class="form-div">
          <label for="">Montant maximal <span class="text-danger">*</span></label>
            <div class="input-group">
              <input
                type="number"
                v-model.number="packs.maxAmount"
                class="form-control"
                placeholder="Montant maximal"
                required
              />
            </div>
        </div>

        <div class="form-div">
          <label for="">Frais dossier <span class="text-danger">*</span></label>
            <div class="input-group">
              <input
                type="number"
                v-model.number="packs.creditFeesAmount"
                class="form-control"
                placeholder="Frais dossier"
                required
              />
            </div>
        </div>

        <div class="form-div">
          <label for="">Taux d'intérêt <span class="text-danger">*</span></label>
            <div class="input-group">
              <input
                type="text"
                v-model.number="packs.interestRate"
                class="form-control"
                placeholder="Taux d'intérêt"
                required
              />
            </div>
        </div>

        <div class="form-div">
          <label for="">Délai de remboursement <span class="text-danger">*</span></label>
            <div class="input-group">
              <input
                type="number"
                v-model.number="packs.durationInDays"
                class="form-control"
                required
              />
            </div>
        </div>



      </div>

      <div class="d-flex justify-content-end pb-3 px-5 " >
        <button type="submit" class="pd-btn submit-btn text-white px-5">Enregistrer</button>
      </div>


    </form>

          
      </div>
      
    </b-modal>


     </b-overlay>
  </div>
</template>

<script>
import TablePacks from '../components/Gestion/TablePacks.vue'
import DatePick from '../components/Date/ChooseTwoDatePick.vue'
import axios from "../services/index.js";
import _ from 'lodash';
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      showPackModal: false,
      
      formAction: "for-creation",
      showSpiner:false,
      periode:'',


      packs:{
        code: "",
        minAmount: 0,
        maxAmount: 0,
        creditFeesAmount: 0,
        interestRate: 0,
        durationInDays: 0
      }
    }
  },
  components:{
    TablePacks,
    DatePick
  },
  computed:{
   ...mapGetters([
      'retpackList',
    ]),
    
  },
  methods:{


    createNewPack(){
      console.log("ok");
      this.redifinedPacks()
      this.showPackModal = true;
      this.formAction = "for-creation";
    },
    
    editNewPack(e){
      this.showPackModal = true;
      let getPackClicked = _.cloneDeep(e);
      this.packs = getPackClicked;
      this.formAction = "for-edition";

      console.log("A VOIR colis ", this.packs);
    },

    userDateToParse(e){
      console.log("LES DATES ", e);
    },

    redifinedPacks(){

      this.packs.code = '';
      this.packs.minAmount = 0;
      this.packs.maxAmount = 0;
      this.packs.creditFeesAmount = 0;
      this.packs.interestRate = 0;
      this.packs.durationInDays = 0;

    },

    packsFormSubmit(){
      this.formAction == "for-creation" ? this.postPack() : this.updatePack();
    },

    postPack(){
      // return console.log("LA CREATION DES DONNNEES ", this.packs);

      axios
          .post("/product", this.packs)
          .then((data) => {
            
            this.showPackModal = false;
            console.log("Pack Create Pack", data);
            this.$store.dispatch("getPacksList");
          })
          .catch((error) => {
            console.log("MUY error", error);
          }); 
    },

    updatePack(){
      // return console.log("L'EDITION DES DONNNEES ", this.packs);

      axios
          .put(`/product/${this.packs._id}`, this.packs)
          .then((data) => {
            console.log("Create Pack", data);
            this.showPackModal = false;

          })
          .catch((error) => {
            console.log("MUY error", error);
          }); 
    }


    

  },

  mounted(){
    this.$store.dispatch("getPacksList");
    // this.$store.commit("MutFilterStatus", false);
  }
}
</script>

<style>

</style>