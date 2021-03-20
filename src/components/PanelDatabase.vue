<template>
    <div class="row">
        <q-card inline class="no-shadow col-4">
            <q-card-title color="indigo" inverted>
                Base de datos
            </q-card-title>            
            <q-card-main>
                <q-input type="text"                             
                color="indigo"
                stack-label="ID" 
                readonly
                v-model="form_data.database_id"  
                />
                <q-input type="text"                             
                color="indigo"
                stack-label="Nombre"                 
                v-model="form_data.database_nombre"  
                />
                <AutocompleteDBMS v-on:dbms-selected="set_dbms"/>
                <q-input type="text"                             
                color="indigo"
                stack-label="Estado" 
                readonly
                v-model="form_data.database_estado_nombre"  
                />
                <div class="row">
                    <div class="col-6">
                        <q-input type="text"                             
                        color="indigo"
                        stack-label="Fecha de Registro" 
                        readonly
                        v-model="form_data.database_fch_registro"  
                        />
                    </div>
                    <div class="col-6 q-pl-xs">
                        <q-input type="text"                             
                        color="indigo"
                        stack-label="Fecha de Modificacion" 
                        readonly
                        v-model="form_data.database_fch_modificacion"  
                        />
                    </div>
                </div>                
            </q-card-main>
            <q-card-actions align="end">                    
                <q-btn color="indigo" outline label="Nuevo" /> 
                <q-btn color="indigo" @click="guardar" label="Guardar"/>
                <q-btn color="brown"  @click="cancelar" label="Cancelar" />
            </q-card-actions>            
        </q-card>
</div>
</template>
<script>
import AutocompleteDBMS from './AutocompleteDBMS.vue'

export default {
    name:"PanelDatabase",
    components:{
        AutocompleteDBMS
    },
    props:{
        
    },
    data(){
        return {
            form_data:{
                database_id:"",
                database_nombre:"",
                database_dbms_id:"",
                database_estado_nombre:"",
                database_fch_registro:"",
                database_fch_modificacion:"",
                dbms_name:""
            }
        }
    },
    methods:{
        set_dbms:function(data){
            this.form_data.database_dbms_id = data.dbms_id            
        },
        guardar:function(){            
            this.$http
            .post(this.$backend_url+'DatabaseController/DatabaseController/guardar',{ 
                database_id:this.form_data.database_id,
                nombre:this.form_data.database_nombre,
                dbms_id:this.form_data.database_dbms_id
            }).then(function(response){                   
                console.log(response)
            });
        }
    }
}
</script>