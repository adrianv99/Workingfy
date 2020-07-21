<template>
  <v-row justify="center" align="center">
    
    <v-dialog v-model="createProject" width="800" persistent>
      <v-card class="mx-auto pa-5">

        <v-card-title class="display-1 my-3">
            Crear projecto
        </v-card-title>

        <v-form
        v-model="validar"
        :lazy-validation="lazy"
        >
            <v-card-text>
                <v-container fluid>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                            label="Pais"
                            outlined
                            :rules="rules.select"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                            label="Ciudad"
                            outlined
                            :rules="rules.select"
                            ></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                            label="Profesion"
                            outlined
                            :rules="rules.select"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field 
                            type="text"  
                            label="Asunto" 
                            outlined 
                            required
                            :rules="rules.default"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row> 
                        <v-col cols="12" md="12">
                            <v-textarea
                            outlined
                            height="75"
                            label="Detalle del proyecto"
                            ></v-textarea>
                        </v-col>
                    </v-row>

                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" class="pa-5" type="submmit">
                    crear
                </v-btn>
                <v-btn color="primary" text @click="closeCreateProjectModal">
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
    name: 'CreateProject',
    data(){
        return {
            validar: true,
            lazy: false,
            // reglas del formulario, para validaciones 
            rules: {
                default: [
                    v => !!v || 'Campo obligatorio', 
                    v => ( v && v.length <= 50) || 'Debe tener menos de 50 caracteres'
                ],
                select: [
                    v => !!v || 'Campo obligatorio'
                ]
            }
        }
    },
    computed: {
         ...mapGetters(["createProject"])
    },
    methods: {
        ...mapActions(["closeCreateProjectModal"])
    },

}
</script>