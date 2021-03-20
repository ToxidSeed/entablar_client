<template>
    <div class="row">        
        <q-card inline class="no-shadow col-4">                                              
            <q-card-title color="indigo" inverted>
                <div class="text-indigo">{{title}}
                    <div style="display:inline;float:right;">
                        <q-btn-dropdown                             
                            label="ACCIONES"                            
                            size="sm" 
                            color="indigo"                                                        
                            >
                            <q-list link>    
                                <q-item>
                                    <q-item-side icon="fas fa-cloud-upload-alt" color="blue">                                        
                                    </q-item-side>
                                    <q-item-main>
                                        <q-item-tile>IMPORTAR</q-item-tile>                                                                                
                                    </q-item-main>
                                </q-item>                        
                                <q-item>
                                    <q-item-side icon="fas fa-cloud-download-alt" color="green">                                        
                                    </q-item-side>
                                    <q-item-main>
                                        <q-item-tile>EXPORTAR</q-item-tile>                                                                                
                                    </q-item-main>
                                </q-item>            
                                <q-item-separator />   
                                <q-item @click.native="recuperar">
                                    <q-item-side icon="fas fa-recycle" color="indigo">                                                                             
                                    </q-item-side>
                                    <q-item-main>
                                        <q-item-tile >RECUPERAR</q-item-tile>                                                                                
                                    </q-item-main>
                                </q-item>         
                                <q-item @click.native="eliminar">
                                    <q-item-side icon="fas fa-trash-alt" color="red">                                                                             
                                    </q-item-side>
                                    <q-item-main>
                                        <q-item-tile >ELIMINAR</q-item-tile>                                                                                
                                    </q-item-main>
                                </q-item>                        
                            </q-list>  
                        </q-btn-dropdown>
                    </div>
                </div>                                
                <span slot="subtitle">ID: <span class="text-indigo">{{form_data.tabla_id}}</span></span>
            </q-card-title>                        
            <q-card-main>
                <div class="row q-ma-auto">
                    <div class="col-3" v-if="hide_input_tabla_id">
                        <q-input type="text"                             
                            color="indigo"
                            stack-label="ID" 
                            readonly
                            v-model="form_data.tabla_id"  />
                    </div>
                    <div class="col-12 q-pl-xs" >
                        <!--<q-field
                            :helper="form_data.dbms_nombre"
                        >-->
                        <q-field>
                            <q-input type="text"                             
                            stack-label="Nombre" 
                            color="indigo"
                            v-model="form_data.nombre"                                                                           
                            />                       
                        </q-field>                        
                    </div>
                </div>             
                    <br/>   
                    <AutocompleteDatabase 
                    v-on:database-selected="set_database"
                    v-bind:dbms_id="form_data.dbms_id"
                    v-bind:in_database_id="form_data.database_id"/>
                    <br/>   
                    <AutocompleteEsquema
                    v-on:esquema-selected="set_esquema"                     
                    v-bind:database_id="form_data.database_id"
                    v-bind:in_esquema_id="form_data.esquema_id"/>                    
                    <br/>   
                    <AutocompleteDBMS
                    v-bind:in_dbms_id="form_data.dbms_id"
                    />                                                                       
                <q-field>        
                    <q-input
                            v-model="form_data.desc_abreviada"
                            type="textarea"            
                            stack-label="Descripción abreviada"  
                            color="indigo"          
                            :max-height="100"
                            rows="3"
                    />
                </q-field>
                <q-field>        
                    <q-input
                            v-model="form_data.desc_completa"
                            type="textarea"            
                            stack-label="Descripción completa"  
                            color="indigo"          
                            :max-height="100"
                            rows="7"
                    />
                </q-field>
                <q-input 
                    stack-label="Estado"  
                    color="indigo"
                    v-model="form_data.estado_nombre"
                    readonly          
                />
                <div class="row">       
                    <div class="col-6">
                        <q-datetime v-model="form_data.fecha_creacion"  
                        format="DD/MM/YYYY"                        
                        readonly
                        color="indigo"
                        stack-label="Fecha de Creación"  
                        type="date"
                        /> 
                    </div>
                    <div class="col-6 q-pl-xs">
                        <q-datetime v-model="form_data.fecha_modificacion" 
                        format="DD/MM/YYYY"                         
                        readonly
                        color="indigo"
                        stack-label="Fecha de Modificacion"  
                        type="date" 
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
        <router-view         
            class="col-8" 
            :tabla_id="tabla_id" 
            :dbms_id="dbms_id"             
            v-on:columns-loaded="update_columns_rowcount"
        >
        </router-view>
        <!--Configuracion para exportar en sql
        <h4>Basic Modal</h4>
            <q-btn
            color="primary"
            @click="opened = false"
            label="Close"
            />        
        -->
        <q-modal v-model="opened">
            <q-card>
                <q-card-title>
                    Exportar
                </q-card-title>
                <q-card-separator />
                <q-card-main>                    
                </q-card-main>
                <q-card-actions>
                    <q-btn flat label="Aceptar" color="indigo" @click="exportar"/>
                    <q-btn flat label="Cancelar" color="brown" @click="opened = false"/>
                </q-card-actions>
            </q-card>
        </q-modal> 
        <!--Fin Configuracion para exportar en sql-->
    </div>
