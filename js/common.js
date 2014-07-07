$(function () {
    //点击抽奖 弹出窗口
    $('#win_btn').on('click',function () {
        $('#register').show()
    });
    //点击弹出框关闭按钮
    $('#close_register_pop').on('click',function () {
        $('#register').hide()
    });

    //点击登录
      $('#login_btn').on('click',function () {
        $('#login').show()
    });
    //关闭按钮
    $('#close_login_pop').on('click',function () {
        $('#login').hide()
    });
 	//点击登录页面抽奖 弹出登录窗口
    $('#win_btn2').on('click',function () {
        $('#login').show()
    });
    //关闭按钮
    $('#close_register_pop').on('click',function () {
        $('#register').hide()
    });

    //点击注册图标
    $('#regsiter_text').on('click',function () {
    	$('#login').hide();
    	$('#register').show();
    });
     $('#close_register_pop').on('click',function () {
        $('#register').hide()
    });
  

})