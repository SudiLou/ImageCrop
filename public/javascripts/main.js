//处理图片加载与裁切上传
//监控上传控件的变化
$('#upLoadImg1').on('change', function() {
    if (document.getElementById("upLoadImg1").files.length === 0) {
        return;
    }
    var oFile = document.getElementById("upLoadImg1").files[0];
    if (!oFile) {
        return;
    }
    var fileName = oFile.name;
    var fileSize = oFile.size;
    var fileType = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
    if (fileType != '.jpg' && fileType != '.jpeg' && fileType != '.gif' && fileType != '.png' && fileType != '.bmp') {
        alert("请选择jpg,png,gif,bmp格式的图片");
        return;
    }
    if (fileSize > 2 * 1024 * 1024) {
        alert('最大支持2MB的图片');
        return;
    }
    var fileReader = new FileReader();
    fileReader.readAsDataURL(oFile);

    // 成功读取
    fileReader.onload = function(e) {
        // 显示弹窗
        $('.cover').show();
        // 将弹窗中的图片路径设置为选择的图片的base64
        $('#Img1').attr('src', e.target.result);
        // 裁切组件初始化
        initJcrop();
    };
});

//裁切在弹窗一显示的时候就应该初始化
var jcrop_api, widthScale, heightScale;

// destroy Jcrop if it is existed
if (typeof jcrop_api != 'undefined')
    jcrop_api.destroy();

function initJcrop() {
    $('#Img1').Jcrop({
        onChange: updateCoords,
        onSelect: updateCoords,
        onRelease: clearCoords,
        allowSelect: true,
        allowMove: true,
        aspectRatio: 1,
        boxWidth: 500,
        boxHeight: 500
    }, function() {
       /* //弹窗中显示的图片尺寸
        var bb = this.getBounds();
        var bWidth = Number(bb[0]) / 2;
        var bHeight = Number(bb[1]) / 2;
        //设置初始选中裁切范围
        this.setSelect([0, 0, bWidth, bHeight]);*/
        this.setSelect([0, 0, 200, 200]);
        //原始图片缩小比例
       /* try {
            widthScale = $('#Img1')["0"].width /200;
            heightScale = $('#Img1')["0"].height / 200;
        } catch (e) {}*/
        jcrop_api = this;
    });
}

//确定裁切范围的坐标（尺寸）,重绘canvas
function updateCoords(c) {
    var img = document.getElementById('Img1');
    var ctx = document.getElementById('myCanva').getContext('2d');
   /* try {
        widthScale = widthScale === 1 ? $('#Img1')["0"].width / 200 : widthScale;
        heightScale = heightScale === 1 ? $('#Img1')["0"].height / 200 : heightScale;
    } catch (e) { }

    //绘制canvas画布
    ctx.drawImage(img, c.x, c.y, c.w * widthScale, c.h * heightScale, 0, 0, 200, 200);*/
    ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, 200, 200);
}
//清除之前的裁剪事件
function clearCoords(){
    $('#upLoadImg1').val('');
}

//与后台通信，提交图片
$("#btnSave").click(function(){
    var data = document.getElementById('myCanva').toDataURL();
    $.ajax({
        url: 'http://localhost:3000/',
        type: 'POST',
        dataType: 'html',
        cache: false,
        data: {
            'imgData': data
        },
        success: function(res) {
            alert(res);
        },
        error: function(err) {
            alert(err);
        }
    });
});
