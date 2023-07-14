export function transformWrapperToDOM(wrapper) {
  const htmlString = wrapper.html()
  const parser = new DOMParser()
  return parser.parseFromString(htmlString, 'text/html')
}
export function textExistsInWrapper(wrapper, text) {
  const dom = transformWrapperToDOM(wrapper)
  return dom.body.textContent.includes(text)
}
