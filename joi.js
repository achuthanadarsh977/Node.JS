const Joi = require('joi')

// const schema = Joi.object({
//     name:Joi.string().min(3).required(),
//     age:Joi.number().min(18).required()
// });

// const result = schema.validate({name:'Dani Daniels' , age:23})


// console.log(result)

// if(result.error){
//     return result.error.send(error.details[0].message)

// }

// else{
//     console.log('Validation passed')
// }


// const schema1 = Joi.object({
//     name:Joi.string().min(3).required(),
//     age:Joi.number().min(18).required(),
//     phone:Joi.string().max(10).required(),
//     blood_group:Joi.string().min(2).required()
// })

// const result = schema1.validate({name:'Lucifer MorningStar', age:34,phone:"7550277362",blood_group:'B+'})

// console.log(result)