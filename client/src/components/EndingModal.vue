<template>
  <v-row justify="center" align="center">
    
    <v-dialog v-model="ending" width="800">
      <v-card class="mx-auto pa-5">

        <v-card-title class="display-1 my-3">
            Calificar trabajo
        </v-card-title>

        <v-form
        v-model="validar"
        :lazy-validation="lazy"
        >
            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="6">
                            Calificar a: <span class="primary--text"> {{ nombre }} {{ apellido }} </span>
                        </v-col>
                        <v-col cols="12" md="6">
                            Proyecto: <span class="primary--text"> {{ asunto }} </span>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="12">
                            <v-rating
                            v-model="rating"
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            empty-icon="$ratingFull"
                            size="30"
                            half-increments
                            hover
                            ></v-rating>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" class="pa-5" type="submit">
                    enviar
                </v-btn>
                <v-btn color="primary" text @click="closeEndingModal">
                    cancelar
                </v-btn>

            </v-card-actions>
        </v-form>

      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'EndingModal',
    data(){
        return {
            nombre: 'Manuel',
            apellido: 'Rodriguez',
            asunto: 'Reparar computadora',
            rating: null,

            modal: true,
            validar: true,
            lazy: false,
        }
    },
    computed: {
        ...mapGetters(["ending"])
    },
    methods: {
        ...mapActions(["closeEndingModal"])
    },

}
</script>