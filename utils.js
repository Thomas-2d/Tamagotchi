function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  function generateRandomSpace() {
    return new Array(between(0, 30)).fill(' ').join('')
  }

function generateRightSpace() {
  return new Array(20).fill(' ').join('')
}


module.exports = {
    between: between,
    generateRandomSpace: generateRandomSpace,
    generateRightSpace: generateRightSpace
}