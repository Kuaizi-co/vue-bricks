/**
 * Scroll Event Emitter
 * 
 * @export
 * @class ScrollEmitter
 */
export default class ScrollEmitter {
  constructor (el, props) {
    this.$el = el || window
    this.props = Object.assign({
      offset: 0
    }, props)
    this._eventList = []
    this._initEvent()
  }
  _initEvent () {
    const scrollFn = () => this.calcReach()
    this.$el.addEventListener('scroll', scrollFn, false)
  }
  calcReach () {
    let el = this.$el === window ? (document.body || document.documentElement) : this.$el
    const scrollHeight = el.scrollHeight
    const scrollTop = el.scrollTop
    const viewHeight = window.innerHeight
    if (scrollTop + viewHeight + this.props.offset >= scrollHeight) {
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
  destroy () {
    const scrollFn = () => this.calcReach()
    this.$el.removeEventListener('scroll', scrollFn, false)
  }
}
