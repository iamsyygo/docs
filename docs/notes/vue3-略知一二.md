# 🏟️ vue3 略知一二

## 📒 Slot

- prop 设计思想是传递**状态数据**
- slot 设计思想是传递**DOM 节点**
- 子组件虽为调用者预留 slot，但是 **slot 的作用域依然属于父组件，所以可以访问到父组件内的所有状态**
- 插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的

> vue 3.3 新的 `defineSlots` 宏可用于声明预期的插槽及其各自的预期插槽道具，更好的类型推断
>
> ```typescript
> defineSlots<{
>   default: ({ msg: string }) => VNode
>   footer?: (props: {}) => any
> }>()
> ```
>
> `defineSlots`只接收一个泛型参数(类型参数)，不接受运行时参数

## 👣 Ref 获取 DOM

**获取多个 Ref DOM 可以插入一个数组，或者是一个函数(回调函数，每次调用传入 DOM 为参数)**

> - 数组：当在 v-for 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素
> - 函数：ref 传入一个函数，每次调用传入 DOM 为参数
>
>   在每次组件更新时都被调用，当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数是 null

```javascript
// 获取多个 DOM - 数组
const itemRefs = ref([])

// 获取多个 DOM - 函数
const itemRefs = el => {
  console.log(el)
}

;<template>
  <ul>
    <li v-for='item in list' ref='itemRefs'>
      {{ item }}
    </li>
  </ul>
</template>
```

**组件的类型声明：**

```typescript
// typeof 表示获取组件的类型
// InstanceType 表示获取组件的实例类型
ref<InstanceType<typeof 组件> | null>(null)
```

## 📘 对象引用与 VUE3 响应式

**为一个数据创建响应式时，若原数据为复杂类型数据，此时并不是对原始数据的拷贝，而是引用，改变响应式的数据后，原始数据也会被修改**

不推荐使用 reactive() 的泛型参数，因为在处理深层次的 reactive 时，对于字段是 ref 类型数据时解包的返回值与泛型参数的类型不同

```javascript
const n = ref(1)

const r = reactive < { n: number } > { n }
```

**setup 语法糖中可直接使用 await ，不需要定义 async，setup 会自动变成 async setup**

## 🌏 Watch 细节

**可以是一个 getter 函数**

```javascript
watch(
  () => x.value + y.value,
  newValue => {
    // x + y = newValue
  },
)
```

> 🔥 **不可以直接的监听一个 reactive 响应式对象上的字段**
>
> **响应式对象通常是通过依赖追踪来实现，直接监听一个响应式对象的字段并不是一个常见的做法，因为它破坏了框架所建立的依赖追踪机制，可以传入一个 getter 函数来让 watch 监听这个函数**
>
> **如果传入的是整个 reactive 响应式对象，默认则是 deep 深层(🌻)的隐式地监听，需要注意的是它的 newVal 和 oldVal 值都是相等的，因为它是一个引用类型的数据**

```javascript
const state = reactive({
  value: 0,
})

// error
watch(state.value, val => {
  console.log(`value is: ${val}`)
})

// yes - getter 函数
watch(
  () => state.value,
  val => {
    console.log(`value is: ${val}`)
  },
)

// 整个 reactive 响应式对象，默认 deep 深层(🌻)的隐式地监听
watch(state, (newValue, oldValue) => {
  console.log('newValue', newValue)
  console.log('oldValue', oldValue)
})
```

> **🛟 总结：**
>
> `watch`监听的来源可以是以下几种：
>
> - 一个 ref，它是一个浅层的监听(ref 本身是用于包装基本类型的，所以不会进行深层的监听)
> - 一个 reactive 响应式对象，默认是 deep 深层的隐式地监听，需要注意的是它的 newVal 和 oldVal 值都是相等的，因为它是一个引用类型的数据
> - 一个 getter 函数，它是一个浅层的监听，只在此函数的返回值变化时才会触发回调
> - 一个数组，数组中的每一项都是一个监听源，它是一个浅层的监听，只在数组中的每一项变化时才会触发回调
>
> 值得注意的是，当 ref 的值是一个对象时，那么它的 .value 属性就是一个 reactive 响应式对象，所以当监听这样一个 ref 时，由于 ref 是一个浅层的监听，所以只有当 ref 的 .value 属性变化时才会触发回调，而不是当 ref 的 .value 属性中的某个字段变化时才会触发回调。可以使用 getter 函数来解决这个问题
>
> ```typescript
> const state = ref([1, 2, 3])
> // 只有当 state.value 地址变化时才会触发回调
> watch(
>   () => state.value,
>   () => {},
> )
>
> // or
> watch(state, () => {})
>
> /* -------------------- */
>
> // 当 state.value 中的某个字段变化时触发回调
> watch(
>   () => state.value[0],
>   () => {},
> )
>
> // or,有点类似于一个 getter 函数 和 多个监听源数组的结合
> watch(
>   () => [...state.value],
>   () => {},
> )
> ```

## 🍯 watchEffect 细节

**watchEffect 会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。**(记住同步执行)

