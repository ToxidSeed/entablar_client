<template>
    <div class="row">
        <q-card inline class="no-shadow col-6">
            <!--<q-toolbar color="primary"
                inverted>
                <q-toolbar-title>
                    Tipo de Dato
                </q-toolbar-title>
            </q-toolbar>        -->
            <q-card-title >
                Tipo de Dato
                <span slot="subtitle"  >DBMS: <span class="text-indigo">{{additional_data.dbms_nombre}}</span></span>
            </q-card-title>
            <q-card-main>         
                <div class="row">    
                    <div class="col-12">    
                        <div class="row">         
                            <q-input type="text"
                            stack-label="ID"
                            color="indigo"
                            v-model="form_data.id"  
                            class="col-2"            
                            readonly      
                            />            
                            <q-input type="text"
                            stack-label="Syntaxis"
                            color="indigo"
                            v-model="form_data.nombre"      
                            class="col-8 offset-xs-1"                   
                            />   
                        </div>
                        <div class="row"> 
                            <q-input
                                v-model="form_data.descripcion"
                                type="textarea"     
                                color="indigo"       
                                stack-label="Descripcion"            
                                :max-height="100"
                                rows="4"                                               
                                class="col-11"
                            />                              
                        </div>
                        <div class="row">
                             <q-input
                                id="config"
                                v-model="form_data.config"
                                type="textarea"    
                                color="indigo"        
                                stack-label="Config"                                                                                    
                                @input="format"  
                                rows="4"       
                                :max-height="100"                                        
                                class="col-11"                      
                                /> 
                        </div>
                    </div>                           
                </div>                                          
            </q-card-main>
            <q-card-actions align="end">  
                <q-btn  label="Nuevo" color="indigo" outline  :to="'/tipodato/'+this.proveedor_bd_id" @click="crear_campo_nuevo" />
                <q-btn  color="indigo" label="Guardar" @click="guardar"  />
                <q-btn color="red-10" label="Eliminar" />                    
                <q-btn color="brown" label="Cancelar" :to="'/tipodato/'+this.proveedor_bd_id"/>                         
            </q-card-actions> 
        </q-card>
        <router-view class="col-6" :proveedor_bd_id="dbms_id">
        </router-view>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:"WinTipoDato",
    props:{
        dbms_id:String,
        tipo_dato_id:String
    },    
    data(){
        return {                        
            form_data:{
                id:"",
                dbms_id:"",
                nombre:"",                
                descripcion:"",
                config:""
            },
            additional_data:{
                dbms_nombre:""
            }
        }
    },
    methods:{
        new(dbms_id){
            this.$http
            .post(this.$backend_url+'TipoDatoManager/TipoDatoManager/new',{ 
                dbms_id:dbms_id
            }).then(response => {      
                var result = response.data
                /*this.additional_data.nombre_tabla = result.data.nombre                
                this.additional_data.dbms_nombre  = result.data.dbms_nombre
                this.additional_data.dbms_id      = result.data.dbms_id*/
                this.form_data.dbms_id = result.data.proveedor_bd_id
                this.additional_data.dbms_nombre = result.data.nombre                
            });
        },
        guardar(){            
            this.$http
            .post(this.$backend_url+'TipoDatoManager/TipoDatoManager/guardar',{                
                id:this.form_data.id,
                dbms_id:this.dbms_id,
                nombre:this.form_data.nombre,
                descripcion:this.form_data.descripcion,
                config:this.form_data.config
            }).then(result => {      
                console.log(result)           
                this.new(this.dbms_id)        
                    /*var path = '/tipodato/'+result.data.proveedor_bd_id                    
                    this.$router.push({ path: path})*/                    
                    /*this.$emit("guardar_tipo_dato",{
                        "tipo_dato_id":this.form_data.id                        
                    })*/
            })
        },
        get_proveedor(){
            axios({
                method:"post",
                url:"http://127.0.0.1:5000/entablar/TipoDato/TipoDato/get_proveedor",
                data:{
                    proveedor_bd_id:this.proveedor_bd_id
                }
            }).then(result =>{
                this.form_data.proveedor_bd_id = result.data.proveedor_bd_id
                this.additional_data.nombre_proveedor = result.data.nombre
            })
        },
        get(){
            this.$http
            .post(this.$backend_url+'TipoDatoManager/TipoDatoManager/get',{
                tipo_dato_id:this.tipo_dato_id
            }).then(response => {
                var result = response.data
                console.log(result)
                this.form_data.id = result.data.tipo_dato_id
                this.form_data.nombre = result.data.nombre
                this.form_data.descripcion = result.data.descripcion
                this.form_data.config = result.data.config

                this.additional_data.dbms_nombre = result.extradata.dbms.nombre
                console.log(result.extradata.dbms.nombre)
            })            
        },
        crear_campo_nuevo(){
            this.form_data.id = ""
            this.form_data.nombre = ""
            this.form_data.descripcion = ""
            this.form_data.config = ""
        },
        format(){
            console.log(this.form_data.config)
            var varx  = JSON.parse(this.form_data.config)   
            var y = JSON.stringify(varx,undefined,4)
            console.log(y)         
            this.form_data.config = y                        
        }
    },
    mounted:function(){        
        console.log(this)
        this.$on('guardar_tipo_dato',function(params){
            console.log(params)
            this.crear_campo_nuevo()
        })
    },
    beforeRouteEnter (to, from, next) {                
        next(vm => {            
            if (vm.tipo_dato_id != ""){
                vm.get(vm.tipo_dato_id)
            }else{
                vm.new(vm.dbms_id)
            }
        })
    },
    beforeRouteUpdate (to, from, next) {            
        console.log('beforeRouteUpdate')         
        next() 
        this.get_proveedor(to.params.proveedor_bd_id) 
        this.get_tipo_dato(to.params.tipo_dato_id)               
    }
}
</script>
<style>
</style>
