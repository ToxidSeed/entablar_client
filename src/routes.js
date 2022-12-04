import Vue from 'vue'
import {BASE_PATH} from '@/js/constants.js'
import axios from 'axios'
import WinLogin from './components/WinLogin.vue'
//import WinMain from './components/WinMain.vue'
//import HelloWorld from '@/components/HelloWorld.vue'
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
import ResultadosBusqueda from './components/ResultadosBusqueda.vue';
import PanelDatabase from './components/PanelDatabase.vue'
import PanelEsquema from './components/PanelEsquema.vue'
import PanelTablaList from './components/PanelTablaList.vue'


Vue.use(VueRouter);

const routes =  [
    {
      path:'/', component:WinInicio,
      children: [
        {        
          path: '',component: WinIntro
        },
        {
          path:'/resultadosbusqueda/:search_text', 
          name:'resultadosbusqueda', 
          component:ResultadosBusqueda,
          props:true
        },
        { 
          path: '/tabla/:tabla_id', component: WinTabla, props:true,
          children:[
          {
            path:'',
            component:CampoLista,
            props:true
          }
          ]
        },
        {
          path: 'database/:database_id', component: PanelDatabase, props:true
        },
        {
          path: 'esquema/:esquema_id', component: PanelEsquema, props:true
        },{
          path: 'tlist', component:PanelTablaList, props:true
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
          path: '/proveedorbd/',component: WinProveedor, props:true,
          children:[
            {
              path:'',
              component: ProveedorBDLista
            }
          ]
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
          path:'/tipodato/:dbms_id', component:WinTipoDato, props:true,    
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
          path:'/tipodato/:dbms_id/:tipo_dato_id', component:WinTipoDato, props:true,        
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
    },
    {
      path:'/login', name:'login', component:WinLogin, props:true
    },
    {
      path:'/registrarse', component:WinRegistrarse, props:true
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
      path:'/proyecto/',component:WinProyecto, props:true    
    },
    {
      path:'/usuario/',component:WinUsuario, props:true    
    },{
      path:'/perfil/',component:WinPerfil, props:true    
    }
]

const router = new VueRouter({
  routes
})

/**
 * Deberia entrar al Login si es que 
*/
router.beforeEach(async(to, from, next) => {
  let token = localStorage.getItem('token')
  let token_valido = await validar_token(token)  
  
  if (token_valido != true){      
    if (to.name != 'login'){
      next({ name: 'login' })      
    }    
    next()        
  }
  
  if (to.name == 'login'){    
    next({name:'main'})      
  }
  next()  
})

async function validar_token(token){
  if (token == null || token == undefined){
    return false
  }

  const http = axios.create({
    baseUrl: BASE_PATH
  })

  const response = await http.post('/auth/LocalLoginController/validar_token',{
    token:token
  })

  let data = response.data 
  
  if (data.success == false){
    localStorage.removeItem('token')
    return false;
  }

  if (data.expired == true){    
    localStorage.removeItem('token')
    return false;
  }

  return true
}

export default router;