**需要注意的是，watchEffect 的副作用函数是在同步执行过程中运行收集依赖的，意味着如果在副作用函数内部进行异步操作时，Vue 无法自动追踪异步操作的依赖关系。在处理异步操作时，应该使用 watch 或 computed 等异步侦听函数来处理。**这与`watch`不同，`watch`选项默认情况下是异步执行的。

**简述：当 watchEffect 中存在异步操作，则在异步之后的响应式数据 Vue 都无法追踪进行更新**

- **需要注意的是默认 watchEffect 是在 DOM 更新前、挂载前执行的，所以内部访问 DOM Ref 时可能不存在**🌻
- **需要指明 flush: 'post' 选项，能访问被 Vue 更新之后的 DOM**
- **或者使用** `watchPostEffect` **API**

> **🥽 异步操作创建的监听器**
>
> **在 setup() 或 `<script setup>` 中同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，无需关心怎么停止一个侦听器。**
>
> **但是，用异步回调创建一个侦听器，它不会绑定到当前组件上，必须手动停止它，以防内存泄漏。(包括 watch 与 watchPostEffect)**这是在自定义 hooks 中需要特别注意的细节
>
> ```javascript
> let unwatch = null
> getList().then(()=>{
>   // 异步中创建 watchEffect、watch 需要手动清除
>   unwatch = watch() or watchEffect()
> })
>
>
> // 组件卸载去除
> unwatch()
> ```

## 🏖️ 监听子组件生命周期

通过 `@vnode-updated` or `@vnodeUpdated` 监听

> 与 vue2 不同，在 2 版本中，监听子组件生命周期需要通过 `@hook:updated` 监听

## 🤿 provide | inject 标注类型

**通常依赖注入在多个组件中进行使用，为它标注正确的类型非常重要，vue 为此提供一个接口类型根据** `InjectionKey`**，与** `Symbol`**配合使用**

🏡 同时的也应该为 inject 提供泛型标注，**推荐的做法是将这些泛型的类型编写在同一个文件中，以供其他组件导入使用**

```javascript
provide(key, value)

// 一般使用
provide(options,{value:true})


// ts
const options = Symbol() as InjectionKey<{x:number}>

// 如果 value 位置传入错误类型就会报错提示
provide(options,{value:1})

const data = inject(key)
```

> **🔥 响应性链接**
>
> **如果提供的值是一个 ref 对象，注入进来的也会是该 ref 对象，而不会自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接**
> 这是与 vue2 不同的地方，vue2 中如果直接注入一个 defineProperty 的对象，他们之间是没有响应式链接的。但是可以将响应式进行一层包装，然后注入，这样就可以保持响应式链接，或者在 v2.7 以上版本中使用 `computed` 进行包装注入

> **在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，可以使用工厂函数来创建默认值（与 props 类似）**

