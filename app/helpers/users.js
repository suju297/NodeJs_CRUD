

const movie_data = require('../models/movie_data');
const movie = require('../models/movie_data');

module.exports = {

    create : function(req){

        return new Promise((resolve, reject)=>{

            const _name = req.body.name ? req.body.name : "";
            const _image = req.body.img ? req.body.img : "";
            const _summary = req.body.summary ? req.body.summary : "";
            let response = {}

            if (_name && typeof _name === 'string' && _image && typeof _image === 'string' && _summary && typeof _summary === 'string' ) {

                const data = {

                    name : _name,
                    img : _image,
                    summary : _summary
                }

                const movie_data = new movie(data);

                movie_data.save((err,data)=>{

                    if (!err) {

                        response["data_params"] = data.id;
                        response["status"] = true;
                        response["authCode"] = 200
                        resolve(response);
                    } else {
                        
                        response["data_params"] = "Something went wrong, Please try again in a while";
                        response["status"] = false;
                        response["authCode"] = 100
                        reject(response)

                    }
                    

                });

                
            } else {
                
                response["data_params"] = "Invalid Input parameters";
                response["status"] = false;
                response["authCode"] = 100
                reject(response);
            }
        })
    },

    read : function(req){

        return new Promise((resolve, reject)=>{

            console.log(req.params,"read")
            const _id = req.params.id ? req.params.id : "";
            let response = {};

            if (_id && typeof _id === 'string' ) {

               
                movie.findById({_id},{__v : 0, _id : 0}, (err, data)=>{
                    
                    console.log(err,data)
                    if (!err) {
                       
                        response["data_params"] = data;
                        response["status"] = true;
                        response["authCode"] = 200
                        resolve(response)
                        

                    } else {
                       
                        response["data_params"] = "Something went wrong, Please try again in a while";
                        response["status"] = false;
                        response["authCode"] = 100
                        reject(response)

                    }

                });

                
            } else {
                
                response["data_params"] = "Invalid Input parameters";
                response["status"] = false;
                response["authCode"] = 100
                reject(response);
            }
        })
    },

    update : function(req){

        return new Promise((resolve, reject)=>{

            const _id = req.body.id ? req.body.id : "";
            const _updtname = req.body.update_name ? req.body.update_name : "";
            const _updtimage = req.body.update_img ? req.body.update_img : "";
            const _updtsummary = req.body.update_summary ? req.body.update_summary : "";
            let response = {};

            if (_id && typeof _id === 'string' && _updtname && typeof _updtname === 'string' && _updtimage && typeof _updtimage === 'string' && _updtsummary && typeof _updtsummary === 'string' ) {

                const data = {

                    name : _updtname,
                    img : _updtimage,
                    summary : _updtsummary
                }

                movie_data.findByIdAndUpdate(_id, data, (err,data)=>{

                    if (!err) {
                        
                        response["data_params"] = "Data updated successfully";
                        response["status"] = true;
                        response["authCode"] = 200
                        resolve(response);
                    } else {
                        
                        response["data_params"] = "Something went wrong, Please try again in a while";
                        response["status"] = false;
                        response["authCode"] = 100
                        reject(response)
                    }
                });

 
            } else {
                
                response["data_params"] = "Invalid Input parameters";
                response["status"] = false;
                response["authCode"] = 100
                reject(response);
            }
        })

    },

    delete : function(req){

        return new Promise((resolve, reject)=>{

            console.log(req.params,"read")
            const _id = req.params.id ? req.params.id : "";
            let response = {};

            if (_id && typeof _id === 'string' ) {

               
                movie.findByIdAndRemove({_id}, (err, data)=>{
                    
                    console.log(err,data)
                    if (!err) {
                       
                        response["data_params"] = "Document deleted successfully";
                        response["status"] = true;
                        response["authCode"] = 200
                        resolve(response)
                        

                    } else {
                       
                        response["data_params"] = "Something went wrong, Please try again in a while";
                        response["status"] = false;
                        response["authCode"] = 100
                        reject(response)

                    }

                });

                
            } else {
                
                response["data_params"] = "Invalid Input parameters";
                response["status"] = false;
                response["authCode"] = 100
                reject(response);
            }
        })
        
    }


}
