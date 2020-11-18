var BrandModel = require("../model/brand.model.js");

var getAllBrands = (req,res)=>{
    BrandModel.find({},(err,data)=>{
        if(err) throw err;

        res.json(data);

    })
}

var addBrand = (req,res)=>{
    let brandname = req.body.bname;
    
    BrandModel.find({bname:brandname},(err,data)=>{
        if(err){
            res.json({"msg":"Error"});
        }
        else if(data.length!=0){
            res.json({"msg":"Brand already exists...","type":"error"});
        }else{
            let brand = new BrandModel({
                bname:brandname
            });
            brand.save((err,data)=>{
                if(err){
                    res.json({"msg":"Error"});
                }else{
                    res.json({"msg":"Brand added successfully..","type":"success"});
                }
            })
        }
        
    })
    
}

var deleteBrand = (req,res)=>{
    var deleteId = req.params.id;
    
    BrandModel.deleteOne({_id:deleteId},(err,result)=>{
        console.log(deleteId);
        if(err) throw err
        console.log(result);
        if(result.deletedCount>0){
            res.json({"msg":"Record deleted successfully","type":"success"});
        }else{
            res.json({"msg":"Record doesnt exist","type":"error"});
        }

    })
}

module.exports = {getAllBrands, addBrand, deleteBrand}