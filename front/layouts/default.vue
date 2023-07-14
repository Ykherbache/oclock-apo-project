<template>
  <v-app dark>
    <ModalSignUp />
    <ModalSignIn />
    <ModalForgottenPassword />
    <!-- Sidebar -->

    <v-menu v-if="isMobile" v-model="drawer" transition="scroll-y-transition">
      <!-- Sidebar List -->
      <v-list>
        <v-list-item :to="item.to" router exact>
          <!-- eslint-disable vue/first-attribute-linebreak -->
          <v-list-item-action>
            <font-awesome-icon :icon="['fas', 'home']" class="primary--text" />
          </v-list-item-action>
          <!-- eslint-enable vue/first-attribute-linebreak -->
          <v-list-item-content>
            <v-list-item-title class="text-uppercase tertiary--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <UnauthenticatedUserSidebar v-if="!ifSavedUserInStorage" />
      <UserSidebar v-if="ifSavedUserInStorage" />
    </v-menu>

    <!-- Header -->
    <v-app-bar id="header" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon v-if="isMobile" color="primary" @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <img class="logo" :src="logo" :alt="item.title"
      /></v-toolbar-title>
      <v-spacer />
      <v-btn text color="tertiary" :to="{ name: 'game-list' }">
        <span>Games List</span>
      </v-btn>
      <v-btn v-if="!ifSavedUserInStorage" text color="tertiary ">
        <span @click="setShowSingUpModal">Login</span>
      </v-btn>

      <v-btn
        v-if="ifSavedUserInStorage"
        text
        color="tertiary"
        :to="'/users/message'"
      >
        <v-badge>
          <template v-if="unreadMessageCount > 0" #badge>
            {{ unreadMessageCount }}
          </template>
          <font-awesome-icon :icon="['fas', 'user']" />
        </v-badge>
      </v-btn>

      <v-btn
        v-if="ifSavedUserInStorage"
        text
        color="tertiary"
        to="/"
        @click="logout()"
      >
        <span>Logout</span>
      </v-btn>

    </v-app-bar>
    <v-navigation-drawer
      v-if="!isMobile"
      app
      >
      <!-- Sidebar List -->
      <v-list>
        <v-list-item :to="item.to" router exact >
          <!-- eslint-disable vue/first-attribute-linebreak -->
          <v-list-item-action>
            <font-awesome-icon :icon="['fas', 'home']" class="primary--text" />
          </v-list-item-action>
          <!-- eslint-enable vue/first-attribute-linebreak -->
          <v-list-item-content>
            <v-list-item-title class="text-uppercase tertiary--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <UnauthenticatedUserSidebar v-if="!ifSavedUserInStorage" />
      <UserSidebar v-if="ifSavedUserInStorage" />
    </v-navigation-drawer>
        <v-footer absolute app>
      <v-spacer />
      <span class="tertiary--text d-flex text-center align-center">
        &copy; {{ title }} {{ new Date().getFullYear() }}</span
      >
      <v-spacer />
    </v-footer>
    <!-- main content -->
    <v-main>

      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- footer -->
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalForgottenPassword from '../components/modals/ModalForgottenPassword.vue'
import ModalSignUp from '~/components/modals/ModalSignUp.vue'
import ModalSignIn from '~/components/modals/ModalSignIn.vue'
import UnauthenticatedUserSidebar from '~/components/sidebars/UnauthenticatedUserSidebar.vue'
import UserSidebar from '~/components/sidebars/UserSidebar.vue'
export default {
  name: 'DefaultLayout',
  components: {
    UnauthenticatedUserSidebar,
    UserSidebar,
    ModalSignIn,
    ModalSignUp,
    ModalForgottenPassword,
  },
  data() {
    return {
      isUser: true,
      logo: require('~/assets/logo.png'),
      clipped: false,
      drawer: false,
      fixed: false,
      item: {
        icon: 'mdi-apps',
        title: 'Home',
        to: '/',
        color: 'primary',
      },
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Good Lock',
      unreadMessageCount: 0,
      mobile: false,
    }
  },
  computed: {
    ...mapGetters({}),
    isMobile() {
      return this.$vuetify.breakpoint.xs
    },
    ifSavedUserInStorage() {
      return this.$auth.loggedIn
    },
  },
  mounted() {
    if (this.ifSavedUserInStorage) {
      const savedUser = this.$auth.$storage.getUniversal('user')
      this.$auth.setUser(savedUser)
      this.fetchUnreadMessageCount()
    };
  },
  methods: {
    ...mapActions({
      setShowSingInModal: 'authentications/setShowSignInModal',
      setShowSingUpModal: 'authentications/setShowSignUpModal',
    }),
    async fetchUnreadMessageCount() {
      try {
        const userId = this.$auth.$storage.getUniversal('user').id
        const response = await this.$axios.get(
          `api/user/account/message/unread/count/${userId}`
        )
        this.unreadMessageCount = response.data.count
      } catch (error) {
        this.$debugLog(
          'Erreur lors de la récupération du nombre de messages non lus :',
          error
        )
      }
    },
    async logout() {
      try {
        const user = this.$auth.$storage.getUniversal('user')
        const userId = user.id
        await this.$auth.logout({ data: { userId } })
        this.$auth.$storage.removeUniversal('user')
        this.setShowSignInModal(false)
      } catch (err) {}
    },
  },
}

</script>