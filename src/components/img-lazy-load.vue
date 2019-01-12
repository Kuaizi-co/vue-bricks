<template>
  <div>
    <demo-header @change="refresh"></demo-header>
    <div class="waterfall">
      <bricks
        ref="bricks"
        :data="waterfallData" 
        :sizes="waterfallSizes"
        :offset="100"
        @reach="loadData"
        @update="done"
        @pack="done"
        :lazy="true"
    >
        <template slot-scope="scope">
          <div class="card">
            <img v-if="scope.item.src" class="card-img-top" :src="scope.item.src" :alt="scope.item.index">
            <div class="card-block">
              <h4 class="card-title" :style="scope.item.style">{{ scope.item.index }}</h4>
              <p class="card-text">{{ scope.item.width }} * {{ scope.item.height }}</p>
            </div>
          </div>
        </template>
      </bricks>
      <div class="loading" :class="{ active: loading }">
        <data-loader>Loading</data-loader>
      </div>
      <a href="#" class="go-top">
        <svg class="icon" style="width: 2rem; height: 2rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2091"><path d="M812 742.6l-300-172.8-300 172.8 300-604L812 742.6zM264.5 686.8l247.5-142.5 247.5 142.5L512 188.5 264.5 686.8zM371.7 757.7l0 126.2-15.9 0 0-126.2-45.9 0L309.9 743l107.4 0 0 14.8L371.7 757.8zM506.6 741.5c26.6 0 43.3 3.9 50 11.7 6.7 7.8 10 27.2 10 58.3 0 33.5-3.2 54.2-9.6 62-6.4 7.8-23.2 11.8-50.4 11.8-27 0-43.8-3.9-50.3-11.7-6.5-7.8-9.8-27.9-9.8-60.3l0-9.9 0.2-13.3c0-18.7 4.2-31.5 12.6-38.4C467.8 745 483.5 741.5 506.6 741.5zM506.5 755c-22.3 0-35.3 2.5-39.1 7.4-3.8 5-5.7 22-5.7 51 0 29.1 1.9 46.1 5.7 51.1 3.8 5 16.8 7.4 39.1 7.4 22.4 0 35.4-2.5 39.2-7.4 3.8-5 5.7-22 5.7-51.1l0-9.2-0.1-13.3c0-15.6-2.6-25.4-7.8-29.6S525.9 755 506.5 755zM608.4 883.9 608.4 743l59.2 0 5.4 0c15.9 0 26.7 3.1 32.5 9.2 5.8 6.1 8.7 17.6 8.7 34.4 0 16.1-3 27.1-9 32.9-6 5.9-17.3 8.8-33.9 8.8l-6.2 0.1-40.7 0 0 55.5L608.4 883.9zM624.3 814.9l37.7 0c15.8 0 25.9-1.6 30.3-4.9 4.4-3.2 6.7-10.7 6.7-22.3 0-13.6-1.5-22.2-4.5-25.9-3-3.6-10.1-5.4-21.3-5.4l-6.1-0.1-42.7 0L624.4 814.9z" p-id="2092"></path></svg>
      </a>
    </div>
  </div>
</template>

