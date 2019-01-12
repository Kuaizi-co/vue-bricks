<template>
  <router-view />
</template>

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
  width: 100%;
  overflow: hidden;
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
    position: relative;
    background: #f1f4f9;
    padding: 6rem 4rem;
    /* hidden loading */
    overflow: hidden;
    min-height: 100vh;
}
@media screen and (max-width: 640px) {
  .waterfall {
    padding: 6rem .5rem;
  }
  .ex-header {
    padding: 0!important;
  }
  .ex-header-logo {
    display: none;
  }
  .ex-header sub {
    display: none;
  }
  .ex-header aside a:nth-child(3n) {
    display: none;
  }
}
@media screen and (max-width: 320px) {
  .ex-header aside a:nth-child(2n + 1) {
    display: none;
  }
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
  position: absolute;
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
  right: 1rem;
  bottom: 1rem;
  padding: .3rem;
  border-radius: 4px;
}
.go-top:hover {
  background: rgba(255, 255, 255, 1);
}
</style>