<template>
    <div>
        <v-card raised >

            <v-card-title>
                <v-icon md left>
                    mdi-account-convert
                </v-icon>
                <span class="title font-weight-bold">Actividad</span>
            </v-card-title>

            <v-card-text>
                <v-container class="my-1">
                    <v-row justify="center" align="center" class="text-center">
                        <v-col cols="12" md=4>
                            <h3>Total de estrellas obtenidas</h3>
                            <h1 class="my-5 primary--text">359</h1>
                        </v-col>
                        <v-col cols="12" md=4>
                            <h3>Proyectos finalizados</h3>
                            <h1 class="my-5 primary--text">3</h1>
                        </v-col>
                        <v-col cols="12" md=4>
                            <h3>Proyectos en progreso</h3>
                            <h1 class="my-5 primary--text">19</h1>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

        </v-card>    
    </div>
</template>

<script>
export default {
    name: 'ActivityCard',
    data() {
        return {
            nombre: 'Rodolfo',
            apellido: 'Guzman',
            telefono: '8095733369',
            correo: 'rodolfo69@gmail.com',
            direccion: 'La Vega, Gamundy',
        }
    },
}
</script>