<template>
    <v-dialog v-model="localValue" max-width="400">
        <v-card>
            <v-card-title class="text-h5">
                {{config.title}}
            </v-card-title>
            <v-card-text>{{config.msg}}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    @click="localValue = false"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="btn_si_click_handler"
                >
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name:"Confirmar",
    props:{
        value:{
            required:true
        },
        config:{
            type: Object,
            default: () => {
                return {
                    title:"",
                    msg:"",
                    callback:"ok"
                }
            }
        }
    },
    data(){
        return {
            localValue:this.value
        }
    },
    watch:{
        localValue:function(newval){
            this.$emit('input', newval)
        },
        value:function(newval){
            this.localValue = newval
        }
    },
    methods:{
        btn_si_click_handler:function(){
            this.localValue = false
            this.$emit(this.config.callback)
        }
    }
}
</script>