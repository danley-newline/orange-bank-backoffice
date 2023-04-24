<template>
  <div class="date-choosen">
      
          <div class="d-flex align-items-center">

              <div class="d-flex align-items-center first-head mx-4">
                 <span class="text-gray-75">Période</span>
                 <date-pick v-model="date" :months="months" :weekdays="weekdays" :displayFormat="'DD/MM/YYYY'" @input="showMyDate" class="mx-3 date-to-choose"></date-pick>
               </div>
        </div>
        
  </div>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
export default {
    data(){
        return{
            date:new Date().toISOString().substr(0, 10),
            weekdays: [
                'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'
            ],
            months: [
                'Janvier', 'Février', 'Mars', 'Avril',
                'Mai', 'Juin', 'Juillet', 'Aôut',
                'Septembre', 'Octobre', 'Novembre', 'Decembre'
            ]
        }
    },
components:{
    DatePick,
  },
  methods:{
      showMyDate(e){
         
      },
      
  }
}
</script>

<style lang="scss">
.date-choosen{


table.vdpTable{
    thead, tbody{
        tr {
            font-size: 10px !important;

             th {
                font-size: 10px !important;
            }
        }
       
    }
    
}
.vdpOuterWrap.vdpPositionReady.vdpPositionTop.vdpPositionLeft.vdpFloating {
    z-index: 3;
}

input[type="text"] {
    padding: 10px;
    border-radius: 10px;
    background: #fff;
    border: none;
    color: #0f4476;
    font-size: 0.8vw;
    width: 8vw;
    box-shadow: 0px 0px 8px #edededb8;
    outline: none;

    &:hover{
        cursor: pointer;
    }

    
}


        // content:url("../../assets/icons/badge-pi.svg");
    
}

</style>