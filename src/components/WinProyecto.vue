<template>
    <div class="row">
        <q-card  inline class="no-shadow col-4">        
            <q-card-title color="indigo" inverted>
                Proyecto
            </q-card-title>
            <q-card-main>
                <q-input type="text"                             
                    color="indigo"
                    stack-label="ID"                     
                    v-model="form_data.tabla_id"  
                />
                <q-input type="text"                             
                    color="indigo"
                    stack-label="Nombre"                     
                    v-model="form_data.nombre"  
                />
                <q-input
                        v-model="form_data.descripcion"
                        type="textarea"            
                        stack-label="Descripción"  
                        color="indigo"          
                        :max-height="100"
                        rows="7"
                />
                <div class="row">
                    <div class="col-6">
                        <q-datetime v-model="form_data.fecha_creacion"  
                        format="DD/MM/YYYY"                        
                        readonly
                        color="indigo"
                        stack-label="Fecha de Creación"  
                        type="date"
                        /> 
                    </div>
                    <div class="col-6 q-pl-xs">
                        <q-datetime v-model="form_data.fecha_modificacion" 
                        format="DD/MM/YYYY"                         
                        readonly
                        color="indigo"
                        stack-label="Fecha de Modificacion"  
                        type="date" 
                        />
                    </div>
                </div>                
            </q-card-main>
            <q-card-actions align="end">                    
                <q-btn color="indigo" outline label="Nuevo" /> 
                <q-btn color="indigo" @click="guardar" label="Guardar"/>
                <q-btn color="brown"  @click="cancelar" label="Cancelar" />
            </q-card-actions> 
        </q-card>
    </div>    
</template>
<script>

export default {
  name: 'LayoutDefault',  
  data () {
    return {
          form_data:{
            tabla_id:"",
            fecha_registro:"",
            fecha_modificacion:""
          }
    }
  },
  methods: {
    doSomething(event, id, label){
      console.log(event)
      console.log(id)
      console.log(label)
    },
    get_dbms_list(){
      console.log('doSomething')
    },
    test(){
      console.log('olak ase')
    }
  }
}
</script>