const {models} = require('../lIbs/sequalize')
const boom = require('@hapi/boom')
const {categoryAtributes, productAtributes} = require('../Utils/showAtributes')

class CategoryService {

  async getAll(){
    const categories = await models.Category.findAll({
      attributes: categoryAtributes
    })
    if (categories.length < 1) throw boom.notFound('Categorias no encontradas!')
    return categories
  }

  async getOne(id, limit, offset){
    const category = await models.Category.findByPk(id, {
      attributes: categoryAtributes,
      include: {
        association: 'product',
        attributes: productAtributes,
        limit,
        offset
      }
    })
    if (!category) throw boom.notFound('Categoria no encontrada!')
    return category
  }

  async createOne(data){
    await models.Category.create(data)
    return {message: 'Successfull'}
  }

  async deleteOne(id){
    const result = await models.Category.destroy({
      where: {
        id
      }
    })
    if (result < 1) throw boom.notImplemented('Categoria no eliminada!')
    return {message: 'Successfull'}
  }

  async updateOne(id, data) {
    const result = await models.Category.update(data, {
      where: {
        id
      }
    })
    if (result.length < 1) throw boom.notImplemented('Categoria no actualizada!')
    return {message: 'Successfull'}
  }

}


module.exports = CategoryService
