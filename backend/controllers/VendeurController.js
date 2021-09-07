import Vendeur from '../models/VendeurModel.js'
import Product from '../models/productModel.js'
import Categorie from '../models/categorie.js'
import Order from '../models/VendeurModel.js'


const addVendeur = async (req, res) => {
    const { Name, Numero, cin } = req.body;
    try {
        const NewVendeur = new Vendeur({
            Name: Name,
            Numero: Numero,
            Cin: cin

        })

        await NewVendeur.save()
        res.status(200).json({ "message": "done" })

    }

    catch (err) {

        console.log(err.message)
    }

}

const getProductByNum = async (req, res) => {
    const { number } = req.body
    try {
        let products = await Product.find({ brand: number })
        res.status(200).json(products)
    } catch (err) { console.log(err) }
}

const addCatgorie = async (req, res) => {
    const { Name } = req.body;
    try {
        const Newcat = new Categorie({
            Name: Name
        })
        await Newcat.save()
        res.status(200).json({ "message": "done" })
    } catch (err) {
        console.log(err)
    }
}


const getAllc = async (req, res) => {
    try {
        let data = await Categorie.find({})
        res.status(200).json(data)
    } catch (err) { console.log(err) }

}

const del=async(req,res)=>{
    try {
          const {id}=req.body
          let result=await Categorie.findByIdAndDelete(id)
          res.status(200).json({"message":"done"})
    } catch(err) {
        console.log(err)
    }
}

const delv=async(req,res)=>{
    try {
          const {id}=req.body
          let result=await Vendeur.findByIdAndDelete(id)
          res.status(200).json({"message":"done"})
    } catch(err) {
        console.log(err)
    }
}

const delo=async(req,res)=>{
    try {
          const {id}=req.body
          let result=await Order.findByIdAndDelete(id)
          res.status(200).json({"message":"done"})
    } catch(err) {
        console.log(err)
    }
}

const getvendeurs=async(req,res)=>{
    try {
    let data=await Vendeur.find({})
    res.status(200).json(data) } 
    catch(err) {
        console.log(err)
    }
}


export { addVendeur, getProductByNum, addCatgorie,getAllc,del,getvendeurs,delv,delo }
