<template>
  <div class="pay-modal">
        <form @submit.prevent="sendEncaisse">

      <b-overlay :show="showLoader" rounded="sm" class="product-loader">
      <div class="row">
          <div class="col-md-5">
              <div class="">
                <p class="">Encaissement global des transactions : {{paiement.code}} </p>
                  <div class="d-flex justify-content-between my-3">
                      <p class="pay-title">Client</p>
                      <div class="icon-block d-flex">
                        <img src="../../assets/icons/add-to-list.svg" alt="">
                        <p>{{clientPay.prenoms}} {{clientPay.nom}}</p>
                      </div>
                  </div>

                  <!-- <div class="d-flex justify-content-between my-3">
                      <p class="pay-title">Mode paiement</p>
                      <div class="mode paymode">
                          <div class="d-flex align-items-center custom-checkbox " v-for="(item,i) in payModeDatas" :key="i">
                                <input type="radio" :id="'comptant'+i" class="form-check-input" name="mode_pay_caisse"  :value="item['@id']" required v-model="encaisse.modePay">
                                <label class="mx-2 check-label mb-0" :for="'comptant'+i" >{{item.labelle}}</label> 
                            </div>
                            
                      </div>
                  </div> -->


                  <div class="d-flex justify-content-between my-3">
                      <p class="pay-title">Remise</p>
                        <div class="icon-block d-flex">
                            <img src="../../assets/icons/add-to-list.svg" alt="">
                            <p>{{paiement.tva}} %</p>
                        </div>
                  </div>

                   <div class="d-flex justify-content-between my-3">
                      <p class="pay-title">Reste a payer</p>
                      <p class="fw-bold green-color-78" v-if="encaisse.rest_pay > 0">{{Number(encaisse.rest_pay).toLocaleString()}} FcFa</p>
                  </div>
              </div>
          </div>
          <div class="col-md-7">
              <div class="bord-left">

                  <div class="d-flex justify-content-between my-3">
                      <p class="pay-title">montant à encaisser</p>
                      <div class="bg-dark py-2 px-3 text-white">
                        <p class="fw-bold" >{{Number(currentMountToPay).toLocaleString()}} FcFa</p>
                        <!-- <p class="fw-bold" else >{{Number(encaisse.totalMount).toLocaleString()}} FcFa</p> -->
                      </div>
                  </div>

                  <div class="d-flex justify-content-between my-3">
                      <p class="pay-title">montant encaisser</p>
                      <div class="d-flex justify-content-end">
                          <input @input="calCulMount" type="text" required v-model.number="encaisse.retireMount" class="form-control w-50">
                      </div>
                  </div>

                  <div class="d-flex justify-content-between my-3">
                      <p class="pay-title">A rendre</p>
                        <p class="fw-bold green-color-78" v-if="encaisse.rendre > 0">{{Number(encaisse.rendre).toLocaleString()}} FcFa</p>
                  </div>

                 



              </div>
          </div>
      </div>

      <div class="border-top mt-4">
        <div class="d-flex justify-content-end mt-2"> 
            <button type="submit" class="pd-btn bg-green-78 fw-bold text-white p-12" >Valider</button>
         </div>
      </div>

     </b-overlay>
        </form>

         <RecuCaisse id="printFactPayCaisse" v-show="paymentIsSubmit == true"  :rendre="encaisse.rendre" :reste="encaisse.rest_pay" :client="clientPay" :infoPaiement="payementDatas" :montantSend="encaisse.retireMount"/>
  </div>
</template>

<script>
import axios from "../../services/index.js"
import RecuCaisse from "../Caisse/RecuCaisseOneTransact.vue"
import _ from 'lodash';

