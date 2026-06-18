import vuetify from 'eslint-config-vuetify'

export default vuetify(
  {
    ts: false,
  },
  {
    rules: {
      'vue/block-lang': 'off',
      'antfu/top-level-function': 'off',

    },
  },
)
