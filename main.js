const express = require('express');
const app = express();
const fs = require('fs');

app.use('/public', express.static('public'));
app.use('/docs', express.static('docs'));

app.get('/get_docs', (req, res) => {
    var doc_list = fs.readdirSync('./docs', {withFileTypes:true});
    var ret = [];
    for (var i in doc_list) {
        if (doc_list[i].isDirectory()) {
            ret.push(doc_list[i].name);
        }
    }
    res.send(JSON.stringify({'ret': ret}));
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8880, () => {
    console.log('listening 127.0.0.1:8880...');
});
