var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page.*/
router.post('/', function(req, res, next) {
 /* res.render('index', { title: 'Express' });*/

    //接收前台POST过来的base64
    var imgData = req.body.imgData;
    //在images文件中存储图片，以当前的时间为图片命名
    var path = 'public/images/'+ Date.now() +'.png';
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(path, dataBuffer, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send("保存成功！");
        }
    });
});

module.exports = router;
