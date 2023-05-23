<template>
    <div>
        <v-container class="pa-0">
            <v-card>            
                <v-card-title class="blue--text text--darken-4 pt-1 pb-1">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon color="blue darken-4" v-bind="attrs" v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list v-if="(opciones.length > 0)">
                            <v-list-item v-for="item in opciones" :to="{name:item.route}" :key="item.route">
                                <v-list-item-title>{{item.label}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <div>{{title}}</div>
                    <v-spacer></v-spacer>
                    <v-btn icon color="red darken-4"><v-icon>mdi-close-thick</v-icon></v-btn>
                </v-card-title>
                <v-card-actions>                
                    <v-btn color="green" dark @click="confirmar_guardar">G<span class="text-lowercase">uardar</span></v-btn>
                </v-card-actions>
                <v-card-text class="pt-1">
                    <v-text-field
                        label="Nombre"
                        v-model="datastoragesystem.nombre"  
                        hide-details="auto"
                    ></v-text-field>  
                    <v-container>
                        <v-row>
                            <v-col cols="8">
                                <v-file-input                            
                                    accept="image/*"
                                    label="Icono"      
                                    hide-details="auto"  
                                    v-model="datastoragesystem.icono"      
                                    @change="onFileChange"      
                                ></v-file-input>   
                            </v-col>                    
                            <v-col cols="4">
                                <v-text-field                            
                                    label="Tamaño Icono"                            
                                    v-model="datastoragesystem.icono_tamano"  
                                    hide-details="auto"
                                    @change="tamano_icono_change_handler"
                                    class="pl-1"
                                ></v-text-field>  
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-img :src="imageUrl" class="mt-1" :width="icono.width" :height="icono.height"/>
                    <v-textarea
                        class="pt-4"
                        name="input-7-1"
                        label="Descripción"
                        v-model="datastoragesystem.descripcion"                    
                        hint="Hint text"
                    ></v-textarea>   
                </v-card-text>            
            </v-card>
            
        </v-container>
        <Confirmar v-model="confirmar.visible" :config="confirmar"
        v-on:guardar="guardar"
        />
    </div>
</template>
<script>
import Confirmar from '@/components/dialogs/Confirmar.vue'
import {get_postconfig} from '@/js/request.js'

export default {
    name:"PanelDatastorageSystem",
    props:{
        datastoragesystem_id:{
            type:String,
            default:""
        }
    },
    components:{
        Confirmar
    },
    data() {
        return {            
            datastoragesystem:{                
                nombre:"",
                descripcion:"",     
                icono:null,
                icono_tamano:""
            },
            opciones:[],
            imageUrl:"",
            icono:{
                height:0,
                width:0
            },
            confirmar:{
                visible:false
            },
            visible:false
        }
    },
    computed:{
        title:function(){
            if (this.datastoragesystem_id == ""){
                return "Datastorage System - Nuevo"
            }else{
                return ""
            }
        }
    },  
    mounted:function(){
        this.init()
        this.$emit('open')
    },
    methods:{
        init:function(){
            if(this.datastoragesystem_id == ""){
                this.nuevo()
            }else{
                this.editar()
            }
        },nuevo:function(){
            this.opciones = []
        },
        onFileChange:function(file){
            const reader = new FileReader();
            reader.onload = e => {
              this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        tamano_icono_change_handler:function(value){
            let icono_tamano = value.split('x')
            this.icono.width = icono_tamano[0]
            this.icono.height = icono_tamano[1]
        },
        editar:function(){
            this.opciones = [
                {route:'datastorageobjeto', datastoragesystem_id:this.datastoragesystem_id, label:"Data Storage - Objetos"}
            ]            
        },        
        confirmar_guardar:function(){
            this.confirmar.title = "Confirmar"
            this.confirmar.msg = "Se va a guardar un nuevo datastorage system, ¿Desea continuar?"
            this.confirmar.visible = true
            this.confirmar.callback = "guardar"
        },
        guardar:function(){            
            let postconfig = get_postconfig()
            console.log(postconfig)
            postconfig.headers["Content-Type"] = "multipart/form-data"

            if(this.datastoragesystem.icono == null){
                return;
            }

            let formData = new FormData();
            formData.append("icono", this.datastoragesystem.icono);
            formData.append("datastoragesystem_id", this.datastoragesystem_id)
            formData.append("nombre", this.datastoragesystem.nombre)
            formData.append("descripcion",this.datastoragesystem.descripcion)
            formData.append("icono_tamano",this.datastoragesystem.icono_tamano)

            this.$http.post('/datastorage/GuardarSistemaController/procesar',formData,postconfig).then(httpresp => {
                console.log(httpresp)
            })
        }
    }
}
</script>