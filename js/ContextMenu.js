class ContextMenu {
  constructor (options) {
    this.attrs = {
      menus: []
    }
    this.$el = null

    this.attr(options)
        .render()
        .addEventListeners()

    return this
  }

  get (prop) {
    return this.attrs[prop]
  }

  set (prop, val) {
    this.attrs[prop] = val

    return this
  }

  attr () {
    const args = arguments
    const prop = args[0]
    const val = args[1]

    switch (args.length) {
      case 1:
        if (typeof prop === 'string') {
          return this.get(prop)
        } else {
          if (Object.prototype.toString.apply(prop) === '[object Object]') {
            Object.assign(this.attrs, prop)
          }
        }
        break
      case 2:
        this.set(prop, val)
        break
    }

    return this
  }

  closest (el, selector) {
    const DOCUMENT_NODE_TYPE = 9

    // 忽略 document，因为事件冒泡最终都到了 document
    while (el && el.nodeType !== DOCUMENT_NODE_TYPE) {
      if (typeof el.matches === 'function' && el.matches(selector)) {
        return el
      }
      el = el.parentNode || el.parentElement
    }
  }

  render () {
    const menus = this.attr('menus')
    const $body = document.body

    this.$el = document.createElement('div')
    this.$el.className = 'context-menu hidden'

    this._render($body, this.$el, menus)

    return this
  }

  _render ($root, $menu, menus) {
    const $list = document.createElement('ul')
    const $fragment = document.createDocumentFragment()

    $list.className = 'context-menu-list'

    menus.forEach((menu) => {
      const $li = document.createElement('li')
      const children = menu.children

      if (menu.isDivider) {
        $li.className = 'context-menu-divider'
      } else {
        const $label = document.createTextNode(menu.label)
        let $icon

        $li.setAttribute('data-action', menu.name)
        $li.className = 'context-menu-li'
        $li.action = menu.action

        if (menu.icon) {
          $icon = document.createElement('span')
          $icon.className = 'context-menu-icon'
          $icon.innerHTML = `<i class="fa fa-${menu.icon}"></i>`

          $li.appendChild($icon)
        }

        $li.appendChild($label)

        if (children && children.length > 0) {
          const $subMenu = document.createElement('div')
          const $arrow = document.createElement('i')

          $arrow.className = 'fa fa-angle-right context-menu-arrow'
          $subMenu.className = 'context-menu context-sub-menu'
          $li.appendChild($arrow)

          this._render($li, $subMenu, children)
        }
      }

      $fragment.appendChild($li)
    })

    $list.appendChild($fragment)
    $menu.appendChild($list)
    $root.appendChild($menu)

    return this
  }

  reload (options) {
    this.destroy()
        .attr(options)
        .render()
        .addEventListeners()

    return this
  }

  destroy () {
    const $el = this.$el
    const $doc = document
    const $body = $doc.body

    $el.removeEventListener('click', this._onAction)
    $doc.removeEventListener('contextmenu', this._onShow)
    $doc.removeEventListener('click', this._onHide)

    this.$el = null
    this.attrs = {
      menus: []
    }

    $body.removeChild($el)

    return this
  }

  position (left, top) {
    const $el = this.$el
    const height = $el.offsetHeight
    const width = $el.offsetWidth
    const viewportHeight = document.documentElement.clientHeight
    const viewportWidth = document.documentElement.clientWidth

    if (left + width > viewportWidth) {
      left -= (width + 5)
    } else {
      left += 5
    }

    if (top + height > viewportHeight) {
      top -= (height + 5)
    } else {
      top += 5
    }

    $el.style.cssText = `left:${left}px;top:${top}px`

    return this
  }

  toggle () {
    if (this.$el.classList.contains('hidden')) {
      this.show()
    } else {
      this.hide()
    }

    return this
  }

  show () {
    this.$el.classList.remove('hidden')

    return this
  }

  hide () {
    this.$el.classList.add('hidden')

    return this
  }

  addEventListeners () {
    const $el = this.$el
    const $doc = document

    $el.addEventListener('click', this._onAction.bind(this), false)
    $doc.addEventListener('contextmenu', this._onShow.bind(this), false)
    $doc.addEventListener('click', this._onHide.bind(this), false)

    return this
  }

  _onAction (evt) {
    const $menu = this.closest(evt.target, '.context-menu-li')
    const action = $menu.action

    if (action) {
      action.apply(this, [
        evt,
        $menu
      ])
    }

    evt.stopPropagation()
    evt.preventDefault()

    return this
  }

  _onShow (evt) {
    const x = evt.clientX
    const y = evt.clientY

    this.show().position(x, y)

    evt.stopPropagation()
    evt.preventDefault()

    return this
  }

  _onHide () {
    this.hide()

    return this
  }
}
