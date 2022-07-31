# ByteDanceClass

---

字节跳动暑期班项目-小程序运行时

## 项目原理

1. 视图层
   小程序视图设计使用 JSX，其原理基本参照了神光大大的教程：
   https://github.com/QuarkGluonPlasma/frontend-framework-exercize/
   主要步骤为：
   - babel 使用 react 的 preset 翻译为 render function
   - 根据 render function 返回的 vdom 进行渲染（方法基本参照神光）
   - 利用 render function 添加自定义组件（方法基本参照神光）
   - 添加有 diff 功能的 patch 渲染，并通过自定义组件的状态来控制（方法基本参照神光）
2. 自定义组件
   通过 DSL 提供的组件，可以利用组件的预设事件和生命周期来控制逻辑，并防止原生组件造成的安全问题
   利用 render function，我们可以创建自定义组件以供使用，组件的实现基本参照神光
   当前仅实现了两个组件：

   - 神光教程中的 List 组件，对其进行了事件封装和双线程改造
   - View 组件，代替 div，并添加 show 选项控制是否渲染显示

   针对小程序的需求，需要对组件设置自定义事件
   事件通过发布-订阅模式创建，每一类自定义事件均对应一个发布-订阅模式类
   自定义组件的状态改变函数订阅事件，而事件的发布则根据是否会有安全问题，由前端交互直接发布，或由前端交互发送到逻辑层后，由逻辑层返回的信息来控制发布。

3. 逻辑层
   小程序逻辑设计则参考主流的双线程方案，直接通过 Web Worker 创建 logic.js 的逻辑线程
   视图层与逻辑层通过 JSON 格式传递信息
   目前 JSON 格式设置的信息主要为：自定义事件名、组件 id、组件状态改变值等
   原则上，我们期望逻辑层仅处理自定义组件发生的事件

4. 还缺少什么
   目前框架基本完善，但距离能够使用的小程序框架还有很远的距离
   目前主要的问题和未来改进主要为：
   - 自定义组件及其功能过少
     而不使用自定义组件，虽然原则上支持 JSX 语法，但这不仅违背小程序安全原则，而且 JSX 写成的视图层只能用于第一次渲染时，之后的重新渲染实际都是自定义组件状态改变进行的 patch，但是自定义组件又过少...
     之前我使用了一种技术方案，将 JSX 渲染放入循环中，每次渲染均是删除所有 dom 数中元素重新渲染，但这样不仅效率低，而且无法用于安全需求高的小程序。该框架需要的还是更多的自定义组件、更多的自定义事件。类似 wxml，提供大部分常用 html 组件的封装平替，并提供属性控制的条件渲染、点击事件等功能。并进一步封装双线程的沟通机制。
   - 缺少样式支持
     由于当前仍无法控制最终渲染的 html 组件的 class、id 属性，使用 css 等进行精准的样式控制难以实现。但允许对 id、class 的控制恐怕会造成安全问题。仍需要类似 wxss 的与 DSL 同级的样式控制。
   - 缺少生命周期等功能
     生命周期等复杂功能未实现，很多功能的实现难以合人意。

## 使用方法

1. 进入目录，使用 npm install 确保依赖已安装
2. 在 index.js 中编辑小程序视图层：
   允许通过 JSX 语法编辑小程序的视图界面
   由于框架为起步阶段，仍然允许直接使用在 index.js 中使用 js 语法编辑变量与函数，甚至控制渲染逻辑
3. 在 logic.js 中控制小程序逻辑层：
   原则上只允许对自定义组件有关事件进行处理，并按特定格式反馈
   样例中在logic.js中对List新增项进行长度判断
4. 使用 npm run serve 启动服务器
