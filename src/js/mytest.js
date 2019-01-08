
const favorite = {
  name: 'chelsea'
}

const org = {
  name: 'ishi',
  age: 41,
  hobby: {
    type: 'football',
    favorite: favorite
  }
}

let assign = Object.assign({}, org)

org.name = 'ta'
favorite.name = 'hoge'

console.log(assign)
