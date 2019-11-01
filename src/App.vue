<template>
  <div>
  <router-view>
  </router-view>  
  </div>
</template>

<script>

export default {
  name: 'main',
  components: {
   
  },
  data () {
    return {
          dbms:{
            name:"DBMS",
            id:""
          }
    }
  },
  methods: {
            
  }
}
</script>

<style>
.bg-brand {
  background: #2F2F2F;
}
.bg-aux {
  background: #CDE073;
}
</style>
