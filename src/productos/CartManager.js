import fs from 'fs';

const path = '.src/files/carts.json'

class CartManager {
    constructor(path) {
        this.path = path;
    }
    
    readCart = async () =>{
      let respuesta = await fs.promises.readFile(this.path, "utf-8");    
      return JSON.parse(respuesta);
    }
    /*writeCarts = async (carts) => {
      let carts = await fs.promises.readFile(this.path, "utf-8");
      let cartsParse = JSON.parse(carts);
      let AllCarts = [...cartsParse, carts];
      await fs.promises.writeFile(this.path, JSON.stringify(AllCarts));
      return "Carrito Agregado";
    }*/
    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {                                     
                const data = await this.readCart(); 
                console.log(data);                            
                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }
    createCarts = async (cart) => {
        try {
            const carts = await this.getCarts();               

            if (carts.length === 0) {                            
                cart.id = 1;                                    
            } else {
                cart.id = carts[carts.length - 1].id + 1; 
            }
            console.log(cart);
            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return cart;

        } catch (error) {
            console.log(error);
        }
    }   
    getCartsById = async (id) => {
      const carts = await this.readCart();
      const filter = carts.find((cart) => cart.id === id);
      console.log(filter);
      return filter;
    };

    updateCarts = async (id, updatedCarts) => {
          try {
        const carts = await this.getCarts();
        const index = carts.findIndex((cart) => cart.id === id);
          if (index !== -1) {
        carts[index] = { ...carts[index], ...updatedCarts };
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return carts[index];
        } else {
        console.log('Carrito no encontrado.');
        return null;
        }
      } catch (error) {
        console.log(error);
      }
    };
    deleteCarts = async (id) => {
    try {
        const carts = await this.getCarts(); 
        const index = carts.findIndex((p) => p.id === id);
        if (index !== -1) {
            const [deletedCarts] = carts.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return deletedCarts;
        } else {
            console.log('Carrito no encontrado');
            return null;
        }
    } catch (error) {
        console.log(error);
    }
  };

};

export default CartManager