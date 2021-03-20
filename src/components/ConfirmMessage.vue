<template>
    <q-dialog
        v-model="activate"           
        @ok="onOk"
        @cancel="onCancel"
        @show="onShow"
        @hide="onHide"
    >
        <span slot="title">{{title}}</span>
            <span slot="message">{{message}}</span>
        <div slot="body">
            <ul>
                <li v-for="item in list" v-bind:key="item">
                    {{ item }}
                </li>
            </ul>
        </div>

        <template slot="buttons" slot-scope="props">            
            <q-btn flat label="Confirmar" @click="props.ok" />
            <q-btn flat label="Cancelar" @click="props.cancel" />
        </template>-
    </q-dialog>
</template>
<script>
export default {
    name:'ConfirmMessage',    
    data(){
        return{
            activate:false,
            title:"",
            message:"",
            list:[],
            requester:""
        }
    },
    methods:{
        onOk(){
            this.$emit('confirm-'+this.requester)
        },
        onCancel(){
            console.log('data')
        },
        onShow(){},
        onHide(){},
        async choose (onFn, hero){
            console.log(hero)
        },
        start(config){                        
            this.activate = true
            this.title = config.title
            this.message = config.message
            this.list = config.list       
            this.requester = config.requester     
        }
    }
}
</script>