<template>
    <div class="row">
        <q-card inline class="no-shadow col-4">
            <q-card-title color="indigo" inverted>
                Esquema
            </q-card-title>            
            <q-card-main>
                <q-input type="text"                             
                color="indigo"
                stack-label="ID" 
                readonly
                v-model="form_data.esquema_id"  
                />
                <AutocompleteDBMS 
                v-on:dbms-selected="set_dbms"/>

                <AutocompleteDatabase 
                v-on:database-selected="set_database" 
                v-bind:dbms_id="form_data.esquema_dbms_id"
                />

                <q-input type="text"                             
                color="indigo"
                stack-label="Nombre"                 
                v-model="form_data.esquema_nombre"  
                />
                <q-input type="text"                             
                color="indigo"
                stack-label="Estado" 
                readonly
                v-model="form_data.esquema_estado_nombre"  
                />
                <div class="row">
                    <div class="col-6">
                        <q-input type="text"                             
                        color="indigo"
                        stack-label="Fecha de Registro" 
                        readonly
                        v-model="form_data.esquema_fch_registro"  
                        />
                    </div>
                    <div class="col-6 q-pl-xs">
                        <q-input type="text"                             
                        color="indigo"
                        stack-label="Fecha de Modificacion" 
                        readonly
                        v-model="form_data.esquema_fch_modificacion"  
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
import AutocompleteDatabase from './AutocompleteDatabase.vue'
import AutocompleteDBMS from './AutocompleteDBMS.vue'

export default {
    name:"PanelEsquema",
    components:{
        AutocompleteDatabase,
        AutocompleteDBMS
    },
    props:{

    },
    data(){
        return{
            form_data:{
                esquema_id:"",
                esquema_nombre:"",
                esquema_dbms_id:"",
                esquema_database_id:"",
                esquema_estado_nombre:"",
                esquema_fch_registro:"",
                esquema_fch_modificacion:"",
                esquema_desc_abreviada:"",
                esquema_desc_completa:"",
                dbms_name:""
            }
        }
    },
    methods:{
        guardar:function(){
            this.$http
            .post(this.$backend_url+'EsquemaController/EsquemaController/guardar',{
                esquema_id:this.form_data.esquema_id,
                database_id:this.form_data.esquema_database_id,
                nombre:this.form_data.esquema_nombre,
                dbms_id:this.form_data.esquema_dbms_id,
                desc_abreviada: this.form_data.esquema_desc_abreviada,
                desc_completa: this.form_data.esquema_desc_completa
            }).then(function(response){
                console.log(response)
            })
        },
        set_dbms:function(data){            
            this.form_data.esquema_dbms_id = data.dbms_id                        
        },
        set_database:function(data){
            this.form_data.esquema_database_id = data.database_id
            console.log(this.form_data.esquema_database_id)
        },
        cancelar:function(){
            console.log("cancelar")
        }
    }
}
</script>
