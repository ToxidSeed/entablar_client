<template>    
    <div>      
        <q-list no-border>         
            <q-item to="/x" v-for="item in result_set" v-bind:key="item.id">            
                <q-item-main :label="item.nombre" :sublabel="item.desc_abreviada" />            
            </q-item>        
        </q-list>
    </div>
</template>
<script>
export default {
    name:"ResultadosBusqueda",    
    props:{
        search_text:{
            default:""
        }
    },
    watch:{
        search_text:function(newValue){
            this.search_data_text = newValue
            this.buscar()
        }
    },
    data(){
        return {     
            search_data_text:"",                                     
            result_set:[]
        }
    },
    mounted:function(){
        console.log(this.showing)
    },
    methods:{
        buscar:function(){
            console.log(this.search_text)
            this.$http
            .post(this.$backend_url+'ObjetoController/ObjetoController/search',{ 
                search_text:this.search_text
            }).then(function(response){
                this.result_set = response.data
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        //console.log(to)               
        next(vm => {
            // access to component instance via `vm`
            /*if (typeof to.params.tabla_id =='undefined'){
                //console.log(vm.dbms_id)
                vm.new_table()
            }else{
                vm.get_object(to.params.tabla_id)                
            }*/
            console.log(vm)
        })

        
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
    }
}
</script>
<style>
</style>