export default {
    props:{
        paiement:{
            type: Object,
        },
        clientPay:{
            type:Object
        },
               
    },
    data(){
        return{
            showLoader:false,
            paymentIsSubmit:false,
            currentMountToPay:0,
            allVersementMount:0,
            payementDatas:'',
            encaisse:{
                totalMount:0,
                retireMount:'',
                rendre:0,
                rest_pay:0,
                clientName:"",
                modePay:"",
                remise:0,
            },


            PayEnvoie:{
              montant: 0,
              createdAt: new Date().toISOString().substr(0, 10),
              transaction: "",
            }
        }
    },
    components:{
        RecuCaisse
    },
    computed: {
        payModeDatas(){
        return this.$store.state.allPayModeInfo;
    },
    
    },

    methods:{

         printFact() {
      var divElementContents = document.getElementById("printFactPayCaisse").innerHTML;
      var windows = window.open("", "", "height=400, width=400");
      windows.document.write("<html>");
      windows.document.write(divElementContents);
      windows.document.write("</body></html>");
      windows.document.close();
      windows.print();
    },
        sendEncaisse(){

                if (this.currentMountToPay >= this.encaisse.retireMount) 
                {
                    this.PayEnvoie.montant = this.encaisse.retireMount;
                }
                else
                {
                    this.PayEnvoie.montant = this.currentMountToPay;
                }
           

                 this.showLoader = true;
                this.PayEnvoie.transaction = this.paiement["@id"];
                const transactInvoiceId = this.paiement.invoices[0] ? this.paiement.invoices[0]["@id"] : '';
                if (transactInvoiceId != '') {
                    this.PayEnvoie.invoice = transactInvoiceId;
                }

                

                axios.post('/versements', this.PayEnvoie)
                 .then(data => {
                    this.showSpiner = false;
                    this.$store.commit("MutTransactForPay", '')
                    

                    this.$fire({
                      text: `Ce versement  a bien été ajouté `,
                      type: "success",confirmButtonText:'ok',
                      timer: 5000,
                    });

                    this.$store.dispatch("getAlltransactions");
                    this.$store.dispatch("getVersementsDatas");
                    this.$store.dispatch("getDasboardDatas");

                    this.$store.dispatch("filterTransactionByExpeditor", this.clientPay["@id"]);
                    this.$store.dispatch("filterTransactionByDestinator", this.clientPay["@id"]);
                    this.$store.dispatch("getCurrentClientDatas", this.clientPay.id);

                    setTimeout(() => {
                        this.paymentIsSubmit = true;
                         this.printFact();
                    }, 1000);

                    setTimeout(()=>{
                        
                    // this.$router.push({ name: 'Caisse' })
                    window.location.reload();

                      },2000);

                    
                 })
                 .catch(error => {
                  this.$fire({
                      text: `Erreur rencontrée..`,
                      type: "error",confirmButtonText:'ok',
                      timer: 5000,
                    }); 
                    
                    this.showSpiner = false;
                    console.log(error)
                })
                

            

            console.log("HELOLOL CEST BON ", this.PayEnvoie)
            
        },

        calCulMount(){

            if (this.currentMountToPay > this.encaisse.retireMount) {
                this.encaisse.rest_pay = (this.currentMountToPay - this.encaisse.retireMount );
                this.encaisse.rendre = 0;
            }
            else
            {
                this.encaisse.rendre = (this.encaisse.retireMount - this.currentMountToPay)
                this.encaisse.rest_pay = 0;

            }

        },

        calculCurrentPayInfo(){
            if (this.paiement.versements.length > 0) {
                for (let i = 0; i < this.paiement.versements.length; i++) {
                    this.allVersementMount += this.paiement.versements[i].montant;
                    
                }

                this.currentMountToPay = this.paiement.amount - this.allVersementMount;

            }
            else
            {
                this.currentMountToPay = this.paiement.amount;
            }
            
        }
    },

    mounted(){

        


        setTimeout(() => {
            this.payementDatas = _.cloneDeep(this.paiement)
            // console.log("VPIR LE PAY ", this.payementDatas);
            this.calculCurrentPayInfo();
        }, 100);
    }
}
</script>

<style lang="scss">
.paymode label{
    font-size: 12px;
}
.bord-left{
    padding-left: 1rem;
    border-left: 2px dashed #000;
}

.pay-title{
    font-weight: bold;
    text-transform: uppercase;
}

.icon-block {
    background: #000;color:#f16e01 !important;;
    padding: 5px 10px;
    border-radius: 5px;

    p{
        margin-left: 1vw;
    }
}
</style>