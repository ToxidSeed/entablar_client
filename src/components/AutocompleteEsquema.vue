<template>
    <q-input
        id="inputid"
        stack-label="Esquema" 
        color="green"
        v-model="esquema_name"        
        clearable
    >
        <q-autocomplete                        
            @search="search" 
            @selected="selected" 
            :min-characters="3"
            value-field="label"                       
        />
    </q-input>
</template>
<script>
export default {
    name:'AutocompleteEsquema',
    props:{
        database_id:{
            type:String,
            default:""
        },
        in_esquema_id:{
            type:String,
            default:""
        }
    },
    watch:{
        in_esquema_id:function(new_esquema_id){
            this.get(new_esquema_id)
        }
    },
    data(){
        return{
            esquema_id:"",
            esquema_name:"",
            rowcount:0
        }
    },
    methods:{
        search:function(terms, done){
            this.$http
            .post(this.$backend_url+'EsquemaController/AutoComplete/search',{ 
                nombre:terms,
                database_id:this.database_id
            }).then(function(response){                   
                done(response.data)
            })
        },
        selected:function(item){            
            this.dbms_id = item.value
            this.$emit('esquema-selected',{
                   esquema_id:item.value,
                   esquema_name:item.label,
                   dbms_id:item.dbms_id,
                   database_id: item.database_id                
            })
        },
        get:function(esquema_id){
            this.$http
            .post(this.$backend_url+'EsquemaController/EsquemaController/get',{ 
                esquema_id:esquema_id
            }).then(response => {                    
                var element = response.data.data         
                this.esquema_id = element.id
                this.esquema_name = element.nombre
            })
        }
    }
}
</script>
<style>
#inputid div.q-if-label.q-if-label-above{
    color:green
}
#inputid{
    color:green
}
</style>