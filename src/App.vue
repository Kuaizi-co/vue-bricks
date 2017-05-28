<template>
  <div id="app">
    <demo-header @change="refresh"></demo-header>
    <div class="waterfall">
      <bricks
        ref="bricks"
        :data="waterfallData" 
        :sizes="waterfallSizes"
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
              <a  href="https://www.kuaizi.co" class="btn btn-primary">
                <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1861"><path d="M749.624889 980.152889c-15.672889 0-31.246222-3.882667-45.084444-11.306667l-192.526222-103.637333L319.544889 968.817778c-31.203556 16.64-70.314667 14.392889-99.043556-5.304889-29.511111-20.337778-44.743111-55.921778-38.840889-90.695111l37.703111-225.251556L56.661333 485.091556c-25.002667-24.888889-33.464889-60.984889-22.058667-94.193778 11.349333-32.910222 40.064-56.576 74.965333-61.752889l221.326222-32.896 96.128-199.580444c15.488-32.085333 48.853333-52.807111 84.992-52.807111 36.167111 0 69.518222 20.736 84.963556 52.807111l96.156444 199.580444 221.297778 32.910222c34.872889 5.162667 63.616 28.8 74.979556 61.696 11.392 33.28 2.944 69.361778-22.030222 94.250667L804.622222 647.566222l37.745778 225.28c5.845333 34.773333-9.386667 70.357333-38.812444 90.638222C787.569778 974.392889 768.938667 980.152889 749.624889 980.152889zM512.014222 804.451556c4.636444 0 9.272889 1.137778 13.482667 3.384889l205.937778 110.862222c12.373333 6.641778 28.316444 5.802667 39.936-2.133333 11.392-7.836444 17.123556-21.006222 14.890667-34.304L746.097778 642.503111c-1.507556-9.088 1.450667-18.332444 7.964444-24.832l173.141333-172.842667c9.457778-9.429333 12.686222-23.025778 8.405333-35.484444-4.380444-12.672-15.701333-21.873778-29.525333-23.921778L669.866667 350.293333c-9.315556-1.379556-17.365333-7.296-21.447111-15.786667L545.720889 121.358222c-6.030222-12.529778-19.256889-20.608-33.706667-20.608s-27.690667 8.092444-33.763556 20.622222L375.608889 334.506667c-4.081778 8.490667-12.131556 14.407111-21.447111 15.786667L117.930667 385.422222c-13.624889 2.033778-25.201778 11.434667-29.539556 23.992889-4.266667 12.416-1.024 25.984 8.433778 35.399111L269.937778 617.671111c6.513778 6.499556 9.472 15.744 7.964444 24.832l-40.135111 239.744c-2.247111 13.312 3.484444 26.439111 14.976 34.360889 11.434667 7.836444 27.349333 8.775111 39.950222 2.062222l205.852444-110.833778C502.741333 805.589333 507.377778 804.451556 512.014222 804.451556zM200.32 456.789333c-6.840889 0-12.885333-4.963556-14.023111-11.946667-1.251556-7.751111 4.010667-15.061333 11.761778-16.312889l9.443556-1.536c7.793778-1.336889 15.061333 4.010667 16.312889 11.761778 1.251556 7.751111-4.010667 15.061333-11.761778 16.312889l-9.443556 1.536C201.856 456.732444 201.073778 456.789333 200.32 456.789333zM252.544 448.312889c-6.684444 0-12.643556-4.721778-13.937778-11.534222-1.493333-7.708444 3.555556-15.175111 11.264-16.654222l153.927111-29.696 58.055111-133.148444c3.157333-7.182222 11.548444-10.496 18.716444-7.352889 7.210667 3.143111 10.510222 11.52 7.367111 18.716444l-61.056 140.017778c-1.877333 4.295111-5.745778 7.395556-10.353778 8.277333l-161.28 31.118222C254.336 448.241778 253.44 448.312889 252.544 448.312889z" p-id="1862"></path></svg>
                kuaizi
              </a>
            </div>
          </div>
        </template>
      </bricks>
      <div class="loading" :class="{ active: loading }">
        <data-loader>Loading</data-loader>
      </div>
      <a href="#" class="go-top">
        TOP
      </a>
    </div>
  </div>
</template>

<script>
import Bricks from './components/bricks'
import itemFactory from './lib/item-factory'
import demoHeader from './components/header'
import dataLoader from './components/loader'

