<template>
  <q-page class="row">    
      <router-view
          @signal="procesar_senal"
      ></router-view>      
    <q-card inline class="no-shadow col-8"> 
        <q-toolbar color="aux">            
            <q-btn flat name="add"  :to="'/campo/'+form_data.tabla_id"> <img src="../assets/Add_Green_Button.png"></q-btn>
            <q-btn flat @click="request"><img src="../assets/Minus_Red_Button.png"></q-btn>
            <q-toolbar-title>
            </q-toolbar-title>              
            <q-btn flat > <img src="../assets/Window_Resize.png"></q-btn>
            
        </q-toolbar>
        <q-table class="no-shadow"            
            :data="serverData"
            :columns="columns"
            row-key="name"       
            @request="request"  
            dense
            separator="cell"             
        >
          <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="nombre" 
              :props="props"      
              style="width:150px;"                      
              >{{ props.row.nombre }}</q-td>
              <q-td 
              key="descripcion"   
              style="width:500px;"            
              :props="props"                   
              >
              {{ props.row.descripcion }}                            
              </q-td>
              <q-td key="tipo_dato" :props="props">{{ props.row.tipo_dato }}</q-td>
              <q-td key="longitud" :props="props">{{ props.row.longitud }}</q-td>
              <q-td key="prec" :props="props">{{ props.row.prec }}</q-td>              
              <q-td key="flg_permite_nulos" :props="props"  style="width:75px;">
                <q-checkbox  :value="props.row.flg_permite_nulos" @input="view_data(props)" true-value="1" false-value="0"/>
              </q-td> 
              <q-td key="flg_pk" :props="props" style="width:75px;">
                <q-checkbox  :value="props.row.flg_pk" @input="view_data(props)" true-value="1" false-value="0"/>
              </q-td>               
          </q-tr>
        </q-table>        
    </q-card>
  </q-page>
</template>

<style>
.bg-brand {
  background: #2F2F2F;
}
.bg-aux {
  background: #CDE073;
}
.text-aux {
    color:#2F2F2F
}
.q-table tbody td {
    white-space: normal;
    
}
</style>

<script>
//import WinCampo from './WinCampo.vue'
import axios from 'axios'

export default {
  name: 'WinMain',
  /*components:{
        WinCampo
  },*/
  data: ()=>({           
      form_data:{
        tabla_id:"",
        campo_id:"",
        nombre:"",
        descripcion:"",
        tipo_dato:"",
        longitud:"",
        precision:""
      },
      columns:[
          {
            name: 'nombre',
            required: true,
            label: 'Campo',
            align: 'left',
            field: 'nombre',
            sortable: true,
            classes: 'my-class'
          },{
            name: 'descripcion',            
            label: 'Descripcion',
            align: 'left',
            field: 'descripcion',
            sortable: true,       
            style: 'width: 200px important!;',  
            type:'string'          
          },{
            name: 'tipo_dato',
            required: true,
            label: 'Tipo de Dato',
            align: 'left',
            field: 'tipo_dato',
            sortable: true,
            classes: 'my-class'
          },{
            name: 'longitud',
            required: true,
            label: 'longitud',
            align: 'left',
            field: 'longitud',
            sortable: true,
            classes: 'my-class'
          },{
            name: 'prec',
            required: true,
            label: 'precision',
            align: 'left',
            field: 'prec',
            sortable: true,
            classes: 'my-class'
          },{
            name: 'flg_permite_nulos',
            required: true,
            label: 'Nulo',
            align: 'left',
            field: 'flg_permite_nulos',
            sortable: true,
            classes: 'my-class'
          },{
            name: 'flg_pk',
            required: true,
            label: 'PK',
            align: 'left',
            field: 'flg_pk',
            sortable: true,
            classes: 'my-class'
          }
      ],
      serverData:[]      
  }),
  methods:{
    procesar_senal(e){
      if (e.event =="tabla_guardar" || e.event =="tabla_loaded"){
          console.log('ola')
          this.form_data.tabla_id =e.tabla_id
          this.request()
          //console.log(this.form_data.tabla_id)
      }
    },
    request(){
            console.log('sss')
            
            
            axios
            .post('http://127.0.0.1:5000/entablar/Campo/Campo/get_campos_por_tabla',{              
                tabla_id:this.form_data.tabla_id              
            })
            .then(({ data }) => {
               this.serverData = data.rows
               /* // updating pagination to reflect in the UI
                this.serverPagination = pagination

                // we also set (or update) rowsNumber
                this.serverPagination.rowsNumber = data.rowsNumber

                // then we update the rows with the fetched ones
                this.serverData = data.rows

                // finally we tell QTable to exit the "loading" state
                this.loading = false*/
                console.log(this.serverData )
            })
            .catch(error => {
                console.log(error)
                // there's an error... do SOMETHING

                // we tell QTable to exit the "loading" state
               
            })
      },
      mounted () {
        // once mounted, we need to trigger the initial server data fetch
        console.log('mounted_main')
        this.request()
      },
      view_data(props){
        console.log(props)
      }
  }
}
</script>
