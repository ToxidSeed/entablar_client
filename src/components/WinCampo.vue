<template>
    <div class="row">
        <q-card inline class="no-shadow col-4">
            <!--<q-toolbar color="grey-9"> 
                <q-toolbar-title>
                Campo
                </q-toolbar-title>            
                <q-btn flat round dense icon="close" to="/tabla" />
            </q-toolbar>-->
            <q-card-title>
                <span class="text-indigo">Campo</span>                
                <span slot="subtitle">
                    Tabla: 
                    <span class="text-indigo">
                        {{additional_data.nombre_tabla}}
                    </span>
                    DBMS:
                    <span class="text-indigo">
                        {{additional_data.dbms_nombre}}
                    </span>                        
                </span>
            </q-card-title>
            
            <q-card-main>
                <div class="row q-ma-auto">
                    <q-input type="text" class="col-3" 
                            stack-label="ID" 
                            ref="ID"
                            v-model="form_data.campo_id"  
                            color="indigo"/>
                    <q-input type="text" class="col-8 offset-xs-1"
                    v-model="form_data.nombre"
                    stack-label="Nombre de Campo" 
                    color="indigo" />                 
                </div>
                <q-input
                    v-model="form_data.descripcion"
                    type="textarea"            
                    stack-label="Descripcion"            
                    :max-height="100"
                    rows="7"
                    color="indigo"
                    /> 
                <div class="row  q-ma-auto">                                     
                    <q-select
                        class="col-8" 
                        ref="tipo_dato"
                        v-model="form_data.tipo_dato_id"
                        stack-label="Tipo de Dato"                    
                        :options="tipos_dato_list"
                        color="indigo"
                        filter
                        clearable
                        clear-value=" "
                        placeholder="..."
                        @input="get_tipo_dato({tipo_dato_id:form_data.tipo_dato_id})"                        
                    />
                    <div class="col-4">
                        <q-input v-for="item in tipo_dato_config_input" :key="item.param_name"
                            type="text"                         
                            :stack-label="item.label"
                            class="col-2 offset-xs-1"                        
                            color="indigo"
                            v-model="tipo_dato_config_input_model[item.param_name]"
                        />                    
                    </div>                               
                </div>
                <br>
                <q-checkbox label="PK" 
                v-model="form_data.flg_pk"     
                true-value="1"
                false-value="0"              
                color="indigo"
                />    
                <br>
                <q-checkbox label="Obligatorio" 
                v-model="form_data.flg_obligatorio.value" 
                :disable="form_data.flg_obligatorio.disabled"    
                true-value="1"
                false-value="0"                           
                color="indigo"            
                />                
                       
                
            </q-card-main>     
            <q-card-actions align="end">                    
                <q-btn  label="Nuevo" color="indigo" outline  :to="'/campo/'+this.tabla_id" @click="crear_campo_nuevo" />
                <q-btn  color="indigo" label="Guardar" @click="guardar"  />
                <q-btn color="red-10" label="Eliminar" @click="eliminar"/>                    
                <q-btn color="brown" label="Cancelar" :to="'/tabla/'+this.tabla_id"/>       
            </q-card-actions> 
        </q-card>
        <router-view class="col-8" :tabla_id="form_data.tabla_id">
        </router-view>
    </div>
</template>
<script>

