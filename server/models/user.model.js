const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  //userId: { type: Number, required: true, unique: true},
  _Id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  password: { type: String, required: true},
  email: { type: String, required: true},
  //events:[{type: Schema.Types.ObjectId, ref:'Event'}]
});
//CODIGO PARA ENCRIPTAR LA CONTRASEÑA Y VERIFICARLA
/*
UserSchema.pre('save', function(next){
  const usuario = this;
  if (!usuario.isModified('password')){
    return next();
  }

  bcrypt.genSalt(10, function(err, salt){
    if(err){
      next(err);
    }
    bcrypt.hash(usuario.password, salt, null, function(err, hash){
      if (err){
        next(err);
      }
      usuario.password = hash;
      next();
    })
  })
})

UserSchema.methods.comparePassword = function (password, cb){
  bcrypt.compare(password, this.password, (err, isMatch)=>{
    if(err){
      return cb(err);
    }
    cb(null, isMatch);
  })
}
*/

let User = mongoose.model('User', UserSchema)
module.exports = User;