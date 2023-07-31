# 🛥️ el-collapse-transition 看一看

> 对 el-collapse-transition 的源码进行分析，看看它是如何实现一个不定高度的过渡效果的。

## 🥽 el-collapse-transition 的使用

```vue
<template>
  <el-collapse-transition>
    <div v-show="show" style="width: 100px; height: 100px; background: red;"></div>
  </el-collapse-transition>
</template>

import 'element-ui/lib/theme-chalk/base.css' import ElCollapseTransition from
'element-ui/lib/transitions/collapse-transition'
```

## 🛵 el-collapse-transition 的源码

```javascript
import { addClass, removeClass } from 'element-ui/src/utils/dom'

// 定义一个类，用于绑定到transition组件的on属性上，用于定义动画的各个阶段
class Transition {
  // 定义子元素进入过渡的开始状态，动画开始之前的状态
  beforeEnter(el) {
    addClass(el, 'collapse-transition')
    if (!el.dataset) el.dataset = {}

    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom

    el.style.height = '0'
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  }

  // 定义动画进入结束过程中的状态
  enter(el) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }

    el.style.overflow = 'hidden'
  }

  // 用于动画进入结束之后的状态的修饰，动画结束之后的状态，清除一些样式
  afterEnter(el) {
    // for safari: remove class then reset height is necessary
    removeClass(el, 'collapse-transition')
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  }

  // 定义子元素离开过渡的开始状态，动画开始之前的状态
  beforeLeave(el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  }

  // 定义动画离开结束过程中的状态
  leave(el) {
    if (el.scrollHeight !== 0) {
      // safari:添加类设置高度后,立即设置高度为0,会导致动画失效
      addClass(el, 'collapse-transition')
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
  }

  // 用于动画离开结束之后的状态的修饰，动画结束之后的状态，清除一些样式
  afterLeave(el) {
    removeClass(el, 'collapse-transition')
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
}

export default {
  name: 'ElCollapseTransition',
  functional: true,
  render(h, { children }) {
    const data = {
      on: new Transition(),
    }

    return h('transition', data, children)
  },
}
```

```css
.collapse-transition {
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding-top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    padding-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 🌴 beforeEnter

```javascript
beforeEnter(el) {
  addClass(el, 'collapse-transition')
  if (!el.dataset) el.dataset = {}

  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom

  el.style.height = '0'
  el.style.paddingTop = 0
  el.style.paddingBottom = 0
}
```

> **用于保存元素原有于高度相关的样式，初始化元素状态**
>
> - 在动画开始之前，给元素添加一个拥有过渡效果的类名
> - 保存元素原有的 paddingTop 和 paddingBottom
> - 动画开始之前，处于不可见状态，高度为 0，paddingTop 和 paddingBottom 为 0

### 🌻 enter

```javascript
enter(el) {
  el.dataset.oldOverflow = el.style.overflow
  if (el.scrollHeight !== 0) {
    el.style.height = el.scrollHeight + 'px'
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  } else {
    el.style.height = ''
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }

  el.style.overflow = 'hidden'
}
```

> **定义动画进入结束过程中的状态**
>
> - 保存元素原有的 overflow，用于在动画结束之后恢复，**overflow 为 hidden，防止动画过程中出现滚动条**
> - 初始化时，元素的高度为 0，此时通过 scrollHeight 获取元素的实际高度，因为 scrollHeight 会自动计算元素的 padding 和 border，所以此时元素的高度为实际高度 + paddingTop + paddingBottom

### 🌲 afterEnter

```javascript
afterEnter(el) {
  // 在 safari 中，需要先移除类名，然后再重置高度
  removeClass(el, 'collapse-transition')
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
}
```

> **用于动画进入结束之后的状态的修饰，动画结束之后的状态，清除一些样式**
>
> - 在 safari 中，需要先移除类名，然后再重置高度。移除初始化设置的类名
> - 重置高度，此时元素的高度为实际高度 + paddingTop + paddingBottom

### 🌳 beforeLeave

```javascript
beforeLeave(el) {
  if (!el.dataset) el.dataset = {}
  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom
  el.dataset.oldOverflow = el.style.overflow

  el.style.height = el.scrollHeight + 'px'
  el.style.overflow = 'hidden'
}
```

> **定义子元素离开过渡的开始状态，动画开始之前的状态**
>
> - 保存元素原有的 paddingTop 和 paddingBottom
> - 保存元素原有的 overflow，用于在动画结束之后恢复，**overflow 为 hidden，防止动画过程中出现滚动条**
> - 不需要清除元素的 paddingTop 和 paddingBottom
> - 设置元素的高度为 scrollHeight，此时元素的高度为实际高度 + paddingTop + paddingBottom

### 🌵 leave

```javascript
leave(el) {
  if (el.scrollHeight !== 0) {
    // safari:添加类设置高度后,立即设置高度为0,会导致动画失效
    addClass(el, 'collapse-transition')
    el.style.height = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  }
}
```

> **定义动画离开结束过程中的状态**
>
> - 在 safari 中，需要先添加类名，然后再重置高度。添加一个拥有过渡效果的类名
> - 重置高度，此时元素的高度为 0，paddingTop 和 paddingBottom 为 0

### 🌿 afterLeave

```javascript
afterLeave(el) {
  removeClass(el, 'collapse-transition')
  el.style.height = ''
  el.style.overflow = el.dataset.oldOverflow
  el.style.paddingTop = el.dataset.oldPaddingTop
  el.style.paddingBottom = el.dataset.oldPaddingBottom
}
```

> **用于动画离开结束之后的状态的修饰，动画结束之后的状态，清除一些样式**
>
> - 移除初始化设置的类名
> - 重置高度，此时元素是隐藏状态，所以不需要设置高度
> - 重置 paddingTop 和 paddingBottom
> - 重置 overflow

## 🚀 总结

> 一个元素如果是不定高或者 auto，它是无法实现过渡效果的，因为它的高度是由内容撑开的，所以无法计算出它的高度，所以无法实现过渡效果。或者可以通过 grid 布局来实现，但是 grid 布局的兼容性不是很好。
> 主要是通过 vue 的 transition 组件，配合组件的生命周期钩子，通过获取元素的 scrollHeight，保存元素原有的 paddingTop 和 paddingBottom，来实现一个不定高度的过渡效果。