import axios from 'axios'
export default {
    name: 'WinCampo',    
    props:{
        tabla_id:{
            default:''
        },
        campo_id:{
            default:''
        },
        dbms_id:{
            default:''
        }
    },
    data(){
        return {
            form_data:{
                tabla_id:"",
                dbms_id:"",
                campo_id:"",
                nombre:"",
                descripcion:"",
                tipo_dato_nombre:"",
                tipo_dato_id:'',
                tipo_dato_data:'',
                longitud:"",
                prec:"",
                flg_obligatorio:{
                    value:"0",
                    disabled:false
                },
                flg_pk:false
            },            
            additional_data:{
                nombre_tabla:"",
                dbms_nombre:"",
                dbms_id:""
            },
            tipo_dato_config_input:[],
            tipo_dato_config_input_model:{                
            },
            tipos_dato_list:[]
        }
    },
    watch:{        
        "form_data.flg_pk":function(newValue, oldValue){            
            console.log(oldValue)
            if (newValue == "1"){       
                console.log(this.form_data.flg_obligatorio)         
                this.form_data.flg_obligatorio.value = "1";
                this.form_data.flg_obligatorio.disabled = true
            }else{
                this.form_data.flg_obligatorio.disabled = false
            }
        }
    },
    mounted:function(){  
        this.$on('guardar_campo',function(params){
            console.log(params)
            this.crear_campo_nuevo()
        });

        this.$on('tabla_loaded',function(params){  
            this.get_tipos_dato({
                dbms_id:params.dbms_id,
                tipo_dato_nombre:""
            })
        })    
        //console.log('mounted')
        //this.get_campo(this.campo_id)
        this.$on('campo_loaded',function(params){
            //Cargar campo
            //this.get_tabla(params.tabla_id)    
            //Cargar tipos de dato
            console.log(params)
            this.get_tipo_dato({
                tipo_dato_id:this.form_data.tipo_dato_id
            })  
        })
        //La tabla tiene el dbms por eso recien cuando se carga la tabla se ejecuta 
        //la llamada a los tipos de dato
        /*this.$on('tabla_loaded',function(params){
            this.get_tipos_dato({
                dbms_id:params.dbms_id,
                tipo_dato_nombre:""
            })
                      
        })*/
        //Cuando el tipo de dato esta cargado, se realiza la llamada
        this.$on('tipo_dato_loaded',function(){
            if (this.campo_id != ""){
                var json_tipo_dato_data = JSON.parse(this.form_data.tipo_dato_data)   
                for (var key in json_tipo_dato_data){
                    this.tipo_dato_config_input_model[key]=json_tipo_dato_data[key]                
                } 
            }                        
        })
    },
    methods:{       
        guardar(){               
             axios({ 
                method: "post", 
                url: "http://127.0.0.1:5000/entablar/Campo/Campo/guardar" ,
                data:{
                    tabla_id:this.tabla_id,
                    campo_id:this.form_data.campo_id,
                    nombre:this.form_data.nombre,
                    descripcion:this.form_data.descripcion,
                    tipo_dato_id:this.form_data.tipo_dato_id,
                    tipo_dato_syntax:this.$refs.tipo_dato.actualValue,
                    tipo_dato_data:JSON.stringify(this.tipo_dato_config_input_model),
                    flg_obligatorio:this.form_data.flg_obligatorio.value,
                    flg_pk:this.form_data.flg_pk
                }
             }).then(result =>{                 
                 this.form_data.campo_id = result.data.campo_id;                 
                 this.$q.notify({
                        type: 'positive',
                        position: 'top',
                        timeout: 1500,
                        closeBtn: true,
                        avatar: require('../statics/disk.png'),                        
                        message: `Se ha registrado correctamente el campo con id Nro: `+this.form_data.campo_id,
                        /*onDismiss () { // v0.15.11+
                            console.log(result)
                            var path = '/campo/'+result.data.tabla_id+'/'+result.data.campo_id                  
                            main.$router.push({ path: path})
                        }*/
                })
                this.$emit("guardar_campo",{
                    "campo_id":this.form_data.campo_id,
                    "tabla_id":this.tabla_id
                })
             });
        },
        get_tabla(param){
            axios({
                method:"post",
                url:"http://127.0.0.1:5000/entablar/Tabla/Tabla/get_object",
                data:{
                    tabla_id:param.tabla_id,
                    dbms:''
                }
            }).then(result =>{                
                this.additional_data.nombre_tabla = result.data.nombre                
                this.additional_data.dbms_nombre  = result.data.dbms_nombre
                this.additional_data.dbms_id      = result.data.dbms_id
                this.$emit('tabla_loaded',{
                    "dbms_id":result.data.dbms_id
                });
            })
        },
        get_campo(campo_id){
            axios({
                method:"post",
                url:"http://127.0.0.1:5000/entablar/Campo/Campo/get_object",
                data:{
                    campo_id:campo_id,                    
                }
            }).then(result =>{         
                this.form_data.campo_id =   result.data.campo_id
                this.form_data.nombre = result.data.nombre
                this.form_data.descripcion = result.data.descripcion   
                this.form_data.tipo_dato_id = result.data.tipo_dato_id    
                this.form_data.tipo_dato_data = result.data.tipo_dato_data
                this.form_data.flg_pk = result.data.flg_pk
                this.form_data.flg_obligatorio.value = result.data.flg_obligatorio
                //this.$refs.tipo_dato.actualValue = result.data.tipo_dato_syntax          
                //console.log(this.$refs.tipo_dato)
                this.$emit('campo_loaded',{
                    "tabla_id":result.data.tabla_id,
                    "tipo_dato_data":result.data.tipo_dato_data
                });
            });
        },
        get_tipos_dato(params){            
            axios({
                method:"post",
                url:"http://127.0.0.1:5000/entablar/TipoDato/TipoDato/get_list",
                data:{
                    dbms_id:params.dbms_id,
                    tipo_dato_nombre:params.tipo_dato_nombre
                }
            }).then(result =>{                                
                //this.tipos_dato_list = result.data.rows                      
                this.tipos_dato_list = []
                for (var index in result.data.rows){                    
                    this.tipos_dato_list.push({
                        'label':result.data.rows[index]['nombre'],
                        'value':result.data.rows[index]['tipo_dato_id']
                    });
                }
            })
        },
        get_tipo_dato(param){            
            axios({
                method:"post",
                url:"http://127.0.0.1:5000/entablar/TipoDato/TipoDato/get_object",
                data:{
                    tipo_dato_id:param.tipo_dato_id
                }
            }).then(result =>{       
                //console.log(result)
                var config_json = JSON.parse(result.data.config_json)                 
                Object.keys(config_json).forEach(itemKey => {
                    var itemname = config_json[itemKey].param_name
                    this.tipo_dato_config_input_model[itemname]  = ""   
                })
                this.tipo_dato_config_input = config_json
                this.$emit('tipo_dato_loaded');
            })
        },
        crear_campo_nuevo(){
            this.form_data.campo_id = ""
            this.form_data.nombre=""
            this.form_data.descripcion=""
            this.form_data.tipo_dato_nombre=""
            this.form_data.tipo_dato_id=""
            this.form_data.tipo_dato_data=""
            this.form_data.flg_obligatorio={value:"0", disabled:false}
            this.form_data.flg_pk="0"             
            this.tipo_dato_config_input = []
            this.tipo_dato_config_input_model={}            
        }
    },
    beforeRouteEnter(to, from, next){
         next(vm => {
             console.log(vm);
            /*vm.get_campo(vm.campo_id)*/            
            vm.get_tabla({tabla_id:vm.tabla_id})
            if (vm.campo_id != ""){
                vm.get_campo(vm.campo_id);
            }else{
                vm.crear_campo_nuevo()
            }
        })
    },
    beforeRouteUpdate(to, form, next){        
        this.get_campo(to.params.campo_id)        
        next()  
    }
}
</script>

