<template>
    <q-dialog v-model="localValue" persistent>
        <q-card>
            <q-card-section class="row items-center">
            <q-avatar icon="question_mark" color="warning" text-color="white" />
            <span class="q-ml-sm">{{msg}}</span>
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="Cancel" color="red" v-close-popup />
            <q-btn label="Si" color="primary" v-close-popup @click="btn_si_click_handler"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script>
export default {
    name:"Confirmar",
    props:{
        value:{
            required:true
        },
        msg:{
            type:String,
            default:""
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
            this.$emit('ok')
        }
    }
}
</script>