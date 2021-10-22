const mongoose = require("mongoose")
const userSchema = require("./db/user")

const config = process.env

 module.exports.init = () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Infinity,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };
    
    mongoose.connect('mongodb+srv://OTHERS:f1fNSswS98rp1oEu@uptime.xbtnz.mongodb.net/members', dbOptions)
    mongoose.Promise = global.Promise;
    
    mongoose.connection.on('connected', () =>{
      console.log('Mongoose has successfully connected!')
    });
    
    mongoose.connection.on('err', err => {
      console.error(`Mongoose connection error: \n${err.stack}`)
    });
    
    mongoose.connection.on('disconnected', () =>{
      console.warn('Mongoose connection lost')
    });
  }

 