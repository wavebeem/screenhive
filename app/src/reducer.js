const table = {
  Update(state, action) {
    return {[action.key]: action.value}
  }
}

function reducer(state, action) {
  const type = action.type
  if (table.hasOwnProperty(type)) {
    return Object.assign({}, state, table[type](state, action))
  } else {
    return state
  }
}

module.exports = reducer
