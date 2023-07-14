<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in sidebarUser"
      :key="i"
      :to="item.to"
      router
      exact
    >
      <v-list-item-action class="mr-2">
        <font-awesome-icon
          v-if="item.faIconType && item.faIcon"
          v-tippy="{ placement: 'right', followCursor: true, theme: 'light' }"
          :content="item.title"
          :icon="[item.faIconType, item.faIcon]"
          :class="item.class"
        />
      </v-list-item-action>
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
  name: 'UserSidebar',
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
      sidebarUser: 'sidebarsItems/getSidebarUser',
    }),
  },
  methods: {
    ...mapActions({}),
  },
}
</script>
