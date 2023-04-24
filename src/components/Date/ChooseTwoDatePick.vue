<template>
  <div class="date-choosen">
      
          <div class="d-flex align-items-center">
              
              <div class="d-flex align-items-center first-head mx-4">
                 <span class="text-gray-75 fs-5" >Du</span>
                 <date-pick v-model="date" :months="months" :weekdays="weekdays" :displayFormat="'DD/MM/YYYY'"  class="mx-3 date-to-choose"></date-pick>
               </div>
               <div class="d-flex align-items-center first-head">
                 <span class="text-gray-75 fs-5">Au</span>
                 <date-pick v-model="tomorrow"  :months="months" :weekdays="weekdays" :displayFormat="'DD/MM/YYYY'" @input="showMyDate" class="mx-3 date-to-choose"></date-pick>
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
            tomorrow:new Date().toISOString().substr(0, 10),
            twoDate:{
                dateStart:"",
                dateEnd:""
            },
            weekdays: [
                'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'
            ],
            months: [
                'Janvier', 'Février', 'Mars', 'Avril',
                'Mai', 'Juin', 'Juillet', 'Aôut',
                'Septembre', 'Octobre', 'Novembre', 'Decembre'
            ],
            
            
        }
    },
components:{
    DatePick,
  },
  methods:{
      showMyDate(){
         
        if (this.date <= this.tomorrow) {
               this.twoDate.dateStart = this.date;
               this.twoDate.dateEnd = this.tomorrow;
                this.$store.commit("mutTwoDateFiltre", this.twoDate);
                this.$emit("twoDaysEmited",true)
            
        }
        else{
            this.$fire({
                text: "La Date de début est superieur à la date de fin.",
                type: "error",confirmButtonText:'ok',
                timer: 3000
                })
        }



      },
      putTomorowDate(){
        //GET TODAY DATE
        var dateOne = new Date();
        //GET TOMORROW DATE
        dateOne.setDate(dateOne.getDate() + 1);
        //CONVERT DATE TO YYYY-MM-DD
        this.tomorrow = dateOne.toISOString().split('T')[0];

      }
  },
  mounted(){
      this.putTomorowDate();
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