**如果不希望数据被子组件修改，仅用于展示，可以使用** [**readonly**](https://staging-cn.vuejs.org/api/reactivity-core.html#readonly) **进行标注**

```javascript
inject(key, defaultValue)

// 类型：{x:number} | 可能是 undefined 🕶
const data = inject < T > 'options'

// 添加默认值
const data = inject < T > ('options', { x: 1 })
```

> **修改值**
>
> **当提供修改注入响应式的数据的方法时，建议尽可能将任何对响应式状态的变更的方法都保持在供给方组件中。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。(配套提供一个修改状态数据的函数，给子组件调用更新数据)**

```javascript
const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation,
})
```

🥥 组合函数

如果组合式函数在有**接收 ref 为参数时**会产生响应式 effect，**请确保使用 watch() 显式地监听此 ref，或者在 watchEffect() 中调用 unref() 来进行正确的追踪。**

**在组合式函数中使用 ref() 而不是 reactive()。**推荐的约定是组合式函数**始终返回一个包含多个 ref 的普通的非响应式对象(使用普通对象进行包裹一层)**，这样该对象在组件中被解构为 ref 之后仍可以保持响应性

```javascript
// x 和 y 是两个 ref
const { x, y } = useMouse()
```

需要注意的是，在组合函数中，**需要在 onUnmounted() 时手动清理副作用**。举例来说，如果一个组合式函数设置一个事件监听器`watchEffect`，它就应该在 onUnmounted() 中被移除。也可以使用一个组合式函数来自动做这些事(手动清理副作用)。

**组合式函数在 `<script setup>` 或 setup() 钩子中，应始终被同步地调用。**

**注意：这个限制是为让 Vue 能够确定当前正在被执行的到底是哪个组件实例，只有能确认当前组件实例，才能够：**

- **将生命周期钩子注册到该组件实例上**
- **将计算属性和监听器注册到该组件实例上，以便在该组件被卸载时停止监听，避免内存泄漏。**

> 🔥 **需要注意的是 `<script setup>` 是唯一在调用 await 之后仍可调用组合式函数的地方。编译器会在异步操作之后自动为你恢复当前的组件实例。**

## 🛵 ref

> 使用 ref 时，会返回一个可变的响应式对象，该对象作为一个**响应式的引用**维护着它【内部的值】，这也就是 ref 名称的来源；它内部的值是在 ref 的 value 属性中被维护的，真正的数据是在 value 中维护，所以在使用时才需要使用 `ref.value` 进行访问。所以在使用双向绑定时，使用 ref 与 reactive 的区别就是，ref 是修改的 value 属性，而 reactive 是修改的对象本身的引用的值，从而 reactive 被直接修改引用丢失响应式，而 ref 修改的是 value 属性，所以不会丢失响应式

> 🌻 解包问题
> 在模板中当直接传入一个 ref 时，会自动解包，但是如果传入的是一个通过一层对象包装的 ref，就不会自动解包，需要手动解包
> 需要注意的是如果是一个 reactive 对象包裹的 ref，也会自动解包
> 值得注意的是，当访问到某个响应式数组或 Map 这样的原生集合类型中的 ref 元素时，不会执行 ref 的解包

> ref 传递一个值之后，如果使用的是基本类型响应式依赖 `Object.defineProperty()` 的 `get()` 和 `set()` ，如果 ref 使用的是引用类型，ref 函数底层会自动将 ref 转换成 reactive;

## 🎢 defineExpose

## 🌽 关于解构

## 🌴 Option Api 的缺陷

如果你正在重构一个 vue2 options Api 项目你会发现，处理相同逻辑关注点的代码被强制拆分在了不同的选项中，位于文件的不同部分，一个状态到处被使用，到处被修改。在一个几百行的大组件中，要读懂代码中的一个逻辑关注点，需要在文件中反复上下滚动，这并不理想。
另外，如果想要将一个逻辑关注点抽取重构到一个可复用的工具函数中，需要从文件的多个不同部分找到所需的正确片段。

## 🛟 关于响应式

> 🌈 何为响应式：
>
> 响应式描述的是 **函数 与 数据** 的关联
> 当数据发生变化时，函数会自动执行，一个数据的变化不会到另一个数据的变化，而是到函数的变化
> vue 中的模板是一个 render 函数，当数据发生变化时，render 函数会自动执行，从而实现视图的更新。
>
> 🚁 以下是 vue 中的响应式函数，它们都会被监控起来，当依赖的数据发生变化时，它们会自动执行
>
> - render 函数：当依赖的数据发生变化时，render 函数会自动执行
> - 计算属性：当依赖的数据发生变化时，计算属性会自动执行
> - watch：当依赖的数据发生变化时，watch 会自动执行
> - watchEffect：当依赖的数据发生变化时，watchEffect 会自动执行
>   需要注意的是这些函数是被监控的函数才会被自动执行，在 vue2 中它们是被 watcher 监控，而在 vue3 中它们是被 effect(reactivity effect)监控的，两者都是 vue 中的响应式系统的核心，内部的函数。
>   响应式数据是一个对象

```javascript
// 不会被监控，这是一个数据与数据的关联，ref 函数不会被监控
// ref 本身不会自动追踪依赖，它只是一个包装器，它的作用是将基本类型数据包装成一个响应式对象
const state = ref(props.initialState)

function update(initialState) {
  const state = ref(initialState)
  watchEffect(() => {
    // 不会被监控，原始类型数据不会被监控
    state.value = initialState
  })
}

// 传入的是一个原始类型数据 initialState
update(props.initialState)

// 解决
function update(props) {
  const state = ref(props.initialState)
  watchEffect(() => {
    // props 是一个响应式对象，当 props.initialState 发生变化时，会自动执行
    state.value = props.initialState
  })
}
update(props)
```

> 🪣 所以在使用 props 时尽可能的使用 props 本身，而不是 props 的某个字段，因为 props 是一个响应式对象，当 props 发生变化时，会自动执行，而 props 的某个字段不是一个响应式对象，可能是一个原始类型数据，原始类型响应式会丢失

> ⛵️ 静态提升
>
> vue3 中的静恋提升（Static Markup) 是一种编译优化技术，它通过在编译阶段分析模板，将静态的部分提升为静态标记，从而减少运行时的开销。
>
> 静态提升通过在编译过程中将模板中的静态内容标记为常量，并将其提升到组件的创建阶段。这意味着在每次组件实例化时，这些静态内容都不需要重新计算，从而提高了渲染的性能。
>
> - 编译时性能优化：静态提升可以减少运行时的模板解析和生成代码的时间，因为编译器能够在编译阶段检测到静态内容，并生成更高效的代码。
>
> - 运行时性能优化：由于静态内容被提升为常量，它们不需要在每次渲染时重新计算，从而减少了不必要的计算开销，提高了组件的渲染性能。

## 🎁 Ref or Reactive

- computed 返回的是一个 ref，所以在模板中使用时，不需要手动解包
- props 返回的是一个 reactive
- ref 传入一个复杂类型数据时，会自动转换成 reactive，`.value` 属性是一个 reactive，外层是一个 ref

**响应式的数据一定是一个对象**

## ⛺️ 小习惯

> 当调用函数时，仅仅需要获取函数的第二个参数的使用，不需要第一个参数时，通常使用 `_`进行占位
>
> ```ts
> setup(_, context)
> ```

> 同样的在 ts 中，不需要某些参数时，通常使用 `_`前缀补充防止报错
>
> ```ts
> handle(_, _context, data)
> ```
