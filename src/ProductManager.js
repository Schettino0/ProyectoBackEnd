const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }
    async addProduct(title, description, price, thumdnail, code, stock) {
        if (this.products.find(element => element.code === code)) {
            console.log(`Codigo ya en uso! : ${code}`)
        }
        else {
            const id = this.products.length + 1
            if (title && description && price && thumdnail && code && stock) {
                this.products.push({ id, title, description, price, thumdnail, code, stock })
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            } else {
                console.log("Faltan datos!")
            }
        }
    }

    async updateProduct(id, update) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const productos = JSON.parse(data)
        const toUpdate = productos.find(item => item.id === id)
        const index = productos.indexOf(toUpdate)
        productos[index] = update
        productos[index].id = toUpdate.id
        await fs.promises.writeFile(this.path, JSON.stringify(productos))

    }


    async getProductById(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const productos = JSON.parse(data)
        const busqueda = productos.find(item => item.id === id)
        return busqueda

    }
    async getProducts() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const dataObj = JSON.parse(data)
        return dataObj
    }

    async deleteProduct(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const productos = JSON.parse(data)
        const toDelete = productos.find(item => item.id === id)
        const index = productos.indexOf(toDelete)
        productos.splice(index, 1)
        console.log(productos)
        await fs.promises.writeFile(this.path, JSON.stringify(productos))


    }
}


// const tienda = new ProductManager('productos.json')


// tienda.addProduct('Producto 1', 'Descripción del producto 1', 500, 'imagen', 'Codigo1', 20)

// tienda.addProduct('Producto 2', 'Descripción del producto 2', 600, 'imagen', 'Codigo2', 20)

// tienda.addProduct('Producto 3', 'Descripción del producto 3', 600, 'imagen', 'Codigo3', 20)

// tienda.updateProduct(3, { title: "Producto Editado", description: "Descripcion Editada", price: 500, thumdnail: "imagen", code: "Codigo3", stock: 20 })

// tienda.deleteProduct(2)

// tienda.getProductById(3)

// tienda.getProducts()

module.exports = ProductManager