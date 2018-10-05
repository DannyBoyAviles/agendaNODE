const mongoose = require('mongoose')
const Schema = mongoose.Schema

let EventSchema = new Schema({
  _id: Schema.Types.ObjectId,
  //user:{type: Schema.ObjectId, ref: 'User' },
  //eventId:Math.floor(Math.random() * 50),
  title: {type: String, required: true },
  start: {type: String, required: true},
  end: {type: String},
  userId: {type: mongoose.Schema.ObjectId, ref: "User" , required: true}
})
let Event = mongoose.model('Event', EventSchema)
module.exports = Event;