const huabanImages = ["http://img.hb.aicdn.com/3a6b3bd1f46fbc94927679c635336ffb993efe5c41909-vNCTwF_fw236", "http://img.hb.aicdn.com/ac1f108db09c28b2a3ad6d03331abec5c21dc8aeca393-47vMPl_fw236", "http://img.hb.aicdn.com/fe96c8841043f5b8155eec3b36c57657ba9641c914faa-tSgXZ9_fw236", "http://img.hb.aicdn.com/94855caef98e1139411531e2e1496b259a3a030414255-qYlUZf_fw236", "http://img.hb.aicdn.com/b84fc8c7a532fb5b3a5298c8052b9e097c8433e860438-shRN54_fw236", "http://img.hb.aicdn.com/3f9f531759a6e4f7f738c85bab50525d6c26fbad2070d-AFiuSU_fw236", "http://img.hb.aicdn.com/f6c625b54b8328ceddff1c55d5a00007c438c6f796f18-OEhi5v_fw236", "http://img.hb.aicdn.com/08b54d5b5218c9330d31376f19a0a8144dc04ca95e2e8-76uT35_fw236", "http://img.hb.aicdn.com/5f73909e54bd694712a4f1bf546ecc37bca074db5db84-rsAmm6_fw236", "http://img.hb.aicdn.com/762ccfa3858969791118aad706887d9f76f00ff57f5d1-wUDVmJ_fw236", "http://img.hb.aicdn.com/7303810ccf5fa649db989686df95e9ef846aa7e551a92-z1cKrX_fw236", "http://img.hb.aicdn.com/eea447364bee2a5cec7f6a1b06df3820e97882463251b-ZWRRgB_fw236", "http://img.hb.aicdn.com/c54df45fba647c28238ede4ebc825d616ce4b8092cb8c-qAUHgv_fw236", "http://img.hb.aicdn.com/e1d40f4beca1178aca902fcea1b17ebe554bc0728605d-Xud8IC_fw236", "http://img.hb.aicdn.com/38e5fa0a3bbfcfc6acd556ed303a8457af59acdace12f-IWHdZi_fw236", "http://img.hb.aicdn.com/1f7ba3a69495956cbba101f7f04aab85a65107b036f2c-AELCaK_fw236", "http://img.hb.aicdn.com/5a869e408d5ae610cf3aed479cf248ba1c6ac1674e4fc-SLVhoo_fw236", "http://img.hb.aicdn.com/901fff0b07b7c28f6076d788bca5a7871f5521ca6cda8-lUMBNj_fw236", "http://img.hb.aicdn.com/725d96417c2148d03b35424454a244ea9bff80e47d425-nH8YMS_fw236", "http://img.hb.aicdn.com/4fe7519dca2b2828d2e1ed4dd3dc45177d3f782e17688-xnEHle_fw236", "http://img.hb.aicdn.com/8153cdbcde57041ee4a9e6eaf1582b3f9bbff4b550023-gmqwsq_fw236", "http://img.hb.aicdn.com/5f93b0ebdfdedae03fcaaa6e312ae638ed09c6edb3210-VMLPks_fw236", "http://img.hb.aicdn.com/2a4e698aaa7d1817d52dd172aeda54a6e7a319f9894e7-L7DdFX_fw236", "http://img.hb.aicdn.com/87dad464f1d7a12aca4a9d537455c5a48ba763941a4403-QRNICb_fw236", "http://img.hb.aicdn.com/e614eb82ef8f1fb809704b7b18e4a14bb8692788144c2-lbKgbD_fw236", "http://img.hb.aicdn.com/23c49e8ce3b44bea20f7dbf861c6ba916bc497bb26193-AD94Km_fw236", "http://img.hb.aicdn.com/bb6460808cb694a84995716d1d5924ca9a4331ad1b614-xomxvo_fw236", "http://img.hb.aicdn.com/46fdc28bb3442090fa090e3e46f9839ccf1cb83a2d32f-vr95n0_fw236", "http://img.hb.aicdn.com/c1d1554c408f0d597594be7cffece8e06612f4cc1f229-BM4UKl_fw236", "http://img.hb.aicdn.com/e709eacb97674c749d5d4f61029b86884c218d29200d9-IZPTsV_fw236"]

export default {
  name: 'app',
  components: {
    Bricks,
    demoHeader,
    dataLoader
  },
  data () {
    const waterfallData = itemFactory.get(30)
    return {
      msg: 'Welcome to Your Vue.js App',
      loading: true,
      waterfallData,
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
    show (data) {
      console.log(data)
    },
    getImg (index) {
      return huabanImages[index] 
              ? huabanImages[index]
              : huabanImages[Math.floor(Math.random() * (huabanImages.length - 1))] 
    },
    refresh () {
      this.waterfallData = itemFactory.get(30)
      this.$next(() => this.$refs.bricks.pack())
    },
    add () {
      this.loading = true
      const data = itemFactory.get(30)
      //this.waterfallData = 
      this.waterfallData.push(...data)
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
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.waterfall {
    background: #f1f4f9;
    padding: 6rem 4rem;
}
.box {
  border: 1px solid #ccc;
  box-shadow: 0 2px 3px 1px rgba(0,0,0, .2);
  background: #fff;
}
.box > img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
.card:hover {
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, .15);
}
.loading {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  margin-left: -30px;
  transition: all .3s;
  transform: translate3d(0, 150%, 0);
}
.loading.active {
  transform: translate3d(0, 0, 0);
}
.go-top {
  position: fixed;
  right: .5rem;
  bottom: .5rem;
  padding: .2rem .3rem;
  background: rgba(255, 255, 255, .8);
  box-shadow: 1px 1px 3px rgba(0, 0, 0, .15)
}
.go-top:hover {
  background: rgba(255, 255, 255, 1);
}
</style>
