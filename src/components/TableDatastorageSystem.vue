<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="data"
            :items-per-page="15"
            class="elevation-1"
            dense
        >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-btn plain color="blue darken-4" :to="{name:'datastoragesystem-nuevo'}" >                    
                    <v-icon left>
                        mdi-plus-thick
                    </v-icon>                    
                    Nuevo
                </v-btn>
            </v-toolbar>
        </template>
        </v-data-table>
    </div>
</template>
<script>

export default {
    name:"TableDatastorageSystem",
    data(){
        return {            
            search_text:"",             
            headers:[{                
                text:'ID',
                align:'start',
                value:'id',
                width:'100'
            },{
                text:'nombre',                                
                value:'nombre',
                width:'200'
            },{
                text:'',                                
                value:'',
                width:''
            }],
            data:[]
        }
    }, 
    computed:{
        key:function(){                
                    var timestamp = Date.now()
                return  timestamp;
        }
    },
    methods:{
        request(){            
            this.$http
            .post(this.$backend_url+'ProveedorBDController/ProveedorBDController/get_list',{ 
                nombre:this.search_text
            }).then(response => {   
                var result = response.data
                this.serverData = result.data
                console.log(this.serverData)
            });
        },
        open(){
            console.log(this.proveedor_bd_id)
        }
    },
    mounted:function() {           
      console.log('mounted_provve')     
      this.request()
    }
}
</script>