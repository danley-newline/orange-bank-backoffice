<template>
  <div class="pcp-sidebar">
    <div>
      <div class="py-2 px-2">
        <div class="logo-pcp" @click="$router.push('/')">
          <img src="../assets/obk/obk_logo.png" width="120px" alt="" />
        </div>

        <b-overlay :show="show" rounded="sm" class="product-loader">
          <div
            class="pcp-links pt-3 mt-5"
            :class="{ 'no-active-pcp-bg': showConf }"
            @click="showConf = false"
          >
            <div
              class="pcp-liens"
              :class="{ 'is-for-current-nav-childreen': WhichActiveIcon == i }"
              v-for="(item, i) in navlinks"
              :key="i"
              @click="checkLinkClass(i)"
            >
              <router-link
                :to="item.url"
                
              >
                <img
                  v-if="WhichActiveIcon != i"
                  class="side-light-img"
                  :src="require(`../assets/icons/${item.icon}`)"
                  alt=""
                />
                <img
                  v-if="WhichActiveIcon == i"
                  class="side-blue-img"
                  :src="require(`../assets/icons/${item.blueIcon}`)"
                  alt=""
                />

                <span class="">
                  {{ item.text }}
                </span>
              </router-link>
            </div>
          </div>
        </b-overlay>

        <div
          class="mb-5 block-conf"
        >
          <div class="conf" :class="{ active: showConf }" @click="callShowConf">
            <img src="../assets/icons/conf-icon.svg" alt="" />
            <span class="px-3">Configuration</span>
          </div>
          <div v-if="showConf">
            <div class="conf-child">
              <div
                class="pcp-liens"
                :class="{
                  'is-for-current-nav-childreen': WhichActiveIcon == i,
                }"
                v-for="(item, i) in confLinks"
                :key="i"
                @click="checkLinkClass(i)"
              >
                <router-link :to="item.url">
                  <img
                    v-if="WhichActiveIcon != i"
                    class="side-light-img"
                    :src="require(`../assets/icons/${item.icon}`)"
                    alt=""
                  />
                  <img
                    v-if="WhichActiveIcon == i"
                    class="side-blue-img"
                    :src="require(`../assets/icons/${item.blueIcon}`)"
                    alt=""
                  />

                  <span class="">
                    {{ item.text }}
                  </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="logout-block mb-3">
          <div class="logout-content">
            <div
              class="logout-liens"
              v-for="(item, i) in logoutLinks"
              :key="i"
              @click="logoutUser"
            >
              <router-link :to="item.url">
                <img :src="require(`../assets/icons/${item.icon}`)" alt="" />

                <span :class="item.color">
                  {{ item.text }}
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      showConf: false,
      show: false,
      WhichActiveIcon: null,
      scrollData: 0,
      lastActiveTime: new Date(),
      LogoutTimeOut: 900000,
      navlinks: [
        {
          icon: "side-vitesse-light.svg",
          blueIcon: "side-vitesse.svg",
          text: "Tableau de bord",
          url: "/",
        },
        {
          blueIcon: "colis-blue.svg",
          icon: "colis-light.svg",
          text: "Nos Packs",
          url: "/gestion-packs",
        },
        {
          blueIcon: "caisse-icon-blue.svg",
          icon: "caisse-icon.svg",
          text: "Demande de prêt",
          url: "/demande-pret",
        },
        
      ],
      confLinks: [
        {
          blueIcon: "add-client.svg",
          icon: "user.svg",
          text: "Compte admin",
          url: "/compte-admin",
        },
      ],
      logoutLinks: [
        {
          icon: "logout-icon.svg",
          text: "Se déconnecter",
          url: "#!",
          color: "text-danger",
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      ""
      ]),
  },
  methods: {
    checkLinkClass(e) {
      this.WhichActiveIcon = e;
    },
    callShowConf() {
      this.WhichActiveIcon = null;
      this.showConf = !this.showConf;
    },
    logoutUser() {
      this.$store.commit("mutLogin", false);
      localStorage.clear();
    },
    onScroll(e) {
      this.scrollData = window.top.scrollY;
    },
    InactivTime() {
      // RENITIALISATION DE LA VARIABLE
      this.lastActiveTime = new Date();
    },

    logoutInactivUser() {
      var currentTime = Date.now();
      // VERIFICATION TEMPS D'INACTIVITÉ SUPERIEUR AU TEMPS LIMIT AVANT DECONNECTION
      if (currentTime - this.lastActiveTime > this.LogoutTimeOut) {
        this.logoutUser();
      }

    },
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  mounted() {
    // VERIFICATION DU SCROLL POUR L'EMPLACEMENT DE L'ICON USER DANS LA NAVBAR
    window.addEventListener("scroll", this.onScroll);

    // RENITIALISATION DU TEMPS D'ACTIVITÉ AVEC DECONNECTION AUTOMATIQUE
    // LORS DU SURVOL DE LA SOURIS
    window.addEventListener("mousemove", this.InactivTime);
    // LORS DU CLICK
    window.addEventListener("keypress", this.InactivTime);
    // LORS DU SCROLL
    window.addEventListener("scroll", this.InactivTime);
  },

  created() {
    //APPEL DE LA FUNCTION DE LOGOUT AUTOMATIQUE CHAQUE 1SECONDE
    this.interval = setInterval(() => this.logoutInactivUser(), 1000);
  },
};
</script>

