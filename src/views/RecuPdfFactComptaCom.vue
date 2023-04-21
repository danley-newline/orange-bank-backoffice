<template>
  <div>
    <p class="invisible"> {{reteditFactureInfo}} IS OK </p>
  <div id="printFact" class=" " style="position:relative;">

     

    <div id="" >
      <div style="font-size: 14px !important">
        <div class="">
          <img src="../assets/icons/logo-pcp.svg" alt="" />
        </div>

        <div
          style="
            border: 2px solid #0f4477;
            width: 250px;
            padding: 0.3rem 0.5rem;
            margin: 0.5rem 0;
          "
        >
          <p style="margin:0px !important;">C.C. Nº : 1502470 E</p>
          <p style="margin:0px !important;">Régime d'imposition : Réel Simplifié</p>
          <p style="margin:0px !important;">Centre des Impôts : Treichville</p>
        </div>

        <h3>
          <span style="font-weight: bold; color: #0f4477"
            >FACTURE Nº 21-319-1048/
          </span>
          <span style="font-weight: bold; color: red">223</span>
        </h3>
      </div>

      <div
        style="
          border: 2px solid #0f4477;
          padding: 0.3rem 0.5rem;
          margin-top: 1rem;
          margin-bottom: 0.2rem;
        "
      >
        <div style="display: flex; justify-content: space-between">
          <div>
            <p style="margin:0px !important; font-weight:bold;">Nº Facture PCP 1231 / NA</p>
          </div>

          <div>
            <p style="margin:0px !important; font-weight:bold;">Nº Réf : Groupage Maritime C21</p>
          </div>
          <div>
            <p style="margin:0px !important; font-weight:bold;">DATE : {{date | moment(`DD/MM/YYYY`) }}</p>
          </div>
        </div>
      </div>


      <div
        style="
          border: 2px solid #0f4477;
          padding: 0.5rem;
          margin-bottom: 1rem ;
        "
      >
        <div style="display: flex; justify-content: space-between">
          <div>
            <p style="margin:0px !important;">Code Clients 441. SAFESECUR </p>
          </div>

          <div>
            <p style="margin:0px !important;">Adresse : Abidjan - COCODY Palemeraie</p>
          </div>
          
        </div>


        <div style="display: flex; justify-content: space-between">
          <div>
            <p style="margin:0px !important;">CC Nº : 1234567K </p>
          </div>

          <div>
            <p style="margin:0px !important;">Tel: {{reteditFactureInfo.userInfo?reteditFactureInfo.userInfo.tel : '...'}}</p>
          </div>
          
        </div>
        <p style="margin:0px !important;">Contact : {{reteditFactureInfo.userInfo?reteditFactureInfo.userInfo.nom : ''}} {{reteditFactureInfo.userInfo?reteditFactureInfo.userInfo.prenoms: ''}}</p>  
        <p style="margin:0px !important;">Fournisseur : BONBONES SIEMENTS</p>  
      </div>


      

      <table width="100%" style="border: 2px solid #0f4477;" cellspacing="0" >
        <thead>
          <tr>
            <th style="text-align:center;border-right:1px solid #0f4477">
              Code
            </th>
                        <th style="text-align:center;border-right:1px solid #0f4477">
              Désignation
            </th>
                        <th style="text-align:center;border-right:1px solid #0f4477">
              Qté
            </th>
                        <th style="text-align:center;border-right:1px solid #0f4477">
              Volume
            </th>
                        <th style="text-align:center;border-right:1px solid #0f4477">
              PU/Pds €
            </th>
            <th style="text-align:center;">Montant</th>
          </tr>
        </thead> 

        <tbody>

          <tr v-for="(item,i) in reteditFactureInfo.invoiceDetails" :key="i">
            <td style="text-align:center;border-bottom:0px;border-left:0px; border-top:1px solid #0f4477; border-right:1px solid #0f4477;">  {{item.code}}</td>
            <td style="text-align:center;border-bottom:0px;border-left:0px; border-top:1px solid #0f4477;border-right:1px solid #0f4477;">  {{item.libelle}}</td>
            <td style="text-align:center;border-bottom:0px;border-left:0px; border-top:1px solid #0f4477;border-right:1px solid #0f4477;">  {{item.quantity}}</td>
            <td style="text-align:center;border-bottom:0px;border-left:0px; border-top:1px solid #0f4477;border-right:1px solid #0f4477;">  {{item.volume}}</td>
            <td style="text-align:center;border-bottom:0px;border-left:0px; border-top:1px solid #0f4477;border-right:1px solid #0f4477;">  {{item.pu}}</td>
            <td style="text-align:center;border-bottom:0px;border-left:0px; border-right:0px; border-top:1px solid #0f4477">  {{item.amount}}</td>
          </tr>
        
        </tbody>         
      </table>


      <div
        style="
          border: 2px solid #0f4477;
          padding: 0.5rem;
          margin-top: 1rem ;
        "
      >
        <div style="display: flex; justify-content: space-between">
          <div>
            <p style="margin:0px !important;">Qté / Poids : {{globalQuantity}}/{{globalPoids}} </p>
          </div>

          <div>
            <p style="margin:0px !important; font-weight:bold;">Montant Ht : {{Number(globalMount).toLocaleString()}} Fcfa </p>
            <p style="margin:0px !important; font-weight:bold;">Tva/prestation 18%: {{Number(montantTva).toLocaleString()}}Fcfa </p>
            <p style="margin:0px !important; font-weight:bold;">Total TTC : {{Number(montantTtc).toLocaleString()}} Fcfa </p>
          </div>
          
        </div>
      </div>


      <div
        style="
          border: 2px solid #0f4477;
          padding: 0.5rem;
          margin-top: 1rem ;
          margin-bottom: 0.4rem ;
        "
      >
        <p style="margin:0px !important; font-size:16px !important;">
          Arrêtée la présente facture au montant de : <span style="font-weight:bold;font-size:16px !important;"> {{Number(montantTtc).toLocaleString()}} Fcfa</span>
        </p>
      </div>

      <div style="text-align:center; margin-bottom:1rem;">
        <p style="margin:0px !important; font-size:10px !important;" >CONDITIONS DE VENTE</p>
      </div>

      <div style=" padding: 0 2rem;">
        <p style="margin:0px !important; font-size:10px !important;" >Les présentes Conditions Générales de vente (ci-après les "GGV") déterminent les droits et obligations des parties dans le cardre de la prestation </p>
        <p style="margin:0px !important; font-size:10px !important;" >En cas de perte d'un colis </p>
        



        <div style="display: flex; justify-content: space-between; margin-top:2rem;">
          <div>
            <p style="margin:0px !important; font-size:10px !important;" ><span style="font-weight:bold;font-size:10px !important;">Date limite de paiement: 31/12/{{date | moment(`YYYY`)}}</span> </p>
          </div>

          <div>
            <p style="text-decoration: underline #0f4477; font-weight:bold;">
          Signature Client
        </p>
          </div>
          
        </div>




        
      </div>



    <div style="position: absolute; bottom: 5px; border-top:3px solid #0f4477; width:100%;">
      <div style="text-align:center; margin-top:5px;">
        <p style="margin:0px !important; font-size: 12px !important; ">Siège Social: TreichVille Koubeissi Gare de Bassam - 30 BP 935 Abidjan 30 - RCCM Nº : CI-ABJ-03-2021-M-00857</p>
      <p style="margin:0px !important; font-size: 12px !important; ">Tél: 27 21 24 50 53 / GSM : 07 07 97 98 11 - Compte Bancaire SIB Nº : CI 007 01043 900000 16593 57</p>
      <p style="margin:0px !important; font-size: 12px !important; ">Email: info@pcp-express.com / pariscenter50@yahoo.fr - www.pcp-express.com</p>
      </div>
      
    </div>
      






     
    </div>
  </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
 
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
       globalQuantity:0,
        globalVolume:0,
        globalMount:0,
        montantTva:0,
        montantTtc:0,
        globalPoids:0,
        infoUserFact:"",
    };
  },
  components: {},
  computed: {
    
    ...mapGetters([
      'reteditFactureInfo',
      'retIsToPrint'
    ])
    
  },
  updated(){
    setTimeout(() => {
      if (this.retIsToPrint == true) {
      this.checkCurrentInvoice();
      this.$store.commit('MutIsClickToPrint', false)
      }
    }, 1000);
  },
  methods: {
    checkCurrentInvoice(){
      
      var libelleFromPay = this.reteditFactureInfo.transaction.paymentFrom.libelle;
      if (libelleFromPay == "DESTINATAIRE") {
          this.reteditFactureInfo.userInfo = this.reteditFactureInfo.transaction.recepteur;
        }

        else if (libelleFromPay == "EXPEDITEUR") {
          this.reteditFactureInfo.userInfo = this.reteditFactureInfo.transaction.expediteur;
        }

      // console.log('les datas ', this.reteditFactureInfo.invoiceDetails.length);
      if (this.reteditFactureInfo.invoiceDetails.length > 0) {

        this.globalVolume = 0;
        this.globalMount = 0;
        this.montantTva = 0;
        this.montantTtc = 0;
        this.globalPoids = 0;

        for (let i = 0; i < this.reteditFactureInfo.invoiceDetails.length; i++) {
          let elem = this.reteditFactureInfo.invoiceDetails[i];
          this.globalQuantity += elem.quantity;
          this.globalVolume += Number(elem.volume);
          this.globalPoids += Number(elem.pu);
          this.globalMount += elem.amount;
          
        }

        this.montantTva = (this.globalMount * 18 ) / 100;
        this.montantTtc = this.montantTva + this.globalMount;


        



      
         setTimeout(() => {
        
     
      var divElementContents = document.getElementById("printFact").innerHTML;
        var windows = window.open("", "", "height=400, width=400");
        windows.document.write("<html>");
        windows.document.write(divElementContents);
        windows.document.write("</body></html>");
        windows.document.close();
        windows.print();

        this.show = false;
        this.colisIsSubmit = false;
        }, 500);


      }

      else
      {
        this.$fire({
                      text: `Nous rencontrons un soucis veuillez réessayer ...`,
                      type: "error",confirmButtonText:'ok',
                      timer: 5000,
                    }); 
      }

      

// console.log("LES DANX X" , this.reteditFactureInfo);
        // console.log("QUANTITY ", this.globalQuantity);
        // console.log("VOLUME ", this.globalVolume);
        // console.log("poids ", this.globalPoids);
        // console.log("Montant total ", this.globalMount );
        // console.log("Montant Tva ", this.montantTva );
        // console.log("Montant TTC  ", this.montantTtc );

    }
  },

  mounted() {
  },
};
</script>

<style lang="scss">
.recu-block {
  .text-facture {
    margin-right: 0.5rem;
  }
  .recu p,
  label,
  span {
    font-size: 14px !important;
  }
  .recu-body p {
    padding: 0.5rem 0;
  }

  font-weight: bold;
}
</style>