<script>
import Bricks from './bricks'
import itemFactory from '../lib/item-factory'
import demoHeader from './header'
import dataLoader from './loader'
const huabanImages = ["http://img.hb.aicdn.com/3a6b3bd1f46fbc94927679c635336ffb993efe5c41909-vNCTwF_fw236", "http://img.hb.aicdn.com/ac1f108db09c28b2a3ad6d03331abec5c21dc8aeca393-47vMPl_fw236", "http://img.hb.aicdn.com/fe96c8841043f5b8155eec3b36c57657ba9641c914faa-tSgXZ9_fw236", "http://img.hb.aicdn.com/94855caef98e1139411531e2e1496b259a3a030414255-qYlUZf_fw236", "http://img.hb.aicdn.com/b84fc8c7a532fb5b3a5298c8052b9e097c8433e860438-shRN54_fw236", "http://img.hb.aicdn.com/3f9f531759a6e4f7f738c85bab50525d6c26fbad2070d-AFiuSU_fw236", "http://img.hb.aicdn.com/f6c625b54b8328ceddff1c55d5a00007c438c6f796f18-OEhi5v_fw236", "http://img.hb.aicdn.com/08b54d5b5218c9330d31376f19a0a8144dc04ca95e2e8-76uT35_fw236", "http://img.hb.aicdn.com/5f73909e54bd694712a4f1bf546ecc37bca074db5db84-rsAmm6_fw236", "http://img.hb.aicdn.com/762ccfa3858969791118aad706887d9f76f00ff57f5d1-wUDVmJ_fw236", "http://img.hb.aicdn.com/7303810ccf5fa649db989686df95e9ef846aa7e551a92-z1cKrX_fw236", "http://img.hb.aicdn.com/eea447364bee2a5cec7f6a1b06df3820e97882463251b-ZWRRgB_fw236", "http://img.hb.aicdn.com/c54df45fba647c28238ede4ebc825d616ce4b8092cb8c-qAUHgv_fw236", "http://img.hb.aicdn.com/e1d40f4beca1178aca902fcea1b17ebe554bc0728605d-Xud8IC_fw236", "http://img.hb.aicdn.com/38e5fa0a3bbfcfc6acd556ed303a8457af59acdace12f-IWHdZi_fw236", "http://img.hb.aicdn.com/1f7ba3a69495956cbba101f7f04aab85a65107b036f2c-AELCaK_fw236", "http://img.hb.aicdn.com/5a869e408d5ae610cf3aed479cf248ba1c6ac1674e4fc-SLVhoo_fw236", "http://img.hb.aicdn.com/901fff0b07b7c28f6076d788bca5a7871f5521ca6cda8-lUMBNj_fw236", "http://img.hb.aicdn.com/725d96417c2148d03b35424454a244ea9bff80e47d425-nH8YMS_fw236", "http://img.hb.aicdn.com/4fe7519dca2b2828d2e1ed4dd3dc45177d3f782e17688-xnEHle_fw236", "http://img.hb.aicdn.com/8153cdbcde57041ee4a9e6eaf1582b3f9bbff4b550023-gmqwsq_fw236", "http://img.hb.aicdn.com/5f93b0ebdfdedae03fcaaa6e312ae638ed09c6edb3210-VMLPks_fw236", "http://img.hb.aicdn.com/2a4e698aaa7d1817d52dd172aeda54a6e7a319f9894e7-L7DdFX_fw236", "http://img.hb.aicdn.com/87dad464f1d7a12aca4a9d537455c5a48ba763941a4403-QRNICb_fw236", "http://img.hb.aicdn.com/e614eb82ef8f1fb809704b7b18e4a14bb8692788144c2-lbKgbD_fw236", "http://img.hb.aicdn.com/23c49e8ce3b44bea20f7dbf861c6ba916bc497bb26193-AD94Km_fw236", "http://img.hb.aicdn.com/bb6460808cb694a84995716d1d5924ca9a4331ad1b614-xomxvo_fw236", "http://img.hb.aicdn.com/46fdc28bb3442090fa090e3e46f9839ccf1cb83a2d32f-vr95n0_fw236", "http://img.hb.aicdn.com/c1d1554c408f0d597594be7cffece8e06612f4cc1f229-BM4UKl_fw236", "http://img.hb.aicdn.com/e709eacb97674c749d5d4f61029b86884c218d29200d9-IZPTsV_fw236"]
export default {
  name: 'app',
  components: {
    Bricks,
    demoHeader,
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
    show () {
      // console.log(data)
    },
    getImg (index) {
      return huabanImages[index] 
              ? huabanImages[index]
              : huabanImages[Math.floor(Math.random() * (huabanImages.length - 1))] 
    },
    imageLoaded (list) {
      return new Promise(resolve => {
        let loaded = 0
        const count = list.length

        const imgLoad = (url) => {
          let objImg = document.createElement('img')
          const complete = () => {
            loaded++
            objImg = null
            // resolve
            loaded === count && resolve()
          }
          objImg.onload = complete
          objImg.onerror = complete
          objImg.src = url
        }

        list.map(imgLoad)
      })
    },
    loadData (isReset) {
      this.loading = true
      return new Promise(resolve => {
        const data = itemFactory.get(30)
                                .map((item, index) => Object.assign({}, item, {
                                  // dataSrc: item.src,
                                  dataSrc: this.getImg(index),
                                  src: null
                                }))
        if (isReset) {
          this.waterfallData = data
        } else {
          this.waterfallData.push(...data)
        }

        // image Load
        this.imageLoaded(data.map(item => item.dataSrc))
              .then(() => {
                // console.log('image loaded')
                this.waterfallData.map(item => {
                  item.src = item.dataSrc
                })

                this.$nextTick(() => this.$refs.bricks.resize().pack())
                resolve()
              })
      })
    },
    async refresh () {
      document.documentElement.scrollTop = 0
      await this.loadData(true)
    },
    done () {
      this.loading = false
    }
  },
  async mounted () {
    await this.loadData(true)
  }
}
</script>
