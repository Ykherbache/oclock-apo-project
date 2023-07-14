<template>
  <v-dialog v-model="showSignInModal" persistent width="50em">
    <v-card v-if="!forgotten" id="cardModal">
      <v-btn icon class="close-button" @click="closeModal">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card id="cardConnexion" class="mx-auto">
        <v-card-title class="justify-center"> Login : </v-card-title>
        <div id="rowForm">
          <form @submit.prevent="userLogin">
            <v-text-field
            v-model="email"
            required
            :rules="[rules.required, rules.emailRules]"
            clearable
            class="input-required"
            label="Email"></v-text-field>
            <v-text-field
              v-model="password"
              class="mb-3 input-required"
              :append-icon=" isModalVisible ? 'mdi-eye' : 'mdi-eye-off'"
              :type=" isModalVisible ? 'text' : 'password'"
              :rules="[rules.required, rules.min, rules.specialChar]"
              required
              label="Password"
              @click:append=" isModalVisible = ! isModalVisible"></v-text-field>
            <v-row>
              <v-col cols="12" md="6" lg="6">
                <v-btn :x-small="isMobile" class="button_login" type="submit">
                  <v-img class="unicorn_button" :src="require(`../.././assets/images/succes_unicorn.png`)" contain>
                  </v-img>
                  GOOOOO 🦄!
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" lg="6">
                <v-btn  :width="isMobile ? '211': '' " :x-small=isMobile class="button_login" @click="forgotten = true">
                  <v-img class="unicorn_button" :src="require(`../.././assets/images/succes_unicorn.png`)" contain>
                  </v-img>
                  Forgot password ?
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </div>
      </v-card>
    </v-card>
    <v-card v-if="forgotten" id="cardModal">
      <v-btn icon class="close-button" @click="forgotten = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title>Forgotten password</v-card-title>
      <v-card-subtitle>
        <v-text-field v-model="emailForgot" required label="Email"></v-text-field>
        <v-btn class="button_login" @click="forgottenPass">
          <v-img class="unicorn_button" :src="require(`../.././assets/images/succes_unicorn.png`)" contain>
          </v-img>
          Send Email
        </v-btn>
      </v-card-subtitle>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ModalSignIn',
  props: {},
  data() {
    return {
      email: '',
      password: '',
      isModalVisible: false,
      forgotten: false,
      emailForgot: '',
      rules: {
        required: (value) => !!value || 'This field is required',
        emailRules: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
        min: (v) => v.length >= 6 || 'Min 6 characters',
        specialChar: (v) =>
          !v ||
          /[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(v) ||
          'At least one special character is required',
      },
    }
  },
  computed: {
    ...mapGetters({
      getShowSignInModal: 'authentications/getShowSignInModal'
    }),
    showSignInModal() {
      return this.getShowSignInModal
    },
    isMobile() {
      return this.$vuetify.breakpoint.xs
    },
  },
  methods: {
    ...mapActions({
      setShowSignInModal: 'authentications/setShowSignInModal',
      setAuthUser: 'authentications/setAuthUser'
    }),
    async userLogin() {
      try {
        const email = this.email
        const password = this.password
        await this.$auth.loginWith('local', { data: { email, password } }).then(
          (response) => {
            const user = response.data.data
            this.$auth.setUser(user)
            this.$auth.$storage.setUniversal('user', user)
            this.$auth.$storage.setUniversal('loggedIn', true)
            this.setAuthUser(user)
            this.setShowSignInModal(false)
            this.$awn.success('Vous êtes connecté !')
            this.$axios.get(`/api/user/${user.id}`).then((res) => {
              const loggedUser = res.data
              if (loggedUser.city === null || loggedUser.city === '') {
                this.$router.push(`/users/${user.id}`)
              } else {
                this.$router.push('/game-list')
              }
            })
          },
          (error) => {
            this.$awn.alert(error.response.data.message)
          }
        )
      } catch (err) {
        this.$debug.error(err)
      }
    },
    closeModal() {
      this.setShowSignInModal(false)
    },
    async logout() {
      try {
        const userId = this.$auth.$storage.getUniversal('user').id
        await this.$auth.logout({ data: { userId } })
        this.$auth.$storage.removeUniversal('user')
        this.setShowSignInModal(false)
      } catch (error) {
        this.$awn.alert(error.response.data.message)
      }
    },
    forgottenPass() {
      this.$axios
        .post('/api/forgot-password', { usermail: this.emailForgot })
        .then((res) => {
          this.$awn.success(res.data.message)
          this.forgotten = false
        })
        .catch((err) => {
          this.$awn.alert(err.response.data.message)
        })
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/design/_colors';
.input-required {
  content: '*';
}
#cardModal {
  text-align: center;

  #cardConnexion {
    width: 80%;
    margin-left: 10%;
    border: 1px solid black;
  }
  #rowForm {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 20px;
  }
  padding-bottom: 40px;
  padding-top: 40px;
}
.close-button {
  position: absolute;
  top: 0;
  left: 0;
  margin: 16px;
}
.unicorn_button {
  height: 70px;
  width: 70px;
}
.button_login {
  border-radius: 20px 70px 35px 70px;
  background-color: $color-primary !important;
  cursor: pointer;
}
.button_login:hover {
  background-color: white !important;
  color: black;
  border: 2px solid rgba(96, 93, 93, 0.41);
}
</style>



