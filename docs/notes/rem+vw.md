# 🛟 rem+vw

> 🌻 rem+vw 如何实现响应式布局，它的局限是什么

"rem" 和 "vw" 都是用于实现响应式布局的单位，它们都是相对于视口的尺寸而言的，但用法和特点略有不同。

1.  rem (root em): "rem" 是相对于根元素（通常是 `<html>` 标签）字体大小的单位。当设置根元素的字体大小为 16px 时，1rem 就等于 16px，2rem 就等于 32px，依此类推。因此，通过设置根元素的字体大小，可以轻松地控制整个页面中所有使用 rem 单位的元素的大小。
2.  vw (viewport width): "vw" 表示视口宽度的百分比。1vw 等于视口宽度的 1%。例如，如果视口宽度为 1000px，1vw 就等于 10px。

实现响应式布局的步骤：

- 设置 `<html>` 标签的字体大小，以便使用 rem 单位进行布局。例如，可以将根元素的字体大小设置为 16px。
- 使用 rem 单位来定义元素的尺寸，例如宽度、高度、边距等。
- 使用 vw 单位来定义元素的尺寸或间距，以便根据视口宽度进行调整。

响应式布局的优点：

- 简化了页面的布局和缩放调整过程。
- 提供了一种相对于视口的尺寸单位，使得元素在不同设备上表现更一致。

然而，rem+vw 布局也有一些局限性：

1.  兼容性：虽然 rem 和 vw 单位在现代浏览器中得到支持，但在一些旧版本浏览器中可能存在问题，需要针对性的兼容处理。
2.  精确度：使用 rem 和 vw 单位可能导致尺寸的精确度不高，尤其是在一些特定的设计要求下。
3.  特定场景问题：在某些情况下，使用 rem 和 vw 单位可能会带来一些奇怪的行为，例如视口宽度较小时，元素可能会变得过小或不可读。
4.  复杂布局：对于复杂的布局，仅仅使用 rem+vw 可能不足以满足需求，可能需要结合其他响应式布局技术来实现更复杂的效果。

总体而言，rem+vw 是一种方便的响应式布局方法，但在使用时需要注意它的局限性，并在特定场景下做出权衡。对于复杂的项目，通常需要综合考虑多种布局技术来实现最佳的响应式效果。

> 🚁 设计稿 750px，得到 1rem 等于 10px 的响应式，如何计算 root 的 font-size 的大小

如果你想要实现 1rem 等于 10px 的响应式布局，我们可以按照以下计算方法来设置根元素（root）的字体大小：

1.  计算 1rem 等于多少 vw： 由于 1rem 等于 10px，我们需要将其转换为 vw 单位。假设设计稿的宽度为 750px，我们可以使用以下计算： 1rem = 10px 1vw = 设计稿宽度 / 100 = 750px / 100 = 7.5px
2.  计算根元素的字体大小： 因为 1vw 等于 7.5px，我们希望 1rem 等于 10px，所以根元素的字体大小应该是： 根元素的字体大小 = 1rem / 1vw = 10px / 7.5px ≈ 1.333vw

因此，你可以将根元素的字体大小设置为 1.333vw，这样 1rem 就等于 10px。在 CSS 中设置如下：

```css
html {
  font-size: 1.333vw; /* 1rem equals 10px */
}
```

请注意，由于使用了 vw 单位，这个设置将根据视口宽度进行调整，实现了响应式的效果，但也需要注意兼容性问题，特别是在一些旧版本浏览器上可能存在一些差异。因此，在实际应用中，建议进行兼容性测试并根据实际情况进行调整。
