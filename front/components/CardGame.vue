<template>
  <v-container class="container-gamecard">
    <v-card id="card">
      <v-img
        :src="game && game.img ? game.img : ''"
        height="100px"
        cover
      ></v-img>
      <v-card-title v-if="game && game.name" id="title">
        {{ game.name }}
      </v-card-title>
      <v-card-subtitle v-if="pageIsRentsAsRenterOrRentsAsOwner" id="subtitle">
        <v-row>
          <span v-if="game && isDefined(game.pseudo)" class="pseudo"
            >By : {{ game.pseudo }}
          </span>
        </v-row>
        <v-row>
          <!-- <img class="icon" src="../assets/images/007.png" /> -->
          <font-awesome-icon
            class="icon primary--text"
            :icon="['fas', 'user-group']"
          />

          <span
            v-if="
              game && isDefined(game.min_players) && isDefined(game.max_players)
            "
            >Players : {{ game.min_players }} to {{ game.max_players }}</span
          >
          <span v-else> Players : unknow </span>
        </v-row>
        <v-row>
          <!-- <img class="icon" src="../assets/images/004.png" /> -->
          <font-awesome-icon
            class="icon primary--text"
            :icon="['fas', 'star']"
          />

          <span
            v-if="
              game &&
              (isDefined(game.average_note) || game.average_note !== 0.0)
            "
            >Note : {{ game.average_note }} /5</span
          >
          <span v-else> Note : unknow </span>
        </v-row>
        <v-row>
          <img class="icon" src="../assets/images/icon1.png" />
          <span v-if="game && isDefined(game.category_name)"
            >Category: {{ game.category_name }}</span
          >
          <span v-else> Category : unknow</span>
        </v-row>
        <v-row>
          <font-awesome-icon
            class="icon primary--text"
            :icon="['fas', 'gears']"
          />

          <span v-if="game && isDefined(game.mechanic_name)">
            Mechanic : {{ game.mechanic_name }}</span
          >
          <span v-else> Mechanics : unknow </span>
        </v-row>
      </v-card-subtitle>
      <v-card-subtitle v-if="!pageIsRentsAsRenterOrRentsAsOwner" id="subtitle">
        <v-row>
          <img class="icon" src="../assets/images/007.png" />
          <span v-if="game && isDefined(user.pseudo)"
            >Asking pseudo : {{ user.pseudo }}</span
          >
          <span v-else> Asking Pseudo : unknow </span>
        </v-row>
        <v-row>
          <!-- <img class="icon" src="../assets/images/004.png" /> -->
          <font-awesome-icon
            class="icon primary--text"
            :icon="['fas', 'envelope']"
          />
          <span v-if="game && isDefined(user.email)"
            >email : {{ user.email }}</span
          >
          <span v-else> Email : unknow </span>
        </v-row>
        <v-row>
          <font-awesome-icon
            class="icon primary--text"
            :icon="['fas', 'tree-city']"
          />
          <span v-if="game && isDefined(user.city)">City: {{ user.city }}</span>
          <span v-else> City : unknow </span>
        </v-row>
        <v-row>
          <!-- <img class="icon" src="../assets/images/icon2.png" /> -->
          <font-awesome-icon
            class="icon primary--text"
            :icon="['fas', 'calendar']"
          />

          <!-- date sale mais je sais pas comment parse en js :/ -->
          <span v-if="game && isDefined(dateResa)">
            Reserving date : {{ dateResa }}</span
          >
          <span v-else> Reserving Date : unknow </span>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>
<script>
import { isValueDefined } from '@/utils/core.js'

export default {
  name: 'CardGame',
  props: {
    game: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: false,
      default: null,
    },
    dateResa: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    pageIsRentsAsRenterOrRentsAsOwner() {
      return (
        this.$nuxt.$route.path !== '/users/rentsAsOwner' ||
        this.$nuxt.$route.path !== '/users/rentsAsRenter'
      )
    },
  },
  methods: {
    isDefined(value) {
      return isValueDefined(value)
    },
  },
}
</script>
<style lang="scss" scoped>
#card {
  border: 2px solid rgba(96, 93, 93, 0.41);
  border-radius: 5px 5px 5px 5px;
  box-shadow: rgba(209, 107, 5, 0.55) 0px 2px 5px -1px,
    rgba(209, 107, 5, 0.85) 0px 1px 3px -1px;
  min-width: 250px;
  max-width: 300px;

  #title {
    padding-top: 5px;
    border-top: 1px solid rgba(243, 127, 3, 0.55);
    height: 250px !important;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    line-height: 24px;
    max-height: 30px;
  }
  #subtitle {
    height: fit-content;
    margin-top: 3px;
    font-size: 10px;
    .row {
      margin-top: 10px;
      min-height: 20px;
      .pseudo {
        padding-top: 0;
        font-size: 12px;
        margin: -10px 20px 5px auto;
        font-weight: 600;
        color: rgba(209, 107, 5, 0.85);
        text-align: right;
      }
      .col {
        padding: 2px;
      }
      .icon {
        margin-left: 20px;
        margin-right: 5px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
