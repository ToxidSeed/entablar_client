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
                                                               
                        <!--<q-btn color="green-8" icon="fas fa-upload" flat to="/tabla" /> 
                        <q-btn color="blue-8"  icon="fas fa-download" flat>
                            -->
                            <!--<q-popover>
                                <q-list link>
                                    <q-item  @click.native="opened = true">
                                        <q-item-main >
                                            <q-item-tile label>Structured Query Language( *.sql)</q-item-tile>                                                                                       
                                        </q-item-main>
                                    </q-item>
                                </q-list>
                            </q-popover>
                            
                        </q-btn>
                        -->
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
                        <q-field
                            :helper="form_data.dbms_nombre"
                        >
                            <q-input type="text"                             
                            stack-label="Nombre" 
                            color="indigo"
                            v-model="form_data.nombre"                                                                           
                            />                       
                        </q-field>                        
                    </div>
                </div>    
                <q-field>        
                    <q-input
                            v-model="form_data.descripcion"
                            type="textarea"            
                            stack-label="Descripción"  
                            color="indigo"          
                            :max-height="100"
                            rows="7"
                    />
                </q-field>
                <q-input 
                    stack-label="Estado"  
                    color="indigo"
                    v-model="form_data.estado_tabla_nombre"
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
        <router-view class="col-8" :tabla_id="tabla_id" :dbms_id="dbms_id" :dbms_name="current_dbms_name">
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
.q-item-section{
    font-size:12px
}
</style>
<script>
import axios from 'axios'

export default {
    name: 'WinTabla',
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
            form_data:{
                tabla_id:"",
                nombre:"",
                dbms_id:"",
                dbms_nombre:"",
                estado_tabla_id:"",
                estado_tabla_nombre:"",
                descripcion:"",
                fecha_creacion:"",
                fecha_modificacion:""
            },
            fecha_creacion:"",
            hide_input_tabla_id:false,
            opened: false    
        }
    },
    computed: {
        // a computed getter
        current_dbms_name: function () {
            if (this.form_data.dbms_nombre == ""){
                return this.dbms_name
            }else{
                return this.form_data.dbms_nombre
            }
        }
    },
    methods:{
        set_current_dbms_name:function(){
            if (this.form_data.dbms_nombre ==""){
                this.current_dbms_name = this.dbms_name;
            }else{
                this.current_dbms_name = this.form_data.dbms_nombre
            }
        },
        guardar(){                 
        axios({ 
                method: "post", 
                url: "http://127.0.0.1:5000/entablar/Tabla/Tabla/guardar" ,
                data:{
                    tabla_id:this.form_data.tabla_id,
                    nombre:this.form_data.nombre,
                    dbms_id:this.form_data.dbms_id,
                    descripcion:this.form_data.descripcion
                },
                //headers: {'Content-Type': 'text/plain' }
                }).then(result => {           
                    //console.log(result.data)       
                    this.form_data.tabla_id = result.data.extra_info.tabla_id;
                    this.form_data.fecha_creacion = result.data.extra_info.fch_creacion;    
                    var main = this   
                    this.$q.notify({
                        type: 'positive',
                        position: 'top',
                        timeout: 1500,
                        closeBtn: true,
                        avatar: require('../statics/disk.png'),                        
                        //message: 'Se ha registrado correctamente la tabla con id Nro: '+this.form_data.tabla_id,
                        message: result.data.msg,
                        onDismiss () { // v0.15.11+
                            var path = '/tabla/'+result.data.extra_info.tabla_id                  
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
                url: "http://127.0.0.1:5000/entablar/Tabla/Tabla/get_object" ,
                data:{
                    tabla_id:tabla_id,
                    dbms:""
                },
                //headers: {'Content-Type': 'text/plain' }
                }).then(result => {         
                    this.title = "Propiedades de Tabla"           
                    this.form_data.tabla_id             = result.data.tabla_id;        
                    this.form_data.dbms_id              = result.data.dbms_id;   
                    this.form_data.dbms_nombre          = result.data.dbms_nombre;   
                    this.form_data.estado_tabla_nombre  = result.data.estado_tabla_nombre;
                    this.form_data.descripcion          = result.data.descripcion;
                    this.form_data.nombre               = result.data.nombre;
                    this.form_data.fecha_creacion       = result.data.fch_creacion;  
                    this.form_data.fecha_modificacion   = result.data.fch_modificacion;  
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
            this.form_data.nombre    = ''
            this.form_data.dbms_nombre  = ''         
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
            if (typeof to.params.tabla_id =='undefined'){
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
    beforeRouteUpdate (to, from, next) {               
        next() 
        this.get_object(to.params.tabla_id);
        //Actualizar la lista de campos
        this.$emit("tabla_reload",{
            "tabla_id":to.params.tabla_id
        });
    }
}
</script>
<style>
    .q-field-bottom{
        color:teal   
    }
</style>
