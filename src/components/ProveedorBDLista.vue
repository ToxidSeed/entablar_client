<template >
    <div>
        <q-toolbar
            color="primary"
            inverted
            
        > 
        <!--<q-btn icon="add" @click="open" round :to="'/tipodato/'+this.proveedor_bd_id"/>-->
        <q-toolbar-title >
            <span class="text-indigo">DBMS Lista  </span>             
        </q-toolbar-title>        
                <q-search
                    :debounce="600"             
                    placeholder="Buscar por nombre de proveedor"
                    style="min-width: 350px"
                    inverted
                    v-model="search_text"
                >
                </q-search>
        </q-toolbar>  
        <q-table class="no-shadow"
            :data="serverData"
            :columns="columns"
            row-key="name"
            @request="request"
            :pagination.sync="pagination"
            dense            
            grid 
        >       
        <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="proveedor_bd_id"
                :props="props"
            >
            <div class="row items-center no-wrap">
                <q-btn size="sm" round dense color="secondary" :to="'/proveedorbd/'+props.row.proveedor_bd_id" icon="fas fa-edit"  class="q-mr-xs" />
                <q-btn size="sm" round dense color="primary" icon="fas fa-cogs" class="q-mr-sm" />
                <div>{{props.row.proveedor_bd_id }}</div>
            </div>            
            </q-td>
            <q-td key="nombre" 
                :props="props"
            >{{ props.row.nombre }}              
            </q-td>
            <q-td key="icono" 
                :props="props"
            >
            <img v-bind:src="'http://127.0.0.1:5000/entablar/ImageLoader?image='+props.row.proveedor_bd_id+'_'+props.row.icono+'&&key='+key" width="32" height="32" >                                            
            </q-td>
        </q-tr>
        </q-table>     
    </div>
</template>
<script>

export default {
    name:"ProveedorBDLista",
    data(){
        return {
            pagination: {
                page: 1,    
                rowsPerPage: 13 // 0 means all rows    
            },
            search_text:"", 
            columns:[{
                name:'proveedor_bd_id',                
                label:'ID',
                align:'left',
                field:'proveedor_bd_id',
                style: 'width: 70px'
            },{
                name:'nombre',                
                label:'nombre',
                align:'left',
                field:'nombre'
            },{
                name:'icono',                
                label:'icono',
                align:'left',
                field:'icono'
            }],
            serverData:[]
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