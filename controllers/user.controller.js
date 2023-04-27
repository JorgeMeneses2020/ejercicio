var User=require('../models/user.model');
var bcrypt=require('bcrypt-nodejs');
var jwt=require('../services/jwt');
var fs=require('fs');
var path=require('path');
function prueba(req,res) {
    return res.status(200).send({message:"Ejecutando prueba"});
}
function register(req, res) {

    var params=req.body;
    var user=new User();

    user.name=params.name;
    user.email=params.email;
    user.role=params.role;
    user.role='ADMIN';
    user.image='NULL';
    if(params.password){
        bcryt.hash(params.password,null,null,function(err, hash){
            user.password=hash;
            if(user.name!=null && user.email!=null){
                user.save((err,user)=>{
                    if(err)return res.status(500).send({message:err})
                    if(!user)return res.status(404).send({message:"No se pudo guardar el usuario"});
                    if(user)return res.status(200).send({user:user});
                })
            }
        });

    }


}
function login(req, res) {
    var params= req.body;
    var email= params.email;
    var password= params.password;
    User.findOne({email:email.toLocaleLowerCase()},(err, user)=>{

        if(err) return res.status(500).send({message:"Error en el servidor"});
        if(!user) return res.status(404).send({message:"El usuario no existe"});
        if(user){
            bcrypt.compare(password,user.password,function(err,check){
                if(check){
                    if(params.gethash){
                        return res.status(200).send({token:jwt.createToken(user)});
                    }else{
                        return res.status(200).send({user:user});

                    }
                }
            })
        }

    });
    
}
function updateUser(req,res){
       var id=req.params.id;
    var update=req.body;

    if(id!=req.user.sub){
        return res.status(403).send({message:"No tiene permisos"});

    }
    User.findByIdAndUpdate(id,update,{new:true},(err,user)=>{
        if(err)return res.status(500).send({message:err})
        if(!user)return res.status(404).send({message:"No se pudo actualizar el usuario"});
        if(user)return res.status(200).send({user:user}); 
    });
}
function uploadImage(req, res) {
    var id= req.params.id;
    var file_name="Imagen no encontrada o subida";
    if(req.files){
        var file_path= req.files.files.path;
        var file_split= file_path.split("\\");
           file_name=file_split[2];       
        var ext_split=file_name.split('\.');
        var file_ext=ext_split[1];
       

        if(file_ext== 'png'|| file_ext=='jpg'||file_ext=='gif'){

            User.findByIdAndUpdate(id,{image:file_name},{new:true},(err,user)=>{
                if(err)return res.status(500).send({message:err})
                if(!user)return res.status(404).send({message:"No se pudo actualizar el usuario"});
                if(user)return res.status(200).send({user:user}); 
         
            });
        }else{
            res.status(404).send({message:'Extensión del archivo no valida'});

        }

        
            
    }
    
}
function getImageFile(req, res){
    var imageFile=req.params.imageFile;
    var pathFile='./uploads/user/'+imageFile;
    console.log(pathFile);
    fs.access(pathFile, function(err){
        if(err) console.log(err);
        if(!err){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(404).send({message:'No se puede acceder a  la imagen...'});

        }
    })
}
module.exports={
    register,
    login,
    updateUser,
    prueba,
    uploadImage,
    getImageFile
}