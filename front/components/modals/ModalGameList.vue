<template>
  <v-dialog id="all" v-model="dialog" persistent width="50em">
    <div v-if="!rented" class="container_rent">
      <v-btn icon class="close-button" @click="closeModal">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card id="card">
        <v-img :src="game ? game.img : null" cover class="rent">
          <div class="button_price">{{ game.price_Day_Renting }} $</div>
          <div class="button_pseudo">{{ game.pseudo }}</div>
        </v-img>
        <div class="info_rent">
          <v-card-title id="title">
            {{ game.name }}
          </v-card-title>
          <v-card-subtitle id="subtitle">
            <v-row class="item_rent">
              <v-col cols="12" md="6" lg="4">
                <v-row>
                  <img
                    cover
                    class="icon"
                    :src="require(`../../assets/images/007.png`)"
                  />
                  <span v-if="game.min_players !== null"
                    >Players : {{ game.min_players }} to
                    {{ game.max_players }}</span
                  >
                  <span v-else> Players : unknow </span>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-row>
                  <img
                    cover
                    class="icon"
                    :src="require(`../../assets/images/icon1.png`)"
                  />
                  <span v-if="game.category_name !== null"
                    >Category: {{ game.category_name }}</span
                  >
                  <span v-else> Category : Unknow </span>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-row>
                  <img
                    cover
                    class="icon"
                    :src="require(`../../assets/images/icon2.png`)"
                  />
                  <span v-if="game.mechanic_name !== null">
                    Mechanic : {{ game.mechanic_name }}</span
                  >
                  <span v-else> Mechanics : unknow </span>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="item_rent">
              <v-col cols="12" md="6" lg="4">
                <v-row>
                  <img
                    cover
                    class="icon"
                    :src="require(`../../assets/images/004.png`)"
                  />
                  <span v-if="game.min_age !== null"
                    >Sweet Age : {{ game.age_min }} to 99</span
                  >
                  <span v-else> Sweet Age : unknow </span>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-row>
                  <img
                    cover
                    class="icon"
                    :src="require(`../../assets/images/019.png`)"
                  />
                  <span v-if="game.average_learning_complexity !== null"
                    >Complexity: {{ game.average_learning_complexity }} /5</span
                  >
                  <span v-else> Complexity : unknow </span>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <v-row>
                  <img
                    cover
                    class="icon"
                    :src="require(`../../assets/images/icon3.png`)"
                  />
                  <span v-if="game.year_published !== null">
                    Birth'Year: {{ game.year_published }}</span
                  >
                  <span v-else> Birth'Year: : unknow </span>
                </v-row>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-row class="rent_action_button">
            <v-col class="d-flex justify-center" cols="12" md="6" lg="6">
              <p v-if="showDesc">{{ game.description }}</p>
              <v-btn :to="`/game-list/${game.id}`">
                <v-img
                  class="unicorn_button"
                  :src="require(`../.././assets/images/unicorn_prout.png`)"
                  contain
                >
                </v-img
                ><span>Description</span>
              </v-btn>
            </v-col>
            <v-col class="d-flex justify-center" cols="12" md="6" lg="6">
              <!--TODO: change to router-link -->
              <ConfirmationModal :name="'rent'" @confirmation="createRent" />
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
    <v-card v-if="rented" id="cardConfirm">
      <v-btn icon class="close-button" @click="closeModal">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title id="title">
        {{ game.name }}
      </v-card-title>
      <v-card-subtitle>
        <p>
          You just rented {{ game.name }} from {{ game.pseudo }} for
          {{ game.price_Day_Renting }}/j.
        </p>
        <p>An automatic message has been sent to the owner.</p>
        <p>
          You must wait for the owner to accept your request and send you a
          message. You can see your requests
          <NuxtLink to="/users/rentsAsRenter/">there</NuxtLink>
        </p>
        <p>
          Or contact directly the owner ({{ game.pseudo }})
          <NuxtLink to="/users/message/">there</NuxtLink>
        </p>
      </v-card-subtitle>
    </v-card>
  </v-dialog>
