<template>
    <div>
        <q-toolbar
            color="indigo"
            inverted
        >
        <q-btn size="sm" icon="add" round :to="'/campo/'+this.tabla_id"/>
            <q-toolbar-title>
                Campos
            </q-toolbar-title>
            <q-search
                    :debounce="600"             
                    placeholder="Buscar por campo"
                    style="min-width: 350px"
                    inverted
                    color="indigo"
                    v-model="search"
                >
                </q-search>
        </q-toolbar>
        <q-table
            class="no-shadow"
            :data="serverData"
            :columns="columns"
            row-key="campo_id"             
             @request="request(this.tabla_id)"
             :pagination.sync="pagination"
            dense
        >
            <template slot="body" slot-scope="props" :props="props">
                <q-tr  :props="props">                    
                    <q-td key="campo_id" :props="props">
                        <div class="row items-center no-wrap">
                            <q-btn size="sm" flat dense color="indigo" :to="'/campo/'+props.row.tabla_id+'/'+props.row.campo_id" icon="fas fa-edit"  class="q-mr-xs" />                        
                            <div>{{props.row.campo_id}}</div>
                            <q-checkbox color="indigo" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md"/>
                        </div>
                    </q-td>
                    <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
                    <q-td key="tipo_dato_text" :props="props">{{ props.row.tipo_dato_text }}</q-td>                                        
                    <q-td key="flg_pk" :props="props">
                        <q-checkbox color="indigo" v-model="props.row.flg_pk" true-value="1"
                        false-value="0" class="q-mr-md" readonly/>
                    </q-td>
                    <q-td key="flg_obligatorio" :props="props">                        
                        <q-checkbox color="indigo" v-model="props.row.flg_obligatorio" true-value="1"
                        false-value="0" class="q-mr-md" readonly/>
                    </q-td>
                </q-tr>
                <q-tr :props="props" v-show="props.expand">
                    <q-td colspan="100%" >
                        <div style="white-space: pre-wrap">{{props.row.descripcion}}</div>
                    </q-td>
                </q-tr>
            </template>
        </q-table>    
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'CampoLista',
    props:{
        tabla_id:{
            default:''
        },
        dmbs_id:{
            default:''
        },
        dbms_name:{
            default:''
        }
    },
    data:()=>({
        search:"",
        pagination: {
                page: 1,    
                rowsPerPage: 13 // 0 means all rows    
        },
        columns:[
            {
                name:'campo_id',
                label:'ID',
                align:'left',
                field:'campo_id'
            },
            {
                name:'nombre',                
                label:'nombre',
                align: 'left',
                field:'nombre'                
            },/*{
                name:'tipo_dato',
                label: 'Tipo de Dato',
                align: 'left',
                field:'tipo_dato'
            },*/
            {
                name:'tipo_dato_text',
                label:'Tipo de Dato',
                align:'left',
                field:'tipo_dato_text'
            },{
                name:'flg_pk',
                label:'PK',
                align:'left',
                field:'flg_pk',
            },{
                name:'flg_obligatorio',
                label:'Obligatorio',
                align:'left',
                field:'flg_obligatorio',
            }

        ],
        serverData:[]
    }),
    methods:{
        request(tabla_id){
            //console.log(this.tabla_id)
            axios
            .post('http://127.0.0.1:5000/entablar/Campo/Campo/get_campos_por_tabla',{              
                tabla_id:tabla_id
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
        }
    },
    mounted:function() {                 
        //Se actualiza la lista cuando se guarda el campo
        this.$parent.$on('guardar_campo', (data) => {
            this.request(data.tabla_id)                    
        });        
        //Se actualiza la lista cuando se cambia de tabla
        this.$parent.$on('tabla_reload', (data) => {            
            this.request(data.tabla_id)        
        });
        //Se actualiza la lista cuando se mira una tabla por primera vez
        this.request(this.tabla_id)
    }    
}
</script>

