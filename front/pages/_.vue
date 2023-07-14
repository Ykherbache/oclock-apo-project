<template>
  <v-container id="nuxt-error" fluid>
    <h1 class="display-1 fw-400">Oops You did it Again </h1>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <img class="img-error" src="../assets/404.png" alt="" />
      </v-col>
      <v-col class="d-flex justify-center" cols="12" md="6" lg="6">
        <p class="quote">
          <span class="quote-text"
            >"Even the purest unicorns sometimes take a wrong turn
            path"</span
          >
          <br />
          <span class="quote-author"
            >Licorne Kenobi - Licornus Maxima Book- verset 3</span
          >
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center" cols="12" md="12" lg="12">
        <p class="hint">
          <v-btn class="back" to="/">
            <h3 class="fw-400 primary--text">revenir à l'accueil</h3>
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: 'Error404',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    return {
      title: 'Page introuvable',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Oops vous n'êtes pas sur le bon chemin",
        },
      ],
    }
  },
}
</script>
