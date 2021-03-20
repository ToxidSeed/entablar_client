<template>
  <q-layout id="q-app" view="hHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="indigo" inverted>
        <q-btn
          flat
          dense          
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />        
        <q-btn icon="home" label="Entablar" flat to="/"></q-btn>
        <q-toolbar-title class="row">
            <div class="col-3"></div>
            <div class="col">              
              <q-input color="indigo" float-label="Buscar objetos de base de datos" v-model="search_text"/>              
            </div>
            <q-btn icon="fas fa-search" flat @click="buscar()">                              
            </q-btn>
            
            <div class="col-3"></div>            
        </q-toolbar-title>  

        <q-btn-dropdown flat 
            icon="fas fa-database" 
            :label="dbms.name" 
            no-caps
            @click="get_dbms_list"              
            >
          <q-list link>
            <q-item v-for="item in dbms_list" :key="item.proveedor_bd_id" v-close-overlay @click.native="set_dbms($event, item.proveedor_bd_id, item.nombre)">                
              <q-item-main>
                <q-item-tile label >{{item.nombre}}</q-item-tile>                  
              </q-item-main>                              
            </q-item>               
          </q-list>  
        </q-btn-dropdown> 

          <q-btn-dropdown flat icon="settings" label="Config" no-caps >            
            <q-list link>
              <q-item to="/proveedorbd/">
                <q-item-main>
                  <q-item-tile label >DBMS</q-item-tile>                
                </q-item-main>              
              </q-item>          
              <q-item to="/proyecto/">
                <q-item-main>
                  <q-item-tile label >Proyectos</q-item-tile>                
                </q-item-main>              
              </q-item>          
              <q-item to="/perfil/">
                <q-item-main>
                  <q-item-tile label>Perfil</q-item-tile>                
                </q-item-main>              
              </q-item>          
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown label="M" color="indigo" split>            
            <q-list link>
              <q-item>
                <q-item-main>
                  <q-item-tile label @click="sign_out" >Sign out</q-item-tile>                
                </q-item-main>              
              </q-item>                        
            </q-list>
          </q-btn-dropdown>          
          <!--<q-btn @click="sign_out" label="Sign Out" flat no-caps icon="fas fa-sign-out-alt"/>-->          
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer              
      v-model="leftDrawerOpen"      
    >
      <PanelOpciones/>
    </q-layout-drawer>

    <q-page-container>
      <router-view :dbms_id="dbms.id" :dbms_name="dbms.name">
      </router-view>      
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios'

//import { openURL } from 'quasarx'
//import TablaLista from './TablaLista.vue'
import PanelOpciones from './PanelOpciones.vue'
//import ResultadosBusqueda from './ResultadosBusqueda.vue'
//import WinMain from './components/WinMain.vue'

export default {
  name: 'WinInicio',
  components: {
    PanelOpciones
    //,ResultadosBusqueda
    /*TablaLista,
    WinMain    */
  },
  data () {
    return {
          search_text:"",
          showing:false,
          dbms:{
            name:"DBMS",
            id:""
          },        
          leftDrawerOpen: this.$q.platform.is.desktop,
          dbms_list:[]
    }
  },
  mounted:function(){
  },
  methods: {
    set_dbms: function(event, id, label){
      this.dbms.name = label    
      this.dbms.id =   id
    },
    buscar:function(){
      this.$router.push('/ResultadosBusqueda/'+this.search_text)
    },
    get_dbms_list: function(){
            axios
            .post(this.$backend_url+'ProveedorBDController/ProveedorBDController/get_list',{              
                nombre:""         
            }).then(({ data }) => {
              //console.log(data)
               this.dbms_list = data
               /* // updating pagination to reflect in the UI
                this.serverPagination = pagination

                // we also set (or update) rowsNumber
                this.serverPagination.rowsNumber = data.rowsNumber

                // then we update the rows with the fetched ones
                this.serverData = data.rows

                // finally we tell QTable to exit the "loading" state
                this.loading = false*/       
                console.log('get_dbms_list')         
            })
    },
    sign_out:async function(){
      const success_logout = await this.$gAuth.signOut()      
      console.log(success_logout)
      if(success_logout == true){        
        console.log(success_logout)
        localStorage.isAuthorized = false
        localStorage.authCode = ''
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>
.bg-brand {
  background: #2F2F2F;
}
.bg-aux {
  background: #CDE073;
}
</style>
