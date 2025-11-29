const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const connectionString = process.env.MONGO_CONN_STR;

        await mongoose.connect(connectionString);
        console.log("connected to DB");

        
    } catch (error) {
            console.log("could not connect to DB", error);
    }
}