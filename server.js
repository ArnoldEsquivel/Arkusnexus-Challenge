const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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