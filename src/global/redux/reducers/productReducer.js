const initialState = {
  products: []
};

export const productReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      console.log(action)
      return {
        ...state,
        products: action.data
      }
    default:
      return state;
  }
}
