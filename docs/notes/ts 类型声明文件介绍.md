# 🎢 Typescript 类型声明文件

> 关于`typescript`一些类型声明文件的介绍，介绍如何正确使用类型声明文件，在`typescript`项目中获得类型安全的开发体验。
> `typescript`类型声明文件是一种特殊的文件，用于描述 `javascript` 模块、库或代码中各种变量、函数和对象的**类型信息**。这对于在 `typescript` 项目中使用 `javascript` 库或模块以及在 `typescript` 中与 `javascript` 交互非常重要。

## 🌾 @types(`node_modules/@types`)

> `@types`是指 typescript 类型声明文件的命名空间。当在使用第三方库或框架时，可能需要相应的类型声明文件来帮助 typescript 进行类型检查和推导。
>
> `@types`命名空间是**由 typescript 社区维护的一个公共存储库**，它包含了许多常见第三方库的类型声明文件。这些类型声明文件具有与相应库的 API 和功能对应的类型定义，能够在 typescript 项目中获得类型安全的开发体验。

### `@types/xxx`

在使用某个第三方库时，可以搜索该库的名称加上`@types`关键字，_以查找是否存在该库的类型声明文件_。例如，在使用`lodash`库，可以搜索`@types/lodash`来查找并安装与之对应的类型声明文件。

通过引入相应的类型声明文件，`typescript` 将能够识别使用的第三方库的类型，并提供相关的类型检查和代码补全功能，帮助避免一些潜在的类型错误。

> ⚠️ _并不是所有的三方库都有相应的 `@types` 类型声明文件_。如果找不到某个库的类型声明文件，可能需要开发者**手动为该库编写类型声明文件，或者查看社区是否已经有人为该库编写了类型声明文件。**

### `typescript`如何识别使用的第三方库的类型

在添加相应的第三方库**导入语句**时，例如，如果要在代码中使用`lodash`，可以这样导入它： `import * as _ from 'lodash'`

现在，**typescript 会自动识别对第三方库的导入(使用导入语句时)**，并在代码中提供相应的类型检查和自动补全功能。这得益于引入了与该库对应的 `@types` 类型声明文件。

> **🪣 Details**
>
> 在上面的导入语句中注意到，在不使用 `typescript` 情况下 `import * as _ from 'lodash'` or `import _ from 'lodash'`都是没问题的，但是在使用 typescript 时，`import _ from 'lodash'` 语句的导入确产生 typescript 错误警告，至于为什么在文章后续作出解释

## 🪼 `typescript` 如何自动识别第三方库类型

<b style="color:red">在`typeScript`中，它能够自动识别第三方库的类型是因为**`typeScript`支持模块解析和类型推导的功能。**</b>

- 内置类型声明： `typescript` 内置了许多 `javascript` 标准库的类型声明，例如 Array、Promise、Object 等。这些内置类型声明可以直接在项目中使用，不需额外的安装或配置。
- 类型声明文件的命名约定(.d.ts)： **`typescript` 会根据命名约定查找类型声明文件**。当引入一个第三方库时，typescript 会查找与该库同名的类型声明文件。例如，如果使用 axios 库，typescript 会尝试查找名为 axios.d.ts 的类型声明文件。

  当在代码中使用`import`语句导入一个第三方库时，`typescript`会*尝试根据模块解析规则去查找相应的模块文件*。**通常情况下，`typescript`会查找*与导入路径匹配的`.d.ts`类型声明文件*来获取类型信息。**
  ![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308212053112.png)

