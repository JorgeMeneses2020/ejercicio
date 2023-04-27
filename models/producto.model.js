'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var productoSchema= new Schema({ 
   
    nombre:Schema.Types.String,
    cantidad:Schema.Types.Number,
    precio:Schema.Types.Number,
    vencimiento:Schema.Types.Date,
    ven:Schema.Types.String,
    idCat:{type:Schema.ObjectId, ref:'categoria'}
},{collection:"Productos"})

module.exports=mongoose.model('producto',productoSchema);