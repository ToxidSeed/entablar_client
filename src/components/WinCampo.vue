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
                <span class="text-indigo">Nuevo Campo</span>
                <!--<span slot="subtitle">
                    <div>
                    Tabla:
                    <span class="text-indigo">
                        {{additional_data.nombre_tabla}}
                         TB_MAMBA_NEGRA
                    </span>                    
                    </div>      
                    <q-chip color="primary">
                      No dbms selected
                    </q-chip>              
                </span>                -->
            </q-card-title>
            
            <q-card-main>                
                <div class="row q-ma-auto">                    
                    <q-input type="text" class="col-3" 
                            stack-label="ID" 
                            ref="ID"
                            v-model="form_data.campo_id"  
                            readonly
                            color="indigo"/>
                    <q-input type="text" class="col-8 offset-xs-1"
                    v-model="form_data.nombre"
                    stack-label="Nombre de Campo" 
                    color="indigo" />                 
                </div>
                <div class="q-mt-sm">
                    <span>Tabla:</span> {{additional_data.tabla_fullname}}
                </div>
                <div>
                    <q-chip color="green">
                        {{form_data.dbms_nombre}}
                    </q-chip>
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
                tabla_nombre:"",
                tabla_fullname:"",
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
        new(tabla_id){                                    
            this.$http
            .post(this.$backend_url+'Campo/Campo/new',{ 
                tabla_id:tabla_id
            }).then(response => {   
                var result = response.data   
                this.additional_data.tabla_nombre = result.data.tabla_nombre
                this.additional_data.tabla_fullname = result.data.tabla_fullname
                this.form_data.dbms_id = result.data.dbms_id
                this.form_data.dbms_nombre = result.data.dbms_nombre
                console.log(result)

                this.get_tipos_dato({
                    dbms_id:this.form_data.dbms_id,
                    tipo_dato_nombre:""
                });
            });

            //set initial data
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
        },
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
            console.log(param)            
            this.$http
            .post(this.$backend_url+'Tabla/Tabla/get',{ 
                tabla_id:param.tabla_id
            }).then(function(response){      
                var result = response.data
                this.additional_data.nombre_tabla = result.data.nombre                
                this.additional_data.dbms_nombre  = result.data.dbms_nombre
                this.additional_data.dbms_id      = result.data.dbms_id
                this.$emit('tabla_loaded',{
                    "dbms_id":result.data.dbms_id
                });
            });
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
            this.$http
            .post(this.$backend_url+'TipoDatoManager/Select/search',{
                dbms_id:params.dbms_id,
                tipo_dato_nombre:params.tipo_dato_nombre
            }).then(response =>{
                var result = response.data                
                this.tipos_dato_list = []
                for (var index in result.data){                    
                    this.tipos_dato_list.push({
                        'label':result.data[index]['label'],
                        'value':result.data[index]['value'],
                        'config':result.data[index]['config']
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
            console.log(this.form_data.tabla_id)
                        
        }
    },
    beforeRouteEnter(to, from, next){
         next(vm => {
             console.log(vm);
             console.log(vm.tabla_id);
             console.log(vm.campo_id);
            //vm.get_campo(vm.campo_id)         
            //vm.get_tabla({tabla_id:vm.tabla_id})
            if (vm.campo_id != ""){
                vm.get_campo(vm.campo_id);
            }else{
                vm.new(vm.tabla_id);
            }
        })
    },
    beforeRouteUpdate(to, form, next){        
        this.get_campo(to.params.campo_id)        
        next()  
    }
}
</script>

