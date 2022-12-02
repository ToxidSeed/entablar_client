<template>
    <q-dialog v-model="opened">        
        <div slot="body">
        <q-field
            icon="account_circle"
            helper="We need your name so we can send you to the movies."
            label="Your name"
            :label-width="3"
        >
            <q-input v-model="message" />
        </q-field>
        </div>        
      <!--<q-card> 
            <q-card-section class="q-pt-xs q-pb-xs" >
                <q-icon :name="msgdata.icon" size="md" :color="msgdata.color" text-color="white" /> {{title}}            
            </q-card-section>
            <q-separator/>
            <q-card-section class="q-pt-md q-pb-xs">
            <div>ola k ase</div>
            </q-card-section>            
            <q-card-section class="q-pt-none q-mt-none" >
                <div>
                    <ul class="q-mt-none">
                        <li v-for="item in errors" v-bind:key="item">
                            {{item}}
                        </li>
                    </ul>
                </div>
            </q-card-section>            
            <q-card-section class="q-pt-none q-mt-none" v-if="mostrar_info_error">
                <div class="text-accent text-weight-bold">URL petición</div><div>{{url}}</div>
            </q-card-section>
            <q-card-section class="q-pt-none q-mt-none" v-if="mostrar_info_error">                
                <div class="text-red text-weight-bold">Parámetros de Petición</div>
                <ul class="q-mt-none">
                    <li v-for="(value, key) in request_config" v-bind:key="key">
                        {{key}}:{{value}}
                    </li>
                </ul>
            </q-card-section>
            <q-card-section class="q-pt-none q-mt-none" v-if="mostrar_info_error">
                <div class="text-red text-weight-bold">Stacktrace</div>
                <div v-for="error in stacktrace" v-bind:key="error">
                    {{error}}
                </div>
            </q-card-section>            
        <q-separator />
        <q-card-actions align="right">
            <q-btn dense color="primary" v-close-popup @click="btn_ok_handler">OK</q-btn>
            <q-btn flat v-close-popup>Cerrar</q-btn>
        </q-card-actions>
      </q-card>-->
    </q-dialog>
</template>
<script>
    export default {
        name:"MessageBox",
        props:{
            config:{
                type:Object,
                default: () => {}
            }
        },
        data () {
            return {
                title:"",
                message:"",
                action:"",
                errors:[],
                request_config:{},
                stacktrace:[],
                url:"",
                opened: false,
                mostrar_info_error:false,
                msgdata:{
                    icon:"",
                    color:""
                },
                error:{
                    icon:"fa fa-exclamation",
                    color:"red"
                },
                info:{
                    icon:"fa fa-info-circle",
                    color:"primary"
                },
                expired:false
            }
        },
        watch:{
            /*config:function(newconf){                
                if ('httpresp' in newconf){     
                    this.httpresp(newconf.httpresp,newconf.open)
                    return;
                }                                             
            }*/
        },
        mounted:function(){
            //this.interface()
        },
        methods:{    
            http_resp:function(httpresp){
                let appdata = httpresp.data
                this.set_httpresp(httpresp)
                this.set_appresp(appdata)
                this.opened = true
            },                                    
            httpresp:function(httpresp){                
                let appdata = httpresp.data
                this.set_httpresp(httpresp)
                this.set_appresp(appdata)
                this.opened = true
            },
            http_resp_on_error:function(httpresp){
                let appdata = httpresp.data
                this.set_httpresp(httpresp)
                this.set_appresp(appdata)

                if (appdata.success == false){
                    this.opened = true
                }
            },
            http_error:function(error){
                console.log(error)
            },
            new:function(args=null){
                this.errors = []
                if (args.title != undefined){
                    this.title = args.title
                }
                if (args.action != undefined){
                    this.action = args.action
                }
                if (args.message != undefined){
                    this.message = args.message
                }       
                this.opened = true      
            },                                              
            set_httpresp:function(httpresp){                                   
                this.request_config = JSON.parse(httpresp.config.data)      
                this.errors = []
                this.stacktrace=[]
                this.url = ""                                
                this.url = httpresp.config.url
            },
            set_appresp:function(appresp=null){
                let error = false
                let stacktrace = false
                //var has_errors = false                                            
                if (appresp != null){
                    this.expired = appresp.expired
                    //
                    if (appresp.errors.length > 0){
                        //has_errors = true
                        this.errors = appresp.errors                        
                        error = true
                    }
                    if (appresp.stacktrace != null && appresp.stacktrace.length > 0){
                        this.stacktrace = appresp.stacktrace
                        stacktrace = true
                    }
                    
                    //mostrar el dialogo si hay error
                    if (error == true || stacktrace==true){
                        this.mostrar_info_error = true
                        this.msgdata = this.error
                        this.title = "Error"
                    }else{
                        this.mostrar_info_error = false
                        this.msgdata = this.info
                        this.title = "Información"
                    }                                                        
                    this.message = appresp.message                                        
                }
            },
            btn_ok_handler:function(){
                if (this.expired){
                    this.$router.push({name:"/"})
                }
            }
        }
    }
</script>
