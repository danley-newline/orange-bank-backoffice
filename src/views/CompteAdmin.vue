<template>
  <div>
    <AdminHead  />
    <div class="">
      <TableAdmins />
    </div>
  </div>
</template>

<script>
import AdminHead from "../components/CompteAdmin/AdminHead.vue";
import TableAdmins from "../components/CompteAdmin/TableAdmins.vue";
import { mapGetters } from 'vuex'

export default {
   data(){
    return {
      totalClientByType:'',
      clientCountTableDatas:[],
      countStats:"",
    }
  },
  components:{
    AdminHead,
    TableAdmins
  },
  computed: {
    // ...mapGetters([
    //   'retallAdminUserInfo', 
    // ])
  },
  methods:{
    
    
  },


  mounted(){
    
  }
}
</script>

<style lang="scss">

</style>