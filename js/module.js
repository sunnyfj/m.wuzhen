function obtainCodes(id){
	var oBtn = document.getElementById(id);
	if(oBtn){
		oBtn.onclick = function(){
			var count = 60;
			// 1、让button不可点
			oBtn.disabled = true;
			// 2、改变button的文字 - 开始倒计时
			function dao(){
				oBtn.value = count +'秒后重新发送';
				count -- ;
				// 判断 - 当count等于0，重新发送
				if(count < 0){
					clearInterval(timer);
					oBtn.disabled = false;
					oBtn.value = '点击重新发送';
				}
			}
			dao();
			var timer = setInterval(dao,1000)
		}
	}
}
//上传图片
function imgChange(el) {
	
    var imgAdd =  el.parent().prev('.fit-addImg');
    var fileList = el.prop('files');
    var imgArr = [];
    //遍历获取到得图片文件
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(fileList[i]);
        imgArr.push(imgUrl);
        var img = $('<img />');
        img.attr("src", imgArr[i]);
        imgAdd.append(img);
    };
    imgRemove(el);
};

function imgRemove(el) {

    var imgs = el.parent().prev('.fit-addImg').find('img');

    var mask = $('#dialog-remove');
    var cancel = mask.find(".z_cancel");
    var sure = mask.find(".z_sure");
    for (var j = 0; j < imgs.length; j++) {
        imgs.eq(j).on('click',function(){
        	mask.show();
        	var _this = $(this);
        	cancel.on('click',function(event) {
	    		mask.hide();
	    	});
	    	sure.on('click',function(event) {
	    		mask.hide();
	    		_this.remove();
	    	});
        })
    };
    
};

