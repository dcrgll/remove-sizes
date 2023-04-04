module.exports = function(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  function calculateSize(n) {
    const BASE = 16 // starting value
    const DIFF = 2 // common difference

    if (n >= 0) {
      return BASE + DIFF * n // calculate the value of Size(n)
    } else {
      return n + 15
    }
  }

  // Find all instances of `Sizes()`
  root
    .find(j.CallExpression, {
      callee: {
        type: "Identifier",
        name: "Sizes"
      },
    })
    .replaceWith((path) => {

      let size = path.node.arguments[0].value
      
      if (!size && size !== 0) {
        size = path.node.arguments[0].argument.value * -1
      }

      const newSize = calculateSize(size)


      const newString = `${newSize}px`
      return j.stringLiteral(newString)
    })

  return root.toSource()
}
