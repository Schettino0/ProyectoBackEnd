const fs = require('fs')


class ProductManager {
    constructor(path) {
        this.products = []
        this.path = __dirname+"/dao/"+path
    }


    async getProducts() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const dataObj = JSON.parse(data)
        return dataObj
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        const productos = await this.getProducts()
        let id = productos.length + 1

        if (productos.find(element => element.code === code)) { //Verifico que no exista producto con un code igual al code ingresado.
            console.log(`Codigo ya en uso! : ${code}`)
            return "Codigo ya en uso"
        }
        else {
            // console.log(title, description, price, thumbnail, code, stock)
            if (title && description && price && thumbnail && code && stock) {
                if(productos.find(el => el.id === id)){ // Verifico que no se repita el ID al crear un producto nuevo.
                    id++
                }
                const producto = { id, title, description, price, thumbnail, code, stock, status: true }
                productos.push(producto)
                fs.promises.writeFile(this.path, JSON.stringify(productos))
                return "Creado con exito"
                
            } else {
                console.log("Faltan datos!")
                return "Faltan datos"
            }
        }
    }

    async updateProduct(id, update) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const productos = JSON.parse(data)
        const toUpdate = productos.find(item => item.id === id)
        if(toUpdate){
            const dataUpdate = {...toUpdate , ...update}
            const index = productos.indexOf(toUpdate)
            productos[index] = dataUpdate
            productos[index].id = toUpdate.id
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
            console.log(`Producto ID: ${id} actualizado`)
        }
        else{
            console.log(`ID:${id} No encontrado.`)
        }
        
    }

    async getProductById(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const productos = JSON.parse(data)
        const busqueda = productos.find(item => item.id === id)
        return busqueda

    }

    async deleteProduct(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const productos = JSON.parse(data)
        const toDelete = productos.find(item => item.id === id)
        const index = productos.indexOf(toDelete)
        productos.splice(index, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
    }
}


module.exports = ProductManager