- typescript 编译选项 "typeRoots" 和 "types"： 在 typescript 的配置文件（tsconfig.json）中，**可以配置 typeRoots 和 types 选项来指定类型声明文件的搜索路径。typeRoots 允许指定额外的类型声明文件根目录，而 types 则是一个数组，包含了想引入的全局类型声明的模块名**。typescript 将会在这些路径中搜索类型声明文件。
  ![](https://cdn.jsdelivr.net/gh/iamsyygo/Store@master/image/202308212100911.png)

- 类型声明文件合并：这指的是可以将多个类型声明文件合并为一个，从而在不破坏原始库的类型声明的情况下，为其添加额外的类型信息。
- 同时意味着，当安装了某个第三方库时，`typescript`会自动查找并识别与该库对应的`@types`类型声明文件（如果有的话），并使用它来提供类型检查和补全.

- 如果某个第三方库没有官方的`@types`类型声明文件，或者使用的是一个自定义的库，这时候可以手动编写类型声明文件(`.d.ts`)来为该库添加类型信息。

  手动引入类型声明文件，可以按照以下步骤进行：

  1、 遵循规范创建一个名为`<library-name>.d.ts`的文件

  2、 **使用*`declare module`*语法来声明该库的类型**

  ```typescript
  declare module 'library-name' {
    // 在这里添加类型声明(包括接口、类、函数、常量等)
    // 模块内的类型声明
    export function xxx(): void
    export interface yyy {
      // 接口定义
    }
  }
  ```

  3、 在`declare module`块中，可以编写适合该库的类型声明。**这可能包括接口、类、函数、常量等**

  4、 注意确保`tsconfig.json`的**include 配置中是否包含该声明文件**

  请注意，手动编写类型声明文件需要一定的类型推断和理解库的功能的能力。对于复杂的库或具有大量功能的库，编写类型声明可能会变得繁琐或困难。在这种情况下，可以查看社区是否已经有其他人为该库编写了类型声明文件。

> **🪂 `typescript`在解析导入语句`import * as _ from 'lodash'`时会检查以下几个位置**
>
> - 当前模块文件所在目录路径匹配下是否存在与导入路径匹配的`.ts`或`.tsx`文件，可以在包的 `package.json` 中配置 `types` 或 `typings` 字段来指定入口文件
> - 如果第一步没有找到匹配的文件，则会检查当前文件所在目录下是否存在与导入路径匹配的`.d.ts`文件
> - 如果前两步都没有找到匹配的文件，则会检查`node_modules/@types`目录下是否存在**与导入库名称匹配的`.d.ts`文件**

## 🛟 `declare`

> `declare`是一个关键字，用于告诉编译器某个标识符（如变量、函数、命名空间等）的类型信息。它<b style="color:red">用于声明全局变量、全局函数、命名空间等的类型，使得`typescript`能够正确地理解和推断这些标识符的类型。</b>
>
> ta 的作用是**在编译时提供类型声明**，而不会生成实际的`javascript`代码

> <b style="color:red">`declare module` 是用于声明模块或库的类型声明的特定语法。</b>需要使用 `declare module` 语法来声明一个模块，以提供该模块的类型声明。使用 `declare module` 语法时，**可以指定模块的名称，然后在模块的内部添加适合该模块的类型声明。**

**使用 `declare` 关键字 or 不使用 `declare module`**

当使用 `declare` 关键字而不使用 `declare module` 时，通常是**在全局范围内声明全局变量、全局函数或全局命名空间的类型**。这些类型声明告诉 `typescript`编译器有关全局标识符的类型信息，使得`typescript`能够正确地理解和推断它们的类型。

```typescript
declare const gv: string
declare function gf(): void
declare namespace gnspace {
  // 命名空间内的类型声明
}
```

### `.d.ts`接口、函数、常量等(**_全局的类型声明_**)

> **🀄️ `declare module`**
>
> - 通过在 `declare module` 中*定义接口*，可以描述模块或库的**结构和功能**
> - 在 `declare module` 中*声明函数*可以描述模块导出的**函数的签名和参数类型**
> - 通过在 `declare module` 中*声明常量*，可以描述模块**导出的常量的类型和值**

上述中使用`declare module`是用于在**特定的模块或库范围内提供类型声明**。使用 `declare module` **可以为模块或库提供更具体和封闭的类型定义**

而`declare`关键字用于提供类型声明，定义一个全局的类型声明如下：

```typescript
declare const foo: string
```

🍟 当需要全局定义一个 foo 变量类型，且**它的类型为某个三方库的类型**时：

```typescript
// 假设是在已经安装 pnpm add HelloWorld 第三方库并且拥有类型声明文件下，这个类型是从第三方库的类型声明文件中获取的
declare const foo: HelloWorld

// path: foo.d.ts
```

然后就可以在整个项目中使用`foo`变量，并获得类型检查和补全的支持

> 🛵 类型声明(`declare`)，不需要显式地导入。当使用 `declare` 关键字来声明一个变量时，它的类型会被视为全局可见，而不需要通过导入来获取该类型。
>
> 假设`HelloWorld`是在项目中安装的第三方类型声明文件**`@types/hello-world`**中定义的类型，**`typescript`编译器会自动识别该类型声明文件，并将其应用于整个项目，无需显式导入**。
>
> 因此，在全局范围内，无需显式导入`HelloWorld`，而是*通过正确安装和配置类型声明文件*，**`typescript`将自动找到并应用相应的类型**。
>
> 总之，对于大多数情况下，当安装了第三方库和相应的类型声明文件时，`typescript`会自动识别和应用这些类型声明，而不需要手动导入(`path`这些 node 模块)

> **🍓 然而，有些情况下，特别是在一些复杂的库或声明文件中，可能需要手动导入类型声明。这可能是因为类型声明文件的导出方式、模块化方式或者类型定义的特殊性造成的。**

> **🤿 解释 `Why use as * in import`**
>
> - 默认导出：如果第三方库的类型声明文件使用默认导（`export default`），需要使用`import`语句来导入并命名该默认导出的类型 --- _默认情况_，不需要使用`* as`语法
>
> - 命名空间（Namespace）：**如果第三方库的类型声明文件使用了命名空间**，需要使用`import`语句来导入该命名空间下的类型，并且需要使用`* as xxx`方式来重命名该模块，例如 `import * as _ from 'lodash'`
>
> **这是因为命名空间下的类型是通过该命名空间访问的，而不是直接导出的。_使用 `import _ as`语法将整个命名空间导入为一个别名（例如`ModeXyy`）\*，这样就可以使用该别名来访问命名空间下的类型。**
>
> 需要注意的是，`import * as` 语法只适用于命名空间的导入，而不适用于默认导出或其他导出形式。
>
> - 部分按需导入：有些类型声明文件可能仅导出部分类型，而不是全部。在这种情况下，需要使用`import`语句来导入需要的特定类型。
>
>   ```typescript
>   import type { yyy, xxx } from 'library-name'
>   ```
>
> - **全局变量或全局命名空间：如果第三方库在全局范围内声明了变量或命名空间，_并且没有提供对应的类型声明文件_，可能需要手动编写类型声明文件，_并在项目中引入该类型重新声明文件_。**这也是为什么需要在使用 element-plus 时需要导入重新声明类型文件。
>
>   ```typescript
>   // path: shims-xxx.d.ts
>   import type { yyy, xxx } from 'shims-xxx'
>   import * as X from 'shims-xxx'
>   declare module 'shims-xxx' {
>     export const yyy: yyy
>     // Re-export the original types
>     export = X
>
>     // or
>     namespace additionalTypes {
>       interface xxx {
>         // ...
>       }
>       interface yyy {
>         // ...
>       }
>     }
>   }
>   ```

## 🌋 /// \<reference types="xxx 文件" /\>

> 在 Vite 工程中可以看到这样一个文件`vite-env.d.ts`，其中有这样一个内容`/// <reference types="vite/client" />`
>
> 这是一种**_用于引用类型声明文件的特殊注释语法_，它通常用于在`typescript`中引入全局类型声明或扩展类型声明。**
>
> 使用 vite 也是，可以看到`vite/client`三方库中的类型文件声明了许多模块文件类型的类型声明
>
> 表示希望引入位于 `vite/client` 文件中的类型声明。这个注释**告诉`typescript`编译器在编译过程中查找并使用该类型声明文件中定义的类型**。这样可以*确保在编译过程中包含特定的文件，无论它们是否被直接导入到其他文件中*

⚠️ 需要注意的是，`/// <reference` 注释的使用已经不再推荐，特别是在较新的`typescript`版本中。通常，使用模块导入语法（`import` 或 `export`）可以更好地管理文件的依赖关系和类型声明。
