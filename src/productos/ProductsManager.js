import fs from 'fs';

const path = './files/Productos.json'

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }
    
    readProduct = async () =>{
      let respuesta = await fs.promises.readFile(this.path, "utf-8");    
      return JSON.parse(respuesta);
    }

    getProduct = async () => {
        try {
            if (fs.existsSync(this.path)) {                                     
                const data = await this.readProduct(); 
                console.log(data);                            
                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    createProduct = async (producto) => {
        try {
            const products = await this.getProduct();               

            if (products.length === 0) {                            
                producto.id = 1;                                    
            } else {
                producto.id = products[products.length - 1].id + 1; 
            }
            console.log(producto);
            products.push(producto);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return producto;

        } catch (error) {
            console.log(error);
        }
    }   


getProductById = async (id) => {
    const products = await this.readProduct();
    const filter = products.find((producto) => producto.id === id);
    console.log(filter);
    return filter;
  };

updateProduct = async (id, updatedProduct) => {
    try {
      const products = await this.getProduct();
      const index = products.findIndex((product) => product.id === id);

      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return products[index];
      } else {
        console.log('Producto no encontrado.');
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (product) => {
    try {
      const products = await this.getProduct();
  
      const index = products.findIndex((p) => p.id === product.id);
  
      if (index !== -1) {
        products.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return product;
      } else {
        console.log('Producto no encontrado');
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//const productManager = new ProductManager(path);

    //BUSQUEDA DE PRODUCTO POR ID//

//productManager.getProductById(1); 

    //ACTUALIZACION DE DATOS DEL PRODUCTO//

/*const updatedProduct = { name: 'Updated Product', price: 15500 };                 
const actualizacion = await productManager.updateProduct(1, updatedProduct);

if (actualizacion) {
  console.log('Producto actualizado:', actualizacion);
} else {
  console.log('Producto no encontrado');
}*/

    //ELIMINAR PRODUCTO//
/*const productoAEliminar = { id: 1, name: 'Product 1', price: 15500 };
const deletedProduct = await productManager.deleteProduct(productoAEliminar);
    
if (deletedProduct) {
    console.log('Producto borrado', deletedProduct);
} else {
    console.log('Producto no encontrado o ya eliminado');
}*/