<style lang="scss">
// img.svg-img{
//         filter: invert(38%) sepia(13%) saturate(7331%) hue-rotate(350deg) brightness(99%) contrast(87%);
//       }
//ANIMATION AFFICHAGE TEXT SIDEBAR
.not-colapsed-sidebar {
  .pcp-sidebar {
    width: 240px !important;
    //  transition: 0.5s ease;
  }
  a span {
    -webkit-animation: 2.5s ease 0s normal forwards 1 fadein;
    animation: 2.5s ease 0s normal forwards 1 fadein;
  }
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.colapsed-sidebar {
  width: 100px !important;

  .pcp-sidebar {
    width: 100px;
    transition: 0.5s ease;
  }

  .logo-pcp {
    text-align: center;
    img {
      width: 70px;
    }
  }

  .pcp-liens,
  .logout-liens,
  .block-conf {
    text-align: center;
    a span,
    span {
      display: none !important;
    }
  }
}

.pcp-sidebar {
  position: fixed;
  height: 100vh;
  background: #fff;

  .pcp-liens {
    margin-top: 1rem;

    a.router-link-exact-active.router-link-active,
    &.is-for-current-nav-childreen a {
      background: #f16e0117;
      border-radius: 10px;
      font-weight: bold;
      color: #f16e01 !important;

      span {
        border-right: 3px solid #f16e01;
      }
    }
  }

  .no-active-pcp-bg {
    .pcp-liens {
      a.router-link-exact-active.router-link-active,
      &.is-for-current-nav-childreen a {
        background: none !important;
        color: #7c7373 !important;

        span {
          border-right: none !important;
        }
      }
    }
  }

  .pcp-liens,
  .logout-liens {
    a {
      font-size: 13px;
      color: #7c7373 !important;
      text-decoration: none;
      padding: 1rem 1rem;

      span {
        padding-left: 1rem;
        padding-right: 2rem;
      }
    }
  }

  .conf {
    padding: 0.8rem 1rem;

    &:hover {
      cursor: pointer;
    }
    span {
      font-size: 13px !important;
      color: #7c7373 !important;
    }

    &.active {
      background: #f2f6ff;
      border-radius: 10px;

      p {
        font-weight: bold;
        color: #0f4476 !important;
      }
    }
  }

  .conf-child {
    padding-left: 1vw;
    img {
      width: 1vw;
    }
  }

  .logo-pcp {
    text-align: center;
    margin: 30px auto;

    &:hover {
      cursor: pointer;
    }
  }

  .logout-liens {
    margin-top: 1rem;
  }
  .logout-block {
    position: absolute;
    bottom: 0;
  }
}

.pcp-links .pcp-liens:last-child {
  .side-light-img {
    filter: brightness(0) saturate(100%) invert(41%) sepia(75%) saturate(1303%) hue-rotate(4deg) brightness(98%) contrast(99%);
  }

  .router-link-exact-active {
    .side-blue-img {
      filter: brightness(0) saturate(100%) invert(41%) sepia(75%) saturate(1303%) hue-rotate(4deg) brightness(98%) contrast(99%);
    }
  }
}
</style>