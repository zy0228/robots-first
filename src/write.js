const MovieSchema = require('./model/moviesModel')
const debug = require('debug')('movies:write')

const write = async (movies) => {
  debug(`开始写入电影`)

  for (let movie of movies) {
    let oldMovie = await MovieSchema.findOne({id: movie.id})
    let obj = {
      id: movie.id,
      name: movie.name,
      href: movie.href,
      image: movie.image,
      score: movie.score
    }

    if (oldMovie) {
      await MovieSchema.update({id: movie.id}, obj, err => {
        if(err) debug(`error：${err}`)
      })
    } else {
      let newMovie = new MovieSchema(obj)
      try {
        await newMovie.save((err) => {
          if (err) {
            debug(err)
          }
        })
      } catch(e) {
        debug(`error: ${e}`)
      }
    }

    debug(`正在写入电影：${movie.name, movie.image}`)
  }
}

module.exports = write
