



(function  (exports , require , module , __filename , __dirname){


 const a = 10
 const b = 20

 function add(x,y){
    return x+y
 }

 module.exports.add = {a,b,add}
 console.log(__dirname)
 console.log(__filename)
 
}) (exports , require , module , __filename , __dirname)