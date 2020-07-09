<template>
  <h1>UNDER CONSTRUCTION</h1>
</template>

<script>
export default {
  //Revisa si hay una sesion creada antes de renderizar la vista, si no lo esta, redirecciona al homepage
        beforeCreate: function () {
            if (!this.$session.exists()) {
            this.$router.push('/')
            }
        },

}

</script>

<style>

</style>