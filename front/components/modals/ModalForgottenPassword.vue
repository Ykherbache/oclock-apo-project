<template>
  <v-dialog v-model="showForgotPasswordModal" persistent width="50em">
    <v-card id="cardModal">
      <v-btn icon class="close-button" @click="setShowSignUpModal(false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card id="cardForgotPassword" class="mx-auto">
        <v-card-title class="justify-center">
          Forgotten Password ? NOT a shame 🦄</v-card-title
        >
        <p>lorem ipsum correlatum esta la casa por la manana</p>
        <v-row id="rowPass">
          <v-text-field outlined model="email" label="Email"></v-text-field
          ><v-btn id="btnSend">Send</v-btn>
        </v-row>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ModalForgottenPassword',
  computed: {
    ...mapGetters({
      getShowForgotPasswordModal: 'authentications/getShowForgotPasswordModal',
    }),
    showForgotPasswordModal() {
      return this.getShowForgotPasswordModal
    },
  },
  methods: {
    ...mapActions({
      setShowForgotPasswordModal: 'authentications/setShowForgotPasswordModal',
    }),
  },
}
</script>

<style scoped lang="scss">
#cardModal {
  text-align: center;
  #cardForgotPassword {
    width: 80%;
    margin-left: 10%;
    border: 1px solid black;
  }
  #rowForm {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 20px;
  }
  #rowPass {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 20px;
    #btnSend {
      margin-top: 10px;
    }
  }
  padding-bottom: 40px;
  padding-top: 40px;
}
</style>
