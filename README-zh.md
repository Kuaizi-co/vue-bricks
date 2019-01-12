# vue-bricks

[![npm](https://img.shields.io/npm/v/vue-bricks.svg)](https://www.npmjs.com/package/vue-bricks)
[![Travis](https://img.shields.io/travis/Kuaizi-co/vue-bricks.svg)](https://github.com/Kuaizi-co/vue-bricks)
[![Coveralls](https://img.shields.io/coveralls/Kuaizi-co/vue-bricks.svg)](https://github.com/Kuaizi-co/vue-bricks)
[![Github All Releases](https://img.shields.io/github/downloads/Kuaizi-co/vue-bricks/total.svg)](https://github.com/Kuaizi-co/vue-bricks)
[![npm](https://img.shields.io/npm/dw/vue-bricks.svg)](https://github.com/Kuaizi-co/vue-bricks)

> 基于 `bricks.js` 封装的 `vue` 组件

## 安装

```
> yarn add vue-bricks
# or
> npm i vue-bricks -S
```

## 使用

### 全局组件

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


如果出现以上报错，需要修改 `babel`配置，可以添加`sourceType: 'unambiguous'`解决

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

### 单个组件

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

      // or 图片延迟加载
      // 不知道图片大小，css 需设置图片的 max-width: 100%
      /*imageReady(imgList)
          .then(() => {
            this.$refs.bricks.pack()
          })
      */
    },
    fetchwaterfallData (isReset) {
      return new Promise(resolve => {
        this.loading = true
        fetc('/api/waterfall?search=girl')
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

### Attributes

| 参数 | 描述 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| data | 瀑布流卡片数据 | Array | - | -, `必填` |
| sizes | 响应式配置 | Array | - | -, `必填` |
| position | 位置方式，设为`true`使用top,left布局,`false` 则为`transform`| Boolean | true,false | true |
| container | 瀑布流容器node 对象 | HTMLElement | - | window |
| packed | 已布局的子项类型 | String | - | `data-packed` |
| offset | 贴近底部拉取数据的距离 | Number | - | 0 |

### Event

| 参数 | 描述 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| pack | 重新排版后钩子函数 | Function | - | - |
| update | 更新排版后钩子函数 | Function | - | - |
| resize | 调整尺寸或触发钩子函数且返回新的尺寸信息 | Function(size) | - | - |
| reach | 触底触发钩子函数 | Function | - | - |


## 开发

```
yarn serve
```

---
MIT LICENSE (c) www.kuaizi.ai