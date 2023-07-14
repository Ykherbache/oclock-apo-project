<!-- eslint-disable vue/no-v-html -->
<template>
  <div id="all" class="mt-8">
    <ModalGameList
      v-if="dialogModal"
      :dialog-modal="dialogModal"
      :game="gameModal"
    />
    <v-row class="row_one">
      <v-img id="img_game" cover :src="game.img"></v-img>
    </v-row>
    <v-row class="list_params">
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/unicorn_skating.png`)"
          />
          <span v-if="game.category_name !== null"
            >Category: {{ game.category_name }}</span
          >
          <span v-else> Category : unknow </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/020.png`)"
          />
          <span v-if="game.mechanic_name !== null"
            >Mechanic : {{ game.mechanic_name }}</span
          >
          <span v-else> Mechanic : unknow </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/icon3.png`)"
          />
          <span v-if="game.playtime !== null"
            >PlayTime: : {{ game.playtime }} min
          </span>
          <span v-else> PlayTime min : unknow </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/icon2.png`)"
          />
          <span v-if="game.average_learning_complexity !== null"
            >Learning : {{ game.average_learning_complexity }}/5</span
          >
          <span v-else> Learning : unknow</span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/icon1.png`)"
          />
          <span v-if="game.average_strategy_complexity !== null"
            >Strategy complexity :
            {{ game.average_strategy_complexity }}/5</span
          >
          <span v-else> Strategy complexity : unknow </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/004.png`)"
          />
          <span v-if="game.average_note !== null">
            Average Note : {{ game.average_note }}
          </span>
          <span v-else> Average Note : unknow </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/001.png`)"
          />
          <span v-if="game.min_players !== null"
            >Players min : {{ game.min_players }}
          </span>
          <span v-else> Players min : 2</span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/unicorn_prout.png`)"
          />
          <span v-if="game.max_players !== null"
            >Players max : {{ game.max_players }}
          </span>
          <span v-else> Players max : unknow</span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/unicorn_cry.png`)"
          />
          <span v-if="game.publisher_name !== null"
            >Publisher : {{ game.publisher_name }}</span
          >
          <span v-else> Publisher : unkonw </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img
            cover
            class="icon"
            :src="require(`../../assets/images/succes_unicorn.png`)"
          />
          <span v-if="game.year_published !== null"
            >Birth'Year : {{ game.year_published }}
          </span>
          <span v-else>Birth'Year : 1984 </span>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="game_description">
      <h1 class="gameTitle">{{ game.name }}</h1>
      <div class="gameDescription" v-html="game.description"></div>
    </v-row>

    <v-col id="rentings">
      <v-row>
        <h2 class="title">Best Rentings</h2>
      </v-row>

      <v-row v-if="gameRents">
        <v-col
          v-for="(presta, index) in gameRents"
          :key="index"
          class="item"
          cols="12"
          md="6"
          lg="3"
        >
          <a @click="sendGameClean(presta)">
            <v-row class="row_avatar">
              <v-img cover :src="presta.owner.img" class="img_user"></v-img>
            </v-row>
            <v-row class="row_info">
              <span>Rented by : </span>
              <span class="value"> {{ presta.owner.pseudo }} </span>
            </v-row>
            <v-row class="row_info">
              <span>City : </span>
              <span class="value"> {{ presta.owner.city }} </span>
            </v-row>
            <v-row class="row_info">
              <span>Price per Day : </span>
              <span class="value"> {{ presta.price_day_renting }} $</span>
            </v-row>
          </a>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>
<script>
import ModalGameList from '@/components/modals/ModalGameList.vue'
export default {
  name: 'Game',
  components: {
    ModalGameList,
  },
  middleware: 'auth',
  data() {
    return {
      game: {},
      gameRents: {},
      dialogModal: false,
      gameModal: {},
      test: false,
      userId: null,
    }
  },
  mounted() {
    this.userId = this.$auth.$storage.getUniversal('user')?.id
    this.$axios.$get(`api/game/${this.$route.params.id}`).then((res) => {
      this.game = res
    })
    this.$axios
      .$get(`api/bestRentingGames/${this.$route.params.id}?userId=${this.userId}`)
      .then((res) => {
        this.gameRents = res
      })
  },
  methods: {
    sendGameClean(game) {
      this.dialogModal = true
      game.game.price_Day_Renting = game.price_day_renting
      game.game.owner_id = game.owner.id
      game.game.rental_id = game.id
      this.gameModal = game.game
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/design/_colors.scss';

#all {
  color: $color-primary;
}
.row_one {
  margin: -10px auto 0 auto;
  max-width: 700px;
}
#img_game {
  box-shadow: rgb(85, 91, 255) 0px 0px 0px 6px,
    rgb(31, 193, 27) 0px 0px 0px 10px, rgb(255, 217, 19) 0px 0px 0px 15px,
    rgb(255, 156, 85) 0px 0px 0px 18px, rgb(255, 85, 85) 0px 0px 0px 20px;
  height: 300px;
}
.v-responsive {
  position: relative;
  overflow: hidden;
  flex: 1 0 auto;
  max-width: 100%;
  display: flex;
}
.list_params {
  margin: 20px auto 0 auto;
  padding: 20px 0 20px 0;
  max-width: 100%;
  background-color: $color-secondary;
  .item {
    margin-bottom: 10px;
    span {
      color: white;
      font-size: 14px;
    }
  }
}
img {
  margin-left: 20px;
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
.game_description {
  margin: 20px auto 0 auto;
  padding: 20px;
  max-width: 100%;
  .gameTitle {
    color: $color-secondary;
    text-align: center;
    margin-bottom: 20px;
  }
  .gameDescription {
    color: $color-secondary;
    margin: 20px;
  }
}
#rentings {
  margin: 20px auto 0 auto;
  padding: 20px;
  max-width: 100%;
  background-color: $color-secondary;
  .row {
    max-width: 100%;
  }
  .title {
    font-size: 30px !important;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    margin: 20px 10px;
  }
  .item {
    max-width: 250px;
    margin: 20px auto;
    border: 1px solid $color-primary;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    .row_avatar {
      margin: 0 auto 10px auto;
      width: 70%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .row_info {
      margin: 10px auto 10px auto;
      .value {
        font-weight: bold;
        color: $color-primary !important;
        line-height: 25px;
        font-size: 16px;
      }
    }
    .img_user {
      height: 100px;
    }
    span {
      color: white;
      font-size: 14px;
    }
    a:hover {
      cursor: pointer;
      background-color: $color-primary;
      color: black;
    }
  }
}
</style>
