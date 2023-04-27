var mongoose = require('mongoose');

var Schema= mongoose.Schema;

var categoriaSchema=new Schema({
    nombre:Schema.Types.String,
    descripcion:Schema.Types.String,
},{collection:"Categorias"});

module.exports=mongoose.model('categoria',categoriaSchema);