<template>
  <div class="">
    

    <div  class="recu">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        "
      >
        <div class="">
          <img
            src="../../assets/icons/logo-pcp.svg"
            style="margin-bottom: 5px"
            alt=""
          />
          <div style="color: #0f4477; font-weight: bold">
            <p style="font-size: 12px !important">TEL : 27 21 24 50 53</p>
            <p style="font-size: 12px !important">TEL : 07 77 91 00 13</p>
            <p style="font-size: 12px !important">
              Email: pariscenter50yahoo.fr
            </p>
            <p style="font-size: 12px !important">
              Treichville Centre Commercial Koubeïssi 9C3
            </p>
          </div>
        </div>
        <div class="">
          <h1
            style="
              font-size: 20px !important;
              color: #0f4477;
              font-weight: bold;
              text-transform: uppercase;
            "
          >
            Reçu de paiement IMPORT
          </h1>
        </div>
        <div class="">
          <p>
            <span style="color: #0f4477; font-weight: bold"> Date: </span>
            <span> {{ date | moment(`DD/MM/YYYY`) }} </span>
          </p>
        </div>
      </div>

      <div class="recu-body">
        <div
          class="block-head"
          style="
            margin-bottom: 5px;
            padding-left: 10px;
            border: 2px solid #0f4477;
          "
        >
          <p>
            <span style="color: #0f4477; font-weight: bold"
              >Noms et Prénoms du client</span
            >
            : <span>{{client.nom}} {{client.prenoms}}</span>
          </p>
          <p>
            <span style="color: #0f4477; font-weight: bold">Nº de Tél</span> :
            <span>{{client.tel}} </span>
          </p>
          <p>
            <span style="color: #0f4477; font-weight: bold"
              >Nº de CNI/ONI/P.C</span
            >
            : <span>{{client.cni}}</span>
          </p>
        </div>

        <div class="">
          <p>
            <span style="color: #0f4477; font-weight: bold"
              >Code de la transaction</span
            >
            : <span> {{infoPaiement.code}}</span>
          </p>

        </div>

        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          width:85%;
        ">
         <p>
            <span style="color: #0f4477; font-weight: bold">Montant total</span> :
            <span>{{Number(infoPaiement.amount).toLocaleString()}} Fcfa</span>
          </p>

           <p>
            <span style="color: #0f4477; font-weight: bold"> Versements antérieurs</span> :
            <span>{{Number(infoPaiement.globalVerse).toLocaleString()}} Fcfa</span>
          </p>

        </div>

        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          width:85%;
        ">
        <div class="">
            <p>
              <span style="color: #0f4477; font-weight: bold">Nouveau versement </span> :
              <span>{{Number(montantSend).toLocaleString()}} Fcfa</span>
            </p>
          </div>

          <div class="">
            <p>
              <span style="color: #0f4477; font-weight: bold">À Rendre </span> :
              <span>{{Number(rendre).toLocaleString()}} Fcfa</span>
            </p>
          </div>

          <div class="">
            <p>
              <span style="color: #0f4477; font-weight: bold">Reste à payer</span> :
              <span>{{Number(reste).toLocaleString()}} Fcfa</span>
            </p>
          </div>
        </div>

        <p style="color: #0f4477">
          NB : Le client est responsable du colis en cas de contrôle ou saisie
          pour origine douteuse,
          <span style="font-weight: bold"
            >Paris Center décline toutes responsabilités.</span
          >
        </p>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #0f4477;
          font-weight: bold;
        "
      >
        <p style="text-decoration: underline #0f4477">
          <span>Signature PCP Express</span>
        </p>

        <p style="text-decoration: underline #0f4477">
          <span>Signature Client</span>
        </p>
      </div>
    </div>
  </div>
</template>



<script>
import { mapGetters } from "vuex";

export default {
  props:['infoPaiement','client','rendre','reste', 'montantSend'],
   
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
    };
  },
  components: {},
  
  methods: {
   
  },

  mounted() {},
};
</script>

<style lang="scss">
.text-facture {
  margin-right: 0.5rem;
}
.colis-fact input {
  width: 4rem;
  border-radius: 0px !important;
  border: 2px solid #0f4477;
}
.recu p,
label {
  font-size: 14px !important;
}
.recu-body p {
  padding: 0.5rem 0;
}

.text-facture {
  color: #0f4477;
  font-weight: bold;
}

.center-title {
  background: #0f4477;
  padding: 0.4rem 1rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;

  h2 {
    color: #fff;
    margin-bottom: 0px !important;
  }
}
</style>