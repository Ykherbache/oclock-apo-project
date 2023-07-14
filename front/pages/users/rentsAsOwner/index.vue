<template>
  <div>
    <v-row>
      <v-col sm="12" md="12">
    <v-card class="card br-5px white">
      <v-card-title class="justify-center orange--text">
        <h1>MY OWNER RENTS</h1></v-card-title
      >
        <v-col sm="12" md="12">
          <h2>Rents who need validation</h2>
          <v-card v-if="getReserved.rents" class="gamesList br-5px white">
            <v-card-title class="orange--text"> </v-card-title>
            <v-card-subtitle align="center">
              <v-row>
                <v-col
                  v-for="(game, index) in getReserved.rents"
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
                  <ConfirmationModal
                    :name="'Validate'"
                    :name-date="'Select a start date'"
                    @dateSelected="dateSelected"
                    @confirmation="validateReservation(game.id, 'rented')"
                  />
                </v-col>
              </v-row>
              <v-pagination
                v-model="pageReserved"
                :length="maxPageReserved"
                :total-visible="4"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                @input="updatePageReserved"
              ></v-pagination>
            </v-card-subtitle>
          </v-card>
          <v-card v-else class="noGamesList">
            <span>No rent in running</span>
          </v-card>
        </v-col>
        <v-col sm="12" md="12">
          <h2>Running Rents 🦄</h2>
          <v-card v-if="getRented.rents" class="gamesList br-5px white">
            <v-card-title class="orange--text"> </v-card-title>
            <v-card-subtitle align="center">
              <v-row>
                <v-col
                  v-for="(game, index) in getRented.rents"
                  :key="index"
                  md="6"
                  lg="3"
                >
                  <CardGame
                    :game="game.associatedGame"
                    :user="game.associatedUser"
                    :date-resa="game.beginning_date"
                  />
                  <ConfirmationModal
                    :name="'Close'"
                    :name-date="'Select a closing date'"
                    @dateSelected="dateSelected"
                    @confirmation="validateReservation(game.id, 'closed')"
                  />
                </v-col>
              </v-row>
              <v-pagination
                v-model="pageRented"
                :length="maxPageRented"
                :total-visible="4"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                @input="updatepageRented"
              ></v-pagination>
            </v-card-subtitle>
          </v-card>
          <v-card v-else class="noGamesList">
            <span>No rent in running</span>
          </v-card>
        </v-col>
        <v-col sm="12" md="12">
          <h2>Finished Rents</h2>
          <v-card v-if="getClosed.rents" class="gamesList br-5px white">
            <v-card-title class="orange--text"> </v-card-title>
            <v-card-subtitle align="center">
              <v-row>
                <v-col
                  v-for="(game, index) in getClosed.rents"
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
                :length="getClosed.totalPages"
                :total-visible="4"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                @input="updatepageClosed"
              ></v-pagination>
            </v-card-subtitle>
          </v-card>
          <v-card v-else class="noGamesList">
            <span>No rent closed</span>
          </v-card>
        </v-col>
    </v-card>
    </v-col>
  </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CardGame from '@/components/CardGame'
import ConfirmationModal from '@/components/modals/ConfirmationModal'

export default {
  name: 'RentsAsOwner',
  components: {
    CardGame,
    ConfirmationModal,
  },
  middleware: 'auth',
  data() {
    return {
      reserved: { rents: {} },
      rented: { rents: [] },
      closed: { rents: {} },
      pageReserved: 1,
      pageRented: 1,
      pageClosed: 1,
      maxPageClosed: null,
      maxPageRented: null,
      maxPageReserved: null,
      dataHolder: null,
      indexRent: null,
      selectedGame: null,
      selected: null,
    }
  },
  computed: {
    ...mapGetters({
      getRented: 'rents/getRented',
      getReserved: 'rents/getReserved',
      getClosed: 'rents/getClosed',
    }),
  },
  mounted() {
    this.loadRents()
  },
  methods: {
    ...mapActions({
      fetchRented: 'rents/fetchRented',
      fetchReserved: 'rents/fetchReserved',
      fetchClosed: 'rents/fetchClosed',
    }),
    dateSelected(picker) {
      this.selected = picker
    },
    loadRents() {
      this.fetchRented(this.pageRented)
      this.fetchClosed(this.pageClosed)
      this.fetchReserved(this.pageReserved)
      this.maxPageClosed = this.getClosed.totalPages
      this.maxPageRented = this.getRented.totalPages
      this.maxPageReserved = this.getReserved.totalPages
    },
    validateReservation(id, status) {
      this.$axios
        .put(`api/rent/${id}/updateStatus`, {
          user_id: this.$auth.$storage.getUniversal('user').id,
          status,
        })
        .then((res) => {
          this.$awn.success('Reservation closed')
          this.loadRents()
        })
    },
    updatePageReserved() {
      this.fetchReserved(this.pageReserved)
    },
    updatepageRented() {
      this.fetchRented(this.pageRented)
    },
    updatepageClosed() {
      this.fetchClosed(this.pageClosed)
    },
    cancelRent(rentId) {
      const userId = this.$auth.$storage.getUniversal('user').id
      this.$axios
        .delete(`api/rent/owner/${userId}/${rentId}`)
        .then((res) => {
          this.$awn.success('Rent cancelled')
          this.loadRents()
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