//限时抢购倒计时
var interval = 1000; 
function tuDou(n){
    if(n<10) {
        return '0'+n;
    }else{
        return n;
    } 
}
function ShowCountDown(year,month,day,downname){ 
    var now = new Date(); 
    var endDate = new Date(year, month-1, day); 
    var leftTime=endDate.getTime()-now.getTime(); 
    var leftsecond = parseInt(leftTime/1000); 
    var day1=Math.floor(leftsecond/(60*60*24)); 
    var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
    var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
    var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
    var countdown = document.getElementById(downname); 
    var showTimes = countdown.querySelectorAll('span');
    showTimes[0].innerHTML = tuDou(day1);
    showTimes[1].innerHTML = tuDou(hour);
    showTimes[2].innerHTML = tuDou(minute);
    showTimes[3].innerHTML = tuDou(second);
}
$(function(){

	//页面加载完需要判断的内容
	$(window).on('load',function(){
		for(var i=0; i<$('.nio-bottom-btn').length; i++){
			if($('.nio-bottom-btn').eq(i).prev().find('li').length <=2 ) {
				$('.nio-bottom-btn').eq(i).hide();
			}
		}
	})




	$('.fit-file input').on('change',function(e){
		imgChange($(this));
	})
	//房型选择
	$('.choice-package ul li').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
	})



	//弹出层
	$('#btn_moreComment').on('click',function(){
		$('.more-comment').fadeIn();
		$('html').addClass('more_prohibit_html');
	})
	$('.more-comment-close').on('click',function(){
		$('.more-comment').fadeOut(100);
		$('html').removeClass('more_prohibit_html');
	})

	$('#btn_morePackage').on('click',function(){
		$('.more-package').fadeIn(100);
		$('html').addClass('more_prohibit_html');
	})
	$('.more-package-close').on('click',function(){
		$('.more-package').fadeOut(100);
		$('html').removeClass('more_prohibit_html');
	})

	$('#btn_moreTrip').on('click',function(){
		$('.more-trip').fadeIn(100);
		$('html').addClass('more_prohibit_html');
	})
	$('.more-trip-close').on('click',function(){
		$('.more-trip').fadeOut(100);
		$('html').removeClass('more_prohibit_html');
	})
	//酒店设施弹出
	$('#btn_H-detail').on('click',function(){
		$('.more-H-detail').fadeIn(100);
		$('html').addClass('more_prohibit_html');
	})
	$('.more-H-detail-close').on('click',function(){
		$('.more-H-detail').fadeOut(100);
		$('html').removeClass('more_prohibit_html');
	})
	//房间详情预订须知弹出
	/*$('#room-detailsNotice-btn').on('click',function(){
		$('.more-detailsNotice').fadeIn(100);
		$('html').addClass('more_prohibit_html');
	})
	$('.more-detailsNotice-close').on('click',function(){
		$('.more-detailsNotice').fadeOut(100);
		$('html').removeClass('more_prohibit_html');
	})
*/


	//房间详情温馨提示弹出
	/*$('#room-detailsPrompt-btn').on('click',function(){
		$('.more-detailsPrompt').fadeIn(100);
		$('html').addClass('more_prohibit_html');
	})
	$('.more-detailsPrompt-close').on('click',function(){
		$('.more-detailsPrompt').fadeOut(100);
		$('html').removeClass('more_prohibit_html');
	})*/


	//列表页展开
	var AthisText = $('.nio-bottom-btn .btn-a').eq(0).text();
	$('.nio-bottom-btn .btn-a').on('click',function(){
		if($(this).parent().prev().hasClass('ul-height')){
			if ($(this).parent().prev().find('li').length>2) {
				$(this).parent().prev().removeClass('ul-height');
				$(this).text('收起');
				$(this).addClass('active');
			}else{
				alert('没有更多了')
			}
		}else{
			$(this).parent().prev().addClass('ul-height')
			$(this).text(AthisText);
			$(this).removeClass('active');
		}
	})
	//美食详情页加减
	$('.choice-date-number .number .add').on('click',function(){
		var num=Number($(this).prev().text());
		num++;
		$(this).prev().text(num);
	})
	$('.choice-date-number .number .reduce').on('click',function(){
		var num=Number($(this).next().text());
		num--;
		if(num<1){
			num=1;
			alert('不能再减少了');
		}
		$(this).next().text(num);
	})
	//会议列表页 选项
	/*$('.newList-choice li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})*/
	//购物娱乐详情页 加减
	$('.shopping-munber .add').on('click',function(){
		var num=Number($(this).prev().text());
		num++;
		$(this).prev().text(num);
	})
	$('.shopping-munber .reduce').on('click',function(){
		var num=Number($(this).next().text());
		num--;
		if(num<1){
			num=1;
			alert('不能再减少了');
		}
		$(this).next().text(num);
	})
	//票务 购物娱乐 筛选
	var $aLi = $('.shopping-option ul li');
	for(var i=0; i<$aLi.length-1; i++){
		$aLi.eq(i).click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.newList-modular .newList-modular-certain').eq($(this).index()).show().siblings().hide();
		})
	}

	$('.click-open a').click(function(event) {
		$(this).toggleClass('open');
		if($(this).hasClass('open')){
			$('.shopping-option ul').animate({'height':'1.92rem'},300);
		}else{
			$('.shopping-option ul').animate({'height':'0.746667rem'},300);
		}
	});

	//已查看点击预约
	$('.confirmClick').click(function(event) {
		$(this).find('.icon').toggleClass('active');
	});
	//
	$('.appointed-link a').click(function(event) {
		if(!$('.confirmClick').find('.icon').hasClass('active')){
			return false;
		}
	});
	//桐乡市民预约选择
	$('.co-option .options a').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
	//桐乡市民from反馈
	$('#t-sm').on('click',function(event) {
		$('#t-Prompt').show();
	});
	/*$('#t-Prompt .determine').on('click',function(){
		$('#t-Prompt').hide();
	})*/

	//会议马上预约按钮
	$('.appointed-link a').click(function(event) {
        $('.submit-prompt').show();
	});
	//详情页查看更多
	var datails_bFlag = true;
	var changeHeightChild = $('.datails-text-hidden').find('p').height();
	var changeHeight = $('.datails-text-hidden').height();
	if(changeHeight-changeHeightChild < 10 && changeHeight-changeHeightChild >-10 ){
		$('#datails-text-hidden-btn').hide();
	}
	$('#datails-text-hidden-btn a').click(function(event) {
		if(datails_bFlag){
			if(changeHeight-changeHeightChild < 10 && changeHeight-changeHeightChild >-10 ){
				alert('没有更多了');
				return;
			}else{
				$('.datails-text-hidden').height(changeHeightChild);
				$(this).text('收起 >');
				datails_bFlag = false;
			}
		}else{
			$('.datails-text-hidden').height('0.96rem');
			$(this).text('查看更多 > ');
			datails_bFlag = true;
		}
	});
	//收藏
	$('.collection').click(function(event) {
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			setTimeout(function(){
				alert('取消收藏');
			},100)
		}else{
			$(this).addClass('active');
			setTimeout(function(){
				alert('收藏成功');
			},100)
		}
		
	});
	
	//购物车
	//点击商品按钮
	$(".goodsCheck").click(function() {
        var goods = $(this).closest('.order-module').find('.goodsCheck'); //获取本店铺的所有商品
        var goodsC = $(this).closest('.order-module').find('.goodsCheck:checked'); //获取本店铺所有被选中的商品
        var Shops = $(this).closest('.order-module').find('.shopCheck'); //获取本店铺的全选按钮
        if (goods.length == goodsC.length) { //如果选中的商品等于所有商品
            Shops.prop('checked', true); //店铺全选按钮被选中
            if ($('.shopCheck').length == $('.shopCheck:checked').length) { //如果店铺被选中的数量等于所有店铺的数量
                $('#AllCheck').prop('checked', true); //全选按钮被选中
                //TotalPrice();
            } else {
                $('#AllCheck').prop('checked', false); //else全选按钮不被选中 
                //TotalPrice();
            }
        } else { //如果选中的商品不等于所有商品
            Shops.prop('checked', false); //店铺全选按钮不被选中
            $('#AllCheck').prop('checked', false); //全选按钮也不被选中
            // 计算
            //TotalPrice();
            // 计算
        }
    });
    // 点击店铺按钮
    $('.shopCheck').click(function() {
        if ($(this).prop('checked') == true) { //如果店铺按钮被选中
            $(this).parents('.order-module').find('.goods-check').prop('checked', true); //店铺内的所有商品按钮也被选中
            if ($('.shopCheck').length == $('.shopCheck:checked').length) { //如果店铺被选中的数量等于所有店铺的数量
                $('#AllCheck').prop('checked', true); //全选按钮被选中
                //TotalPrice();
            } else {
                $('#AllCheck').prop('checked', false); //else全选按钮不被选中
                //TotalPrice();
            }
        } else { //如果店铺按钮不被选中
            $(this).parents('.order-module').find('.goods-check').prop('checked', false); //店铺内的所有商品也不被全选
            $('#AllCheck').prop('checked', false); //全选按钮也不被选中
            //TotalPrice();
        }
    });
    // 点击全选按钮
    $('#AllCheck').click(function() {
        if ($(this).prop('checked') == true) { //如果全选按钮被选中
            $('.goods-check').prop('checked', true); //所有按钮都被选中
            //TotalPrice();
        } else {
            $('.goods-check').prop('checked', false); //else所有按钮不全选
            //TotalPrice();
        }
        $('.shopCheck').change(); //执行店铺全选的操作
    });
    //计算
    /*function TotalPrice() {
        var allprice = 0; //总价
        $('.order-module').each(function() { //循环每个店铺
            var oprice = 0; //店铺总价
            $(this).find('.goodsCheck').each(function() { //循环店铺里面的商品
                if ($(this).is(":checked")) { //如果该商品被选中
                    var num = parseInt($(this).parents('.order-mc-product .number').find('span').text()); //得到商品的数量
                    var price = parseFloat($(this).parents('.order-mc-product').find(".price").text()); //得到商品的单价
                    var total = price * num; //计算单个商品的总价
                    oprice += total; //计算该店铺的总价
                }
                $(this).closest(".shop-group-item").find(".ShopTotal").text(oprice.toFixed(2)); //显示被选中商品的店铺总价
            });
            var oneprice = parseFloat($(this).find(".ShopTotal").text()); //得到每个店铺的总价
            allprice += oneprice; //计算所有店铺的总价
        });
        $("#AllTotal").text(allprice.toFixed(2)); //输出全部总价
    }*/
    //登录切换
	$('.login-tab div').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		$('.login-bottom').find('.form-item').eq(index).addClass('active').siblings().removeClass('active');
	})
	//注册切换
	$('.register-tab li').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		$('.register-form').find('.register-form-item').eq(index).addClass('active').siblings().removeClass('active');
	})
	$('.register-in').on('click',function(event) {
		$('.submit-prompt').show();
	});
	$('.back-pass').on('click',function(event) {
		$('.submit-prompt').show();
	});

	//找回密码验证码按钮 obtainCodes(id);
	obtainCodes('backPass');
	//手机注册验证码按钮
	obtainCodes('phoneReg');
	//邮箱注册验证码按钮
	obtainCodes('emailReg');
	//登录验证码按钮
	obtainCodes('loginUp');
	//绑定手机
	obtainCodes('bindPhone');


	//订单管理
	$('#order_state').on('click',function(){
		$('#os_content').show();
		$('html').addClass('popup_prohibit_html');
	})
	$('#os_content .determine').on('click',function(){
		$('#os_content').hide();
		$('html').removeClass('popup_prohibit_html');
	})

	$('#order_type').on('click',function(){
		$('#ot_content').show();
		$('html').addClass('popup_prohibit_html');
	})
	$('#ot_content .determine').on('click',function(){
		$('#ot_content').hide();
		$('html').removeClass('popup_prohibit_html');
	})

	//星星评分
	for(var i=0;i<$('.die-score-star').length; i++){
		$('.die-score-star').eq(i).find('i').on('touchstart',function(){
			for(var j=0;j<5;j++){
				if($(this).index() >= j){
					$(this).parent('.die-score-star').find('i').eq(j).addClass('on');
				}else{
					$(this).parent('.die-score-star').find('i').eq(j).removeClass('on');
				}
			}
			$(this).parent('.die-score-star').next('span').text(($(this).index()+1)+'分');
		})
	}
	//评价成功
	$('.evaluate-sub').on('click',function(){
		$('#succ').show();
	})
	$('#succ').find('a').on('click',function(){
		$('#succ').hide();
	})
	//取消退款订单
	$('#cancel-order').click(function(event) {
		$('#cancel-dialog').show();
	});
	$('#cancel-dialog .z_cancel').click(function(event) {
		$('#cancel-dialog').hide();
	});
	//全部订单删除弹窗
	$('.list-title .right a').on('click',function(){
		$('#dialog-cancelOrders').show();
	})
	$('#dialog-cancelOrders .z_cancel').on('click',function(){
		$('#dialog-cancelOrders').hide();
	})





	//消息中心
	$('.news-tab a').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.news-list .news-list-item').eq($(this).index()).addClass('active').siblings().removeClass('active');
	})
	$('.news-list-item li a').on('click',function(){
		$('.more-pop').show();
	})
	$('.more-pop').find('.more-pop-close').on('click',function(){
		$(this).parents('.more-pop').hide();
	})

	//账户管理
	$('.acc-management li input').on('change',function(){
		var fileList = $(this).prop('files');
		var imgUrl = window.URL.createObjectURL(fileList[0]);
		$(this).prev().find('img').attr('src',imgUrl);
	})
	$('.acc-btn .cancel').on('click',function(){
		$('.submit-prompt').show();
	})



	//绑定手机反馈
	$('.account-sub #test').on('click',function(){
		$('.submit-prompt').show();
	})

	//收藏夹 筛选
	$('#favorites-btn').click(function(event) {
		$('#favorites').show();
	});
	$('#favorites .determine').click(function(event) {
		$('#favorites').hide();
	});



	//一卡通


	//消费卡密码绑定
	$('#card_bd').on('click',function(){
		$('#confirmBinding').show();
	})
	$('#confirmBinding .cancel').on('click',function(){
		$('#confirmBinding').hide();
	})

	$('#confirmBinding .confirmbd').on('click',function(){
		$('#confirmBinding').hide();
		$('#succBinding').show();
	})
	$('#succBinding .determine').on('click',function(){
		$('#succBinding').hide();
	})

	//消费卡设置密码提示
	$('#subPass').on('click', function() {
		$('#subPassPrompt').show();
	});
	$('#subPassPrompt .determine').on('click',function(){
		$('#subPassPrompt').hide();
	})

	//消费卡重置密码反馈
	$('#resetPass').on('click', function() {
		$('#resetPassPrompt').show();
	});
	$('#resetPassPrompt .determine').on('click',function(){
		$('#resetPassPrompt').hide();
	})

	//密码管理反馈
	$('.adminPass').on('click', function() {
		$('#adminPassPrompt').show();
	});
	$('#adminPassPrompt .determine').on('click',function(){
		$('#adminPassPrompt').hide();
	})

	//消费记录 卡号下拉
	$('#record-select-btn').on('click',function(event) {
        $('#record-selectNum').show();
        $('html').addClass('popup_prohibit_html');
    });
    $('#record-selectNum .determine').on('click',function(){
        $('#record-selectNum').hide();
        $('html').removeClass('popup_prohibit_html');
    })

    //消费记录 消费场景
    $('#onsume-scene').on('click',function(event) {
        $('#record-selectScene').show();
        $('html').addClass('popup_prohibit_html');
    });
    $('#record-selectScene .determine').on('click',function(){
        $('#record-selectScene').hide();
        $('html').removeClass('popup_prohibit_html');
    })
    //消费记录 交易类型
    $('#onsume-type').on('click',function(event) {
        $('#record-selectType').show();
        $('html').addClass('popup_prohibit_html');
    });
    $('#record-selectType .determine').on('click',function(){
        $('#record-selectType').hide();
        $('html').removeClass('popup_prohibit_html');
    })
	


	//休闲卡 支付选择
	$('.pay-method .pay-method-item').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
	})
	//休闲卡解除绑定
	$('#unbinding-btn').on('click',function(){
		$('#unbinding-prompt').show();
	})
	$('#unbinding-prompt .determine').on('click',function(){
		$('#unbinding-prompt').hide();
	})


	//确认订单页选择支付方式
	$('.confirm-pay-mode .mode-list-item').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
	})



	//消费记录 日历选择
	function compareArr(arr1,arr2){
        if( parseInt(arr1[0]) > parseInt(arr2[0]) ){
            return true;
        }else if(parseInt(arr1[0]) < parseInt(arr2[0])){
            return false;
        }else{
            if( parseInt(arr1[1]) > parseInt(arr2[1]) ){
                return true;
            }else if( parseInt(arr1[1]) < parseInt(arr2[1]) ){
                return false;
            }else{
                if( parseInt(arr1[2]) >= parseInt(arr2[2]) ){
                    return true;
                }else{
                    return false;
                }
            }
        }
    };
	$('#leaveDate').on('change',function(){
        var leaveVal = $(this).val();
        var startVal = $('#startDate').val();
        var leaveArr = leaveVal.split('-');
        var startArr = startVal.split('-');
        if(compareArr(leaveArr,startArr) ==false){
            $('#dataRange').fadeIn(100);
        }else{
            //需要ajax加载的信息
        }
        
    })
    $('#startDate').on('change',function(){
        var startVal= $(this).val();
        var leaveVal = $('#leaveDate').val();
        var leaveArr = leaveVal.split('-');
        var startArr = startVal.split('-');

        if(compareArr(leaveArr,startArr) ==false){
            $('#dataRange').fadeIn(100);
        }else{
            //需要ajax加载的信息
        }
        
    })

    $('#dataRange .determine').on('click',function(){
        $('#dataRange').fadeOut(100);
    })


    //私人订制 ↓

    //判断房型或类型少于2个影藏展开按钮
    for(var i=0; i<$('.merge').length; i++){
        if($('.merge').eq(i).find('li').length<=2){
            $('.merge').eq(i).next('.custom-item-open').hide();
        }
    }

    //房型或类型展开 & 收起
    $('.custom-item-open a').on('click',function(){
        if($(this).parent().prev('ul').hasClass('merge')){
            $(this).parent().prev('ul').removeClass('merge');
            $(this).text('收起');
            $(this).addClass('active');
        }else{
            $(this).parent().prev('ul').addClass('merge');
            $(this).text('展开');
            $(this).removeClass('active');
        }
    })
    
    //左侧tab 点击切换
    $('.custom-tab li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        var thisIndex = $(this).index();
        $('.custom-content .custom-showblock').eq(thisIndex).addClass('active').siblings().removeClass('active');
    })

    //列表产品 加加按钮
    $('.custom-add').on('click',function(){
        if($(this).parent().find('a').length ==1){                
            var span = $('<span>1</span>');
            var reduce = $('<a class="custom-reduce" href="javascript:;"></a>');
            $(this).before(span);
            $(this).parent().prepend(reduce);
            //底部购物车状态
            var cart = $('<img src="../images/cart-wrap2.png"><span>99+</span>');
            var cartInfo = $('<p>套餐价：<b><span>6506</span>元</b><a class="settlement" href="javascript:;">去结算</a></p>');
            $('.cart-wrap .cart-icon').html(cart);
            $('.cart-wrap .cart-info').html(cartInfo);

        }else{    
            var n = parseInt($(this).prev('span').text());
            n++;
            $(this).prev('span').text(n);
        }                
    })
    //列表产品 减减按钮
    $('.modifyNum').on('click','.custom-reduce',function(){
        var n = parseInt($(this).next('span').text());
        n--;
        if(n<1){
            $(this).parent('.modifyNum').find('span').remove();
            $(this).remove();

            //底部购物车状态
            var cart = $('<img src="../images/cart-wrap1.png">');
            var cartInfo = $('<p>选择3类以上产品可享受满立减优惠</p>');
            $('.cart-wrap .cart-icon').html(cart);
            $('.cart-wrap .cart-info').html(cartInfo);
        }
        $(this).next('span').text(n);
    })

    //cart-wrap点击显示 选中list
    $('#cart-num').on('click',function(){
    	if($(this).find('span').length ==0){
    		return;
    	}else{
    		$('.cart-list').show();
	        $('.cart-data-opa').addClass('show');
	        $('html').addClass('more_prohibit_html');
    	}
        
    })

    //选中list隐藏
    $('.cart-data-opa').on('click',function(){
        $('.cart-list').hide();
        $('.cart-data-opa').removeClass('show');
        $('html').removeClass('more_prohibit_html');
    })

    //选中list清空
    $('#clearAll').on('click',function(){
        $('.cart-list').html('');
        $('.cart-list').hide();
        $('.cart-data-opa').removeClass('show');

        //底部购物车状态
        var cart = $('<img src="../images/cart-wrap1.png">');
        var cartInfo = $('<p>选择3类以上产品可享受满立减优惠</p>');
        $('.cart-wrap .cart-icon').html(cart);
        $('.cart-wrap .cart-info').html(cartInfo);

        $('html').removeClass('more_prohibit_html');
    })

    //选中list 减减按钮
    $('.cart-item-reduce').on('click',function(){
        var n = $(this).next('span').text();
        n--;
        if(n<1){                    
            if($(this).parents('.cart-lc-blocks').find('li').length ==1){
                $(this).parents('.cart-lc-blocks').remove();
            }else{
                $(this).parents('li').remove();
            }
        }  
        $(this).next('span').text(n);
    })

    //选中list 加加按钮
    $('.cart-item-add').on('click',function(){
        var n = $(this).prev('span').text();
        n++;
        $(this).prev('span').text(n);
    })
    //优惠卷选择
    $('.custom-discount input').on('click',function(){
    	$('#custom-select').show();
    	$('html').addClass('more_prohibit_html');
    })
    $('#custom-select .determine').on('click',function(){
    	var activeTxt = $(this).parents('#custom-select').find('li.active p').text();
    	$('.custom-discount input').val(activeTxt);
    	$('#custom-select').hide();
    	$('html').removeClass('more_prohibit_html');
    })

    //私人订制 ↑

    //懒人模式
    $('#shortcut-select-btn').on('click',function(){
        $('#my_budget').show();
        $('html').addClass('more_prohibit_html');
    })
    $('#my_budget .determine').on('click',function(){
        var activeText = $('#my_budget').find('li.active p').text();
        $('#shortcut-select-btn').find('input').val('我的预算约：'+activeText)
        $('#my_budget').hide();
        $('html').removeClass('more_prohibit_html');
    })



    //卡卷
    $('#cardVolume-tab li').on('click',function(){
    	$(this).addClass('active').siblings().removeClass('active');
    	var index = $(this).index();
    	$('.cardVolume .cardVolume-item').eq(index).addClass('active').siblings().removeClass('active');
    })

    //优惠卷专辑
	$('.un-receive .re-btn').on('click',function(){
	    $(this).text('已领取');
	    $(this).parents('.un-receive').removeClass('un-receive').addClass('in-receive');
	})


	//居民证申请反馈
	$('#resident-sub').on('click',function(){
		$('#resident-form-succ').show();
	})
	$('#resident-form-succ .determine').on('click',function(){
		$('#resident-form-succ').hide();
	})

	//服务帮助
	//意见提交反馈
	$('#opinion-sub').on('click',function(){
		$('#opinion-succ').show();
	})
	$('#opinion-succ .determine').on('click',function(){
		$('#opinion-succ').hide();
	})

	//问卷调查 li选择
	var sortNum = 0;
    $('.questionnaire-item li').on('click',function(){
    	//在题目及h5标签上有说明是单选、多选、排序等  
    	//然后同样在标题标签自定义属性 data-opt的值 sort:排序;  multiple : 多选; 单选可以不写 或radio  
        var method = $(this).parent().prev().attr('data-opt');
        if(method == 'multiple'){ 				//<- 多选
            $(this).toggleClass('active');
        }else if(method == 'sort'){ 			//<- 排序
            if($(this).hasClass('active')){
                if($(this).find('i').text() == sortNum){
                    $(this).removeClass('active');
                    $(this).find('i').text('');
                    sortNum--;
                }
            }else{
                $(this).addClass('active');
                sortNum++;
                $(this).find('i').text(sortNum);
            }
        }else{ 									//<- 单选
            $(this).addClass('active').siblings().removeClass('active');
        }
    })
})
