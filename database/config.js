const mongoose = require('mongoose')

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN,  {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true
        });
        console.log('db started');
    } catch (err) {
        console.log(err);
        throw new Error('Error in database');
    }
}

module.exports = {
    dbConnection
}