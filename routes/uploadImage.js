const { prefix, get, post, body } = require('../decorators')
const services = require('../services/uploadImage.services.js')

@prefix('/tools')
class _uploadImageRouter_ {
  @get('/uploadImage')
  async  _sendUploadImagePageHtmlFn (ctx) {
    const html = await services.sendUploadImagePageHtmlFn(ctx)
    ctx.body = html
  }

  @post('/api/uploadImageFiles')
  async _uploadImageToOss (ctx) {
    const data = await services.uploadImageToOss(ctx)
    ctx.body = {
      code: 1,
      msg: '',
      data
    }
  }
}
