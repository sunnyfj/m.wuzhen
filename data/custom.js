(function () {
    var type = 'hotel';
    var URL = '../data/data.json';
    var loadingHtml = '<div class="loading">加载中···</div>';
    var COOKIE_NAME = 'selected';
    var tabType = ['hotel','ticket','food','service','other'];
    var optStartTime = $('#opt-start').val(); //开始日期
    var optLeaveTime = $('#opt-leave').val(); //结束日期

    var allData = new Array();
    allData['hotel']   = '';  //存放酒店信息
    allData['ticket']  = '';  //存放票务信息
    allData['food']    = '';  //存放美食信息
    allData['service'] = '';  //存放服务信息
    allData['other']   = '';  //存放其他信息
    var lineStr        = '';  //分割线
    var allDataStr     = '';  //存放所有数据

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
                    break;
                    case 'ticket':
                        result = data.product.ticket;
                    break;
                    case 'food':
                        result = data.product.food;
                    break;
                    case 'service':
                        result = data.product.service;
                    break;
                    case 'other':
                        result = data.product.other;
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

                    for(var j=0; j<result[i].roomType.length; j++){
                        var aLi = $('<li data-id="'+result[i].roomType[j].rId+'">'
                        +    '<p>'+result[i].roomType[j].rName+'</p>'
                        +    '<div class="price">'
                        +        '<b><span>'+result[i].roomType[j].rPrice+'</span>元</b>'
                        +        '<div class="modifyNum">'
                        +            '<a class="custom-add" href="javascript:;"></a>'
                        +        '</div>'
                        +    '</div>'
                        +'</li>');
                        merge.append(aLi);
                    }

                    ItemBot.append(merge);
                    ItemBot.append(openBtn);
                    itemDiv.append(ItemBot);

                    $('#custom-lists').append(itemDiv);
                }
                openBtnHide();
                getCookieTypeData();
            },
            error:function(data){
                console.log(data.status);
                alert('请求酒店数据出错！');
            }
        })
    }

    //获取选中列表
    function getCartList(){
        $('.cart-list-content').html('');

        //底部购物车默认状态
        var cart = $('<img src="../images/cart-wrap1.png">');
        var cartInfo = $('<p>选择3类以上产品可享受满立减优惠</p>');
        $('.cart-wrap .cart-icon').html(cart);
        $('.cart-wrap .cart-info').html(cartInfo);


        if($.cookie(COOKIE_NAME)){
            //底部购物车状态
            var cart = $('<img src="../images/cart-wrap2.png"><span>99+</span>');
            var cartInfo = $('<p>套餐价：<b><span>6506</span>元</b><a class="settlement" href="javascript:;">去结算</a></p>');
            $('.cart-wrap .cart-icon').html(cart);
            $('.cart-wrap .cart-info').html(cartInfo);


            var allSelected = $.cookie(COOKIE_NAME).split('|');
            var single = new Array();
            console.log(allSelected);
            for(var i=0; i<allSelected.length; i++){

                single = allSelected[i].split('`');

                switch(single[0]){
                    case 'hotel':
                        if($('.cart-list-content').find('ul[data-type="hotel"]').length ==1){
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b><input type="text" readonly="readonly" value="'+single[6]+'">至<input readonly="readonly" type="text" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            $('.cart-list-content').find('ul[data-type="hotel"]').append(li);
                        }else{
                            var blocksHtml = $('<div class="cart-lc-blocks"></div>');
                            var h4 = $('<h4>酒店</h4>');
                            var ul = $('<ul data-type="hotel"></ul>');
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b><input type="text" readonly="readonly" value="'+single[6]+'">至<input readonly="readonly" type="text" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            ul.append(li);
                            blocksHtml.append(h4);  
                            blocksHtml.append(ul);       
                            $('.cart-list-content').append(blocksHtml);
                        }
                    break;
                    case 'ticket':
                        if($('.cart-list-content').find('ul[data-type="ticket"]').length ==1){
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b>游览日期：<input type="text" readonly="readonly" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            $('.cart-list-content').find('ul[data-type="ticket"]').append(li);
                        }else{
                            var blocksHtml = $('<div class="cart-lc-blocks"></div>');
                            var h4 = $('<h4>票务</h4>');
                            var ul = $('<ul data-type="ticket"></ul>');
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b>游览日期：<input type="text" readonly="readonly" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            ul.append(li);
                            blocksHtml.append(h4);  
                            blocksHtml.append(ul);       
                            $('.cart-list-content').append(blocksHtml);
                        }
                    break;
                    case 'food':
                        if($('.cart-list-content').find('ul[data-type="food"]').length ==1){
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b>游览日期：<input type="text" readonly="readonly" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            $('.cart-list-content').find('ul[data-type="food"]').append(li);
                        }else{
                            var blocksHtml = $('<div class="cart-lc-blocks"></div>');
                            var h4 = $('<h4>美食</h4>');
                            var ul = $('<ul data-type="food"></ul>');
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b>游览日期：<input type="text" readonly="readonly" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            ul.append(li);
                            blocksHtml.append(h4);  
                            blocksHtml.append(ul);       
                            $('.cart-list-content').append(blocksHtml);
                        }
                    break;
                    case 'service':
                        if($('.cart-list-content').find('ul[data-type="service"]').length ==1){
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b>游览日期：<input type="text" readonly="readonly" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            $('.cart-list-content').find('ul[data-type="service"]').append(li);
                        }else{
                            var blocksHtml = $('<div class="cart-lc-blocks"></div>');
                            var h4 = $('<h4>服务</h4>');
                            var ul = $('<ul data-type="service"></ul>');
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b>游览日期：<input type="text" readonly="readonly" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            ul.append(li);
                            blocksHtml.append(h4);  
                            blocksHtml.append(ul);       
                            $('.cart-list-content').append(blocksHtml);
                        }
                    break;
                    case 'other':
                        if($('.cart-list-content').find('ul[data-type="other"]').length ==1){
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b>游览日期：<input type="text" readonly="readonly" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            $('.cart-list-content').find('ul[data-type="other"]').append(li);
                        }else{
                            var blocksHtml = $('<div class="cart-lc-blocks"></div>');
                            var h4 = $('<h4>其他</h4>');
                            var ul = $('<ul data-type="other"></ul>');
                            var li = $('<li data-id="'+single[1]+'">'
                                    +    '<div class="cart-item-title">'
                                    +        '<h6>'+single[2]+'</h6>'
                                    +        '<div class="cart-item-modifyNum">'
                                    +            '<a class="cart-item-reduce" href="javascript:;"></a>'
                                    +            '<span>'+single[3]+'</span>'
                                    +            '<a class="cart-item-add" href="javascript:;"></a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +    '<div class="cart-item-data">'
                                    +        '<div class="cart-item-data-info">'
                                    +            '<p class="price"><span>'+single[4]+'</span>元</p>'
                                    +            '<p>1间1晚 <b>游览日期：<input type="text" readonly="readonly" value="'+single[5]+'"></b></p>'
                                    +        '</div>'
                                    +        '<div class="cart-item-btn">'
                                    +            '<a class="cart-modTime" data-reset="5"  href="javascript:;">修改时间</a>'
                                    +        '</div>'
                                    +    '</div>'
                                    +'</li>');
                            ul.append(li);
                            blocksHtml.append(h4);  
                            blocksHtml.append(ul);       
                            $('.cart-list-content').append(blocksHtml);
                        }
                    break;
                }
            }
        }
    }

    //写入cookie值
    function setCookie(){
        allDataStr = allData['hotel'];

        if(allDataStr != '' && allData['ticket'] != '')
            allDataStr += '|'+allData['ticket'];
        else{
            if(allDataStr == '')
                allDataStr = allData['ticket'];
        }

        if(allDataStr != '' && allData['food'] != '')
            allDataStr += '|'+allData['food'];
        else{
            if(allDataStr == '')
                allDataStr = allData['food'];
        }

        if(allDataStr != '' && allData['service'] != '')
            allDataStr += '|'+allData['service'];
        else{
            if(allDataStr == '')
                allDataStr = allData['service'];
        }

        if(allDataStr != '' && allData['other'] != '')
            allDataStr += '|'+allData['other'];
        else{
            if(allDataStr == '')
                allDataStr = allData['other'];
        }
        $.cookie(COOKIE_NAME,allDataStr,{ path: '/', expires: 7 });
    }

    //获取cookie值
    function getCookie(){
        if($.cookie(COOKIE_NAME)){
            var allTypeData = $.cookie(COOKIE_NAME).split('|');
            var single = new Array();
            for(var i=0; i<allTypeData.length; i++){
                single = allTypeData[i].split('`');
                switch(single[0]){
                    case 'hotel':
                        if(allData['hotel'] == ''){
                            lineStr = '';
                        }else{
                            lineStr = '|';
                        }
                        allData['hotel'] += lineStr + allTypeData[i];
                    break;
                    case 'ticket':
                        if(allData['ticket'] == ''){
                            lineStr = '';
                        }else{
                            lineStr = '|';
                        }
                        allData['ticket'] += lineStr + allTypeData[i];
                    break;
                    case 'food':
                        if(allData['food'] == ''){
                            lineStr = '';
                        }else{
                            lineStr = '|';
                        }
                        allData['food'] += lineStr + allTypeData[i];
                    break;
                    case 'service':
                        if(allData['service'] == ''){
                            lineStr = '';
                        }else{
                            lineStr = '|';
                        }
                        allData['service'] += lineStr + allTypeData[i];
                    break;
                    case 'other':
                        if(allData['other'] == ''){
                            lineStr = '';
                        }else{
                            lineStr = '|';
                        }
                        allData['other'] += lineStr + allTypeData[i];
                    break;
                }
            }
        }else{
            allData['hotel']   = '';
            allData['ticket']  = '';
            allData['food']    = '';
            allData['service'] = '';
            allData['other']   = '';
        }
    }

    function getCookieTypeData(){
        if(allData[type] != ''){

            var typeData = allData[type].split('|');
            var single = new Array();
            var typeALi = $('.merge').find('li');

            for(var i=0; i<typeData.length; i++){
                single = typeData[i].split('`');

                for(var j=0; j<typeALi.length; j++){
                   
                    if(single[1] == typeALi.eq(j).attr('data-id')){
                        if(typeALi.eq(j).find('.modifyNum').find('a').length ==1){
                            var span = $('<span>'+single[3]+'</span>');
                            var reduce = $('<a class="custom-reduce" href="javascript:;"></a>');
                            typeALi.eq(j).find('.modifyNum').prepend(span);
                            typeALi.eq(j).find('.modifyNum').prepend(reduce);
                        }else{
                            typeALi.eq(j).find('.modifyNum').find('span').text(single[3]);
                        }
                    }
                }                
            }
        }
    }

    //计算总价
    function totalPrice() {
        var allprice = 0; //总价
        $('.cart-lc-blocks').each(function() { //循环类型
            var oprice = 0; //店铺总价
            $(this).find('li').each(function() { //循环类型里面的产品

                var num = parseInt($(this).find('.cart-item-modifyNum').find('span').text()); //得到产品的数量
                var price = parseFloat($(this).find('.price').find('span').text()); //得到产品的单价
                var total = price * num; //计算单个产品的总价
                oprice += total; //计算该类型的总价
            });
            allprice += oprice; //计算所有类型的总价
        });
        $('.cart').find('.cart-info').find('span').text(allprice.toFixed(2)); //输出全部总价
    }

    //显示数量
    function totalNum(){
        $('.custom-tab').find('li').each(function(){
            $(this).find('i').remove();
        })
        var allNum = 0; //总数
        $('.cart-lc-blocks').each(function() {
            var oNum = 0; //店铺总价
            $(this).find('li').each(function() {
                var num = parseInt($(this).find('.cart-item-modifyNum').find('span').text());
                oNum += num;
            });
            switch($(this).find('ul').attr('data-type')){
                case 'hotel':
                    if($('.custom-tab').find('li[data-type="hotel"]').find('i').length ==1){
                        $('.custom-tab').find('li[data-type="hotel"]').find('i').html(oNum);
                    }else{
                        var oI = $('<i></i>');
                        oI.html(oNum);
                        $('.custom-tab').find('li[data-type="hotel"]').append(oI);
                    }

                break;
                case 'ticket':
                    if($('.custom-tab').find('li[data-type="ticket"]').find('i').length ==1){
                        $('.custom-tab').find('li[data-type="ticket"]').find('i').html(oNum);
                    }else{
                        var oI = $('<i></i>');
                        oI.html(oNum);
                        $('.custom-tab').find('li[data-type="ticket"]').append(oI);
                    }

                break;
                case 'food':
                    if($('.custom-tab').find('li[data-type="food"]').find('i').length ==1){
                        $('.custom-tab').find('li[data-type="food"]').find('i').html(oNum);
                    }else{
                        var oI = $('<i></i>');
                        oI.html(oNum);
                        $('.custom-tab').find('li[data-type="food"]').append(oI);
                    }

                break;
                case 'service':
                    if($('.custom-tab').find('li[data-type="service"]').find('i').length ==1){
                        $('.custom-tab').find('li[data-type="service"]').find('i').html(oNum);
                    }else{
                        var oI = $('<i></i>');
                        oI.html(oNum);
                        $('.custom-tab').find('li[data-type="service"]').append(oI);
                    }

                break;
                case 'other':
                    if($('.custom-tab').find('li[data-type="other"]').find('i').length ==1){
                        $('.custom-tab').find('li[data-type="other"]').find('i').html(oNum);
                    }else{
                        var oI = $('<i></i>');
                        oI.html(oNum);
                        $('.custom-tab').find('li[data-type="other"]').append(oI);
                    }

                break;
            }
            allNum += oNum;
        });
        $('#cart-num').find('span').html(allNum);

    }

    //隐藏展开按钮
    function openBtnHide(){
        for(var i=0; i<$('#custom-lists').find('.merge').length; i++){
            if($('#custom-lists').find('.merge').eq(i).find('li').length <= 2){
                $('#custom-lists').find('.merge').eq(i).css('height','auto');
                $('#custom-lists').find('.merge').eq(i).next('.custom-item-open').hide();
            }
        }
    }

    getData(type);
    getCookie();
    getCartList();
    totalPrice();
    //左侧tab 点击切换
    $('.custom-tab').on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active');
        type = $(this).attr('data-type');
        getData(type);
    })

    //左侧tab 绑定类型
    for(var i=0; i<$('.custom-tab li').length; i++){
        $('.custom-tab li').eq(i).attr('data-type',tabType[i]);
    }

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
        var count = 1;
        if($(this).parent().find('a').length ==1){
            var span = $('<span>'+count+'</span>');
            var reduce = $('<a class="custom-reduce" href="javascript:;"></a>');

            $(this).before(span);
            $(this).parent().prepend(reduce);
        }

        var id = $(this).parents('li').attr('data-id');
        var title = $(this).parents('li').find('p').text();
        var rPrice = $(this).parents('.price').find('b').find('span').text();

        var resetStr = '';
        var isRepeat = false;
        var typeData = '';
        var single = new Array();
        var thisData = '';
        if(type == 'hotel'){
            thisData = type+'`'+id+'`'+title+'`'+count+'`'+rPrice+'`'+optLeaveTime+'`'+optStartTime;
        }else{
            thisData = type+'`'+id+'`'+title+'`'+count+'`'+rPrice+'`'+optStartTime;
        }


        if(allData[type] == ''){
            allData[type] = thisData;
        }else{
            typeData = allData[type].split('|');
            for(var i = 0; i < typeData.length; i++){
                if(i == 0){
                    lineStr = '';
                }else{
                    lineStr = '|';
                }
                single = typeData[i].split('`');

                if(single[1] == id) {
                    isRepeat = true;
                    single[3]++;
                    resetStr += lineStr + single.join('`');
                }else{
                    resetStr += lineStr + typeData[i];
                }
            }
            if(isRepeat){
                allData[type] = resetStr;
            }else {
                allData[type] = allData[type] + '|' + thisData;
            }
        }
        setCookie();
        getCookieTypeData();
        getCartList();
        totalPrice();
        totalNum()
    })

    //列表产品 减减按钮
    $('#custom-lists').on('click','.custom-reduce',function(){

        var id = $(this).parents('li').attr('data-id');

        var resetStr = '';
        var typeData = '';
        var single = new Array();

        typeData = allData[type].split('|');

        for(var i = 0; i < typeData.length; i++){
            if(i == 0){
                lineStr = '';
            }
            else{
                lineStr = '|';
            }
            single = typeData[i].split('`');

            if(single[1] == id) {
                single[3]--;
                if(single[3] < 1){
                    $(this).parent('.modifyNum').find('span').remove();
                    $(this).remove();
                    single ='';
                }
                
            }
            if(single !=''){
                resetStr += lineStr + single.join('`');
            }
        }
        allData[type] = resetStr;
        
        setCookie();
        getCookieTypeData();
        getCartList();
        totalPrice();
        totalNum()
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
        $('.cart-list-content').html('');
        $('.cart-list').hide();
        $('.cart-data-opa').removeClass('show');

        $.cookie(COOKIE_NAME,'12', { expires: -10, path: '/' });

        getCookie();
        getData(type);
        getCartList();
        totalPrice();
        totalNum()
        //底部购物车状态
        var cart = $('<img src="../images/cart-wrap1.png">');
        var cartInfo = $('<p>选择3类以上产品可享受满立减优惠</p>');
        $('.cart-wrap .cart-icon').html(cart);
        $('.cart-wrap .cart-info').html(cartInfo);

        $('html').removeClass('more_prohibit_html');
    })

    //透明层点击影藏
    $('.cart-data-opa').on('click',function(){
        $('.cart-list').hide();
        $('.cart-data-opa').removeClass('show');
        $('html').removeClass('more_prohibit_html');
    })

    //选中list 加加按钮
    $('.cart-list-content').on('click','.cart-item-add',function(){

        var resetCookieStr = '';
        var id = $(this).parents('li').attr('data-id');
        var allCookieData = $.cookie(COOKIE_NAME).split('|');
        var single = new Array();
        for(var i=0; i<allCookieData.length; i++){
            if(i == 0){
                lineStr = '';
            }
            else{
                lineStr = '|';
            }
            single = allCookieData[i].split('`');
            if(single[1] == id){
                single[3]++;
                resetCookieStr+=lineStr + single.join('`');
            }else{
                resetCookieStr+= lineStr + allCookieData[i];
            }
        }
        $.cookie(COOKIE_NAME,resetCookieStr,{ path: '/', expires: 7 });
        getCookie();
        getData(type);
        getCartList();
        totalPrice();
        totalNum()
    })

    //选中list 减减按钮
    $('.cart-list-content').on('click','.cart-item-reduce',function(){

        var resetCookieStr = '';
        var id = $(this).parents('li').attr('data-id');
        var allCookieData = $.cookie(COOKIE_NAME).split('|');
        var single = new Array();
        for(var i=0; i<allCookieData.length; i++){
            if(i == 0){
                lineStr = '';
            }
            else{
                lineStr = '|';
            }
            single = allCookieData[i].split('`');
            if(single[1] == id){
                single[3]--;
                if(single[3]<1){
                    if($(this).parents('.cart-lc-blocks').find('li').length ==1){

                        if($(this).parents('.cart-list-content').find('.cart-lc-blocks').length == 1){
                            $(this).parents('.cart-list-content').html('');
                            //选中list状态
                            $('.cart-list').hide();
                            $('.cart-data-opa').removeClass('show');
                            $('html').removeClass('more_prohibit_html');
                        }else{
                            $(this).parents('.cart-lc-blocks').remove();
                        }
                    }else{
                        $(this).parents('li').remove();
                    }
                    single ='';
                }
                if(single != ''){
                    resetCookieStr+=lineStr + single.join('`');
                }
            }else{
                resetCookieStr+= lineStr + allCookieData[i];
            }
        }
        $.cookie(COOKIE_NAME,resetCookieStr,{ path: '/', expires: 7 });

        allData['hotel']   = '';
        allData['ticket']  = '';
        allData['food']    = '';
        allData['service'] = '';
        allData['other']   = '';

        getCookie();
        getData(type);
        getCartList();
        totalPrice();
        totalNum()
    })
    totalNum();
})()