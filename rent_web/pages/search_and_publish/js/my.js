
// 筛选切换点击事件
function shaixuanvis() {

    $('#shaixua').toggle(300);
    $('#rent_type').toggle(300);
    $('#rent_plus').toggleClass('tab active');
}

function typebtn(view) {

    $('.btn-primary.typebtn').toggleClass('btn-primary');

    $(view).toggleClass('btn-primary');

    $($(view).parent()).attr('data-chooseType', $(view).attr('id'));

}

function rentbtn(view) {

    $('.btn-primary.rentbtn').toggleClass('btn-primary');

    $(view).toggleClass('btn-primary');

    $($(view).parent()).attr('data-chooseRent', $(view).attr('id'));

}

//卡片视图增加引擎
// function addCard(info_arr) {
//
//
//     info_arr.forEach(function (item, i, array) {
//
//
//         var title = item['title'],
//             jiage = item['min_rmb'] + '~' + item['max_rmb'],
//             link = item['link'],
//             time = item['wordtime'];
//
//         var imgs, li;
//
//         var idnum = RndNum(6);
//
//
//         var card = "<div id='card" + idnum + "' class=\"card img-fluid\" style=\"width:100%;background-color: #ffffff;margin-top: 5px;margin-bottom: 5px;opacity: 0.5;\">\n" +
//             "\n"
//             +
//             "        <div class=\"card-img-overlay\"\n" +
//             "             style=\"height: 105px;position: relative;bottom:0;padding-bottom:0;line-height: 0;background-color: rgba(255,255,255,0.63)\">\n" +
//             "            <!--            <h4 class=\"card-title\">John Doe</h4>-->\n" +
//             "            <p class=\"card-text\" style=\"line-height: 1;\"><a class=\"card-text\" data-toggle=\"modal\" data-target=\"#myModal\" onclick='topview(this)' style='color: black' href='" + link + "'>" + title + "</a></p>\n" +
//             "            <div class=\"row\">\n" +
//             "                <h5 class=\"col-6\" style=\"width: 4em;color: #e64a19;\">￥" + jiage + "</h5>\n" +
//             "                <h6 class=\"col-6\" style=\"width: 4em;\">" + time.substr(0, 10) + "</h6>\n" +
//             "            </div>\n" +
//             "\n" +
//             "\n" +
//             "        </div>\n" +
//             "    </div>";
//
//
//         $('#body').append(card);
//
//         setTimeout(function () {
//             $("#card" + idnum + "").animate({
//
//                 opacity: '1'
//
//             }, "slow");
//         }, i * 300);
//
//
//     });
//
// }

function search() {

    addloadingView();
    shaixuanvis();
    delectCard();
    $('#bkg').remove();
    $('#body').attr('data-pages', 0);
    var low = $('#low_RMB').val();
    var top = $('#top_RMB').val();

    if (low === "") low = 0;
    if (top === "") top = 9999;

    $.ajax({
        type: "POST", //提交方式
        url: "search.php",//路径
        data: {
            "min": low,
            "max": top,
            'c': $('#citys').attr('data-city'),
            'page': $('#body').attr('data-pages'),
            "w": JSON.stringify(clear_arr_trim($('#keywords').val().split(" ")))

        },//数据，这里使用的是Json格式进行传输
        success: function (result) {//返回数据根据结果进行相应的处理
            loadsuccess();
            addCard(result);
            $('#body').attr('data-pages', 1);
            $('#loadbtn').show();
        }
    });

}

/**
 * 过滤JS数组中的空值，返回新的数组
 * @param array 需要过滤的数组
 * @returns {Array} []
 */
function clear_arr_trim(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == "" || typeof(array[i]) == "undefined") {
            array.splice(i, 1);
            i = i - 1;
        }
    }
    return array;
}

function res_arr(result) {

    result.forEach(function (item, index) {

        addCard(item);

    })

}

function delectCard() {

    $('.img-fluid').remove();
}


/*防止滚动过快，服务端没来得及响应造成多次请求*/
function getnextdata() {

    addloadingView();
    var low = $('#low_RMB').val();
    var top = $('#top_RMB').val();

    if (low === "") low = 0;
    if (top === "") top = 9999;

    $.ajax({
        type: "POST", //提交方式
        url: "search.php",//路径
        data: {
            "min": low,
            "max": top,
            'c': $('#citys').attr('data-city'),
            'page': $('#body').attr('data-pages'),
            "w": JSON.stringify(clear_arr_trim($('#keywords').val().split(" ")))

        },//数据，这里使用的是Json格式进行传输
        success: function (result) {//返回数据根据结果进行相应的处理
            loadsuccess();
            addCard(result);
            $('#body').attr('data-pages', parseInt($('#body').attr('data-pages')) + 1);
        }
    });

}

function addloadingView() {

    var view = " <div id='loadingview' class=\"alert alert-info\">\n" +
        "    <strong>全网搜索中</strong> 租房信息马上就到！\n" +
        "  </div>";

    $('.alert-danger').after(view);

}

function loadsuccess() {

    $('#loadingview').remove();
    var view = " <div id='loaded' class=\"alert alert-info\">\n" +
        "    <strong>运气不错!</strong>小明给你找到全部符合的信息，慢慢选哦.\n" +
        "  </div>";

    $('#alertinfo').after(view);
    setTimeout(function () {
        $('#loaded').remove();
    }, 15000);

}

//产生随机数函数
function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

//显示弹窗
function topview(view) {


    $('#openif').attr('href', $(view).attr('href'));

    $('#iframe').attr('src', $(view).attr('href'));

    console.log('XXX' + $(view).text())
}

//--------------上拉加载更多---------------


//-----------------结束--------------------

// function saveSet() {
//     $.cookie('low_RMB', $('#low_RMB').val());
//     $.cookie('top_RMB', $('#top_RMB').val());
//     $.cookie('keywords', $('#keywords').val());
// }

// loadSet();
//
// function loadSet() {
//     $('#low_RMB').val($.cookie('low_RMB'));
//     $('#top_RMB').val($.cookie('top_RMB'));
//     $('#keywords').val($.cookie('keywords'));
//     switch ($.cookie('citybtn')) {
//         case 'hz':
//             $('#hz').click();
//             break;
//         case 'bj':
//             $('#bj').click();
//             break;
//         case 'sh':
//             $('#sh').click();
//             break;
//         case 'gz':
//             $('#gz').click();
//             break;
//
//         default:
//             $('#hz').click();
//
//     }
// }
