<template>
  <q-page class="flex flex-center">
    <q-layout>
         <!-- optional -->
        <q-layout-header>
            <!-- content; any -->
        </q-layout-header>

        <!-- optional -->
        <q-layout-drawer side="left">
            <!-- content; any -->
        </q-layout-drawer>

        <!-- optional -->
        <q-layout-drawer side="right">
            <!-- content; any -->
        </q-layout-drawer>

        <!-- REQUIRED -->
        <q-page-container>   
            <q-card inline style="width: 500px">   
                <q-toolbar color="grey-9">
                <q-toolbar-title>
                    Tabla
                </q-toolbar-title>
                <q-btn flat round dense icon="mail" />
                </q-toolbar>      
                <q-input
                type="text"
                float-label="Nombre de Tabla"            
                />           
                <q-input
                v-model="area"
                type="textarea"            
                float-label="Descripcion"            
                :max-height="100"
                rows="7"
                />          
                <q-card-actions align="end">                    
                    <q-btn flat label="Nuevo" />
                    <q-btn flat label="Guardar" />
                    <q-btn flat label="Eliminar" />                    
                </q-card-actions>
            </q-card>
            <q-card inline="True"> 
                <q-table
                    title="Table Title"
                    :data="tableData"
                    :columns="columns"
                    row-key="name"                    
                />
            </q-card>


        </q-page-container>

        <!-- optional -->
        <q-layout-footer>
            <!-- content; any -->
        </q-layout-footer>
    </q-layout>
  </q-page>
</template>

<style>
.bg-brand {
  background: #2F2F2F;
}
</style>

<script>
export default {
  name: 'WinMain',
  data: ()=>({
      columns:[
          {
            name: 'desc',
            required: true,
            label: 'Dessert (100g serving)',
            align: 'left',
            field: 'name',
            sortable: true,
            classes: 'my-class',
            style: 'width: 500px'
          }
      ],
      tableData:[]
  })
}
</script>
