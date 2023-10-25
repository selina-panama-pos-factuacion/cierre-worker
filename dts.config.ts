import dotenv from 'rollup-plugin-dotenv'

export default {
  rollup(config) {
    config.plugins.push(dotenv())
    return config
  },
}
