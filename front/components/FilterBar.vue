<template>
  <div class="rowFilter">
    <v-select
      v-model="selectedFilter"
      :items="dropdownItems"
      placeholder="Filter by:"
      outlined
      background-color="secondary"
      class="filter"
      :class="{ 'orange--text': selectedFilter !== null }"
    ></v-select>
    <v-select
      v-if="selectedFilter === 'Categories'"
      v-model="filter"
      :items="categories"
      placeholder="Choose a category:"
      outlined
      background-color="secondary"
      class="filter"
      :class="{ 'orange--text': filter !== null }"
    ></v-select>

    <v-select
      v-if="selectedFilter === 'Mechanics'"
      v-model="filter"
      :items="mechanics"
      placeholder="Choose a mechanic:"
      outlined
      background-color="secondary"
      class="filter"
      :class="{ 'orange--text': filter !== null }"
    ></v-select>

    <v-select
      v-if="selectedFilter === 'City'"
      v-model="filter"
      :items="cities"
      placeholder="Choose a city:"
      outlined
      background-color="secondary"
      class="filter"
      :class="{ 'orange--text': filter !== null }"
    ></v-select>
    <v-text-field
      v-if="selectedFilter === 'Name'"
      v-model="filter"
      :items="name"
      placeholder="Write a game name: "
      outlined
      background-color="secondary"
      clearable
      class="filter"
      @keydown.enter="emitFiltersChange"
    ></v-text-field>
  </div>
</template>

<script>
import { cleanArray } from '~/utils/array-utils'

export default {
  name: 'FilterBar',
  data() {
    return {
      filter: null,
      categories: [],
      mechanics: [],
      cities: [],
      name: '',
      dropdownItems: ['City', 'Categories', 'Mechanics', 'Name'],
      selectedName: '',
      selectedFilter: null,
    }
  },
  watch: {
    selectedFilter(newVal) {
      if (newVal === 'Categories') {
        this.fetchCategories()
      } else if (newVal === 'Mechanics') {
        this.fetchMechanics()
      } else if (newVal === 'City') {
        this.fetchCities()
      }
    },
    filter() {
      this.emitFiltersChange()
    },
  },
  methods: {
    fetchCategories() {
      this.$axios.get('api/categories').then((res) => {
        this.categories = res.data.map((category) => category.name)
      })
    },
    fetchCities() {
      this.$axios.get('api/user/cities').then((res) => {
        this.cities = cleanArray(res.data)
      })
    },
    fetchMechanics() {
      this.$axios.get('api/mechanics').then((res) => {
        this.mechanics = res.data.map((mechanic) => mechanic.name)
      })
    },
    emitFiltersChange() {
      this.$emit('filters-change', {
        filter: this.filter,
        selectedFilter: this.selectedFilter,
      })
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/design/_colors';

.rowFilter {
  display: flex;
  flex-direction: row;

  .filter {
    margin-right: 20px;
    font-size: 16px;
    letter-spacing: normal;
    max-width: 250px;
    text-align: left;
    color: $color-quaternary;
    width: 100px;
  }

  .filter.v-text-field--outlined > .v-input__control > .v-input__slot {
    background: $color-secondary !important;
    width: 150px;
    margin-top: 40px;
    border-radius: 10px;
    border: 2px solid $color-primary;
    color: white !important;
  }

  .v-text-field.v-text-field--enclosed {
    margin-right: 5px;
  }

  .v-select-list {
    .v-list-item {
      color: $color-secondary;
    }
  }
}
</style>
