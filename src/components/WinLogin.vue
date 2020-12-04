<template>
    <div class="row justify-center items-center window-height">
        <div>
            <q-card style="width: 350px">
                <q-card-title class="text-center">
                    Inicio de Sesion
                </q-card-title>
                <q-card-main>
                    <q-input  stack-label="Usuario o Email"  color="indigo"/>
                    <q-input  stack-label="Password"  color="indigo" />                    
                </q-card-main>
                
                <q-card-actions >
                    <q-btn label="continuar" @click="sign_in" no-caps class="full-width" color="blue"/>
                </q-card-actions>                    
                <q-card-main align="center">
                    <div>- o -</div>
                </q-card-main>
                <q-card-actions >
                    <q-btn flat @click="sign_in_with_google" no-caps class="full-width">
                        <img src="../assets/google-icon.png" width="32px" height="32px"><div>&nbsp;&nbsp;Continuar con google</div>
                    </q-btn>
                </q-card-actions>
            </q-card>          
        </div>
    </div>        
</template>
<script>
export default {
    name: 'WinLogin',          
  data () {
    return {
          
    }
  },
  methods:{
      sign_in_with_google:async function(){
          const authCode = await this.$gAuth.getAuthCode()          
          localStorage.authCode = authCode
          if(authCode  != ''){
              localStorage.isAuthorized = true
          }
          this.$router.push('/')
      }
  }
}
</script>