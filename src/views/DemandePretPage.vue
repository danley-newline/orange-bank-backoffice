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
        <TablePret :TableDatas="retcreditList" :Periode="periode" />
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
                    v-model="credit.numeroClient"
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
                      <option v-for="(item,i) in retpackList" :key="i" :value="item">{{item.code}}</option>
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
import moment from "moment"

import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      showCreditModal: false,
      showSpiner:false,
      periode:'',
      credit:{
        pack:'',
        numeroClient: '',
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
      'retcreditList',
      'retpackList'
    ]),
    
  },
  methods:{


    createNewPack(){
      console.log("ok");
      this.initCredit()
      this.showCreditModal = true;
    },
    
    
    userDateToParse(e){
      console.log("LES DATES ", e);
    },

    initCredit(){

      this.credit.numeroClient = '';
      this.credit.montant = '';
      this.credit.pack = '';

    },

    creditFormSubmit(){

      this.showCreditModal = false;
      delete this.credit.pack.actions;

      const today = new Date();
      const limitDate = moment(today).add(this.credit.pack.durationInDays, 'days').format('YYYY-MM-DD');
      const toRepay = this.credit.montant + (this.credit.pack.interestRate * this.credit.montant) / 100 + this.credit.pack.creditFeesAmount;

      let subscribeCredit = {
        numeroClient: this.credit.numeroClient,
        montant: this.credit.montant,
        limitDate: limitDate,
        amountToRepay: toRepay,
        productId: this.credit.pack._id
      }


      axios
          .post("/credit", subscribeCredit)
          .then((res) => {
            console.log("Pret souscrit ", res);

            if (res.data.isGranted == true) {
             this.$fire({
                      text: `Cher client, votre crédit est accordé. \n 
                        Vous devez le rembourser au plus tard le ${ moment(res.data.limitDate).format('DD-MM-YYYY')} . \n
                        Le montant à rembourser est de ${Number(res.data.amountToRepay).toLocaleString()} FCFA.`,
                      type: "success",
                      confirmButtonText:'ok',
                    });
            }
            else
            {
              this.$fire({
                      text: `Cher client vous ne pouvez pas prendre ce crédit de ${Number(res.data.montant).toLocaleString()} FCFA , \n
                            parce que le montant maximal offert par le pack ${res.data.product.code} est de ${Number(res.data.product.maxAmount).toLocaleString()} FCFA`,
                      type: "warning",
                      confirmButtonText:'ok',
                    });
            }

              setTimeout(() => {
                      location.reload();
                    }, 15000);

          })
          .catch((error) => {
            this.$fire({
                      text: `${error}`,
                      type: "error",
                      confirmButtonText:'ok',
                      timer: 5000,
                    });
          }); 
           
    },


    

  },

  mounted(){
    this.$store.dispatch("getCreditList");
    this.$store.dispatch("getPacksList");
  }
}
</script>

<style>

</style>