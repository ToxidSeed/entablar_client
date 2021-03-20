<template>
    <div>
        <q-item to="/database/0">
          <q-item-side icon="fas fa-database" />
          <q-item-main label="Bases de datos" sublabel="Learn more about it" />          
        </q-item>
        <q-item to="/esquema/0">
          <q-item-side icon="fas fa-database" />
          <q-item-main label="Esquemas" sublabel="Learn more about it" />          
        </q-item>
        <q-item to="/tlist">
          <q-item-side icon="fas fa-table" />
          <q-item-main label="Tablas" sublabel="Learn more about it" />          
        </q-item>
    </div>
</template>
<script>
export default {
    name:'PanelOpciones',
    data(){
        return{

        }
    }
}
</script>