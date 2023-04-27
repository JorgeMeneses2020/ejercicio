var jwt=require('jwt-simple');
var clave="clave_secreta";
var moment=require('moment');

exports.createToken = function(user){
    var payload={
        sub:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        image:user.image,
        iat:moment().unix(),
        exp:moment().add(30,'days').unix
    };
   return jwt.encode(payload,clave);

};

