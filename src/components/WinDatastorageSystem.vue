<template>  
    <v-container class="pa-0 ma-0" fluid>
        <v-toolbar flat class="blue--text text--darken-4">
            <!--<v-btn icon color="blue darken-4">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>-->
            <v-toolbar-title>Data Storage System</v-toolbar-title>            
        </v-toolbar>
        <v-row>                        
            <v-col :cols="panel_cols.primero"            
            >                            
                <router-view v-on:open="open_handler">
                </router-view>
            </v-col > 
            <v-col :cols="panel_cols.segundo" class="pl-0">
                <TableDatastorageSystemVue/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
//import PanelDatastorageSystem from '@/components/PanelDatastorageSystem.vue'
import TableDatastorageSystemVue from '@/components/TableDatastorageSystem.vue'

export default {
    name: 'WinDatastorageSystem',
    props:['proveedor_bd_id'],
    components:{
        TableDatastorageSystemVue
    },  
    data () {
        return {              
            form_data:{
                proveedor_bd_id:"",
                nombre:"",
                icono:"default"                
            }, 
            panel_cols:{
                primero:0,
                segundo:12
            }
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
            this.$http
            .post(this.$backend_url+'ProveedorBDController/ProveedorBDController/get',{ 
                proveedor_bd_id:proveedor_bd_id
            }).then(response => {
                var result = response.data
                this.form_data.proveedor_bd_id = result.data.proveedor_bd_id;                                    
                this.form_data.nombre    = result.data.nombre;
                this.form_data.icono     = result.data.proveedor_bd_id+"_"+result.data.icono;
            });   
        },
        nuevo(){
            this.form_data.proveedor_bd_id = ''
            this.form_data.nombre = ''
            this.form_data.icono = 'default'
            //this.$refs.uploader.reset()
        },
        open_handler:function(){
            this.panel_cols.primero = 3
            this.panel_cols.segundo = 9
        }
    }/*,
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
    }*/
}
</script>
