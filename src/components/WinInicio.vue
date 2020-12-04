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

        <q-toolbar-title>
          <q-btn icon="home" label="Entablar" flat to="/"></q-btn>              
          <!--<div slot="subtitle">Running on Quasar v{{ $q.version }}</div>-->
        </q-toolbar-title>  

          <q-btn-dropdown flat 
              icon="fas fa-database" 
              :label="dbms.name" 
              no-caps
              @click="get_dbms_list"              
              >
            <q-list link>
              <q-item v-for="item in dbms_list" :key="item.proveedor_bd_id" v-close-overlay @click.native="doSomething($event, item.proveedor_bd_id, item.nombre)">                
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
                  <q-item-tile label >proyectos</q-item-tile>                
                </q-item-main>              
              </q-item>          
              <q-item to="/perfil/">
                <q-item-main>
                  <q-item-tile label>perfil</q-item-tile>                
                </q-item-main>              
              </q-item>          
            </q-list>
          </q-btn-dropdown>
          <q-btn @click="sign_out" label="Sign Out" flat no-caps icon="fas fa-sign-out-alt"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer              
      v-model="leftDrawerOpen"      
    >
      <TablaLista></TablaLista>      
    </q-layout-drawer>

    <q-page-container>
      <router-view :dbms_id="dbms.id" :dbms_name="dbms.name">
      </router-view>
      <!--<WinMain />-->
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios'

//import { openURL } from 'quasarx'
import TablaLista from './TablaLista.vue'
//import WinMain from './components/WinMain.vue'

export default {
  name: 'WinInicio',
  components: {
    TablaLista/*,
    WinMain    */
  },
  data () {
    return {
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
    doSomething: function(event, id, label){
      this.dbms.name = label    
      this.dbms.id =   id
    },
    get_dbms_list: function(){
            axios
            .post('http://127.0.0.1:5000/entablar/ProveedorBD/ProveedorBD/get_list',{              
                nombre:""         
            }).then(({ data }) => {
               this.dbms_list = data.rows
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
