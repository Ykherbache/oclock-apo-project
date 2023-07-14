<template>
  <div>
    <h2>🦄 Waiting for validation</h2>
    <v-card v-if="reserving.rents?.[0]" class="gamesList br-5px white">
      <v-card-title class="orange--text"> </v-card-title>
      <v-card-subtitle align="center">
        <v-row>
          <v-col
            v-for="(game, index) in reserving.rents"
            :key="index"
            class="black--text"
            md="3"
            sm="3"
          >
            <CardGame
              :game="game.associatedGame"
              :user="game.associatedUser"
              :date-resa="game.beginning_date"
            />
            <v-row class="cancel">
              <v-btn
                color="red"
                text
                class="cancel-button"
                @click="cancelRent(game.id)"
              >
                Cancel
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-pagination
          v-model="pageReserved"
          :length="maxPageReserved"
          :total-visible="4"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          @input="updatePage('reserving')"
        ></v-pagination>
      </v-card-subtitle>
    </v-card>
    <v-card v-else class="noGamesList">
      <span>No rent to validate</span>
    </v-card>
    <h2>Active Rents 🦄</h2>
    <v-card v-if="closing.rents?.[0]" class="gamesList br-5px white">
      <v-card-title class="orange--text"> </v-card-title>
      <v-card-subtitle align="center">
        <v-row>
          <v-col
            v-for="(game, index) in closing.rents"
            :key="index"
            md="6"
            lg="3"
          >
            <CardGame
              :game="game.associatedGame"
              :user="game.associatedUser"
              :date-resa="game.beginning_date"
            />
          </v-col>
        </v-row>
        <v-pagination
          v-model="pageClosing"
          :length="maxPageClosing"
          :total-visible="4"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          @input="updatePage('closing')"
        ></v-pagination>
      </v-card-subtitle>
    </v-card>
    <v-card v-else class="noGamesList">
      <span>No rent in running</span>
    </v-card>
    <v-col sm="12" md="12">
      <h2>Finished Rents</h2>
      <v-card v-if="closed.rents?.[0]" class="gamesList br-5px white">
        <v-card-title class="orange--text"> </v-card-title>
        <v-card-subtitle align="center">
          <v-row>
            <v-col
              v-for="(game, index) in closed.rents"
              :key="index"
              md="6"
              lg="3"
            >
              <CardGame
                :game="game.associatedGame"
                :user="game.associatedUser"
                :date-resa="game.beginning_date"
              />
            </v-col>
          </v-row>
          <v-pagination
            v-model="pageClosed"
            :length="maxPageClosed"
            :total-visible="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            @input="updatePage('closed')"
          ></v-pagination>
        </v-card-subtitle>
      </v-card>
      <v-card v-else class="noGamesList">
        <span>No rent closed</span>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import CardGame from '@/components/CardGame.vue'
export default {
  components: {
    CardGame,
  },
  middleware: 'auth',
  data() {
    return {
      reserving: { rents: {} },
      pageReserved: 1,
      maxPageReserved: 1,
      closing: { rents: {} },
      pageClosing: 1,
      maxPageClosing: 1,
      closed: { rents: {} },
      pageClosed: 1,
      maxPageClosed: 1,
    }
  },
  mounted() {
    this.$axios
      .get(
        `api/user/account/renting/${
          this.$auth.$storage.getUniversal('user').id
        }/reserved?page=1&pageSize=8`
      )
      .then((res) => {
        this.reserving = res.data
        this.maxPageReserved = res.data.totalPages
      })
    this.$axios
      .get(
        `api/user/account/renting/${
          this.$auth.$storage.getUniversal('user').id
        }/closed?page=1&pageSize=8`
      )
      .then((res) => {
        this.closed = res.data
        this.maxPageClosed = res.data.totalPages
      })
    this.$axios
      .get(
        `api/user/account/renting/${
          this.$auth.$storage.getUniversal('user').id
        }/rented?page=1&pageSize=8`
      )
      .then((res) => {
        this.closing = res.data
        this.maxPageClosing = res.data.totalPages
      })
  },
  methods: {
    updatePage(status) {
      switch (status) {
        case 'reserving':
          this.$axios
            .get(
              `api/user/account/renting/${
                this.$auth.$storage.getUniversal('user').id
              }/reserved?page=${this.pageReserved}&pageSize=8`
            )
            .then((res) => {
              this.reserving = res.data
              this.maxPageReserved = res.data.totalPages
            })
          break
        case 'closed':
          this.$axios
            .get(
              `api/user/account/renting/${
                this.$auth.$storage.getUniversal('user').id
              }/closed?page=${this.pageClosed}&pageSize=8`
            )
            .then((res) => {
              this.closed = res.data
              this.maxPageClosed = res.data.totalPages
            })
          break
        case 'closing':
          this.$axios
            .get(
              `api/user/account/renting/${
                this.$auth.$storage.getUniversal('user').id
              }/rented?page=${this.pageClosing}&pageSize=8`
            )
            .then((res) => {
              this.closing = res.data
              this.maxPageClosing = res.data.totalPages
            })
          break
      }
    },
    cancelRent(rentId) {
      const userId = this.$auth.$storage.getUniversal('user').id
      this.$axios
        .delete(`api/rent/renter/${userId}/${rentId}`)
        .then((res) => {
          this.$awn.success('Rent cancelled')
          this.reserving.rents = this.reserving.rents.filter(
            (rent) => rent.id !== rentId
          )
        })
        .catch((error) => {
          this.$awn.alert(error.response.data.message)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/design/_colors.scss';
.gamesList {
  background-color: white !important;
  border-radius: 5px !important;
  border: 1px solid $color-primary !important;
}
h1,
h2 {
  color: $color-secondary;
  margin-bottom: 5px;
  text-transform: uppercase;
}
h2 {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.rent_button {
  background-color: $color-primary !important;
  padding: 5px 10px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  border: none;
  border-radius: 20px 70px 35px 70px;
  cursor: pointer !important;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: $color-secondary !important;
  }
}
.noGamesList {
  background-color: white !important;
  border-radius: 5px !important;
  border: 1px solid $color-primary !important;
  padding: 30px;
  text-align: center;
  margin-bottom: 10px;
  color: $color-secondary;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  font-style: italic;
}

.cancel-row {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.cancel-button {
  background-color: $color-secondary !important;
  margin: 10px auto 30px;
  padding: 5px 15px;
  border-radius: 5px;
  color: $color-primary !important;
  transition: background-color 0.3s, color 0.3s;
}

.cancel-button:hover {
  background-color: red !important;
  color: black !important;
}
</style>
