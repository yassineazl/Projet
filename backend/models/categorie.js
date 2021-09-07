import mongoose from 'mongoose'

const CategorieSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    }
}
)

const Categorie = mongoose.model('Categorie', CategorieSchema)

export default Categorie
