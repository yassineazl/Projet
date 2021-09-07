import mongoose from 'mongoose'

const VendeurSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Numero: {
      type: String,
      required: true,
    },
    Cin: {
      type: String,
      required: true,
      unique: false,
    }
  },
  {
    timestamps: true,
  }
)

const Vendeur = mongoose.model('Vendeur', VendeurSchema)

export default Vendeur
