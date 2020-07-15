<template>
    <div>
    <v-card class="pa-5" max-width="800" rounded raised>
        
        <v-card-subtitle>
            <h3>
                <div> Miguel Vinas</div>
                20/29/2020 <v-icon> mdi-table-clock </v-icon>
            </h3>
        </v-card-subtitle>

        <v-card-title class="my-1 display-1">
            Arreglar un hinodoro
        </v-card-title>

        <v-card-subtitle >
           <h3> 
               <v-icon> mdi-map-marker </v-icon> 
               La Vega, La concepcion de la vega, gamundi
           </h3> 
        </v-card-subtitle>

        <v-card-actions>
            <v-container fluid>
                <v-layout wrap>

                    <v-flex md8>
                        <v-btn text color="primary" large>
                            solicitar trabajo
                        </v-btn>
                    </v-flex>

                    <v-flex md4>
                        <v-btn
                        text
                        color="info"
                        large
                        @click="show = !show"
                        >
                            más detalles
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-card-subtitle >
                    <h3>
                            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </h3> 
                </v-card-subtitle>

            </div>
        </v-expand-transition>
    </v-card>
    </div>
</template>

<script>
export default {
    name: 'Post',
    data() {
        return {
            show: false
        }
    },
}
</script>