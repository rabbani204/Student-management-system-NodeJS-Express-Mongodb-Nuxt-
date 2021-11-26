var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var adminSchema=new Schema({
  admin_name: { type: String },
  email: { type:String },
  admin_contract: { type: String } ,
  admin_address: { type: String },
  password: { type:String, required:true },
  image: { type:String },
  status: { type: Boolean },
  register_ip: { type: Object },

  role: { type:String, required:true },

  created_by: { type:String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

module.exports=mongoose.model('Admin',adminSchema);