const setOrderMessage = (listProducts, totalProducts, totalPrice) => {
  var msgProducts = ''
  listProducts.forEach( product => {
    let msgProduct = `<b> Código; ${product.cod}, Marca; ${product.productBrand}, Cantidad; ${String(product.quantity)}, Precio; ${String(product.price)}, <b> <br>`
    msgProducts = msgProducts + msgProduct
  } )

  let msg =
  `<b> Hola, queria encargarte el siguiente pedido: </b>
    <br>
    <br>
    <b> PRODUCTOS: <b>
    <br>
    ${msgProducts}
    <br>
    <b> PRODUCTOS TOTALES: <b>
    <br>
    <b> ${totalProducts} <b>
    <br>
    <br>
    <b> PRECIO TOTAL: <b>
    <br>
    <b> ${totalPrice} <b>
  `

  return msg
}

module.exports = setOrderMessage
