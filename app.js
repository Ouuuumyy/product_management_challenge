const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/productManagement')
    .then(()=>console.log('connected to database'))
    .catch((err)=>console.log(err))

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true},
    price : {
        type : Number,
        required : true,
        min: [0, 'Price must be a positive value']},
    description : {type :String},
    inStock: {
        type: Boolean,
        default: true,
      },
    createdAt :{
        type : Date,
        default: Date.now
    }
});

const ProductModel = new mongoose.model('products', productSchema);
const product = new ProductModel({
    
    name: 'Fitness Tracker',
    price: 100,
    description: 'Wearable fitness tracker with heart rate monitoring.',
    inStock: false,

      
})

function addProduct(product)
{
    product
        .save()
        .then(()=>console.log('products added to database'))
        .catch((err)=> console.log(err));
}

function sortproducts(){
    ProductModel
        .find()
        .sort({price : 1})
        .then((products)=>console.log(products))

}

function limitedProducts(){
    ProductModel
        .find()
        .limit(3)
        .then((products)=>console.log(products))

}

function pagination(){
    const pageSize = 2;
    const pageNumber = 3;

    ProductModel.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .then((products) => {
        console.log(products);
    });
}

pagination();
