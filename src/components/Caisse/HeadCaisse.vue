<template>
  <div>
    <div>
      <div class="d-flex align-items-center justify-content-between">
        <div class="col-md-4">
          <div class="first-head">
            <p class="fw-bold">Nos transactions et traitements</p>
          </div>
        </div>
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            date-block-client
          "
        >
         <DatePick @twoDaysEmited="userDateToParse" />
          <div class="d-flex hover-cursor" @click="goToCompte">
            <p class="mx-3 marron-4d fw-600">
              <img src="../../assets/icons/compta.svg" class="img-1-1vw" alt="" />
              <span class="date-text">Espace Comptabilité</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between  align-items-center mt-5 block-client-number">
     

      <div class="w-65 px-4 client-large-card">
        <div class="row p-3 d-flex align-items-center border-rad-10 bg-white box-shadow-d3">
          <div class="col-md-4">
            <div class="check-border d-flex align-items-center">
              <div class="">
                <img src="../../assets/icons/colis-enter.svg" class="img-1-8vw"  alt="" />
              </div>
              <div class="my-4">
                  <p class="fw-300 blue-color-0f mx-3">Transactions</p>
              </div>
              <h3 class="fw-bold pt-2">{{Number(ColisArrive).toLocaleString()}}</h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="check-border d-flex align-items-center">
              <div class="">
                <img src="../../assets/icons/colis-trans.svg" class="img-1-8vw"  alt="" />
              </div>
              <div class="my-4">
                  <p class="fw-300 orange-color-df mx-3">Non payés</p>
              </div>
              <h3 class="fw-bold pt-2">{{Number(ColisNonLivre).toLocaleString()}}</h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="check-border d-flex align-items-center">
              <div class="">
                <img src="../../assets/icons/check-success.svg" class="img-1-8vw"  alt="" />
              </div>
              <div class="my-4">
                  <p class="fw-300 green-color-78 mx-3"> payés</p>
              </div>
              <h3 class="fw-bold pt-2">{{Number(ColisLivre).toLocaleString()}}</h3>
            </div>
          </div>
          
        </div>
      </div>


      <div class="w-32 ml-1rem">
        <div class="bg-blue-fort-1e py-3 px-4 h-100 border-rad-10 box-shadow-d3">
          <div class="d-flex justify-content-between align-items-center my-2">
              <div class="">
                <p class="fw-bold text-white">Chiffres d'affaires</p>
                <!-- <p class="text-white fw-300">de la journée</p> -->
              </div>
              <div class="">
                  <h2 class="fw-bold green-color-78">{{Number(GlobalMount).toLocaleString()}} M</h2>
              </div>
              
              <img src="../../assets/icons/money.svg" class="img-1-8vw"  alt="" />
            </div>



        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePick from '../Date/ChooseTwoDatePick.vue'

export default {
  props:{
    ColisArrive:{
      type: Number
    },
    ColisLivre:{
      type: Number
    },
    
    ColisNonLivre:{
      type: Number
    },
   
    GlobalMount:{
      type: Number
    },
  },
  methods: {
    goToCompte(){
      this.$router.push({name:"Comptabilite"});
      window.location.reload();
     
    },

    userDateToParse(){
      const periode = this.$store.state.filterByTwoDate;
      this.$emit('dateIsClicked',periode);
    },
   
  },
  components:{
    DatePick,
  }
};
</script>

<style lang="scss">

.client-large-card {
  .col-md-4 {
    padding-right: 2rem;

    .check-border {
      border-right: 4px solid #000;color:#f16e01 !important;;
    }
  }
  .col-md-4:nth-child(2) {
    padding-left: 1rem;
  }
  .col-md-4:last-child {
    padding-right: 10px;
    .check-border {
      border: none;
    }
  }
}

@media screen and (max-width: 1210px) {
  .reduiced-topbar{

    .client-large-card {
      .col-md-4 {
        padding-right: 0 !important;
      }
    }

  }

}
</style>