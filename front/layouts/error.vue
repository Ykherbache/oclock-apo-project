<template>
  <component :is="errorPage" :error="error" />
</template>

<script>
import Error500 from '~/pages/Error500'
import Error404 from '~/pages/_'
export default {
  name: 'ErrorLayout',
  components: {
    Error500,
    Error404,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      notFoundTitle: 'Oops, are you lost?',
      errorTitle: 'Oops, it is broken!',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.notFoundTitle : this.errorTitle
    return {
      title,
    }
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return Error404
      }
      // Catch everything else
      return Error500
    },
  },
}
</script>
