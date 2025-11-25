


const p = new Promise((resolve,rejects) => {
    setTimeout(() => {
        resolve(1);
        rejects(new Error('message'))
    },2000);
})


.then(result => console.log('Result:'+result))
.catch(err => console.log('Error:'+err.message))