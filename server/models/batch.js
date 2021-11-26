var mongoose=require('mongoose');
// var Institution = ('./institution');
var Schema=mongoose.Schema;

var batchSchema=new Schema({
  batch_name: { type: String, required: true },
  batch_description: { type:String },
  status: { type: Boolean },
  register_ip: { type: Object },
  institution: { type: Schema.Types.ObjectId, ref: 'Institution' },

  created_by: { type:String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

module.exports=mongoose.model('Batch',batchSchema);