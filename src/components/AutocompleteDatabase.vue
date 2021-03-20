<template>
    <q-input
        id="inputid"
        stack-label="Database"                 
        v-model="database_name"        
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
export default {
    name:'AutocompleteDatabase',
    props:{
        dbms_id:{
            type:String,
            default:""
        },
        in_database_id:{
            type:String,
            default:""
        }
    },
    watch:{
        in_database_id:function(new_database_id){
            console.log(new_database_id)
            this.get(new_database_id)
        }
    },    
    data(){
        return{
            database_id:"",
            database_name:"",
            rowcount:0
        }
    },
    methods:{
        search:function(terms, done){
            this.$http
            .post(this.$backend_url+'DatabaseController/AutoComplete/search',{ 
                nombre:terms,
                dbms_id:this.dbms_id
            }).then(function(response){ 
                            
                done(response.data)
            })
        },
        selected:function(item){                        
            this.$emit('database-selected',{
                   database_id:item.value,
                   database_name:item.label,
                   dbms_id:item.dbms_id
            })
        },
        get:function(database_id){
            this.$http
            .post(this.$backend_url+'DatabaseController/DatabaseController/get',{ 
                database_id:database_id
            }).then(response => {                    
                var element = response.data.data         
                this.database_id = element.id
                this.database_name = element.nombre
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