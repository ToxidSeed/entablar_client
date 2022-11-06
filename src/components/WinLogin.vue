<template>
    <div class="row justify-center items-center window-height">
        <div>
            <q-card style="width: 350px">
                <q-card-title class="text-center">
                    Inicio de Sesion
                </q-card-title>
                <q-card-main>
                    <q-input  stack-label="Usuario o Email"  color="indigo" v-model="usuario"/>
                    <q-input  stack-label="Password"  color="indigo" v-model="password"/>                    
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
            usuario:"",
            password:""        
        }
    },
    methods:{
        sign_in_with_google:async function(){        
            const authCode = await this.$gAuth.getAuthCode()    
            const httpresp = await this.$http.post('/auth/AuthManager/login', { code: authCode, redirect_uri: 'postmessage' , provider:"google"})      

            let appresp = httpresp.data

            if (appresp.success == true){                
                let data = appresp.data
                localStorage.authCode = authCode
                localStorage.access_token = data.access_token
                localStorage.email = data.email
                localStorage.name = data.name
            }
            
            if(authCode  != ''){
                localStorage.isAuthorized = true
            }
            this.$router.push('/')
        },
        sign_in:function(){
            console.log('fix')
        }
    }
}
</script>