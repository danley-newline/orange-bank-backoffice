<template>
  <div class="pay-modal">
        <form @submit.prevent="sendEncaisse" v-if="paymentIsSubmit == false">
      <b-overlay :show="showLoader" rounded="sm" class="product-loader">
      <div class="row">
          <div class="col-md-5">
              <div class="">
                <p class="">Encaissement de la transaction numero : {{paiement.code}} </p>
                  <div class="d-flex justify-content-between my-3">
                      <p class="pay-title">Client</p>
                      <div class="icon-block d-flex">
                        <img src="../../assets/icons/add-to-list.svg" alt="">
                        <p>{{clientPay.nom}} {{clientPay.prenoms}} </p>
                      </div>
                  </div>

                 


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
                          <input @input="calCulMount" type="text" required v-model.number="montantSaisit" class="form-control w-50">
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


    <RecuCaisse id="printFactPayCaisse" v-show="paymentIsSubmit == true"   :rendre="encaisse.rendre" :reste="encaisse.rest_pay" :client="retOneClientTransact" :infoPaiement="paiement" :montantSend="montantSaisit" />
  </div>
</template>

<script>
import axios from "../../services/index.js"
import { mapGetters } from 'vuex'
import RecuCaisse from "./RecuCaisseOneTransact.vue"
export default {
    props:{
        paiement:{
            type: Object,
        },
        clientPay:{
            type:Object
        },
        caisseClient:{
            type:Object
        }
    },
    data(){
        return{
            paymentIsSubmit:false,
            showLoader:false,
            currentMountToPay:0,
            allVersementMount:0,
            encaisse:{
                totalMount:0,
                retireMount:0,
                rendre:0,
                rest_pay:0,
                clientName:"",
                modePay:"",
                remise:0,
            },
            montantSaisit:'',


            PayEnvoie:{
              montant: 0,
              createdAt: new Date().toISOString().substr(0, 10),
              transaction: "",
            }
        }
    },
    computed: {
        payModeDatas(){
        return this.$store.state.allPayModeInfo;
    },
     ...mapGetters([
      'retOneClientTransact',
      'retIsToPrint'
      
    ])
    
    },
    updated(){
    
    },
    components:{
        RecuCaisse
    },

    methods:
    {
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

                if (this.currentMountToPay >= this.montantSaisit) 
                {
                    this.PayEnvoie.montant = this.montantSaisit;
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
                    this.showLoader = false;
                    this.$store.commit("MutTransactForPay", '')
                    

                    this.$fire({
                      text: `Ce versement a bien été ajouté `,
                      type: "success",confirmButtonText:'ok',
                      timer: 5000,
                    });

                   

                    this.$store.dispatch("getAlltransactions");
                    this.$store.dispatch("getVersementsDatas");
                    this.$store.dispatch("getDasboardDatas");
                    
                    setTimeout(() => {
                        this.paymentIsSubmit = true;
                         this.printFact();
                    }, 1000);
                    
                    setTimeout(()=>{
                        window.location.reload();

                      },1500);

                    
                 })
                 .catch(error => {
                  this.$fire({
                      text: `Erreur rencontrée..`,
                      type: "error",confirmButtonText:'ok',
                      timer: 5000,
                    }); 
                    
                    this.showLoader = false;
                    console.log(error)
                })

                 

            

            
        },

        calCulMount(){

            if (this.currentMountToPay > this.montantSaisit) {
                this.encaisse.rest_pay = (this.currentMountToPay - this.montantSaisit );
                this.encaisse.rendre = 0;
            }
            else
            {
                this.encaisse.rendre = (this.montantSaisit - this.currentMountToPay)
                this.encaisse.rest_pay = 0;

            }

        },

        calculCurrentPayInfo(){
            if (this.paiement.versements.length > 0) {
                for (let i = 0; i < this.paiement.versements.length; i++) {
                    this.allVersementMount += this.paiement.versements[i].montant;
                    
                }

                this.currentMountToPay = this.paiement.amount - this.allVersementMount;
                this.paiement.globalVerse = this.allVersementMount;
                // console.log("TOUT LES VERSEMENT POUR CHAN ", this.paiement);
                
            }
            else
            {
                this.paiement.globalVerse = 0;
                this.currentMountToPay = this.paiement.amount;
            }


            
        }
    },

    mounted(){

        setTimeout(() => {
            this.calculCurrentPayInfo();
        }, 100);

        console.log("INFOS DJAI  " ,this.paiement );
        // console.log("LONGUEUR DU TABLEAU VERSEMENENT ",this.paiement.versements.length);
        this.$store.dispatch("getCurrentClientDatas", this.clientPay.id);
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