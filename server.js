require('dotenv').config();
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();


app.use('/user', require('./routers/users.route'));
app.use('/api', require('./routers/category.route'));
app.use('/api', require('./routers/upload'));
app.use('/api', require('./routers/products.route'));
app.use('/api', require('./routers/payments.route'));


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors())
app.use(
    expressFileUpload({
        useTempFiles: true,
    }),
);

// connect mongoDB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})

// Build

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


// App
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
