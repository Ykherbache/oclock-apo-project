<template>
  <v-container id="user-id">
    <ModalUserAddGame />

    <div class="container-img">
      <v-img
        v-if="test === true"
        class="avatar-img"
        :src="user.img"
        height="200px"
      >
      </v-img>
      <v-img
        v-else
        class="avatar-img"
        :src="user.img"
        contain
        @error="setImgError"
      ></v-img>
    </div>
    <div class="container-input-avatar">
      <v-file-input
        v-model="file"
        class="input-avatar"
        :rules="[]"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Your avatar"
        @change="uploadAvatar"
      >
      </v-file-input>
      <!-- <span class="text-avatar">Your avatar</span> -->
    </div>
    <ModalUserAddGame
      v-if="dialogModal"
      :dialog-modal="dialogModal"
      :game="game"
    />

    <v-form ref="formUser" @submit.prevent="save">
      <v-card class="user-info">
        <v-card-text>
          <v-card-title class="white--text">
            <font-awesome-icon :icon="['fas', 'user']" class="primary--text" />
            <span class="primary--text ml-2"
              >{{ user.firstname }} {{ user.lastname }}</span
            >
          </v-card-title>
          <v-list-item>
            <v-list-item-content class="pb-0">
              <v-list-item-title class="text-uppercase"
                >Email</v-list-item-title
              >
              <v-text-field
                v-model="user.email"
                dense
                placeholder="your email"
                type="text"
                clearable
                :rules="[rules.required, rules.emailRules]"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="pb-0 pt-0">
              <v-list-item-title class="text-uppercase"
                >City</v-list-item-title
              >
              <v-text-field
                v-model="user.city"
                dense
                placeholder="Votre ville"
                type="text"
                clearable
                required
                :rules="[rules.required]"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="pb-0 pt-0">
              <v-list-item-title class="text-uppercase"
                >Pseudo</v-list-item-title
              >
              <v-text-field
                v-model="user.pseudo"
                dense
                placeholder="Your pseudo"
                type="text"
                clearable
                required
                :rules="[rules.required]"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="pb-0 pt-0">
              <v-list-item-title class="text-uppercase"
                >Description</v-list-item-title
              >
              <v-textarea
                v-model="user.description"
                dense
                placeholder="your gamer story"
                clearable
                required
                :counter="200"
                rows="3"
                max-height="200"
              />
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        <v-card-actions class="card-actions">
          <v-row justify="center">
            <v-btn color="tertiary" text @click="cancel()"> Cancel</v-btn>
            <v-btn color="primary" type="submit ">Save my profil</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>

    <v-row>
      <v-col cols="12" md="12">
        <v-list class="games-info">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase tertiary--text"
                >My Games</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                fab
                dark
                color="primary"
                @click="setShowAddGameModal(true)"
              >
                <v-icon
                  v-tippy="{
                    placement: 'top',
                    content: 'Ajouter un jeu à ma liste',
                    theme: 'light',
                  }"
                  >mdi-plus</v-icon
                >
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-row v-if="rentingGames" dense>
            <v-col v-for="(game, index) in rentingGames" :key="index">
              <CardGame :game="game.game"></CardGame>
            </v-col>
          </v-row>
          <v-pagination
            v-model="page"
            :length="maxPages"
            :total-visible="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            @input="handlePage"
          ></v-pagination>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardGame from '@/components/CardGame.vue'
