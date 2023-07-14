<template>
  <div>
    <v-btn class="confirmation-button" @click="dialog = true">
      <v-img
        class="unicorn_button"
        :src="require(`../.././assets/images/unicorn_prout.png`)"
        contain
      >
      </v-img>
      <span>{{ name }} </span>
      <v-dialog v-model="dialog" activator="parent" max-width="500px">
        <v-card class="container_rent align-center">
          <v-card-title>Confirmation</v-card-title>
          <v-card-text>
            <p>{{ nameDate }}</p>
            <v-date-picker
              v-model="picker"
              @change="$emit('dateSelected', picker)"
            ></v-date-picker>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="confirmation-button"
              @click="
                $emit('confirmation', picker)
                dialog = false
              "
            >
              <v-img
                class="unicorn_button"
                :src="require(`../.././assets/images/unicorn_skating.png`)"
                contain
              >
              </v-img>
              <span>Confirm</span></v-btn
            >
            <v-btn class="confirmation-button" @click="dialog = false">
              <v-img
                class="unicorn_button"
                :src="require(`../.././assets/images/unicorn_cry.png`)"
                contain
              >
              </v-img>
              <span>Cancel</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>
<script>
export default {
  name:"ConfirmationModal",
  props: {
    name: {
      type: String,
      required: true,
    },
    dialogModal: Boolean,
    nameDate: String,
  },
  data() {
    return {
      dialog: false,
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/design/_colors';

.v-picker {
  width: 100%;
  padding-bottom: 20px;
}
.v-card__actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: 0 20px 0;
  padding: 8px 16px;
}
.container_rent {
  max-width: 375px;
  width: 100%;
  height: 100%;
  border: 2px solid $color-primary;
  border-radius: 5px;
  box-shadow: rgba(255, 129, 2, 0.25) 0px 30px 60px -12px inset,
    rgba(210, 90, 4, 0.3) 0px 18px 36px -18px inset;
  background-color: black !important;
}

.confirmation-button {
  background-color: $color-primary !important;
  color: white;
  min-width: 130px !important;
  width: 130px !important;
  max-width: 130px !important;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;

  span {
    font-size: 15px;
    line-height: 40px;
    position: relative;
    left: -20px;
  }

  .unicorn_button {
    opacity: 0;
    margin-left: -20px;
    width: 50px;
    height: 50px;
  }
}

.confirmation-button:hover {
  margin-right: 30px;
  background-color: $color-secondary !important;
  color: $color-primary;
  min-width: 150px;
  width: 150px;
  max-width: 150px;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;

  span {
    z-index: 100;
    font-size: 15px;
    line-height: 40px;
    margin-left: 0 !important;
  }

  .unicorn_button {
    opacity: 1;
    margin-left: -40px;
    width: 50px;
    height: 50px;
  }
}
</style>
