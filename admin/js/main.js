var user;
layui.use(['form', 'element', 'layer', 'jquery'], function () {
    $ = layui.jquery;
    //icon动画
    $(".panel a").hover(function () {
        $(this).find(".layui-anim").addClass("layui-anim-scaleSpring");
    }, function () {
        $(this).find(".layui-anim").removeClass("layui-anim-scaleSpring");
    })
    $(".panel a").click(function () {
        parent.addTab($(this));
    })

    // 加载系统基本参数
    $.ajax({
        url: "../ajax.php?act=systemParameter",
        type: "get",
        dataType: "json",
        success: function (data) {
            var item = data.data,
                this_version = item.version;
            user = item.user;
            $(".version").text(this_version);// 当前版本
            $(".php_version").text(item.php_version);// PHP版本
            $(".server").text(item.server);// 服务器环境
            $(".host").text(item.host);// 服务器 (IP/端口)
            $(".server_software").text(item.server_software);// 脚本解释引擎
            $(".upload_max").text(item.upload_max);// 允许最大上传文件
            $(".root").text(item.root);// 安装目录
            $(".loginTime").text(item.loginTime);// 上次登录时间
            // 检测更新
            $.get('https://pan.amoli.co/AmoliCloud.php?act=version', function (data) {
                var new_version = data.version;
                if (new_version != this_version) {
                    $("#new_version,#new").css('color', '#FF5722');
                    $("#new").text('有新版本可用');
                    $("#new_version").text('点击查看更新内容');
                } else {
                    $("#new_version").text(new_version);
                }
            })
        }
    })
})

//获取系统时间
var newDate = '';
getLangDate();
//值小于10时，在前面补0
function dateFilter(date) {
    if (date < 10) { return "0" + date; }
    return date;
}
function getLangDate() {
    var dateObj = new Date(); //表示当前系统时间的Date对象
    var year = dateObj.getFullYear(); //当前系统时间的完整年份值
    var month = dateObj.getMonth() + 1; //当前系统时间的月份值
    var date = dateObj.getDate(); //当前系统时间的月份中的日
    var day = dateObj.getDay(); //当前系统时间中的星期值
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var week = weeks[day]; //根据星期值，从数组中获取对应的星期字符串
    var hour = dateObj.getHours(); //当前系统时间的小时值
    var minute = dateObj.getMinutes(); //当前系统时间的分钟值
    var second = dateObj.getSeconds(); //当前系统时间的秒钟值
    var timeValue = "" + ((hour >= 12) ? (hour >= 18) ? "晚上" : "下午" : "上午"); //当前时间属于上午、晚上还是下午
    newDate = dateFilter(year) + "年" + dateFilter(month) + "月" + dateFilter(date) + "日 " + " " + dateFilter(hour) + ":" + dateFilter(minute) + ":" + dateFilter(second);
    document.getElementById("nowTime").innerHTML = "亲爱的 <b>" + user + "</b> ，" + timeValue + "好！ 欢迎您使用Amoli私有云，一路陪伴，感恩有你！当前时间为： " + newDate + "　" + week;
    setTimeout("getLangDate()", 1000);
}