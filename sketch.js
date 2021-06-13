const resolution = 5
let cols, rows
const arrays = []
let current = 0;
let next = 1

function setup() {
  createCanvas(600, 600)
  fill(255)
  strokeWeight(0)

  cols = round(width / resolution)
  rows = round(height / resolution)

  arrays[0] = randomFill2DArray(emptyArray(cols, rows))
  arrays[1] = randomFill2DArray(emptyArray(cols, rows))
}

function draw() {
  background(0)

  current = (current + 1) % 2
  next = 1 - current

  update(arrays[current], arrays[next])
  show(arrays[next])
}

function show(array) {
  array.forEach((column, columnIndex) => {
    column.forEach((element, rowIndex) => {
      if (element == 1) rect(columnIndex * resolution, rowIndex * resolution, resolution, resolution)
    })
  })
}

function update(current, next) {

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const sum = howManyNeighbours(current, i, j)

      if (current[i][j] == 0 && sum == 3) {
        next[i][j] = 1
      } else if (current[i][j] == 1 && (sum < 2 || sum > 3)) {
        next[i][j] = 0
      } else {
        next[i][j] = current[i][j]
      }
    }
  }
}

const emptyArray = (col = 1, row = 1) => (new Array(col)).fill((new Array(row)).fill(0))
const randomFill2DArray = array => array.map(column => column.map(() => floor(random(2))))

const howManyNeighbours = (current, i, j) => {
  let sum = -current[i][j]
  for (let k = -1; k < 2; k++) {
    for (let l = -1; l < 2; l++) {
      sum += current[(cols + k + i) % cols][(rows + l + j) % rows]
    }
  }
  return sum
}