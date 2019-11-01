<template>
    <div>
    <!--<q-search 
      stack-label="Buscar por Tabla"
      inverted      
      :debounce="600"
      no-icon
      placeholder="Ingresar nombre o descripción..." 
      v-model="search_text"    
      @input="request"  
      :before="[
        {
          icon: 'search',
          handler () {
            request()
          }
        }
      ]"
       />-->
    <q-toolbar color="indigo" inverted> 
      <q-btn icon="add" size="sm" color="indigo" round to="/tabla/"/>
      <q-toolbar-title>Lista de Tablas</q-toolbar-title>
      <q-btn flat round dense icon="fas fa-sliders-h">      
          <q-popover>
              <q-card>
                <q-card-main>
                  <q-checkbox v-model="filters.show_deleted_tables" label="Incluir tablas eliminadas" color="indigo"/>
                </q-card-main>
                <q-card-actions align="end" >
                    <q-btn label="aceptar" color="indigo" size="sm" @click="request"  />
                </q-card-actions>
              </q-card>              
          </q-popover>
      </q-btn>
    </q-toolbar>  
    <q-table class="no-shadow"                                  
            :data="serverData"
            :columns="columns"
            row-key="name"       
            @request="request"     
            :rows-per-page-options="[0]"
            :pagination.sync="pagination"
            dense            
            grid          
        >
      <template slot="top-left" >
        <q-search                   
          color="indigo" 
          :debounce="600"
          class="col-6"
          inverted
          style="min-width: 285px"
          no-icon
          stack-label="Buscar por Tabla"
          placeholder="Ingresar nombre o descripción..." 
          v-model="search_text"    
          @input="request"  
          :before="[
            {
              icon: 'search',
              handler () {
                request()
              }
            }
          ]"
        />
      </template>
      <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="nombre" 
              :props="props"                                      
              >              
              <router-link :to="'/tabla/'+props.row.tabla_id" tag="div">{{ props.row.nombre }}</router-link>
          </q-td>
      </q-tr>
    </q-table> 
    </div>
</template>
<style>    
  /* div .q-if .q-input-target::-webkit-input-placeholder{
    color: white !important;
  }*/
  /*.my-inverted .q-if-inner input {
    color: black !important;
  }*/

</style>
 
<script>
import axios from 'axios'

export default {
  name: 'TablaLista',
  /*components:{
        WinCampo
  },*/
  data: ()=>({
      pagination: {
         page: 1,    
         rowsPerPage: 13 // 0 means all rows    
      },           
      form_data:{
        tabla_id:"",
        campo_id:"",
        nombre:"",
        descripcion:"",
        tipo_dato:"",
        longitud:"",
        precision:""
      },
      search_text:"",      
      columns:[
          {
            name: 'nombre',
            required: true,
            label: 'Tablas',
            align: 'left',
            field: 'nombre',
            sortable: true
          }
      ],
      filters:{
        show_deleted_tables:false
      },
      serverData:[]      
  }),
  methods:{
    request(){
            axios
            .post('http://127.0.0.1:5000/entablar/Tabla/Tabla/get_tablas_list',{              
                nombre:this.search_text,
                mostrar_tablas_eliminadas: this.filters.show_deleted_tables

            })
            .then(({ data }) => {
               this.serverData = data.rows
               /* // updating pagination to reflect in the UI
                this.serverPagination = pagination

                // we also set (or update) rowsNumber
                this.serverPagination.rowsNumber = data.rowsNumber

                // then we update the rows with the fetched ones
                this.serverData = data.rows

                // finally we tell QTable to exit the "loading" state
                this.loading = false*/

            })
            .catch(error => {
                console.log(error)
                // there's an error... do SOMETHING

                // we tell QTable to exit the "loading" state
               
            })
    }
  },
    mounted:function() {                 
      this.request()
    }
}
</script>