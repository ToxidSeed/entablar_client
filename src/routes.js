import Vue from 'vue'
import WinLogin from './components/WinLogin.vue'
//import WinMain from './components/WinMain.vue'
import WinInicio from './components/WinInicio.vue'
import WinRegistrarse from './components/WinRegistrarse.vue'
import WinCampo from './components/WinCampo.vue'
import WinTabla from './components/WinTabla.vue'
import WinProveedor from './components/WinProveedor.vue'
import TipoDatoLista from './components/TipoDatoLista.vue'
import CampoLista from './components/CampoLista.vue'
import WinTipoDato from './components/WinTipoDato.vue'
import ProveedorBDLista from './components/ProveedorBDLista.vue'
import WinIntro from './components/WinIntro.vue'
import WinProyecto from './components/WinProyecto.vue'
import WinUsuario from './components/WinUsuario.vue'
import WinPerfil from './components/WinPerfil.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes =  [
    {
      path:'', component:WinInicio,
      children: [
        {        
          path: '',component: WinIntro
        }
      ]
    },
    {
      path:'/login', name:'login', component:WinLogin, props:true
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

/**
 * Deberia entrar al Login si es que 
*/
router.beforeEach((to, from, next) => {
  /*if(to.name == 'callback') { // check if "to"-route is "callback" and allow access
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0 login
    router.app.$auth.login()
  }*/
  /**Si no está logeado, te debe llevar a la ventana de login
   */

  let isAuthorized = localStorage.getItem('isAuthorized')  
  let authCode = localStorage.getItem('authCode');
  
  console.log(authCode)
  console.log(isAuthorized)

  if(isAuthorized == "true"){
    console.log(isAuthorized)
    if(to.path == '/login'){
      router.push('/')
    }else{
      next()
    }
  }else{
    console.log(to)
    if(to.path == '/login'){
      next()
    }else{      
      router.push('/login')
    }    
  }  
})

export default router;