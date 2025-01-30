const mongoose = require('mongoose')


module.exports ={
    connect : async () =>{
        try {
           await mongoose.connect(process.env.DB_CONNECTION_STRING)
           console.log('Connect Successful');
        } catch (error) {
            console.log('Connect failed!!!')
        }
    }
}