</template>
<script>
import ConfirmationModal from './ConfirmationModal.vue'
export default {
  name: 'ModalGameList',
  components: {
    ConfirmationModal,
  },
  props: {
    dialogModal: {
      required: true,
      type: Boolean,
    },
    game: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      showDesc: false,
      dialog: this.dialogModal,
      rented: false,
    }
  },
  methods: {
    closeModal() {
      this.$parent.dialogModal = false
    },
    createRent() {
      this.$axios
        .post('api/rent/create', {
          game_id: this.game.id,
          owner_id: this.game.owner_id,
          beginning_date: new Date().toISOString().slice(0, 10),
          renter_id: this.$auth.$storage.getUniversal('user').id,
          rental_game_id: this.game.rental_id,
          status: 'reserved',
          price: this.game.price_Day_Renting,
        })
        .then((response) => {
          const rentalResponse = response.data // Utilisation de response.data pour obtenir les données de la réponse
          this.$awn.success('Location created !')
          this.$emit('refetch-games')

          const pseudo = rentalResponse.renter.pseudo
          const pseudoOwner = rentalResponse.owner.pseudo

          this.$axios.post('api/user/account/message/create', {
            receiver_pseudo: pseudoOwner,
            sender_id: this.$auth.$storage.getUniversal('user').id,
            object: 'Location Message',
            message_content:
              'Hello, i am ' +
              pseudo +
              ' and would like to rent your game. Please contact me !',
          })
          this.rented = true
        })
        .catch(() => {
          this.$awn.alert('Oops, there is a problem with the rent creation !')
        })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/design/_colors';

#all {
  font-size: large !important;
  background-color: black !important;
}
.container_rent {
  width: 100%;
  height: 100%;
  border: 2px solid $color-primary;
  border-radius: 5px;
  box-shadow: rgba(255, 129, 2, 0.25) 0px 30px 60px -12px inset,
    rgba(210, 90, 4, 0.3) 0px 18px 36px -18px inset;
  background-color: black !important;
  overflow: auto;
}
.v-card {
  width: 90% !important;
  height: 90% !important;
  margin: 5%;
}
.rent {
  height: 250px;
}
.button_price {
  position: absolute;
  top: 50px;
  right: 50px;
  background-color: $color-primary;
  color: white;
  padding: 10px 30px;
  font-weight: bold;
  font-size: 30px;
  border-radius: 5px;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.button_pseudo {
  position: absolute;
  top: 140px;
  right: 50px;
  background-color: $color-secondary;
  color: $color-primary;
  padding: 10px 30px;
  width: 200px;
  font-size: 15px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.info_rent {
  height: fit-content;
  padding-bottom: 20px;
  #title {
    font-size: 25px;
    font-weight: bold;
    color: $color-primary;
    margin-bottom: 5px;
  }
  .item_rent {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}

#subtitle {
  border: 1px solid $color-primary;
  border-radius: 5px;
  width: 95%;
  margin: 0 auto;
  .icon {
    margin-left: 20px;
    margin-right: 5px;
    width: 40px;
    height: 40px;
  }
  span {
    line-height: 40px;
  }
}
.rent_action_button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px auto 0 0;
}

.rent_action_button .v-btn {
  background-color: $color-primary;
  color: white;
  min-width: 150px;
  width: 150px;
  max-width: 150px;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
}

.rent_action_button .v-btn span {
  font-size: 15px;
  line-height: 40px;
  margin-left: -15px;
}

.rent_action_button .v-btn .unicorn_button {
  opacity: 0;
  margin-left: -30px;
  width: 50px;
  height: 50px;
}

.rent_action_button .v-btn:hover {
  background-color: $color-secondary;
  color: $color-primary;
}

.rent_action_button .v-btn:hover .unicorn_button {
  opacity: 1;
}

.rent_action_button .confirmation-button {
  margin-right: 30px;
  background-color: $color-primary !important ;
  color: white;
  min-width: 150px;
  width: 150px;
  max-width: 150px;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
}

.rent_action_button .confirmation-button span {
  font-size: 15px;
  line-height: 40px;
  margin-left: -15px;
}

.rent_action_button .confirmation-button .unicorn_button {
  opacity: 0;
  margin-left: -30px;
  width: 50px;
  height: 50px;
}

.rent_action_button .confirmation-button:hover {
  background-color: $color-secondary;
  color: $color-primary;
}

.rent_action_button .confirmation-button:hover .unicorn_button {
  opacity: 1;
}
</style>
