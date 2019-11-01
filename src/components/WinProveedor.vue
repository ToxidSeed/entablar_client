<template>
    <div>
        <div class="row">
            <div class="col-4">
                <q-card>    
                    <q-card-title>                
                        <span class="text-indigo">DBMS</span>      
                    </q-card-title>                  
                    <q-card-main>
                        <div class="row">
                            <q-input type="text" class="col-2" 
                                float-label="ID" 
                                v-model="form_data.proveedor_bd_id"  />
                            <q-input type="text" class="col-7 offset-xs-1" 
                                float-label="Nombre de Proveedor" 
                                v-model="form_data.nombre"  />
                            <div class="col-1">
                                <img v-bind:src="'http://127.0.0.1:5000/entablar/ImageLoader?image='+this.form_data.icono+'&&key='+key" width="32" height="32" >                    
                            </div>                
                        </div>                        
                        <q-uploader stack-label="Icono" 
                        ref="uploader"
                        @uploaded="uploaded"
                        :url="url" 
                        extensions=".jpg,.png"
                        hide-upload-button
                        auto-expand
                        :additional-fields="additional_fields"                        
                        />                 
                    </q-card-main>     
                    <q-card-actions align="end">                    
                        <q-btn flat @click="nuevo" :to="'/proveedorbd/'" > <img src="../assets/New_Document.png"><div>Nuevo</div></q-btn>
                        <q-btn flat @click="guardar"><img src="../assets/disk.png"><div>Guardar</div></q-btn>
                        <q-btn  flat><img alt="Quasar logo" src="../assets/Remove.png"><div>Eliminar</div></q-btn>                    
                    </q-card-actions> 
                </q-card>           
            </div> 
            <div class="col-8">
                <router-view  :proveedor_bd_id="form_data.proveedor_bd_id">
                </router-view>
            </div>
        </div>       
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'WinProveedor',
    props:['proveedor_bd_id'],
    data () {
        return {  
            size:"col-8",
            form_data:{
                proveedor_bd_id:"",
                nombre:"",
                icono:"default"                
            },           
            url:"http://127.0.0.1:5000/entablar/ProveedorBD/ProveedorBD/guardar",                
        }
    },
    computed: {
        additional_fields: function () {
            return [{name:'proveedor_bd_id',value:this.form_data.proveedor_bd_id},
                    {name:'nombre', value:this.form_data.nombre}]
        },
        key:function(){                
                var timestamp = Date.now()
            return  timestamp;
        }
    },
    methods:{       
        guardar(){
            this.$refs.uploader.upload()
        },
        uploaded(file, xhr){
            console.log(xhr)
        },
        get_object(proveedor_bd_id){
            axios({ 
                method: "post", 
                url: "http://127.0.0.1:5000/entablar/ProveedorBD/ProveedorBD/get_object" ,
                data:{
                    proveedor_bd_id:proveedor_bd_id
                },
                //headers: {'Content-Type': 'text/plain' }
                }).then(result => {                    
                    this.form_data.proveedor_bd_id = result.data.proveedor_bd_id;                                    
                    this.form_data.nombre    = result.data.nombre;
                    this.form_data.icono     = result.data.proveedor_bd_id+"_"+result.data.icono;
                    /*this.$emit("signal",{
                        "event":"tabla_loaded",
                        "tabla_id":this.form_data.tabla_id
                    })*/
                }, error => {
                    console.error(error);
                    
            });
        },
        nuevo(){
            this.form_data.proveedor_bd_id = ''
            this.form_data.nombre = ''
            this.form_data.icono = 'default'
            this.$refs.uploader.reset()
        }
    },
    beforeRouteEnter(to, from, next){        
        next(vm => {
            // access to component instance via `vm`
            if (typeof to.params.proveedor_bd_id =='undefined'){
                console.log('nuevo')
                vm.nuevo()
            }else{
                console.log('get_object')
                vm.get_object(to.params.proveedor_bd_id)                
            }
        })
    },
    beforeRouteUpdate(to, form, next){
        next() 
        this.get_object(to.params.proveedor_bd_id)
    }
}
</script>
