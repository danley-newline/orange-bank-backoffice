import Vue from 'vue'
import VueRouter  from 'vue-router'
import DasboardPage from '../views/DasboardPage.vue'
import GestionPacksPage from '../views/GestionPacksPage.vue'
import DemandePretPage from '../views/DemandePretPage.vue'
import CompteAdmin from '../views/CompteAdmin.vue'
import Login from '../views/Login.vue'



Vue.use(VueRouter);

const routes = [
  {
    path:'*', 
    component:DasboardPage, 
    meta:{title:'Tableau de bord '}
  },

    {path:'/', 
    component:DasboardPage, 
    name:'dashboard', 
    meta:{title:'Tableau de bord'}
  },
    {path:'/gestion-packs', 
      component:GestionPacksPage, 
      name:'gestionPacks', 
      meta:{title:'Gestion de packs'},
    },
    {path:'/demande-pret', 
      component:DemandePretPage, 
      name:'demandePret', 
      meta:{title:'Demande de prêt'},
    },
    {
      path:'/login', 
        component:Login, 
        name:'Login', 
        meta:{title:'Page de connexion'}
    },
    
    {
      path:'/compte-admin', 
        component:CompteAdmin, 
        name:'CompteAdmin', 
        meta:{title:'Compte administrateur'}
    },

    
    

    
];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
})


export default router;
