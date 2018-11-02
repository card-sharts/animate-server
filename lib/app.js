const express = require('express');
const app = express();
const morgan = require('morgan');
const { resolve } = require('path');
const errorHandler = require('./util/error-handler');
const redirectHttp = require('./util/redirect-http');
const checkConnection = require('./util/check-connection');

if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttp());
}

require('./models/register-plugins');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

const essays = require('./routes/essays');
const auth = require('./routes/auth');

if(process.env.NODE_ENV !== 'production') {
    app.use(checkConnection());
}

app.use('/api/essays', essays);
app.use('/api/auth', auth);

app.use((req, res) => {
    res.sendFile('index.html', {
        root: resolve(__dirname + '/../public/')
    });
});

app.use(errorHandler());

module.exports = app;