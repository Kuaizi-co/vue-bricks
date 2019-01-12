# vue-bricks

[![npm](https://img.shields.io/npm/v/vue-bricks.svg)](https://www.npmjs.com/package/vue-bricks)
[![Travis](https://img.shields.io/travis/Kuaizi-co/vue-bricks.svg)](https://github.com/Kuaizi-co/vue-bricks)
[![Coveralls](https://img.shields.io/coveralls/Kuaizi-co/vue-bricks.svg)](https://github.com/Kuaizi-co/vue-bricks)
[![Github All Releases](https://img.shields.io/github/downloads/Kuaizi-co/vue-bricks/total.svg)](https://github.com/Kuaizi-co/vue-bricks)
[![npm](https://img.shields.io/npm/dw/vue-bricks.svg)](https://github.com/Kuaizi-co/vue-bricks)

> bricks.js for vue 2.x waterfall component

[中文文档](./README-zh.md)

Thanks for 

* [brick.js](https://github.com/callmecavs/bricks.js)
* [vue-waterfall](https://github.com/Kuaizi-co/vue-waterfall)

## Install

```
> yarn add vue-bricks
# or
> npm i vue-bricks -S
```

## Usage

### global component

```js
// main.js
import Vue from 'vue'
import 'vue-bricks/lib/vueBricks.css'
import VueBricks from 'vue-bricks'

Vue.use(VueBricks)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

> Uncaught TypeError: Cannot assign to read only property 'exports' of object '# Object'

It's set babel config to resolve, add `sourceType: 'unambiguous'`:

```js
// babel.config.js
module.exports = {
  presets: [
    '@vue/app'
  ],
  // here
  sourceType: 'unambiguous'
}
```

### single component

```html
<template>
  <div class="waterfall">
      <bricks
        ref="bricks"
        :data="waterfallData" 
        :sizes="waterfallSizes"
        :offset="100"
        @reach="fetchwaterfallData(true)"
        @update="done"
        @pack="done"
    >
        <template slot-scope="scope">
          <div class="card">
            <img class="card-img-top" :src="scope.item.src" :alt="scope.item.name" :style="{ width: `320px`, height: `${scope.item.height * 320 / scope.item.width}px` }">
            <div class="card-block">
              <h4 class="card-title" :style="scope.item.style">{{ scope.item.name }}</h4>
              <p class="card-text">{{ scope.item.width }} * {{ scope.item.height }}</p>
            </div>
          </div>
        </template>
      </bricks>
      <div class="loading" :class="{ active: loading }">
        <data-loader>Loading</data-loader>
      </div>
    </div>
</template>

<script>
import Bricks from 'vue-bricks'
// or
// import Bricks from 'vue-brick/src/components/bricks.vue'
import dataLoader from './components/loader'

export default {
  components: {
    Bricks,
    dataLoader
  },
  data () {
    return {
      loading: true,
      waterfallData: [],
      waterfallSizes: [
        { columns: 4, gutter: 20 },
        { mq: '414px', columns: 1, gutter: 10 },
        { mq: '640px', columns: 1, gutter: 80 },
        { mq: '800px', columns: 2, gutter: 80 },
        { mq: '1024px', columns: 3, gutter: 15 },
        { mq: '1280px', columns: 3, gutter: 30 },
        { mq: '1366px', columns: 4, gutter: 15 },
        { mq: '1440px', columns: 4, gutter: 30 },
        { mq: '1980px', columns: 5, gutter: 40 }
      ]
    }
  },
  methods: {
    async refresh () {
      document.documentElement.scrollTop = 0
      await this.fetchwaterfallData(true)
      this.$nextTick(() => this.$refs.bricks.pack())
      // or
      /*imageReady(imgList)
          .then(() => {
            this.$refs.bricks.pack()
          })
      */
    },
    fetchwaterfallData (isReset) {
      return new Promise(resolve => {
        this.loading = true
        fetch('/api/waterfall?search=girl')
          .then(data => {
            if (isReset) {
              this.waterfallData = data
            } else {
              this.waterfallData.push(...data)
            }
            resolve(data)
          })
      })
    },
    done () {
      this.loading = false
    }
  },
  created () {
    this.fetchwaterfallData(true)
  }
}
</script>
```

## imageLoaded

[image loaded demo](https://github.com/Kuaizi-co/vue-bricks/blob/dev/src/components/img-lazy-load.vue#L111)

## Props

Name | Default | Description
-|-|-
data | undefined | Array, It's required
sizes| undefined | Array, It's required, An array of objects describing the grid's properties at different breakpoints. [reference](https://github.com/callmecavs/bricks.js#sizes)
packed| data-packed | String, An attribute added to the grid items after they're positioned within the grid. If the attribute is not prefixed with data-, it will be added.[reference](https://github.com/callmecavs/bricks.js#packed)
position | true | A boolean, defaulting to true, indicating that the grid items should be positioned using the top and left CSS properties. [reference](https://github.com/callmecavs/bricks.js#position)
container| window | wrapper for bricks, the scroller
offset | 0 | when scroll to the page bottom near `offset`, It's trigger `reach` Event
| lazy | Boolean | If it to be set which not layout when It's initialize |

## API / Events

* `pack`

  Used to pack all elements within the container.

  ```
    <bricks @pack="handlePack" />
  ```

* `update`

  Used to pack elements without the packed attribute within the container.

  ```
    <bricks @update="handleUpdate" />
  ```

* `resize(size)`

  Used to add or remove the resize event handler. It's recommended that you add the resize handler when you create your instance.

  ```
    <bricks @resize="handleResize" />
  ```

You can get bricks instance Object to resolve

```
this.$refs.bricks.update()
this.$refs.bricks.pack()
this.$refs.bricks.resize(false)
```


## Project setup

```
yarn serve
```
---
MIT LICENSE (c) www.kuaizi.ai