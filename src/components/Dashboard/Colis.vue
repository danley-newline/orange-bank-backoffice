<template>
  <div>
    <div class="colis mt-5">
      <p class="text-dark mb-3 fs-5 fw-bold"> Pack & Demande</p>

      <div class="row">
        <div class="col-md-3 colis-md-3-width">
          <div class="bg-white box-shadow-d3 py-3 px-4 border-rad-10 h-100">
            <div class="d-flex">
              <img
                src="../../assets/icons/colis-out.svg"
                class="img-1-5vw"
                alt=""
              />
              <p class="mx-3 green-color-60 titre-colis">Colis total</p>
            </div>
            <div class="mb-3 mt-4">
              <h2 class="fw-bold text-dark">{{Number(GlobalColis).toLocaleString()}}</h2>
            </div>
            <div class="d-flex justify-content-between see-more-details">
              <a href="" @click="gotoColis">Voir plus de Détails</a>
              <span><img src="../../assets/icons/out-click.svg" class="img-0-9vw" alt="" /></span>
            </div>
          </div>
        </div>

        <div class="col-md-5 colis-md-5-width">
          <div class="bg-white box-shadow-d3 py-3 px-4 border-rad-10 h-100">
            <div class="d-flex">
              <img
                src="../../assets/icons/colis-stock.svg"
                class="img-1-5vw"
                alt=""
              />
              <p class="mx-3 text-dark titre-colis">Colis en stock</p>
            </div>
            <div class="row mt-4">
              <div class="col-md-12">
                <div class="p-2 px-3 bg-brown-fc border-rad-10">
                  <h2>{{Number(ColisArrive).toLocaleString()}}</h2>
                  <p class="text-gray-75">En attente d'expedition</p>
                </div>
              </div>
              <div class="col-md-6 d-none">
                <div class="p-2 px-3 bg-green-f2 border-rad-10">
                  <h2>{{Number(ColisReception).toLocaleString()}}</h2>
                  <p class="text-gray-75">En attente de livraison</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-5 colis-md-5-width">
          <div class="row h-100">
            <div class="col-md-6">
              <div class="bg-white box-shadow-d3 py-3 px-4 border-rad-10 h-100">
                <div class="d-flex">
                  <img
                    src="../../assets/icons/colis-trans.svg"
                    class="img-1-5vw"
                    alt=""
                  />
                  <p class="mx-3 orange-color-df titre-colis">
                    Colis en transit
                  </p>
                </div>
                <div class="mb-3 mt-4 text-center">
                  <h2 class="fw-bold text-dark">{{Number(ColisTransit).toLocaleString()}}</h2>
                </div>
                <div class="d-flex  justify-content-between see-more-details">
                  <!-- <a href="" @click="gotoColis">Voir plus de Détails</a> -->
                  <span
                    ><img src="../../assets/icons/trans-icon.svg" class="img-0-9vw" alt=""
                  /></span>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div
                class="
                  bg-white
                  border-green-78
                  py-3
                  px-4
                  border-rad-10
                  h-100
                  text-center
                "
              >
                <div class="">
                  <img src="../../assets/icons/check-success.svg" class="img-1-7vw" alt="" />
                  <p class="my-2 green-color-78 titre-colis">Colis livré</p>
                </div>
                <div class="mt-3">
                  <h2 class="fw-bold text-dark">{{Number(ColisLivre).toLocaleString()}}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    ColisArrive:{
      type: Number
    },
    ColisLivre:{
      type: Number
    },
    ColisReception:{
      type: Number
    },
    ColisTransit:{
      type: Number
    },
    GlobalColis:{
      type: Number
    },
  },
  methods:{
    gotoColis(){
      this.$router.push({name: 'gestionColis'})
    }
  }
};
</script>

<style lang="scss">
.titre-colis {
  font-size: 24px;
}

.see-more-details {
  a {
    color: #737271;
    font-size: 0.8vw;
    text-decoration: none;
    border-bottom: 1px solid #737271;
  }
}

.colis-md-3-width {
  width: 20%;
}
.colis-md-5-width {
  width: 40%;
}
</style>