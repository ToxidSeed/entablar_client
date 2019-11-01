<template>
    <div class="row justify-center items-center window-height">
        <div>
            <q-card style="width: 400px">
                <q-card-title class="text-center">
                    Inicio de Sesion
                </q-card-title>
                <q-card-main>
                    <q-input  stack-label="Usuario o Email"  color="indigo"/>
                    <q-input  stack-label="Password"  color="indigo" />                    
                </q-card-main>
                <q-card-separator />
                <q-card-actions align="end">
                    <q-btn label="Iniciar Sesion" no-caps color="indigo" class="full-width"/>                                         
                    <q-btn label="Registrarse" flat no-caps color="indigo" class="full-width" to="/registrarse"/>
                    <q-btn label="He olvidado mi contraseña" flat no-caps color="indigo" class="full-width"/>
                </q-card-actions>
            </q-card>          
        </div>
    </div>        
</template>
<script>
export default {
    
}
</script>