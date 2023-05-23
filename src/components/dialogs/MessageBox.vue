<template>
    <v-dialog v-model="localValue">
        <v-card>
            <v-card-title class="text-h6">

            </v-card-title>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        name:"MessageBox",
        props:{
            config:{
                type:Object,
                default: () => {
                    return {                        
                        
                    }
                }
            },
            httpresp:{
                type:Object,
                default: () => {
                    return {
                        
                    }
                }
            },            
            value:{
                required:true
            },
            callback:"",
            onerror:false,
            updtime:null
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
                localValue: false,
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
            localValue:function(newval){
                this.$emit('input',newval)
            },
            value:function(newval){
                this.localValue = newval
            }
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
