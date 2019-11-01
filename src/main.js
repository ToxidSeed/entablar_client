import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/ionicons'
import 'quasar-extras/mdi'
import Quasar from 'quasar'

import WinLogin from './components/WinLogin.vue'
import WinRegistrarse from './components/WinRegistrarse.vue'
import WinCampo from './components/WinCampo.vue'
import WinTabla from './components/WinTabla.vue'
import WinProveedor from './components/WinProveedor.vue'
import TipoDatoLista from './components/TipoDatoLista.vue'
import CampoLista from './components/CampoLista.vue'
import WinTipoDato from './components/WinTipoDato.vue'
import ProveedorBDLista from './components/ProveedorBDLista.vue'
//import WinIntro from './components/WinIntro.vue'
import WinProyecto from './components/WinProyecto.vue'
import WinUsuario from './components/WinUsuario.vue'
import WinPerfil from './components/WinPerfil.vue'



const routes = [
  /*{
      path:'/', component:WinIntro, props:true
  },*/
  {
    path:'/', component:WinLogin, props:true
  },
  {
    path:'/registrarse', component:WinRegistrarse, props:true
  },
  { 
    path: '/campo/:tabla_id', component: WinCampo, props:true,
    children:[
      {
        path:'',
        component:CampoLista,
        props:true
      }
    ] 
  },{ 
    path: '/campo/:tabla_id/:campo_id', component: WinCampo, props:true,
    children:[
      {
        path:'',
        component:CampoLista,
        props:true
      }
    ] 
  },
  { path: '/tabla/:tabla_id', component: WinTabla, props:true,
    children:[
      {
        path:'',
        component:CampoLista,
        props:true
      }
    ]
   },
  { path: '/tabla/', component: WinTabla, props:true,
    children:[
      {
        path:'',
        component:CampoLista,
        props:true
      }
    ]
  },
  { 
    path: '/proveedorbd/',component: WinProveedor, props:true,
    children:[
      {
        path:'',
        component: ProveedorBDLista
      }
    ]
  },
  {
    path:'/proyecto/',component:WinProyecto, props:true    
  },
  {
    path:'/usuario/',component:WinUsuario, props:true    
  },{
    path:'/perfil/',component:WinPerfil, props:true    
  },
  { 
    path: '/proveedorbd/:proveedor_bd_id',component: WinProveedor, props:true,
    children:[
      {
        path:'',
        component:TipoDatoLista,
        props:true
      }
    ]
  },
  {
    path:'/tipodato/:proveedor_bd_id', component:WinTipoDato, props:true,    
    name:'x',    
    children:[
      {
        path:'',
        component:TipoDatoLista,
        props:true
      }
    ]
  },
  {
    path:'/tipodato/:proveedor_bd_id/:tipo_dato_id', component:WinTipoDato, props:true,        
    name:'y',    
    children:[
      {
        path:'',
        component:TipoDatoLista,
        props:true
      }
    ]
  }
  
]

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)

Vue.use(
  Quasar
 )


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