import ModalUserAddGame from '@/components/modals/ModalUserAddGame.vue'
export default {
  name: 'User',
  components: {
    ModalUserAddGame,
    CardGame,
  },
  middleware: 'auth',
  data() {
    return {
      test: false,
      rules: {
        required: (value) => !!value || 'this field is required',
        emailRules: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
        min: (v) => v.length >= 6 || 'Min 6 characters',
        noSpecialChar: (v) =>
          !v ||
          !/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(v) ||
          'No special characters',
      },
      checkFormatMail: false,
      messageRequired: 'field required',
      user: {
        img: require('@/assets/images/avatar.png'),
      },
      dialogModal: false,
      rentingGames: [],
      page: 1,
      maxPages: 1,
      file: null,
      valid: false,
    }
  },
  computed: {
    ...mapGetters({ getShowAddGameModal: 'user/getShowAddGameModal' }),
    ShowAddGameModal() {
      return this.getShowAddGameModal
    },
  },
  watch: {},
  created() {
    this.user = this.$auth.$storage.getUniversal('user')
    this.$axios.$get('/api/user/' + this.user.id).then((response) => {
      this.user = response
    })
    this.getUserRentingGames()
    // this.originalUser = JSON.parse(JSON.stringify(this.user)) // Copia profunda del objeto user
  },
  mounted() {
    // this.user= this.$auth.$storage.getUniversal('user')
    // this.$axios.$get('/api/user/'+this.user.id).then((response) => {
    //   this.user = response
    // })
  },
  methods: {
    async getUserRentingGames() {
      await this.$axios
        .$get('api/rentingGames/' + this.user.id + '?page=1&pageSize=5')
        .then((response) => {
          this.maxPages = response.totalPages
          this.rentingGames = response.rentingGames
          this.rentingGames.map((game) => {
            this.$axios.get('/api/game/' + game.game.id).then((response) => {
              game.game = response.data
            })
            return game
          })
          this.maxPages = response.totalPages
        })
    },
    ...mapActions({
      setShowAddGameModal: 'user/setShowAddGameModal',
    }),
    setImgError() {
      this.src = require('@/assets/images/avatar.png')
    },
    async save() {
      // this.$awn.alert(this.$refs.form)
      const isValid = await this.$refs.formUser.validate()

      if (isValid) {
        this.$axios
          .$put('/api/user/account/user-information', this.user)
          .then((response) => {
            this.$awn.success('user updated')
          })
          .catch(() => {
            this.$alert('Something went wrong')
          })
        // Le formulaire est valide, tu peux envoyer les données ici
      } else {
        this.$awn.alert('Please respect rules')
        // Le formulaire n'est pas valide, gère l'erreur ou empêche l'envoi
      }
    },
    // Methods for check mail existing
    cancel() {
      this.user = JSON.parse(JSON.stringify(this.originalUser))
    },
    handlePage() {
      if (this.page > this.maxPages) {
        this.$awn.warning('no more page')
      } else {
        this.$axios
          .$get(`api/rentingGames/${this.user.id}?page=${this.page}&pageSize=5`)
          .then((response) => {
            this.rentingGames = response.rentingGames
          })
      }
    },
    uploadAvatar() {
      const formData = new FormData()
      formData.append('upload', this.file)
      this.$axios
        .post('/api/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.user.img = response.data.url
          this.$axios
            .$put('/api/user/account/user-information', this.user)
            .then((response) => {
              this.$awn.success('avatar updated')
            })
        })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/design/_colors.scss';

#user-id {
  .avatar-img {
    width: 270px;
    height: 250px;
    border-radius: 50%;
    border: 2px solid $color-primary;
    box-shadow: rgba(0, 0, 0, 0.3) 15px 4px 12px;
    margin: 0 auto;
    display: block;
  }
  .text-wrap {
    word-wrap: break-word;
  }
  .card-actions {
    display: flex;
    justify-content: center;
    padding: 16px;
  }
}
.v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}
.container-input-avatar {
  display: flex;
  flex-direction: row;
  background-color: black;
  flex-wrap: nowrap;
  max-width: 20em;
  height: fit-content;
  padding: 10px;
  border-radius: 5px;
  margin: 20px auto;

  .text-avatar {
    color: $color-primary;
    margin-right: 10px;
    margin-top: 5px;
  }
}
.user-info {
  padding-bottom: 40px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.games-info {
  background-color: white;
  border-radius: 5px;
  border: 2px solid $color-primary;
}
</style>
