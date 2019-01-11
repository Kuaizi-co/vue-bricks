/**
* __   __ _   _   ___        | |__   _ __ (_)  ___ | | __ ___
* \\ \\ / /| | | | / _ \\ _____ | '_ \\ | '__|| | / __|| |/ // __|
*  \\ V / | |_| ||  __/|_____|| |_) || |   | || (__ |   < \\__ \
*   \\_/   \\__,_| \\___|       |_.__/ |_|   |_| \\___||_|\\_\\|___/
*
*
* by tomieric <tomieric@gmail.com> 
* MIT License Copyright (c) www.kuaizi.ai
*/

import Bricks from './components/bricks.vue'

Bricks.install = (Vue) => {
  Vue.component(Bricks.name, Bricks)
}

export default Bricks