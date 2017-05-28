/**
 * waterfall component
 * suport vue 2.x
 */

import Bricks from './components/bricks'

Bricks.install = (Vue) => {
  Vue.component(Bricks.name, Bricks)
}

export default Bricks