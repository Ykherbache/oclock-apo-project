<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in sidebarUnauthenticatedUser"
      :key="i"
      :to="item.to"
      router
      exact
    >
      <!-- eslint-disable vue/first-attribute-linebreak -->
      <v-list-item-action>
        <font-awesome-icon
          v-if="item.faIconType && item.faIcon"
          v-tippy="{ placement: 'right', followCursor: true, theme: 'light' }"
          :content="item.title"
          :icon="[item.faIconType, item.faIcon]"
          :class="item.class"
        />
      </v-list-item-action>
      <!-- eslint-enable vue/first-attribute-linebreak -->
      <v-list-item-content>
        <v-list-item-title class="text-uppercase tertiary--text">{{
          item.title
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      sidebarUnauthenticatedUser: 'sidebarsItems/getSidebarUnauthenticatedUser',
    }),
  },
  mounted() {
    // this.$vuetify.theme.dark = true
  },
  methods: {
    ...mapActions({}),
  },
}
</script>
