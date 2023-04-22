<template>
  <div>

    <div class="d-flex justify-content-between">
          <div class="left-block d-flex align-items-center">
              <p class="fw-bold">Espaces administrateur</p>

              <!-- <DatePick /> -->
          </div>
          <div class="right-block">
              
               <button class="custom-btn box-shadow-d3  text-dark bg-yellow" @click="newAdmin()" >
                   <img src="../../assets/icons/add-client.svg" class="img-1-5vw" alt="">
                   <span class="date-text">Nouveau utilisateur</span>
              </button>
          </div>
      </div>



    
  </div>
</template>

<script>
// import DatePick from '../Date/ChooseTwoDatePick.vue'
import { mapGetters } from 'vuex'

export default {
  components:{
    // DatePick
  },
  methods:{
   
  },
  computed: {
    ...mapGetters([
    ])
  },

  methods:{
    newAdmin(){
      console.log("SHOW ADMIN MODAL");
    }
  }
};
</script>

<style lang="scss">

</style>