const deleteProperties = (obj) => {
  if (obj.dataValues.password) delete obj.dataValues.password
  if (obj.dataValues.createdAt) delete obj.dataValues.createdAt
}

module.exports = deleteProperties
