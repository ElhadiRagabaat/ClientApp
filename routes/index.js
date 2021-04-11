
const express = require("express")

const Article = require("../models/article")
const router = express.Router()

router.get("/articles", async(req,res)=>{

     Article. find(function(err,article){
        if(!article){
            res.status(404).send("No result found")
        }else{
            res.json(article)
        }
    })

})
router.post("/articles", async(req,res)=>{

    try{

        let article = new Article(req.body)
        await article.save()
        res.json(article)
    }
    catch(err){

        console.log(err)
        res.status(422).send("Article add failed")

    }
    // let aricale = new Articale(req.body)
    //  await aricale.save()
    // .then(aricale =>{
    //     res.send(aricale)
    // })
    // .catch(function(err){
    //     res.status(422).send("Article add failed")
    // })


})

router.get("/articles/:id", async(req,res)=>{
    await Article.findById(req.params.id,function(err,article){
        if(!article){
            res.status(404).send("No resulte found")
        }
        else{
            res.send(article)
        }
    })
})

router.patch("/articles/:id", async(req,res)=>{
     Article.findByIdAndUpdate(req.params.id,req.body)
    .then(function(){
        res.json("Article updeted ")
    })
    .catch( function (err){
        res.status(422).send("Article update failed.")
    })  
 
})
router.delete("/articles/:id" ,async(req,res)=>{
    
    await Article.findByIdAndRemove(req.params.id)
    .then(function(){res.status(200).send("Article Deleted")})
    .catch(function(err){
        res.status(400).send("Article delete failed")
    })
})

module.exports = router;