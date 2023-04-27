var producto=require('../models/producto.model');


var controller={

    prueba:(req,res,next) => {
        return res.status(200).send("Hola mundo")
    },
    getAll(req,res){
        producto.find().populate({path:'idCat'}).exec(
            (err,productos)=>{
                if(err)return res.status(500).send("Error en el servidor");
                if(!productos)return res.status(404).send("No se encontraron productos");
                if(productos) return res.status(200).send({productos:productos});
        
            }
        );
    },
    insertProducto:(req, res)=>{
        var prod=new producto();
        var params= req.body;
        prod.nombre=params.nombre;
        prod.precio=params.precio;
        prod.cantidad=params.cantidad;        
        prod.vencimiento= params.vencimiento;
        prod.ven= params.ven;
        prod.idCat=params.idCat;
        console.log(params);
        prod.save((err, prodSaved)=>{
            if(err) return res.status(500).send({message:"Error en el servidor"+err});
            if(!prodSaved) return res.status(404).send("El producto no ha sido guardado");
            if(prodSaved) return res.status(200).send({producto:prodSaved});

        });
    },
    getProducto:(req, res)=>{
        var id=req.params.id;
        producto.findById(id,(err, producto)=>{
            if(err) return res.status(500).send({message:"Error en el servidor"+err});
            if(!producto) return res.status(404).send("El producto no existe");
            if(producto) return res.status(200).send({producto:producto});

        });
    },
    updateProducto:(req, res)=>{
        var id=req.params.id;
        var update=req.body;
        producto.findByIdAndUpdate(id, update,{new:true},(err,updateProduct)=>{
            if(err) return res.status(500).send({message:"Error en el servidor"+err});
            if(!updateProduct) return res.status(404).send("El updateProduct no ha sido actualizado");
            if(updateProduct) return res.status(200).send({updateProduct:updateProduct});
        });
    }
}
module.exports =controller;