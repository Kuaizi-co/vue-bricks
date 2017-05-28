/**
 * Scroll Event Emitter
 * 
 * @export
 * @class ScrollEmitter
 */
let scrollFn = () => {}
export default class ScrollEmitter {
  constructor (el, props) {
    this.$el = el || window
    this.props = Object.assign({
      offset: 0
    }, props)
    this._eventList = []
    this._initEvent()
    this.lazyResolve = false
  }
  _initEvent () {
    scrollFn = () => this._raqScroll()
    this.$el.addEventListener('scroll', scrollFn, false)
  }
  _raqScroll () {
    window.requestAnimationFrame(() => this.calcReach())
  }
  calcReach () {
    if (this.lazyResolve) return
    let el = this.$el === window ? (document.body || document.documentElement) : this.$el
    const scrollHeight = el.scrollHeight
    const scrollTop = el.scrollTop
    const viewHeight = window.innerHeight
    if (scrollTop + viewHeight + this.props.offset >= scrollHeight) {
      this.lazyResolve = true
      this.fire()
    }
  }
  on (name, fn) {
    this._eventList.push({ name, list: [fn] })
  }
  off (name, fn) {
    if (!fn) {
      this._eventList = this._eventList.filter(ev => ev.name !== name)
    } else {
      this._eventList = this._eventList.filter(ev => {
        if (ev.name === name) {
          ev.list = ev.list.filter(evFnItem => evFnItem !== fn)
        }
        return ev
      })
    }
  }
  fire (name) {
    let eventList = this._eventList
    if (name) eventList = eventList.some(item => item.name === name)
    eventList.forEach(item => {
                      item.list.forEach(fn => fn())
                    })
  }
  lazyDone () {
    this.lazyResolve = false
  }
  destroy () {
    this.$el.removeEventListener('scroll', scrollFn, false)
  }
}
