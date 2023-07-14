<template>
  <div id="all">
    <h1>Games List</h1>
    <p>
      Occaecat ad labore est non reprehenderit proident duis veniam sint tempor
      proident sit consectetur. Dolore excepteur sint enim duis magna quis in
      occaecat mollit et cillum nisi tempor culpa. Magna non in nisi excepteur
      culpa. Qui esse aliqua nisi laborum quis ea officia deserunt consectetur.
    </p>
    <listGames />
  </div>
</template>
<script>
import listGames from '@/components/lists/ListGames.vue'
export default {
  name: 'GameList',
  components: {
    listGames,
  },
}
</script>
<style lang="scss" scoped>
#all {
  color: black;
  .search-input {
    color: black;
    width: 150px !important;
  }
}
</style>
