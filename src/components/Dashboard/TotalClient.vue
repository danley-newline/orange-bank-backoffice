<template>
  <div>


 <div >
       
     </div>





    <div class="row mt-5 d-flex align-items-center block-client-number">
      <div class="col-md-2">
        <div class="bg-white box-shadow-d3 p-3 border-rad-10">
            <div class="d-flex justify-content-between">
              <p>Total client</p>
              <img src="../../assets/icons/users.svg" class="img-1-5vw"  alt="" />
            </div>
            <div class="my-3">
              <h2 class="fw-bold blue-color-0f">{{Number(clientNumber).toLocaleString()}}</h2>
            </div>
            <p class="green-color-78">
              <span><img src="../../assets/icons/grow-graph.svg" alt="" /></span
              ><span class="mx-2">+32</span>
            </p>
        </div>
      </div>

      <div class="col-md-7 px-4 client-large-card">
        
        <div v-if="clientByType.length>0" class="row p-3 border-rad-10 bg-white box-shadow-d3">
          
          <div class=" custom-card" :style="{width: 100/clientByType.length+'%'}" v-for="(item,i) in clientByType" :key="i">
              <div class="check-border">
            <div class="d-flex justify-content-between">
              <p>{{item.TYPECLIENT}} </p>

              <!-- <p><img  src="../../assets/icons/more-vertical.svg" alt="" /></p> -->
            </div>
            <div class="my-3">
              <h2 class="fw-bold" :class="{'blue-color-49': i == 0,'green-color-78': i == 1,'green-color-3c': i == 2,}">{{Number(item.TOTALCLIENT).toLocaleString()}}</h2>
            </div>
            <p class="green-color-78">
              <span><img src="../../assets/icons/grow-graph.svg" alt="" /></span
              ><span class="mx-2">+32</span>
            </p>
              </div>
          </div>
        </div>

        <div v-else class="text-center p-5 border-rad-10 bg-white box-shadow-d3">
            <h3 class="fw-bold">Aucun client créé à cette date</h3>
        </div>
      </div>
      <div class="col-md-3 ">
          <div class="bg-blue-fort-1e p-3 h-100 border-rad-10 box-shadow-d3">
              <p class="text-white fw-bold mb-5">Chiffres d'affaires du jour</p>

              <div class="mt-3 d-flex justify-content-between align-items-center">
              <h2 class="fw-bold green-color-78">{{Number(chiffreAffaire).toLocaleString()}} M</h2>
              <span> <img  src="../../assets/icons/money.svg" class="img-1-6vw" alt=""> </span>
            </div>
          </div>

          
      </div>
    </div>
  </div>
</template>

<script>
// import DatePick from '../Date/ChooseTwoDatePick.vue'

export default {
  props:['clientNumber','clientByType', 'chiffreAffaire'],
  // props:{
  //   clientNumber:{
  //     type: Number
  //   },
  //    clientByType:{
  //     type: String
  //   },
  //   chiffreAffaire:{
  //     type: Number
  //   },
  // },
  
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
        padding-right: 0%;

        .check-border{
            border-right: 4px solid #000;color:#f16e01 !important;;
        }
    }
    .custom-card:last-child{
        // padding-right: 10px;
        .check-border{
            border: none;
        }
    }
}

@media screen and (max-width: 1410px) {
    .client-ajout-block{
      .col-md-6 p{
        margin-right: 1.2vw !important;
      }
    }
}
</style>