<template>
  <div class="">
    <div class="head-detail">
        <div>
            <button class="bg-dark btn px-3 py-1" @click="goBack">
                <img src="../assets/icons/back.svg" alt="" />
            </button>
        </div>
      <div
        class="bg-white p-4 d-flex justify-content-between align-items-center"
      >
        <div class="first-group d-flex align-items-center">
          <div class="img-client">
            <img src="../assets/icons/user.png" class="img-3vw" alt="" />
          </div>

          <h3 class="blue-color-0f mb-0 mx-3 fw-bold">{{client.nom}} {{client.prenoms}}</h3>

          <div class="particulier">
            <p v-if="client.typeClient">{{client.typeClient.label}}</p>
          </div>
        </div>

        <div class="second-group d-flex mx-4">
          <div class="d-flex align-items-center">
            <p class="small mx-2">Total poids</p>
            <p class="nmal pbg-green-light">{{Number(client.totalPoids).toLocaleString()}} Kg</p>
          </div>

          <div class="d-flex align-items-center mx-3">
            <p class="small mx-2">Montant total</p>
            <p class="nmal pbg-blue-light">{{Number(client.totalMontant).toLocaleString()}} Fcfa</p>
          </div>

          <div class="d-flex align-items-center mx-3">
            <p class="small mx-2">Versement</p>
            <p class="nmal pbg-green-hard">{{Number(client.totalVersement).toLocaleString()}} Fcfa</p>
          </div>

          <div class="d-flex align-items-center">
            <p class="small mx-2">ImPayés</p>
            <p class="nmal pbg-pink-hard">{{Number(totalImpaye).toLocaleString()}} Fcfa</p>
          </div>
        </div>

        <!-- <div class="third-group">
          <div
            class="d-flex pay-button bg-yellow align-items-center"
            @click="showModalPay"
          >
            <img src="../assets/icons/add-to-list.svg" alt="" />
            <p>Faire un payement</p>
          </div>
        </div> -->
      </div>

      <b-modal id="modal-1" v-model="modalShow">
        <template #modal-title>
          <p class="blue-color-0f">Encaissement</p>
        </template>

        <PaymentModal :paiement="retgoPayTransaction" :clientPay="client"  @close="showModalState" />
      </b-modal>
    </div>

    <div class="expediteur-table">
      <TableCumul :TableDataExpediteur="expedTransactDatas" :TableDataDestinataire="destTransactDatas" :totalImpayed="totalImpaye" @showModal="showModalState" />
    </div>

  </div>
</template>

