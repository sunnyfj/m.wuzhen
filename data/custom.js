(function () {
    var type = 'hotel';
    var URL = '../data/data.json';
    var loadingHtml = '<div class="loading">加载中···</div>';
    var exist = ''; //存cookie中间值
    var take = '';  //取cookie中间值

    //获取数据
    function getData(){
        $.ajax({
            type:'GET',
            url:URL,
            cache:true,
            async:true,
            dataType:'json',
            beforeSend:function(){
                $('.loadingdiv').html(loadingHtml);
            },
            success:function(data){
                $('.loadingdiv').html('');
                $('#custom-lists').html('');
                var result;
                switch(type){
                    case 'hotel':
                    result = data.product.hotel;
                    getCookie();
                    break;
                    case 'ticket':
                    result = data.product.ticket;
                    getCookie();
                    break;
                    case 'food':
                    result = data.product.food;
                    getCookie();
                    break;
                    case 'service':
                    result = data.product.service;
                    getCookie();
                    break;
                    case 'other':
                    result = data.product.other;
                    getCookie();
                    break;
                }
                for(var i=0; i<result.length; i++){
                    var itemDiv = $('<div class="custom-item" data-id="'+result[i].id+'"></div>')

                    var itemTop = $('<div class="custom-item-top">'
                                +            '<div class="custom-img">'
                                +               ' <img src="'+result[i].img+'">'
                                +            '</div>'
                                +            '<div class="custom-text-title">'
                                +                '<h4><a href="hotel-details.html">'+result[i].title+'</a></h4>'
                                +                '<h5><span>'+result[i].price+'</span>元<i>起</i></h5>'
                                +                '<p>'
                                +                    '<span>已售'+result[i].monthlySales+'</span>'
                                +                    '<span>'+result[i].commentNum+'条评价</span>'
                                +                '</p>'
                                +             '</div>'
                                +       '</div>');

                    itemDiv.append(itemTop);
                    var ItemBot = $('<div class="custom-item-bottom"></div>');
                    var merge = $('<ul class="merge"></ul>');
                    var openBtn = $('<div class="custom-item-open"><a class="mybtn" href="javascript:;">展开</a></div><div class="point-triangle"></div>')
                    
                    var corre = take[i];
                    for(var j=0; j<result[i].roomType.length; j++){
                        
                        if(take =='' || corre == undefined){
                            var aLi = $('<li data-id="'+result[i].roomType[j].rId+'">'
                                +    '<p>'+result[i].roomType[j].rName+'</p>'
                                +    '<div class="price">'
                                +        '<b><span>'+result[i].roomType[j].rPrice+'</span>元</b>'
                                +        '<div class="modifyNum">'
                                /*+          '<a class="custom-reduce" href="javascript:;"></a>'// 使用cookie模拟
                                +            '<span>'+result[i].roomType[j].rNum+'</span>'*/
                                +            '<a class="custom-add" href="javascript:;"></a>'
                                +        '</div>'
                                +    '</div>'
                                +'</li>');
                        }else{
                            var aLi = $('<li data-id="'+result[i].roomType[j].rId+'">'
                            +    '<p>'+result[i].roomType[j].rName+'</p>'
                            +    '<div class="price">'
                            +        '<b><span>'+result[i].roomType[j].rPrice+'</span>元</b>'
                            +        '<div class="modifyNum">'
                            +          '<a class="custom-reduce" href="javascript:;"></a>'
                            +            '<span>'+corre[3]+'</span>'
                            +            '<a class="custom-add" href="javascript:;"></a>'
                            +        '</div>'
                            +    '</div>'
                            +'</li>');
                            
                        }
                        merge.append(aLi);
                    }
                    
                    ItemBot.append(merge);
                    ItemBot.append(openBtn);
                    itemDiv.append(ItemBot);

                    $('#custom-lists').append(itemDiv);
                }
            },
            error:function(data){
                console.log(data.status);
                alert('请求酒店数据出错！');
            }
        })
    }
    //获取左侧tab数据
    function getTabList(){
        $.ajax({
            type:'GET',
            url:URL,
            cache:true,
            async:true,
            dataType:'json',
            success:function(data){
                var oUl = $('<ul></ul>');
                for(var i=0; i<data.typeList.length; i++){                                          //↓ 为了使用cookie模拟
                    var aLi = $('<li data-type="'+data.typeList[i].type+'">'+data.typeList[i].title+/*'<i>'+data.typeList[i].num+'</i>*/'</li>');
                    oUl.append(aLi);
                }
                $('.custom-tab').append(oUl);
                $('.custom-tab').find('li').eq(0).addClass('active');
                getTabListNum();
            },
            error:function(data){
                console.log(data.status);
                alert('请求酒店数据出错！');
            }
        })
        
    }
    //获取tab数字
    function getTabListNum(){
        if($.fn.cookie('hotelStr')){
            var data = $.fn.cookie('hotelStr').split('|');
            var i = $('<i>'+data.length+'</i>')
            $('.custom-tab').find('li').eq(0).append(i);
        }else{
            $('.custom-tab').find('li').eq(0).find('i').remove();
        }
        if($.fn.cookie('ticketStr')){
           var data = $.fn.cookie('ticketStr').split('|');
            var i = $('<i>'+data.length+'</i>')
            $('.custom-tab').find('li').eq(1).append(i);
        }else{
            $('.custom-tab').find('li').eq(1).find('i').remove();
        }
        if($.fn.cookie('foodStr')){
            var data = $.fn.cookie('foodStr').split('|');
            var i = $('<i>'+data.length+'</i>')
            $('.custom-tab').find('li').eq(2).append(i);
        }else{
            $('.custom-tab').find('li').eq(2).find('i').remove();
        }
        if($.fn.cookie('serviceStr')){
            var data = $.fn.cookie('serviceStr').split('|');
            var i = $('<i>'+data.length+'</i>')
            $('.custom-tab').find('li').eq(3).append(i);
        }else{
            $('.custom-tab').find('li').eq(3).find('i').remove();
        }
        if($.fn.cookie('otherStr')){
            var data = $.fn.cookie('otherStr').split('|');
            var i = $('<i>'+data.length+'</i>')
            $('.custom-tab').find('li').eq(4).append(i);
        }else{
            $('.custom-tab').find('li').eq(4).find('i').remove();
        }
    }
    
    //底部list数据详细
    function getCartListDdetailed(data,type){
        if(data){
            //底部购物车状态
            var cart = $('<img src="../images/cart-wrap2.png"><span>99+</span>');
            var cartInfo = $('<p>套餐价：<b><span>6506</span>元</b><a class="settlement" href="javascript:;">去结算</a></p>');
            $('.cart-wrap .cart-icon').html(cart);
            $('.cart-wrap .cart-info').html(cartInfo);

            var hotelAll = data.split('|');

            var blocksHtml = $('<div class="cart-lc-blocks"></div>');
            var h4 = $('<h4>'+type+'</h4>');
            var ul = $('<ul></ul>')

            for(var i=0; i<hotelAll.length; i++){
                if(type== '酒店'){
                    var li = $(`<li>
                                <div class="cart-item-title">
                                    <h6>盛庭大床房盛庭大床房</h6>
                                    <div class="cart-item-modifyNum">
                                        <a class="cart-item-reduce" href="javascript:;"></a>
                                        <span>5</span>
                                        <a class="cart-item-add" href="javascript:;"></a>
                                    </div>
                                </div>
                                <div class="cart-item-data">
                                    <div class="cart-item-data-info">
                                        <p class="price">1688元</p>
                                        <p>1间1晚 <b><input type="text" readonly="readonly" value="2017-08-09">至<input readonly="readonly" type="text" value="2017-08-09"></b></p>
                                    </div>
                                    <div class="cart-item-btn">
                                        <a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>
                                    </div>
                                </div>
                            </li>`)
                }else{
                    var li = $(`<li>
                                    <div class="cart-item-title">
                                        <h6>盛庭大床房盛庭大床房</h6>
                                        <div class="cart-item-modifyNum">
                                            <a class="cart-item-reduce" href="javascript:;"></a>
                                            <span>5</span>
                                            <a class="cart-item-add" href="javascript:;"></a>
                                        </div>
                                    </div>
                                    <div class="cart-item-data">
                                        <div class="cart-item-data-info">
                                            <p class="price">1688元</p>
                                            <p>1间1晚 <b>游览日期：<input type="text" readonly="readonly" value="2017-08-09"></b></p>
                                        </div>
                                        <div class="cart-item-btn">
                                            <a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>
                                        </div>
                                    </div>
                                </li>`)
                }
                ul.append(li);
            }
            blocksHtml.append(h4);  
            blocksHtml.append(ul);       
            $('.cart-list-content').append(blocksHtml);
        }
    }
    //底部list数据获取
    function cartList(){
        $('.cart-list-content').html('');
        getCartListDdetailed($.fn.cookie('hotelStr'),'酒店');
        getCartListDdetailed($.fn.cookie('ticketStr'),'票务');
        getCartListDdetailed($.fn.cookie('foodStr'),'美食');
        getCartListDdetailed($.fn.cookie('serviceStr'),'服务');
        getCartListDdetailed($.fn.cookie('otherStr'),'其他');
        if($.fn.cookie('hotelStr') ==null && $.fn.cookie('ticketStr') ==null && $.fn.cookie('foodStr') ==null && $.fn.cookie('serviceStr') ==null && $.fn.cookie('otherStr') ==null ){
            //底部购物车状态
            var cart = $('<img src="../images/cart-wrap1.png">');
            var cartInfo = $('<p>选择3类以上产品可享受满立减优惠</p>');
            $('.cart-wrap .cart-icon').html(cart);
            $('.cart-wrap .cart-info').html(cartInfo);

            $('html').removeClass('more_prohibit_html');
        }
    }

    //写入cookie值
    function setCookie(){
        switch(type){
            case 'hotel':
                if($.fn.cookie('hotelStr')==null){
                    $.fn.cookie('hotelStr',exist, { expires: 7, path: '/' });
                }else{
                    var r = $.fn.cookie('hotelStr')+'|'+exist;
                    $.fn.cookie('hotelStr',r, { expires: 7, path: '/' });
                }
            break;
            case 'ticket':
                if($.fn.cookie('ticketStr')==null){
                    $.fn.cookie('ticketStr',exist , { expires: 7, path: '/' });
                }else{
                    var r = $.fn.cookie('ticketStr')+'|'+exist;
                    $.fn.cookie('ticketStr',r, { expires: 7, path: '/' });
                }
            break;
            case 'food':
                if($.fn.cookie('foodStr')==null){
                    $.fn.cookie('foodStr',exist, { expires: 7, path: '/' });
                }else{
                    var r = $.fn.cookie('foodStr')+'|'+exist;
                    $.fn.cookie('foodStr',r, { expires: 7, path: '/' });
                }
            break;
            case 'service':
                if($.fn.cookie('serviceStr')==null){
                    $.fn.cookie('serviceStr',exist, { expires: 7, path: '/' });
                }else{
                    var r = $.fn.cookie('serviceStr')+'|'+exist;
                    $.fn.cookie('serviceStr',r, { expires: 7, path: '/' });
                }
            break;
            case 'other':
                if($.fn.cookie('otherStr')==null){
                    $.fn.cookie('otherStr',exist, { expires: 7, path: '/' });
                }else{
                    var r = $.fn.cookie('otherStr')+'|'+exist;
                    $.fn.cookie('otherStr',r, { expires: 7, path: '/' });
                }
            break;
        }
    }

    //获取cookie值
    function getCookie(){
        take='';
        switch(type){
            case 'hotel':
                shearData($.fn.cookie('hotelStr'));
            break;
            case 'ticket':
                shearData($.fn.cookie('ticketStr'));
            break;
            case 'food':
                shearData($.fn.cookie('foodStr'));
            break;
            case 'service':
                shearData($.fn.cookie('serviceStr'));
            break;
            case 'other':
                shearData($.fn.cookie('otherStr'));
            break;
        }       
    }
    //cookie数据的分割
    function shearData(data){
        if(data){
            var cutData = data.split('|');
            var aData = new Array();
            for(var i=0; i<cutData.length; i++){
                aData[i] =cutData[i].split('`');
            }
            take=aData;
        }
    }
    
    getCookie();
    getData();
    getTabList();
    cartList();
    //左侧tab 点击切换
    $('.custom-tab').on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active');
        type = $(this).attr('data-type');
        getData(type);
    })
    
    //房型或类型展开 & 收起
    $('#custom-lists').on('click','.custom-item-open a',function(){
        if($(this).parent().prev('ul').hasClass('merge')){
            if($(this).parent().prev('ul').find('li').length<=2){
                $(this).text('到底了');
            }else{
                $(this).parent().prev('ul').removeClass('merge');
                $(this).text('收起');
                $(this).addClass('active');
            }            
        }else{
            $(this).parent().prev('ul').addClass('merge');
            $(this).text('展开');
            $(this).removeClass('active');
        }
    })

    //列表产品 加加按钮
    $('#custom-lists').on('click','.custom-add',function(){
        exist = '';
        if($(this).parent().find('a').length ==1){            
            var span = $('<span>1</span>');
            var count = 1;
            span.html(count);
            var reduce = $('<a class="custom-reduce" href="javascript:;"></a>');
            $(this).before(span);
            $(this).parent().prepend(reduce);

            var id = $(this).parents('li').attr('data-id');
            var title = $(this).parents('li').find('p').text();
            var rPrice = $(this).parents('.price').find('b').find('span').text();

            exist = type+'`'+id+'`'+title+'`'+count+'`'+rPrice;
            setCookie();            
            cartList();
            getTabListNum();

        }else{    
            var n = parseInt($(this).prev('span').text());
            n++;
            $(this).prev('span').text(n);
        }                
    })

    //列表产品 减减按钮
    $('#custom-lists').on('click','.custom-reduce',function(){
        var n = parseInt($(this).next('span').text());
        n--;
        if(n<1){
            $(this).parent('.modifyNum').find('span').remove();
            $(this).remove();
            switch(type){
                case 'hotel':
                    $.fn.cookie('hotelStr','12', { expires: -1, path: '/' });
                break;
                case 'ticket':
                    $.fn.cookie('ticketStr','12', { expires: -1, path: '/' });
                break;
                case 'food':
                    $.fn.cookie('foodStr','12', { expires: -1, path: '/' });
                break;
                case 'service':
                    $.fn.cookie('serviceStr','12', { expires: -1, path: '/' });
                break;
                case 'other':
                    $.fn.cookie('otherStr','12', { expires: -1, path: '/' });
                break;
            }
            //底部购物车状态
            /*var cart = $('<img src="../images/cart-wrap1.png">');
            var cartInfo = $('<p>选择3类以上产品可享受满立减优惠</p>');
            $('.cart-wrap .cart-icon').html(cart);
            $('.cart-wrap .cart-info').html(cartInfo);*/
            cartList();
            getTabListNum();
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

    //选中list清空
    $('#clearAll').on('click',function(){
        $('.cart-list').html('');
        $('.cart-list').hide();
        $('.cart-data-opa').removeClass('show');


        $.fn.cookie('hotelStr','12', { expires: -1, path: '/' });
        $.fn.cookie('ticketStr','12', { expires: -1, path: '/' });
        $.fn.cookie('foodStr','12', { expires: -1, path: '/' });
        $.fn.cookie('serviceStr','12', { expires: -1, path: '/' });
        $.fn.cookie('otherStr','12', { expires: -1, path: '/' });
        getTabListNum();

        //底部购物车状态
        var cart = $('<img src="../images/cart-wrap1.png">');
        var cartInfo = $('<p>选择3类以上产品可享受满立减优惠</p>');
        $('.cart-wrap .cart-icon').html(cart);
        $('.cart-wrap .cart-info').html(cartInfo);

        $('html').removeClass('more_prohibit_html');
    })

    //选中list隐藏
    $('.cart-data-opa').on('click',function(){
        $('.cart-list').hide();
        $('.cart-data-opa').removeClass('show');
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
})()