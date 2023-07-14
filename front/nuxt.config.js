import colors from 'vuetify/es5/util/colors'
// import Vue from 'vue'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - good-lock',
    title: 'Good-lock',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Lato&display=swap',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // axios: {
  // baseURL:
  //    baseURL:
  // },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },
  privateRuntimeConfig: {},
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    '~/design/index.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/pure.js',
    // '~/plugins/vue-awesome-notifications.js',
    // { src: '~/plugins/axios.js', mode: 'client'},
    { src: '~/plugins/vue-awesome-notifications.js', mode: 'client' },
    { src: '~/plugins/v-tippy.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Use the icons solid like this <font-awesome-icon :icon="['fas', 'lock']"/>
  // Use the icons brands like this <font-awesome-icon :icon="['fab', 'google']"/>
  // import icons in pascal case like this: LinkedIn icon is faLinkedin
  // The format is fa + PascalCase of the component name
  fontawesome: {
    icons: {
      solid: [
        'faEnvelope',
        'faUserNinja',
        'faHome',
        'faUser',
        'faDice',
        'faHorseHead',
        'faLightbulb',
        'faMessage',
        'faGavel',
        'faGamepad',
        'faMoneyBill',
        'faRectangleList',
        'faTreeCity',
        'faCalendar',
        'faUserGroup',
        'faStar',
        'faGears',
      ],
      brands: ['faGoogle'],
    },
  },
  webfontloader: {
    google: {
      families: ['Montserrat:200,300,400,500,600,700,800'], // Loads Lato font with weights 400 and 700
    },
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://www.npmjs.com/package/@nuxtjs/fontawesome
    // '@nuxtjs/fontawesome',
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/auth-next', '@nuxtjs/axios', 'nuxt-webfontloader'],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  auth: {
    redirect: {
      login: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: false,
          autoFetch: false,
        },
        endpoints: {
          login: { url: 'api/auth/login', method: 'post' },
          logout: { url: 'api/auth/logout', method: 'put' },
          // user: { url: 'api/user', method: 'get' }
          user: false,
        },
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#ee8138',
          accent: colors.grey.darken3,
          secondary: '#000000',
          tertiary: '#e35f07',
          quaternary: '#963f06',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          good: '#1a1a1a',
        },
        light: {
          primary: '#ee8138',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          tertiary: '#e35f07',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          good: '#1a1a1a',
        },
      },
    },
  },
  // Router configuration pour test user/id => user/_id => user/123
  // router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       path: '/user/123',
  //       component: resolve(__dirname, 'pages/user/_id.vue'),
  //     })
  //   },
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['defu'],
  },
}
