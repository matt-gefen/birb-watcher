import mongoose from 'mongoose'

const Schema = mongoose.Schema

const sightingSchema = new Schema(
  {
    date: {
      type: Date
    },
    city: String,
    state: String,
    notes: String,
    birds: []

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