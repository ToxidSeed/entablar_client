<template>
    <div>    
    <q-toolbar
        color="indigo"
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
                 color="indigo"
                 inverted
                  v-model="search_text"  
            >
            </q-search>
    </q-toolbar>  
    <q-table class="no-shadow"
        :data="serverData"
        :columns="columns"
        selection="multiple"
        row-key="tipo_dato_id" 
        @request="request"
        :pagination.sync="pagination"
        dense                    
    >                   
        <template slot="body" slot-scope="props" :props="props">
            <!--importante que el row-key sea unico y númerico-->
            <q-tr :props="props">            
                <q-td key="tipo_dato_id" :props="props">
                    <q-btn icon="fas fa-edit" color="indigo" size="sm" flat round :to="'/tipodato/'+props.row.proveedor_bd_id+'/'+props.row.tipo_dato_id"/>
                    <q-checkbox color="indigo" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
                    {{props.row.tipo_dato_id}}
                </q-td>
                <q-td key="nombre" :props="props">                                
                    {{props.row.nombre}}
                </q-td>
                <q-td key="descripcion" :props="props">                
                    {{props.row.descripcion}}
                </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                    <div style="white-space: pre-wrap">{{props.row.config}}</div>
                </q-td>
            </q-tr>
        </template>
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
                name:'descripcion',
                label:'Descripción',
                align:'left',
                field:'descripcion'
            }],
            serverData:[]
        }
    },
    methods:{        
        request(){            
            axios
            .post('http://127.0.0.1:5000/entablar/TipoDato/TipoDato/get_list',{                              
                tipo_dato_nombre: this.search_text,
                dbms_id:this.proveedor_bd_id
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
                //console.log(this.serverData )
            })
        },
        open(){
            console.log(this.proveedor_bd_id)
        }
    },
    mounted:function() {                  
      this.$parent.$on('guardar_tipo_dato', () => {
          this.request()
      })
      this.request()
    }
}
</script>

