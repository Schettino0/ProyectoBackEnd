const Products = require("./models/products.model")



class Product {

    createProduct = async (req) => {
        const product = req.body
        const { title, description, price, thumbnail, code, stock } = product
        if (title && description && price && thumbnail && code && stock) {
            try {
                const newProducts = await Products.create(product)
                return res.status(201).json({ product: newProducts })

            } catch (error) {
                return res.status(401).json({ error: error })
            }
        }
    }




    getProducts = async (req, res) => {
        try {

            const { limit = 10, page = 1, sort, query } = req.query
            const limitValue = Number(limit)
            const pageValue = Number(page)
            const opciones = {
                limit: limitValue,
                page: pageValue,
                sort: { price: sort },
                query: "",
            }

            try {
                const resultado = await Products.paginate({}, opciones)
                resultado.status = "success"
                resultado.nextLink = null
                resultado.prevLink = null
                resultado.payload = resultado.docs
                delete resultado.docs

                if (resultado.hasPrevPage) {
                    resultado.prevPage = resultado.page - 1
                    resultado.prevLink = `http://localhost:8080/api/products/?limit=${limit}&page=${resultado.prevPage}`

                }
                if (resultado.hasNextPage) {
                    resultado.nextPage = resultado.page + 1;
                    resultado.nextLink = `http://localhost:8080/api/products/?limit=${limit}&page=${resultado.nextPage}`
                }
                res.json({ resultado })
            } catch (error) {
                res.json({ status: error })
                console.log(error)
            }
            // return product
        } catch (error) {
            console.log(error)
            return null
        }
    }
    getProductByID = async (id) => {
        try {
            const productos = await Products.find()
            const busqueda = productos.find(p => p.id == id)
            if (busqueda) {
                return busqueda
            }
            else {
                return "ID not found"
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

    deleteProduct = async (id, res) => {
        try {
            await Products.deleteOne({ _id: id })
            res.status(200).send({ message: "Eliminado con exito" })
        } catch (error) {
            res.status(400).send({ error: error })
        }
    }

    // editProduct = async (id, update) => {


    // }
}

module.exports = Product 