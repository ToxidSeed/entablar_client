<template>
  <v-app>
    <v-app-bar app
    >
      <v-app-bar-nav-icon @click="(drawer=!drawer)"></v-app-bar-nav-icon>    
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue darken-4"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-cog
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="{name:'datastoragesystem'}">
            <v-list-item-title>Data Storage System</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>      
      <v-btn icon @click="cerrar_cesion">
        <v-icon
          color="red darken-4"
        >
          mdi-power-plug-off
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      
    </v-navigation-drawer >      
    <v-main>
        <router-view></router-view>      
    </v-main>    
  </v-app>
</template>

<script>
import axios from 'axios'

//import { openURL } from 'quasarx'
//import TablaLista from './TablaLista.vue'
//import PanelOpciones from './PanelOpciones.vue'
//import ResultadosBusqueda from './ResultadosBusqueda.vue'
//import WinMain from './components/WinMain.vue'
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'WinInicio',
  components: {
    //HelloWorld
    //PanelOpciones
    //,ResultadosBusqueda
    /*TablaLista,
    WinMain    */
  },
  data () {
    return {
          drawer:false,
          search_text:"",
          showing:false,
          dbms:{
            name:"DBMS",
            id:""
          },        
          //leftDrawerOpen: this.$q.platform.is.desktop,
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
              console.log(data)
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
    cerrar_cesion:async function(){      
      localStorage.clear()
      this.$router.push('/login')
      
      /*const success_logout = await this.$gAuth.signOut()      
      console.log(success_logout)
      if(success_logout == true){        
        console.log(success_logout)         
        localStorage.isAuthorized = false
        localStorage.authCode = ''
        this.$router.push('/login')
      }*/
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
