<template>
  <v-container id="cube">
    <v-img
      id="img"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
    ></v-img>
    <h3 v-if="gameMaster?.name" id="title">{{ gameMaster.name }}</h3>
    <p v-if="gameMaster?.presentation">{{ gameMaster.presentation }}</p>
  </v-container>
</template>
<script>
export default {
  name: 'CardGameMaster',
  props: {
    gameMaster: {
      required: true,
      type: Object,
    },
  },
}
</script>
<style scoped lang="scss">
#cube {
  width: 250px;
  height: 150px;
  border: 1px solid black;
  position: relative;
  text-align: left;
  border-radius: 30px !important ;
  #img {
    height: 50px !important;
    width: 50px !important;
    position: absolute;
    left: 6rem;
    top: -20px;
  }
  #title {
    margin-top: 25px;
  }
}
</style>
