import mongoose from 'mongoose'

const Schema = mongoose.Schema

const birdSchema = new Schema(
  {  
    commonName: String,
    speciesCode: String,
  }

)

const sightingSchema = new Schema(
  {
    date: {
      type: Date
    },
    city: String,
    state: String,
    notes: String,
    birds: [birdSchema]

  }
)

const profileSchema = new Schema(
  {
    name: String,
    avatar: String,
    sightings: [sightingSchema]
  }, 
  { timestamps: true }
)

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}