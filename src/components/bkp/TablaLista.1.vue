<template>
    <div>
    <q-search 
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
       />
    <!--<q-toolbar> 
    </q-toolbar>-->    
    <q-table class="no-shadow"                                  
            :data="serverData"
            :columns="columns"
            row-key="name"       
            @request="request"     
            :rows-per-page-options="[0]"
            :pagination.sync="pagination"
            dense
            table-style="height:100%;"  
            grid          
        >
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
         rowsPerPage: 16 // 0 means all rows    
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
      serverData:[]      
  }),
  methods:{
    request(){
            console.log('sss')
            
            
            axios
            .post('http://127.0.0.1:5000/entablar/Tabla/Tabla/get_tablas_list',{              
                nombre:this.search_text          
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
                console.log(this.serverData )
            })
            .catch(error => {
                console.log(error)
                // there's an error... do SOMETHING

                // we tell QTable to exit the "loading" state
               
            })
    }
  },
    mounted:function() {           
      console.log('mounted')     
      this.request()
    }
}
</script>