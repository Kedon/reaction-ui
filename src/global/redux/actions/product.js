import productsJson from '../../../assets/@fake-data/products.json'
console.log(productsJson)
export const fetchProducts = () => ({
    type: 'FETCH_PRODUCTS',
    data: productsJson
  });