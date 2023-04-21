<template>
  <div>

    <div class="d-flex justify-content-between">
          <div class="left-block d-flex align-items-center">
              <p class="fw-bold"> Vue d'ensemble des clients</p>

              <!-- <DatePick /> -->
          </div>
          <div class="right-block">
              <button class="custom-btn box-shadow-d3  text-dark bg-yellow" @click="$router.push('create-client')" >
                   <img src="../../assets/icons/add-client.svg" class="img-1-5vw" alt="">
                   <span class="date-text">Nouveau client</span>
              </button>
          </div>
      </div>



    <div class="d-flex align-items-center mt-5 block-client-number">
      <div class="w-24">
        <div class="bg-white box-shadow-d3 p-3 border-rad-10">
            <div class="d-flex justify-content-between">
              <p>Total client</p>
              <img src="../../assets/icons/users.svg" class="img-1-5vw" alt="" />
            </div>
            <div class="my-3">
              <h1 class="fw-bold blue-color-0f">{{Number(clientNumber).toLocaleString()}}</h1>
            </div>
            <p class="green-color-78">
              <span><img src="../../assets/icons/grow-graph.svg" alt="" /></span
              ><span class="mx-2">+32</span>
            </p>
        </div>
      </div>

      <div class="w-74 ml-1rem px-3 client-large-card">
        <div class="row p-3 border-rad-10 bg-white box-shadow-d3">
          
          <div class="custom-card" :style="{width: 100/clientByType.length+'%'}" v-for="(item,i) in clientByType" :key="i">
              <div class="check-border">
            <div class="d-flex justify-content-between">
              <p>{{item.TYPECLIENT}}</p>

            </div>
            <div class="my-3">
              <h1 class="fw-bold" :class="{'blue-color-49': i == 0,'green-color-78': i == 1,'green-color-3c': i == 2,}">{{Number(item.TOTALCLIENT).toLocaleString()}}</h1>
            </div>
            <p class="green-color-78">
              <span><img src="../../assets/icons/grow-graph.svg" alt="" /></span
              ><span class="mx-2">+109</span>
            </p>
              </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
// import DatePick from '../Date/ChooseTwoDatePick.vue'

export default {
  props:['clientNumber','clientByType'],
  components:{
    // DatePick
  },
  methods:{
   
  }
};
</script>

<style lang="scss">
.client-ajout-block{
  .col-md-6 p{
    margin-right: 2rem;
  }
  .col-md-6:last-child p{
    margin-right: 1rem;
  }

  p:hover{
    cursor: pointer;
  }
}

.client-large-card{
    .custom-card{
        padding-right: 0;

        .check-border{
            border-right: 4px solid #000;color:#f16e01 !important;;
        }
    }
    .custom-card:last-child{
        padding-right: 10px;
        .check-border{
            border: none;
        }
    }
}


</style>