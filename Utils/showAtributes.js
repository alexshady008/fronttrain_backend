const userAtributes = ['id', 'username', 'email', 'role', 'avatar', 'confirmation', 'token']
const clientAtributes = ['name', 'lastName', 'storeName', 'storeDescription', 'phoneNumber', 'location']
const orderAtributes = ['id', 'state']
const itemAtributes = ['id','description', 'image']
const productAtributes = ['id', 'description', 'price','categoryId', 'productBrand', 'carBrand', 'carType', 'image']
const categoryProductAtributes = ['name']
const categoryAtributes = ['id', 'name', 'description', 'image']


module.exports = {
  userAtributes,
  clientAtributes,
  orderAtributes,
  itemAtributes,
  productAtributes,
  categoryProductAtributes,
  categoryAtributes
}
