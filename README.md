# vue-bricks

[![npm](https://img.shields.io/npm/v/vue-bricks.svg)](https://www.npmjs.com/package/vue-bricks)
[![Travis](https://img.shields.io/travis/Kuaizi-co/vue-bricks.svg)](https://github.com/Kuaizi-co/vue-bricks)
[![Coveralls](https://img.shields.io/coveralls/Kuaizi-co/vue-bricks.svg)](https://github.com/Kuaizi-co/vue-bricks)
[![Github All Releases](https://img.shields.io/github/downloads/Kuaizi-co/vue-bricks/total.svg)](https://github.com/Kuaizi-co/vue-bricks)
[![npm](https://img.shields.io/npm/dw/vue-bricks.svg)](https://github.com/Kuaizi-co/vue-bricks)


> bricks.js for vue 2.x waterfall component

Thanks for 

* [brick.js](https://github.com/callmecavs/bricks.js)
* [vue-waterfall](https://github.com/Kuaizi-co/vue-waterfall)

## Install

```
npm install vue-bricks
```

## Usage

```
import Bricks from 'vue-bricks'
```

## HTML

```
<bricks
    ref="bricks"
    :data="waterfallData" 
    :sizes="waterfallSizes"
    :offset="100"
    @reach="addItem"
    @update="done"
    @pack="done"
>
    <template scope="scope">
      <div class="card">
        <img class="card-img-top" :src="getImg(scope.item.index)" :alt="scope.item.index" :style="{ width: `320px`, height: `${scope.item.height * 320 / scope.item.width}px` }">
        <div class="card-block">
          <h4 class="card-title" :style="scope.item.style">{{ scope.item.index }}</h4>
          <p class="card-text">{{ scope.item.width }} * {{ scope.item.height }}</p>
          <a  href="https://www.kuaizi.co" class="btn btn-primary">kuaizi</a>
        </div>
      </div>
    </template>
  </bricks>
```

## Vue

```
import Bricks from './components/bricks'
import itemFactory from './lib/item-factory'
export default {
  name: 'app',
  components: {
    Bricks
  },
  data () {
    const waterfallData = itemFactory.get(30)
    return {
      loading: true,
      // data
      waterfallData,
      // options - required
      waterfallSizes: [
        { columns: 4, gutter: 20 },
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
    add () {
      this.loading = true
      const data = itemFactory.get(30)
      this.waterfallData = this.waterfallData.concat(data)
    },
    done () {
      this.loading = false
    },
    addItem () {
      this.loading = true
      setTimeout(() => {
        this.add()
      }, 1e3)
    }
  }
}
```

## Props

Name | Default | Description
-|-|-
data | undefined | Array, It's required
sizes| undefined | Array, It's required, An array of objects describing the grid's properties at different breakpoints. [reference](https://github.com/callmecavs/bricks.js#sizes)
packed| data-packed | String, An attribute added to the grid items after they're positioned within the grid. If the attribute is not prefixed with data-, it will be added.[reference](https://github.com/callmecavs/bricks.js#packed)
position | false | A boolean, defaulting to true, indicating that the grid items should be positioned using the top and left CSS properties. [reference](https://github.com/callmecavs/bricks.js#position)
container| window | wrapper for bricks, the scroller
offset | 0 | when scroll to the page bottom near `offset`, It's trigger `reach` Event

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

* `resize(flag)`

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

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License
---

Released under the [MIT](LICENSE.md) License.
