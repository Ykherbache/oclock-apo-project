<template>
  <v-container id="home">
    <div class="intro">
      <h1>Find Game & Game Master of your Dreams</h1>
      <p>GOOD LOC is the solution to all your gaming desires .</p>
      <p>
        Need to test a game? Rent it in just 2 clicks! If you like it, buy it!
        <span
          >Having a game night with friends and don't know how to entertain
          them? Rent your GameMaster...but on only if your are an unicorn 🦄 lovers</span
        >
      </p>
    </div>
    <HomePres />
    <h2>GOT: Games of Time</h2>
    <ListGamesVue />
    <div class="allGames">
      <v-btn class="button" to="/game-list">See all Games </v-btn>
    </div>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import HomePres from '@/components/HomePres.vue'
import ListGamesVue from '@/components/lists/ListGames.vue'
export default {
  name: 'Home',
  components: { HomePres, ListGamesVue },
  data() {
    return {
      page: 1,
      dialogSignIn: false,
      dialogSignUp: false,
      dialogForgottenPassword: false,
    }
  },
  computed: {
    ...mapGetters({
      getGamesList: 'games/getGamesList',
      getShowSignUpModal: 'authentications/getShowSignUpModal',
      getShowSignInModal: 'authentications/getShowSignInModal',
      getShowForgotPasswordModal: 'authentications/getShowForgotPasswordModal',
    }),
  },
  watch: {},
  mounted() {
    this.fetchGames(this.page)
  },

  methods: {
    ...mapActions({
      setShowSignUpModal: 'authentications/setShowSignUpModal',
      setShowForgotPasswordModal: 'authentications/setShowForgotPasswordModal',
      setShowSignInModal: 'authentications/setShowSignInModal',
      fetchGames: 'games/fetchGames',
    }),
  },
}
</script>
<style lang="scss" scoped>
@import '@/design/_colors';

.container {
  padding: 0;
}
#home {
  h2 {
    margin-top: 50px;
    margin-bottom: 20px;
    padding: 10px 20px 10px 20px;
    border-radius: 5px;
    width: fit-content;
    border: 2px solid rgba(96, 93, 93, 0.41);
    box-shadow: rgba(209, 107, 5, 0.691) 0px 4px 12px;
  }
  .intro {
    margin-bottom: 40px;
    h1 {
      margin-bottom: 20px;
      padding: 10px 20px 10px 20px;
      border-radius: 5px;
      width: fit-content;
      border: 2px solid rgba(96, 93, 93, 0.41);
      box-shadow: rgba(209, 107, 5, 0.691) 0px 4px 12px;
    }
  }
  color: black;
  .search-input {
    width: 150px;
    margin-bottom: 50px;
  }
}
.allGames {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .button {
    padding: 20px;
    cursor: pointer;
  }
  .button:hover {
    background-color: $color-primary;
    color: white;
  }
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: black !important;
  width: 150px;
  margin-top: 40px;
  border-radius: 10px;
  border: 2px solid $color-primary;
  color: white !important;
}
.gamePres {
  max-width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 !important;
  .col-sm-6 {
    padding: 0;
  }
}
</style>
