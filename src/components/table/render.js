export default {
  name: 'TableRender',
  functional: true,
  props: {
    render: Function,
    row: Object
  },
  render: (createElement, ctx) => {
    if (!ctx.props.render) return
    return ctx.props.render(createElement, ctx.props.row)
  }
}
