<template>
    <div>
    <q-card inline class="no-shadow col-4">
        <!--<q-toolbar color="primary"
            inverted>
            <q-toolbar-title>
                Tipo de Dato
            </q-toolbar-title>
        </q-toolbar>        -->
        <q-card-title >
            Tipo de Dato
            <span slot="subtitle"  >Proveedor: <span class="text-primary">{{additional_data.nombre_proveedor}}</span></span>
        </q-card-title>
        <q-card-main>         
            <div class="row">
                <q-input type="text"
                float-label="ID"
                v-model="form_data.id"
                class="col-3"
                />            
                <q-input type="text"
                    float-label="Nombre"
                    v-model="form_data.nombre"
                    class="col-8 offset-xs-1"
                />
            </div>                          
            <q-select
            v-model="form_data.tipo_dato_primario"
            float-label="Tipo de Dato Primario"
            :options="selectOptions"
            />
            <q-input type="text" v-if="byte_sized"
                v-model="form_data.tamano_minimo"
                float-label="Tamaño Minimo"
            />
            <q-input type="text" v-if="byte_sized"
                v-model="form_data.tamano_maximo"
                float-label="Tamaño Maximo"
            />                        
            <q-input type="text" v-if="precision_sized"
                v-model="form_data.precision_maxima"   
                float-label="Precision Maxima"
            />
            <q-input type="text" v-if="precision_sized"
                v-model="form_data.precision_minima"   
                float-label="Precision Minima"
            />
            <q-input type="text" v-if="precision_sized"
                v-model="form_data.escala_maxima"   
                float-label="Escala Maxima"
            />
            <q-input type="text" v-if="precision_sized"
                float-label="Escala Minima"
                v-model="form_data.escala_minima"   
            />
        </q-card-main>
        <q-card-actions align="end">                    
            <q-btn flat  > <img src="../assets/New_Document.png"><div>Nuevo</div></q-btn>
            <q-btn flat @click="guardar"><img src="../assets/disk.png"><div>Guardar</div></q-btn>
            <q-btn  flat  ><img alt="Quasar logo" src="../assets/Remove.png"><div>Eliminar</div></q-btn>                    
        </q-card-actions> 
    </q-card>
    <router-view class="col-12">
    </router-view>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:"WinTipoDato",
    props:["proveedor_bd_id"],
    data(){
        return {            
            selectOptions:[
                {
                    label:'String',
                    value:'STRING'
                },
                {
                    label:'Number',
                    value:'NUMBER'
                },{
                    label:'Otros',
                    value:'OTROS'
                }
            ],
            sizeOptions:[
                {
                    label:'B',
                    value:'B'
                },{
                    label:'KB',
                    value:'KB'
                },{
                    label:'MB',
                    value:'MB'
                },{
                    label:'GB',
                    value:'GB'
                }
            ],
            form_data:{
                id:0,
                nombre:"",
                descripcion:"",
                tipo_dato_primario:"",
                proveedor_bd_id:"",
                uni_med_tamano_minimo:"",
                tamano_minimo:0,
                uni_med_tamano_maximo:"",
                tamano_maximo:0,
                precision_minima:0,
                precision_maxima:0,
                escala_minima:0,
                escala_maxima:0
            },
            additional_data:{
                nombre_proveedor:""
            }
        }
    },
    computed: {
        byte_sized:function(){            
            if (this.form_data.tipo_dato_primario =='STRING' || this.form_data.tipo_dato_primario == 'OTROS'){
                return true;
            }else{
                return false;
            }
        },
        precision_sized:function(){
            if (this.form_data.tipo_dato_primario == 'NUMBER'){
                return true;
            }else{
                return false;
            }
        }
    },
    methods:{
        guardar(){
            axios({
                method:"post",
                url:"http://127.0.0.1:5000/entablar/TipoDato/TipoDato/guardar",
                data:{
                    id:this.form_data.id,
                    nombre:this.form_data.nombre,
                    descripcion:this.form_data.descripcion,
                    tipo_dato_primario:this.form_data.tipo_dato_primario,
                    proveedor_bd_id:this.form_data.proveedor_bd_id,
                    uni_med_tamano_minimo:this.form_data.uni_med_tamano_minimo,
                    tamano_minimo:this.form_data.tamano_minimo,
                    uni_med_tamano_maximo:this.form_data.uni_med_tamano_maximo,
                    tamano_maximo:this.form_data.tamano_maximo,
                    precision_minima:this.form_data.precision_minima,
                    precision_maxima:this.form_data.precision_maxima,
                    escala_minima:this.form_data.escala_minima,
                    escala_maxima:this.form_data.escala_maxima
                }
            }).then(result => {
                    this.form_data.id                   = result.data.tipo_dato_id;
                    this.form_data.nombre               = result.data.nombre;
                    this.form_data.descripcion          = result.data.descripcion;
                    this.form_data.tipo_dato_primario   = result.data.tipo_dato_primario;
                    this.form_data.proveedor_bd_id      = result.data.proveedor_bd_id;
                    this.form_data.uni_med_tamano_minimo= result.data.uni_med_tamano_minimo;
                    this.form_data.uni_med_tamano_maximo= result.data.uni_med_tamano_maximo;
                    this.form_data.tamano_minimo        = result.data.tamano_minimo;
                    this.form_data.tamano_maximo        = result.data.tamano_maximo;
                    this.form_data.precision_minima     = result.data.precision_minima;
                    this.form_data.precision_maxima     = result.data.precision_maxima;
                    this.form_data.escala_minima        = result.data.escala_minima;
                    this.form_data.escala_maxima        = result.data.escala_maxima;
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
        }
    },
    beforeRouteEnter (to, from, next) {        
        next(vm => {
            // access to component instance via `vm`
            if (typeof to.params.proveedor_bd_id =='undefined'){
                //vm.new_table()
            }else{
                vm.get_proveedor(to.params.proveedor_bd_id)                
            }
        })

        
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    },
    beforeRouteUpdate (to, from, next) {    
        console.log(to.params.proveedor_bd_id)
        console.log('beforeRouteUpdate')         

        next() 
        this.get_proveedor(to.params.proveedor_bd_id) 
    }
}
</script>
