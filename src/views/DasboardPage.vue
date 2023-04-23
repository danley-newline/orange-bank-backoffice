<template>
  <div>
    <div class="global-block">

      <div class="dash-slide packs-block">
        <div class="block-images">
        <img src="../assets/images/isaac-smith.jpg" alt="">
        </div>
        <p class="stats-block">{{retpackList.length}}</p>
        <p class="title-block">Total packs</p>
      </div>
      <div class="dash-slide all-pret">
        <div class="block-images">

        
        <img src="../assets/images/towfiqu-barbhuiya.jpg" alt="">
        </div>
        <p class="stats-block">{{retcreditList.length}}</p>
        <p class="title-block">Demande de prêt</p>
      </div>
      <div class="dash-slide pret-success">
        <div class="block-images">

        
        <img src="../assets/images/le-buzz-studio.jpg" alt="">
        </div>
        <p class="stats-block">{{retcreditAccepted.length}}</p>
        <p class="title-block">Prêt accordé</p>
      </div>
      <div class="dash-slide pret-error">
        <div class="block-images">

        
        <img src="../assets/images/steve-johnson.jpg" alt="">
        </div>

        <p class="stats-block">{{retcreditRejected.length}}</p>
        <p class="title-block">Prêt Rejeté</p>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{

    }
  },
  computed:{
   ...mapGetters([
      'retpackList',
      'retcreditList',
      'retcreditAccepted',
      'retcreditRejected'

    ]),
  },
  mounted(){
    this.$store.dispatch("getPacksList");
    this.$store.dispatch("getCreditList");

  }

}
</script>

<style lang="scss">
.global-block {
    display: flex;
    gap: 24px;
    justify-content: center;
    height: 75vh;

    .dash-slide{
      background: #212529;
       width: 160px;
       height: 50vh;
       border-radius: 88px 4px 80px 4px;
       text-align: center;
       padding: 8vh 4px;
      color: #fff;
       &:hover{
        cursor: pointer;
       }

       .title-block{
            font-weight: bold;
            text-transform: uppercase;
            font-size: 15px !important;
      }

       .stats-block{
        font-weight: bold;
        font-size: 30px !important;
       }

      .block-images  {
        margin-bottom: 15px;
        img{

        border-radius: 50%;
        height: 100px;
        width: 100px;
        border: 5px solid #ff7901;
        }

      }

       &.all-pret{
            border-radius: 88px 4px 80px 4px;
            margin-top: 5rem;
       }
       &.pret-success{
            border-radius: 88px 4px 80px 4px;
            margin-top: 10rem;

       }
       &.pret-error{
            border-radius: 88px 4px 80px 4px;
            margin-top: 2rem;

       }
    }
}


.packs-block {
  animation-name: scale-animation;
  animation-duration: 2s;
}

.all-pret {
  animation-name: scale-animation;
  animation-duration: 2s;
  animation-delay: 1.2s;
}

.pret-success {
  animation-name: scale-animation;
  animation-duration: 2s;
  animation-delay: 2.2s;
}

.pret-error {
  animation-name: scale-animation;
  animation-duration: 2s;
  animation-delay: 3.2s;
}

@keyframes scale-animation {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

</style>