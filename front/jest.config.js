module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    'components/**/*.{js,vue}',
    'layouts/**/*.{js,vue}',
    'pages/**/*.{js,vue}',
    'plugins/**/*.{js,vue}',
    'store/**/*.{js,vue}',
  ],
  testEnvironment: 'jsdom',
}
