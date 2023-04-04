module.exports = function (file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  function calculateSize (n) {
    const BASE = 16 // starting value
    const DIFF = 2 // common difference

    if (n >= 0) {
      return BASE + DIFF * n // calculate the value of Size(n)
    } else {
      if (n === -1) {
        return 14
      } else if (n === -2) {
        return 13
      } else if (n === -3) {
        return 12
      } else if (n === -4) {
        return 11
      } else if (n === -5) {
        return 10
      } else if (n === -6) {
        return 9
      } else if (n === -7) {
        return 8
      }
    }
  }

  // Find all instances of `Sizes()`
  root
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: 'Sizes'
      },
      arguments: {
    	length: 1,
        0: {
          type: 'Literal'
        }
      }
    })
    .replaceWith((path) => {
   	const size = path.node.arguments[0].value

      const newSize = calculateSize(size)

      const newString = `${newSize}px`
      return j.stringLiteral(newString)
    })

  return root.toSource()
  }