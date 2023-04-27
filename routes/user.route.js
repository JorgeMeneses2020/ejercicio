var express = require('express');
var multipart= require('connect-multiparty');
var api=express.Router();

var md_upload=multipart({uploadDir:'./uploads/user'})
var userController=require('../controllers/user.controller');
var Auth=require('../middlewares/authenticated');

api.get('/prueba',Auth.ensureAuth,userController.prueba);
api.get('/login',userController.login);
api.post('/new-user',userController.register);
api.put('/update-user/:id',Auth.ensureAuth ,userController.updateUser);
api.put('/upload-image-user/:id',[Auth.ensureAuth,md_upload],userController.uploadImage);
api.get('/get-image-user/:imageFile',userController.getImageFile);
module.exports=api;