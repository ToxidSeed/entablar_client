<template>
    <q-input id="inputid"
        stack-label="Database Management System"         
        v-model="dbms_name"     
        color="green"   
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
//:readonly="columns_rowcount>=1"
export default {
    props:{
        in_dbms_id:{
            type:String,
            default:""
        }
    },
    watch:{
        in_dbms_id:function(new_value){
            this.get_dbms(new_value)            
        }
    },
    data(){
        return{
            dbms_id:"",
            dbms_name:"",
            rowcount:0
        }
    },
    methods:{
        search:function(terms, done){
            this.$http
            .post(this.$backend_url+'ProveedorBDController/AutoComplete/search',{ 
                nombre:terms
            }).then(function(response){                   
                done(response.data)
            })
        },
        selected:function(item){
            this.dbms_id = item.value
            this.$emit('dbms-selected',{
                   dbms_id:item.value,
                   dbms_name:item.label
            })
        },
        get_dbms:function(dbms_id){            
            this.$http
            .post(this.$backend_url+'ProveedorBDController/ProveedorBDController/get',{ 
                proveedor_id:dbms_id
            }).then((response)=>{                
                this.dbms_id = response.data.proveedor_bd_id
                this.dbms_name = response.data.nombre                
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