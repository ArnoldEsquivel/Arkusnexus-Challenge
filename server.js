const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

//Routes Import
const account = require('./server/routes/account');
const user = require('./server/routes/user');

app.use(cors({ origin: 'http://127.0.0.1:5173' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', account)
app.use('/api', user)

try {
    require("./server/models/mysql");
} catch (error) {
    console.log(error);
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})