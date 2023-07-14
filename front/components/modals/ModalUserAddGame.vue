<template>
  <div>
    <v-dialog v-model="showAddGameModal" persistent onsubmit="return">
      <v-card>
        <v-btn icon class="close-button" @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title>Add game</v-card-title>
        <v-card-subtitle>
          <v-autocomplete
            v-model="search"
            label="Autocomplete"
            :items="games"
            item-text="name"
            @change="getGamesByName"
          ></v-autocomplete>
          <v-img :src="game.img" :width="300"></v-img>
          {{ game.name }}
          <v-text-field v-model="pricePerDay" label="price per day">
          </v-text-field>
          <v-btn @click.prevent="addGameRent">Add</v-btn>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ModalUserAddGame',
  data() {
    return {
      search: '',
      games: [],
      game: [],
      pricePerDay: 0,
      cautionPrice: 0,
    }
  },
  computed: {
    ...mapGetters({
      getShowAddGameModal: 'user/getShowAddGameModal',
    }),
    showAddGameModal() {
      return this.getShowAddGameModal
    },
  },
  mounted() {
    this.getGamesName()
  },
  methods: {
    ...mapActions({
      setShowAddGameModal: 'user/setShowAddGameModal',
    }),
    closeModal() {
      this.setShowAddGameModal(false)
    },
    getGamesName() {
      this.$axios.$get('/api/gamesName/').then((response) => {
        this.games = response
      })
    },
    getGamesByName() {
      this.$axios.$get('/api/gamesByName/' + this.search).then((response) => {
        this.game = response[0]
      })
    },
    async addGameRent() {
      await this.$axios
        .$post('/api/rentingGames/add', {
          id: this.game.id,
          ownerId: this.$auth.$storage.getUniversal('user').id,
          priceDayRenting: this.pricePerDay,
          discountMoreDayRenting: 0,
          discountWeekRenting: 0,
          priceBuying: 0,
          cautionPrice: 0,
        })
        .then(
          async (response) => {
            this.$awn.success('game added')
            await this.$parent.getUserRentingGames()
            this.setShowAddGameModal(false)
          },
          (error) => {
            this.$awn.alert(error.response.data.error)
            this.setShowAddGameModal(false)
          }
        )
    },
  },
}
</script>
