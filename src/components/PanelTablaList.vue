<template>
    <div>     
        <div class="q-pa-md text-indigo">TABLAS</div>  
        <div> 
        <q-table class="no-shadow"                   
            :data="table_data"
            :columns="columns"
            row-key="id"
            :pagination.sync="pagination"
            selection="multiple"
            :selected.sync="selected"
        >             
             <template slot="top-left" class="row">
                <div>
                    <q-btn label="Nuevo"  color="indigo" to="/tabla/0"/>  
                </div>
                <div class="q-pl-sm">                 
                    <q-btn label="Eliminar" color="red" :outline="btn_eliminar_disable" :disable="btn_eliminar_disable" @click="show_dialog_confirm_eliminar" />                  
                </div>
                <div class="q-pl-sm">
                    <q-search style="min-width: 400px"
                        color="secondary"
                        v-model="search_text"  
                        @keydown="keydown_search_handler"                      
                    />                                             
                </div>
            </template>            
            <q-tr slot="body" slot-scope="props" :props="props" @dblclick.native="rowClick(props.row)" class="cursor-pointer">
                <td><q-checkbox v-model="props.selected" /></td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                 {{ col.value }} 
                </q-td>
            </q-tr>
        </q-table>               
        </div>
        <ConfirmMessage 
        ref="ConfirmMessage"
        v-on:confirm-eliminar="eliminar"
        />
    </div>
</template>
<script>
import ConfirmMessage from './ConfirmMessage.vue'

export default {
    name:"PanelTablaList",
    components:{
        ConfirmMessage
    },
    data(){
        return {
            columns:[{
                name:'id',
                label:'id',
                field: 'id'
            },{
                name:'nombre',
                label:'nombre',
                field:'nombre'
            },{
                name:'dbms_nombre',
                label:'dbms',
                field:'dbms_nombre'
            },{
                name:'database_nombre',
                label:'Base de datos',
                field:'database_nombre'
            },{
                name:'esquema_nombre',
                label:'Esquema',
                field:'esquema_nombre'
            },{
                name:'desc_abreviada',
                label:'descripcion',
                field:'desc_abreviada'
            },{
                name:'estado_nombre',
                label:'estado',
                field:'estado_nombre'
            },{
                name:'fch_creacion',
                label:'fecha de registro',
                field:'fch_creacion'
            },{
                name:'fch_modificacion',
                label:'fecha de modificacion',
                field:'fch_modificacion'
            }],
            table_data:[],
             pagination: {
                sortBy: null, // String, column "name" property value
                descending: false,
                page: 1,
                rowsPerPage: 10 // current rows per page being displayed
            },
            search_text:"",
            selected:[]
        }
    },
    computed:{
        btn_eliminar_disable:function(){            
            if (this.selected.length == 0){
                return true;
            }else{
                return false;
            }
        }
    },
    mounted:function(){
        this.get_list()
    },
    methods:{
        get_list:function(){
            this.$http
            .post(this.$backend_url+'Tabla/TablaList/get',{ 
                search_text:this.search_text
            }).then((response)=>{                
                this.table_data = response.data.data
                console.log(this.table_data)
            })
        },
        keydown_search_handler:function(keydata){
            if (keydata.key == "Enter"){
                this.get_list()
            }
        },
        rowClick:function(data){
            this.$router.push('/tabla/'+data.id)
        },
        show_dialog_confirm_eliminar:function(){
            var ids_eliminar = []
            for (var item of this.selected){
                var fullname = item.database_nombre+'.'+item.esquema_nombre+'.'+item.nombre
                ids_eliminar.push(fullname)
            }

            this.$refs.ConfirmMessage.start({
                title:"Confirmar",
                message:"Se va a eliminar las siguientes tablas, ¿Desea continuar?",
                list:ids_eliminar,
                requester:'eliminar'
            })            
        },
        eliminar:function(){
            var ids_eliminar = []
            for (var item of this.selected){
                console.log(item)
                ids_eliminar.push(item.id)
            }            

            this.$http
            .post(this.$backend_url+'Tabla/Tabla/eliminar',{ 
                ids_eliminar:ids_eliminar
            }).then((response)=>{                
                console.log(response)
            })
        },
        test:function(){
            this.$refs.ConfirmMessage.start({

            })
        }
    }
}
</script>
<style>
div.q-table-bottom{    
    position:fixed;
    right:0;
    bottom:0;
    left:0;
}
</style>