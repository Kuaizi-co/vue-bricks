<template>
  <header class="ex-header" :class="{ fixed }">
    <h1 class="ex-header-logo">{{ config.name }}</h1>
    <sub>v{{ config.version }}</sub>
    <aside>
      <a href="https://www.kuaizi.ai">&copy; 筷子科技</a>
      <a href="https://github.com/Kuaizi-co/vue-bricks#vue-bricks">文档</a>
      <a href="https://github.com/Kuaizi-co/vue-bricks">
        <svg aria-hidden="true" class="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path style="fill: #FFFFFF" fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
      </a>
      <a href="javascript:void(0)" @click="$emit('change')">
        <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2031"><path d="M815.296 697.472 960 485.696l-102.336 0c-13.632-207.232-185.728-371.392-396.416-371.392C241.6 114.304 64 292.352 64 512.064c0 219.52 178.048 397.632 397.696 397.632 98.496 0 188.416-36.032 257.92-95.424l-53.184-68.48C611.712 793.664 540.16 823.04 461.696 823.04c-171.84 0-311.104-139.328-311.104-310.976 0-171.904 139.328-311.168 311.104-311.168 162.88 0 295.936 125.376 309.312 284.8l-100.416 0L815.296 697.472 815.296 697.472z" p-id="2032"></path></svg>
        换一批美眉
      </a>
    </aside>
  </header>
</template>

<script>
  import config from '../../package.json'
  export default {
    data () {
      return {
        config,
        fixed: false
      }
    },
    mounted () {
      const scrollFn = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const height = this.$el.clientHeight
        this.fixed = scrollTop > height
      }
      window.addEventListener('scroll', () => window.requestAnimationFrame(scrollFn), false)
    }
  }
</script>

<style scoped>
.ex-header {
    position: fixed;
    top: 0;
    left: 0;
    display: -ms-flexbox;
    display: flex;
    height: 4rem;
    width: 100%;
    padding: 0 3rem;
    z-index: 999;
    background: #2db7f5;
    box-sizing: border-box;
    color: #fff;
    transition: background .3s;
}
.ex-header.fixed {
  background: rgba(45, 183, 245, .8);
}
.ex-header-logo {
    padding-top: .5rem;
    width: 12rem;
    font-size: 1.8rem;
    line-height: 3.5rem;
}
.ex-header sub {
  padding-top: 1.5rem;
}
.ex-header aside {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: end;
        justify-content: flex-end;
    flex: 1;
}
.ex-header aside > a {
    margin-left: 30px;
    color: #fff;
    text-align: center;
    font-size: .9rem;
    line-height: 3.9rem;
    min-width: 4rem;
    cursor: pointer;
    text-decoration: none;
}
.ex-header aside > a > svg {
  display: inline-block;
  vertical-align: middle;
}
.ex-header aside > a.active,
.ex-header aside > a:hover {
    color: #fff;
    border-bottom: .2rem solid #fff;
}
</style>