<script>
import PaymentModal from "../components/DetailsClient/PaymentModal.vue";
import TableCumul from "../components/DetailsClient/TableCumul.vue";
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      modalShow: false,
      currentTransact:{},
      client:"",
      totalImpaye:0,
      expedTransactDatas:[],
      destTransactDatas:[],
      
      
    };
  },
  computed: {
    ...mapGetters([
      'retOneClientTransact',
      'retexpeditorTransaction',
      'retdestinatorTransaction',
      'retgoPayTransaction',
    ])
  },
  methods: {
    showModalState(e) {
      this.modalShow = e;
      // console.log("voir les? elements a payer ", this.retgoPayTransaction);

    },
    goBack(){
        this.$router.go(-1)
    },
    showModalPay(){
      this.modalShow = !this.modalShow;
    },

    checkDestinatorTransactUserToPay(){

      //RECUPERATION DE LENSEMBLE DES TRANSACTION OU LE CLIENT APPARAIT
      //BOUCLE SUR LES DONNEES RECUPERER ET VERIFICATION LUTILISATEUR QUI DOIT PAYER LA TRANSACTION EST LE BON

      for (let i = 0; i < this.retdestinatorTransaction.length; i++) {
        const libelleFromPay = this.retdestinatorTransaction[i].paymentFrom.libelle;
        if (libelleFromPay == "DESTINATAIRE") {
          if (this.retdestinatorTransaction[i].recepteur.id == this.retOneClientTransact.id) {
              this.destTransactDatas.push(this.retdestinatorTransaction[i]);            
          }
        }

        else if (libelleFromPay == "EXPEDITEUR") {
          if (this.retdestinatorTransaction[i].expediteur.id == this.retOneClientTransact.id) {
            this.destTransactDatas.push(this.retdestinatorTransaction[i]);
          }
        }
      }

      this.checkExpiditorTransactUserToPay();      
    },


    checkExpiditorTransactUserToPay(){

      //RECUPERATION DE LENSEMBLE DES TRANSACTION OU LE CLIENT APPARAIT
      //BOUCLE SUR LES DONNEES RECUPERER ET VERIFICATION LUTILISATEUR QUI DOIT PAYER LA TRANSACTION EST LE BON

      for (let i = 0; i < this.retexpeditorTransaction.length; i++) {
        const libelleFromPay = this.retexpeditorTransaction[i].paymentFrom.libelle;
        if (libelleFromPay == "DESTINATAIRE") {
          if (this.retexpeditorTransaction[i].recepteur.id == this.retOneClientTransact.id) {
              this.expedTransactDatas.push(this.retexpeditorTransaction[i]);            
          }
        }

        else if (libelleFromPay == "EXPEDITEUR") {
          if (this.retexpeditorTransaction[i].expediteur.id == this.retOneClientTransact.id) {
            this.expedTransactDatas.push(this.retexpeditorTransaction[i]);
          }
        }
      }


      this.recupClientTransactInfoDetail();
      
    }, 

    recupClientTransactInfoDetail(){
      this.client = this.retOneClientTransact;
      console.log("DONNEE DU EXPED  ",  this.client);
      // console.log("DONNEE DE DESTINATEUR  ",  this.destTransactDatas);







      if (this.client.totalMontant > this.client.totalVersement) {
        this.totalImpaye = (this.client.totalMontant - this.client.totalVersement);
      }
      else
      {
        this.totalImpaye = 0;
      }



      this.expedTransactDatas.colisPoidsCumul = 0;
      this.expedTransactDatas.allCumulVersement = 0;
      this.expedTransactDatas.allCumulAmount = 0;
      this.expedTransactDatas.allCumulImpayed = 0;
      this.destTransactDatas.colisPoidsCumul = 0;
      this.destTransactDatas.allCumulVersement = 0;
      this.destTransactDatas.allCumulAmount = 0;
      this.destTransactDatas.allCumulImpayed = 0;



       for (let i = 0; i < this.expedTransactDatas.length; i++) {
          const parentExped = this.expedTransactDatas[i];
          this.expedTransactDatas[i].globalVerse = 0;
          //GET ALL VERSEMENT TOTAL NUMBER
          for (let k = 0; k < parentExped.versements.length; k++) {
            const verseExp = parentExped.versements[k].montant;
            //TOTAL DES VERSEMENTS PAR LINE DE TRANSACTION
            this.expedTransactDatas[i].globalVerse += verseExp;
          }

          //RECUPERATION DU TOTAL DES COLIS PAR TABLEAU
          this.expedTransactDatas[i].transactLinePoids = 0;
          for (let j = 0; j < parentExped.colis.length; j++) {
            const numberPoids = parentExped.colis[j].poids;
            //TOTAL DES POIDS DE COLIS PAR LIGNE DE TRANSACTOION
            this.expedTransactDatas[i].transactLinePoids += numberPoids;

            //TOTAL GLOBAL DE TOUTE TRANSACTION DE LUSUER EN TANT QU EXPEDITEUR
            this.expedTransactDatas.colisPoidsCumul += numberPoids;
            
          }

          // console.log("LES TRANSACT EXPED", this.expedTransactDatas);

        //CUMUL DU TOTAL DES VERSEMENT PAR TABLEAU
        this.expedTransactDatas.allCumulVersement += parentExped.globalVerse;
        //MONTANT TOTAL DES TRANSACTION DU COLIS EN BAS DU TABLEU
        this.expedTransactDatas.allCumulAmount += parentExped.amount;
          

        
      }


      for (let i = 0; i < this.destTransactDatas.length; i++) {
          const parentDest = this.destTransactDatas[i];
          this.destTransactDatas[i].globalVerse = 0;
          for (let k = 0; k < parentDest.versements.length; k++) {
            const verseDest = parentDest.versements[k].montant;
            // console.log("verse", verse);
            this.destTransactDatas[i].globalVerse += verseDest;
          }

          //RECUPERATION DU TOTAL DES COLIS PAR TABLEAU
          this.destTransactDatas[i].transactLinePoids = 0;
          for (let j = 0; j < parentDest.colis.length; j++) {
            const numberPoids = parentDest.colis[j].poids;
            this.destTransactDatas[i].transactLinePoids += numberPoids;
            this.destTransactDatas.colisPoidsCumul += numberPoids;
          }


        // console.log("LES TRANSACT ", this.destTransactDatas);
        //CUMUL DU TOTAL DES VERSEMENT PAR TABLEAU
        this.destTransactDatas.allCumulVersement += parentDest.globalVerse;
        this.destTransactDatas.allCumulAmount += parentDest.amount;

      }

      this.destTransactDatas.allCumulImpayed = (this.destTransactDatas.allCumulAmount - this.destTransactDatas.allCumulVersement);
      this.expedTransactDatas.allCumulImpayed = (this.expedTransactDatas.allCumulAmount - this.expedTransactDatas.allCumulVersement);

          // console.log("DONNEE DE DESTINANNTNN  ",  this.destTransactDatas);

      // console.log("VOIR LE CURRRENT EXPEDITOR DATAS ", this.expedTransactDatas);
    }
  },
  components: {
    PaymentModal,
    TableCumul,
  },
  
  mounted(){
    

    setTimeout(() => {
      this.checkDestinatorTransactUserToPay();
    }, 100);

   
    
    // console.log("LES VALEUR POUR LE CLIENT ACTU ", this.expedTransactDatas);
  }
};
</script>

<style lang="scss">
.modal-dialog {
  max-width: 76vw !important;
  margin: 6.75rem auto;
}
footer.modal-footer {
  display: none;
}
button.close {
  border: none;
  background: no-repeat;
  font-size: 1.5vw;
}

.head-detail {
  .particulier {
    border-left: 2px solid #9d9d9d;
    color: #9d9d9d;
    padding-left: 0.8vw;
  }

  .second-group {
    p {
      &.small {
        color: #9d9d9d;
      }
    }
  }

  .third-group {
    &:hover {
      cursor: pointer;
    }
    .pay-button {
      padding: 10px 8px;
      border-radius: 5px;
      border: 1px solid #0f4476;
      width: 12vw;
      p {
        margin-left: 15px;
      }
    }
  }
}

p {
  &.nmal {
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9vw;
    font-weight: bold;
  }

  &.pbg-green-light {
    background: #f1fbed;
    color: #7ad751;
  }

  &.pbg-blue-light {
    background: #e9f6fc;
    color: #49ace2;
  }

  &.pbg-green-hard {
    background: #e6f7f1;
    color: #60b379;
  }

  &.pbg-pink-hard {
    background: #fae7e8;
    color: #e8696a;
  }
}
input.form-check-input {
  border-radius: 0 !important;
  &:hover {
    cursor: pointer;
  }
}
.check-label {
  cursor: pointer;
}

.form-check-input[type="radio"]:checked {
  background-image: url("../assets/icons/check-white.svg");
  background-size: 10px;
  & + .check-label {
    font-weight: bold;
  }
}
</style>