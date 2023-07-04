import ProductsManager from './productos/ProductsManager.js';

const deposito = new ProductsManager('./files/Productos.json');

const env = async () => {
    const productos = await deposito.getProduct();
    console.log(productos);

     const producto = {
        id: '1',
        nombre: 'sigas 32',
        descripcion: 'fusion',
        precio: '10000',
        thumbnail: null ,
        codigo: '10',
        stock: '100'
       
     };

     await deposito.createProduct(producto);
    const depositoResult = await deposito.getProduct();
    console.log(depositoResult);
}

env();