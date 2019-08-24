const rp = require('request-promise')
const cheerio = require('cheerio')
const debug = require('debug')('movies:read')

const read = (url) => {
  debug(`开始读取~O(∩_∩)O~`)

  let opts = {
    url,
    transform: data => {
      return cheerio.load(data)
    }
  }

  return rp(opts).then($ => {
    let result = []

    $('#screening li.ui-slide-item').each((index, item) => {
      let el = $(item)
      let name = el.data('title')
      let score = el.data('rate') || `暂无评分~`
      let href = el.find('.poster a').attr('href')
      /**id可以在href的地址里面拿到 */
      let id = href && href.match(/(\d+)/)[1]
      let image = el.find('.poster img').attr('src')
      /**转换图片的格式为webp 防止裂图*/
      image = image && image.replace(/jpg$/, 'webp')

      if (!image || !name || !href) {
        return
      }

      result.push({
        name,
        score,
        href,
        id,
        image
      })
      debug(`正在读取电影：${name}`)
    })
    return result
  })
}

module.exports = read
