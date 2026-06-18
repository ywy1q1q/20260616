import { createRulesPlugin } from 'vuetify/labs/rules'
/**
 * plugins/index.ts
*
* Automatically included in `./src/main.ts`
*/
// Plugins
import router from '../router'
import pinia from '../stores'
import vuetify from './vuetify'

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(createRulesPlugin({}, vuetify.locale))
  app.use(pinia)
  app.use(router)
}
