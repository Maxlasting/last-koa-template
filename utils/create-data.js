const createData = async (asyncFunction) => {
  try {
    const data = await asyncFunction()
    return { success: true, msg: '', data }
  } catch (err) {
    return { success: false, msg: err.message ? err.message : JSON.parse(err), data: null }
  }
}

module.exports = createData
