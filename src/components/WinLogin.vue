<template>
    <v-app>      
        <v-container fill-height >
            <v-row align="center" justify="center">
                <v-card style="width:300px;">                    
                    <v-row class="justify-center mt-2">
                    <img
                        src="../assets/forge-logo.png"
                        height="100"
                    />
                    </v-row>
                    <v-card-title class="blue--text text--darken-4">
                        Hola de Nuevo!
                    </v-card-title>
                    <v-card-subtitle>
                        Por favor ingresa tus credenciales
                    </v-card-subtitle>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                label="Usuario"
                                v-model="usuario"                                                                                                
                            ></v-text-field>
                            <v-text-field                            
                                label="Password"
                                v-model="password"   
                                type="password"                                                             
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-container>
                            <v-row>
                                <v-btn
                                    color="blue darken-4"
                                    dark     
                                    style="width:100%;"                          
                                    class="text-capitalize"
                                >
                                    Login
                                </v-btn>
                            </v-row>
                            <v-row class="pt-2">
                                <v-btn                                                                  
                                style="width:100%;"      
                                plain              
                                >
                                <v-avatar
                                size="32"
                                >
                                    <img
                                        src="../assets/google-icon.png" 
                                    >
                                </v-avatar>
                                    L
                                    <span class="text-lowercase">
                                        ogin con google
                                    </span>
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-card-actions>
                    <!--<q-card-main>
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
                    </q-card-actions>-->
                </v-card>  
        </v-row>
        </v-container>       
    </v-app>        
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