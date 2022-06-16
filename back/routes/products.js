const Product = require('../models/Product')
const router = require("express").Router();
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5, //5 mega
    }
  });
router.get('/:id',async (req,res)=>{
    const products= await Product.find({id_User:req.params.id})
    res.send(products)
})
router.get('/all/:id',async (req,res)=>{ 
  const products= await Product.find({id_User: { $ne: req.params.id } })
  res.send(products)  
})

router.post('/add/:id', upload.single('image'),async (req,res)=>{
    const productExist = await Product.findOne({id_User:req.params.id, name: req.body.name });
    if (productExist) return res.status(400).send("Le produit deja exist");
  
    const product = new Product({
      id_User: req.body.id_User,
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.file.path
    });
    console.log(product)
    try {
      const saveProduct = await product.save();
      res.send(saveProduct);
  //return res.header("auth-token", token).json({ token, user });

    } catch (err) {
      res.status(400).send(err);
    }
})

router.put("/update/:id", upload.single("image"), async (req, res) => {
    return Product.findById(req.params.id, function (err, product) {
      product.name = req.body.name;
      product.id_User = req.body.id_User;
       product.price = req.body.price;
      product.quantity = req.body.quantity;
      product.productImage = req.file.path;
      
      return product.save(function (err) {
        if (!err) {
          console.log("updated");
        } else {
          console.log(err);
        }
        return res.send(product);
      });
    });
  });
  
  router.delete("/delete/:id", async (req, res) => {
    return Product.findById(req.params.id, function (err, product) {
      return product.remove(function (err) {
        if (!err) {
          console.log("removed");
          return res.send("");
        } else {
          console.log(err);
        }
      });
    });
  });

  router.post('/search',async (req,res)=>{
      const product= await Product.find({ name: { $regex: req.body.name } })
      if(product) return res.send(product)
      return res.status(404).send("le produit n'exist pas")
  })
module.exports = router;
