const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//rotem
const contactRoutes = require('./api/contact/contact.routes');
const userRoutes = require('./api/user/user.routes');

// // routes
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
//
const port = process.env.PORT || 8000;
// const port = process.env.PORT || 8090;
app.listen(port);
console.log('API running at ', port);




