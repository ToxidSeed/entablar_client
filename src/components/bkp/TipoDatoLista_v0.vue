<template>
    <div>    
    <q-toolbar
        color="primary"
        inverted
        
    > 
    <q-btn size="sm" icon="add" @click="open" round :to="'/tipodato/'+this.proveedor_bd_id"/>
    <q-toolbar-title>
        Tipos de Dato                
    </q-toolbar-title>
      
      <q-search
                :debounce="600"             
                placeholder="Buscar por nombre de tipo de dato"
                 style="min-width: 350px"
                 inverted
                  v-model="search_text"  
            >
            </q-search>
    </q-toolbar>  
    <q-table class="no-shadow"
        :data="serverData"
        :columns="columns"
        row-key="name"
        @request="request"
        :pagination.sync="pagination"
        dense            
        grid 
    >               
    </q-table>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:"TipoDatoLista",
    props:["proveedor_bd_id","tipo_dato_lista_id"],
    data(){
        return {
            pagination: {
                page: 1,    
                rowsPerPage: 13 // 0 means all rows    
            },
            search_text:"",   
            columns:[{
                name:'tipo_dato_id',                
                label:'ID',
                align:'left',
                field:'tipo_dato_id'
            },{
                name:'nombre',                
                label:'Nombre',
                align:'left',
                field:'nombre'
            },{
                name:'tipo_dato_primario',                
                label:'Tipo Dato Primario',
                align:'left',
                field:'tipo_dato_primario'
            },{
                name:'tamano_maximo',                
                label:'Tamano Maximo',
                align:'left',
                field:'tamano_maximo'
            },{
                name:'tamano_minimo',                
                label:'Tamano Minimo',
                align:'left',
                field:'tamano_minimo'
            },{
                name:'precision_maxima',                
                label:'Precision Maxima',
                align:'left',
                field:'Precision Maxima'
            },{
                name:'precision_minima',                
                label:'Precision Minima',
                align:'left',
                field:'Precision Minima'
            },{
                name:'scala_maxima',                
                label:'Scala Maxima',
                align:'left',
                field:'Scala Maxima'
            },{
                name:'scala_minima',                
                label:'Scala Minima',
                align:'left',
                field:'Scala Minima'
            }],
            serverData:[]
        }
    },
    methods:{
        request(){
            axios
            .post('http://127.0.0.1:5000/entablar/TipoDato/TipoDato/get_list',{                              
                nombre: this.search_text,
                proveedor_bd_id:this.proveedor_bd_id
            }).then(({ data }) => {
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
        },
        open(){
            console.log(this.proveedor_bd_id)
        }
    },
    mounted:function() {           
      console.log('mounted_TipoDatoLista')     
      this.request()
    }
}
</script>

