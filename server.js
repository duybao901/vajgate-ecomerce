require('dotenv').config();
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
    expressFileUpload({
        useTempFiles: true,
    }),
);

// connect mongoDB
const urlDB = process.env.urlDB;
mongoose.connect(
    urlDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    (err) => {
        if (err) throw err;
        console.log('Connect mongodb successfully 🚀');
    },
);

// Build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


// App
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.use('/user', require('./routers/users.route'));
app.use('/api', require('./routers/category.route'));
app.use('/api', require('./routers/upload'));
app.use('/api', require('./routers/products.route'));
app.use('/api', require('./routers/payments.route'));
