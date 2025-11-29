const express  = require('express');
const cors = require('cors');
require('dotenv').config();

//db
const connectToDatabase = require('./config/database');

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/tasks', require('./routes/tasks'));

connectToDatabase().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Failed to start server:", error);
})