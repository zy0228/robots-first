const read = require('./read')
const write = require('./write')
const url = 'https://movie.douban.com/';

(async () => {
  /**异步抓取目标页面 */
  let data = await read(url)
  /**写入数据到数据库 robots/movies */
  await write(data)
  //退出程序
  process.exit()
})();
