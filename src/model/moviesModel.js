const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/robots', {useNewUrlParser: true}, (err) => {
  if (err) console.log(err)
})

let MovieSchema = new Schema({
  "id": String,
  "name": String,
  "href": String,
  "image": String,
  'score': String
})

module.exports = mongoose.model("movies", MovieSchema)