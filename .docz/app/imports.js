export const imports = {
  'src/editor/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-editor-index" */ 'src/editor/index.mdx'
    ),
  'src/showEditor/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-show-editor-index" */ 'src/showEditor/index.mdx'
    ),
}