</template>
<style>
/*.q-item-section{
    font-size:12px
}*/
</style>
<script>
import AutocompleteDatabase from './AutocompleteDatabase.vue'
import AutocompleteEsquema from './AutocompleteEsquema.vue'                
import AutocompleteDBMS from './AutocompleteDBMS.vue'
import axios from 'axios'


export default {
    name: 'WinTabla',
    components:{
        AutocompleteDatabase,
        AutocompleteEsquema,
        AutocompleteDBMS
    },
    props:{
        tabla_id:{
            default:""
        },
        dbms_id:{
            default:""
        },
        dbms_name:{
            default:""
        }
    },
    data () {
        return {  
            title:"",
            columns_rowcount:0,                     
            form_data:{
                tabla_id:"",
                database_id:"",
                database_nombre:"",
                esquema_id:"",
                esquema_nombre:"",
                nombre:"",
                dbms_id:"",
                dbms_nombre:"",
                estado_tabla_id:"",
                estado_tabla_nombre:"",
                desc_abreviada:"",
                desc_completa:"",
                fecha_creacion:"",
                fecha_modificacion:""
            },
            fecha_creacion:"",
            hide_input_tabla_id:false,
            opened: false    
        }
    },
    watch: {
        // a computed getter
        /*current_dbms_name: function () {
            if (this.form_data.dbms_nombre == ""){
                return this.dbms_name
            }else{
                return this.form_data.dbms_nombre
            }
        }*/
        dbms_id:function(new_dbms_id){
            this.setting_by_global_dbms(new_dbms_id)
        }
    },
    methods:{
        set_database:function(data){
            this.form_data.database_id = data.database_id
            this.form_data.dbms_id = data.dbms_id            
        },
        set_esquema:function(data){
            this.form_data.esquema_id = data.esquema_id
            this.form_data.dbms_id = data.dbms_id
        },
        setting_by_global_dbms:function(new_dbms_id){
            if (this.dbms_id && this.columns_rowcount == 0){
                this.form_data.dbms_id = new_dbms_id
                this.form_data.dbms_name = this.dbms_name
            }
        },
        set_dbms:function(data){
            this.form_data.dbms_id = data.dbms_id
        },        
        update_columns_rowcount:function(data){                        
            console.log(data)
            this.columns_rowcount = data.rowcount
        },
        guardar(){                 
            axios({ 
                method: "post", 
                url: this.$backend_url+"Tabla/Tabla/guardar",
                data:{
                    tabla_id:this.form_data.tabla_id,
                    nombre:this.form_data.nombre,
                    dbms_id:this.form_data.dbms_id,
                    database_id:this.form_data.database_id,
                    esquema_id: this.form_data.esquema_id,                                        
                    desc_abreviada:this.form_data.desc_abreviada,
                    desc_completa:this.form_data.desc_completa                    
                },
                //headers: {'Content-Type': 'text/plain' }
                }).then(result => {           
                    console.log(result.data)       
                    this.form_data.tabla_id = result.data.extradata.tabla_id;
                    this.form_data.fecha_creacion = result.data.extradata.fch_creacion;    
                    var main = this   
                    this.$q.notify({
                        type: 'positive',
                        position: 'top',
                        timeout: 1500,
                        closeBtn: true,
                        avatar: require('../statics/disk.png'),                        
                        //message: 'Se ha registrado correctamente la tabla con id Nro: '+this.form_data.tabla_id,
                        message: result.data.message,
                        onDismiss () { // v0.15.11+
                            var path = '/tabla/'+result.data.extradata.tabla_id                  
                            main.$router.push({ path: path})
                        }
                    })
                    this.$emit("signal",{
                        "event":"tabla_guardar",
                        "tabla_id":this.form_data.tabla_id
                    })
                }, error => {
                    console.error(error);
                    
            });        
        },
        cancelar(){
            console.log('xxx')
        },
        eliminar(){
            axios({ 
                method: "post", 
                url: "http://127.0.0.1:5000/entablar/Tabla/Tabla/eliminar" ,
                data:{
                    tabla_id:this.form_data.tabla_id
                }                
            }).then(result =>{
                console.log(result)
            })
        },
        recuperar(){            
            axios({ 
                method: "post", 
                url: "http://127.0.0.1:5000/entablar/Tabla/Tabla/recuperar" ,
                data:{
                    tabla_id:this.form_data.tabla_id
                }                
            }).then(result =>{
                console.log(result)
            })
        },
        get_object(tabla_id){
            //this.form_data.tabla_id = this.tabla_id

            axios({ 
                method: "post", 
                url: this.$backend_url+"Tabla/Tabla/get" ,
                data:{
                    tabla_id:tabla_id,
                    dbms:""
                },
                //headers: {'Content-Type': 'text/plain' }
                }).then(result => {         
                    var element = result.data.data

                    this.title = "Propiedades de Tabla"           
                    this.form_data.tabla_id             = element.id;                            
                    this.form_data.dbms_id              = element.dbms_id;   
                    this.form_data.esquema_id           = element.objeto_padre_id;
                    this.form_data.database_id          = element.database_id;
                    this.form_data.dbms_nombre          = element.dbms_nombre;   
                    this.form_data.desc_abreviada       = element.desc_abreviada;
                    this.form_data.desc_completa        = element.desc_completa
                    this.form_data.descripcion          = element.descripcion;
                    this.form_data.nombre               = element.nombre;
                    this.form_data.fecha_creacion       = element.fch_creacion;  
                    this.form_data.fecha_modificacion   = element.fch_modificacion;
                    this.form_data.estado_nombre        = element.estado_nombre;
                    this.$emit("signal",{
                        "event":"tabla_loaded",
                        "tabla_id":this.form_data.tabla_id
                    })
                    //this.set_current_dbms_name()
                }, error => {
                    console.error(error);                    
                });
        },
        new_table(){            
            this.title = "Tabla: Nuevo"
            this.form_data.tabla_id = ''            
            this.form_data.descripcion    = ''
            this.form_data.estado_tabla_nombre = "No guardado"
            this.form_data.nombre    = ''
            this.form_data.dbms_nombre  = this.dbms_name         
            this.form_data.fecha_creacion = ''
            this.form_data.fecha_modificacion = ''            
        },
        exportar(){
            axios({ 
                method: "get", 
                url: "http://127.0.0.1:5000/entablar/Tabla/Tabla/exportar" ,
                params:{
                    tabla_id:this.tabla_id,
                    ID:this.ID()
                },
                //responseType: 'blob', 
                //responseType:'stream',
                }).then(response => {      
                    //console.log(response)   
                    console.log(response)   
                   const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', response.headers.file_name);
                    document.body.appendChild(link);
                    link.click();
                }, error => {
                    console.error(error);
                    
            });
        },
        ID() {
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            return '_' + Math.random().toString(36).substr(2, 9);
        }
    },
    mounted:function(){
        /*console.log('WinTabla_Mounted')           
        if (typeof this.tabla_id =='undefined'){
            this.new_table()
        }else{
            this.get_object(this.tabla_id)                
        }*/
        //console.log(this.dbms_id)
        this.form_data.dbms_id = this.dbms_id
        //console.log(this.dbms_name)
    },
    beforeRouteEnter (to, from, next) {
        //console.log(to)               
        next(vm => {
            // access to component instance via `vm`            
            if (typeof to.params.tabla_id =='undefined' || to.params.tabla_id=="" || to.params.tabla_id=="0"){
                //console.log(vm.dbms_id)
                vm.new_table()
            }else{
                vm.get_object(to.params.tabla_id)                
            }
        })

        
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    },
    beforeRouteUpdate (to, from, next){    
        console.log(to.params.tabla_id)           
        if (to.params.tabla_id=="" || to.params.tabla_id=="0"){
            this.new_table()
        }else{
            this.get_object(to.params.tabla_id);
        }
        next() 
    }
}
</script>
<style>
    .q-field-bottom{
        color:teal   
    }
</style>
