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
                   <span class="date-text">Demander un crédit</span>
              </button>
          </div>
          
      </div>
      </div>
      <div class="table-colis mt-5">
        <TablePret :TableDatas="creditTablesDatas" :Periode="periode" />
      </div>


      <b-modal id="modal-1" v-model="showCreditModal">
      <template #modal-title>
        <div
          class="d-flex align-items-center titre-prin hover-cursor"
        >
          <!-- <img src="../assets/images/out-modal.svg" alt="" /> -->
          <p class="mx-3">Demande de crédit OBK</p>
        </div>
      </template>
      <div class="mx-3" >

        <form @submit.prevent="creditFormSubmit">

        
      <div class="px-5 pb-5 pt-3 form-label-style">

        <div class="row">
          <div class="col-md-6">
            <div class="form-div">
              <label for="">Numéro de tel <span class="text-danger">*</span></label>
                <div class="input-group">
                  <input
                    type="tel"
                    class="form-control"
                    v-model="credit.numero"
                    placeholder="tel: 0707070707"
                    required
                    maxlength="10"
                    minlength="10"
                  />
                </div>
            </div>
          </div>
          <div class="col-md-6">
               <div class="form-div">
                <label for="">Montant <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <input
                      type="number"
                      v-model.number="credit.montant"
                      class="form-control"
                      placeholder="Montant"
                      required
                    />
                  </div>
              </div>
          </div>

          <div class="col-md-12">
               <div class="form-div">
                <label for="">Pack <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <select class="form-select" aria-label="Default select example" required  v-model="credit.pack">
                      <option v-for="(item,i) in getCreditSelect" :key="i" :value="item">{{item.code}}</option>
                    </select>
                  </div>
              </div>
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
import TablePret from '../components/Gestion/TablePret.vue'
import DatePick from '../components/Date/ChooseTwoDatePick.vue'
import axios from "../services/index.js";
import _ from 'lodash';


import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      showCreditModal: false,
      getCreditSelect:[
        {
          code: "Manuel 1",
          minAmount: 5000,
          maxAmount: 150000,
          creditFeesAmount: 500,
          interestRate: 1.8,
          durationInDays: 30,
        },
        {
          code: "Manuel 2",
          minAmount: 12000,
          maxAmount: 225000,
          creditFeesAmount: 500,
          interestRate: 1.8,
          durationInDays: 28,
        },
      ],

      creditTablesDatas:[
        {
          numeroClient:'0708229053',
          montant: 225000,
          isGranted: false,
          created:"2023-04-21",
          limitDate:"2023-05-21",
          amountToRepay:250000,
          pack:{
            code: "Manuel 1",
            minAmount: 5000,
            maxAmount: 150000,
            creditFeesAmount: 500,
            interestRate: 1.8,
            durationInDays: 30,
          }
        },
        {
          numeroClient:'0708229053',
          montant: 105000,
          isGranted: true,
          created:"2023-04-18",
          limitDate:"2023-05-10",
          amountToRepay:189000,
          pack:{
            code: "Manuel 1",
            minAmount: 5000,
            maxAmount: 150000,
            creditFeesAmount: 500,
            interestRate: 1.8,
            durationInDays: 30,
          }
        },
      ],
      showSpiner:false,
      periode:'',


      credit:{
        pack:'',
        numero: '',
        montant: '',
      }
    }
  },
  components:{
    TablePret,
    DatePick
  },
  computed:{
   ...mapGetters([
      'retAllTransaction',
    ]),
    
  },
  methods:{


    createNewPack(){
      console.log("ok");
      this.redifinedCredit()
      this.showCreditModal = true;
    },
    
    
    userDateToParse(e){
      console.log("LES DATES ", e);
    },

    redifinedCredit(){

      this.credit.numero = '';
      this.credit.montant = '';
      this.credit.pack = '';

    },

    creditFormSubmit(){

      
      this.showCreditModal = false;
      delete this.credit.pack.actions;
      return console.log("LA CREATION DES DONNNEES ", this.credit);

      axios
          .post("/authentication_token", this.credit)
          .then((data) => {
            console.log("Create Pack", data);
          })
          .catch((error) => {
            console.log("MUY error", error);
          }); 
           
    },


    

  },

  mounted(){
    // this.$store.dispatch("getAlltransactions");
    // this.$store.commit("MutFilterStatus", false);
  }
}
</script>

<style>

</style>