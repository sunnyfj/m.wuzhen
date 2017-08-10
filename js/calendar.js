 (
 	function() {
        var dateType = ''; //判断点击为start或者leave

 		function showDate(obj,year,month,resetDate){
            obj.html('');
 			var oDate = new Date();
 			var dayNum = 0;

			for(var t=0;t<resetDate;t++){
                var oTable = $("<table></table>");
                var oTHead = $("<thead></thead>");
                var oTr = $("<tr></tr>");
                
                month++;
                if(month>12){
                    month=1;
                    year++;
                }
                
                var oth = $("<th colspan='7'>"+year+"年"+month+"月"+"</th>");

                oTr.append(oth);
                oTHead.append(oTr);
                oTable.append(oTHead);
                var oTbody = $("<tbody></tbody>");
                for(var i = 0;i<6;i++){
                    var oTr = $("<tr></tr>");
                    for(var j = 0;j<7;j++){
                        var oTd = $("<td><span><i></i></span></td>");
                        oTr.append(oTd);
                    }
                    oTbody.append(oTr);
                }

                oTable.append(oTbody);
                obj.append(oTable);
                
                var aTd = $(obj).find("table").eq(t).find("td");
                
                for(var i = 0; i<aTd.length;i++){
                    aTd.eq(i).find('i').html("");
                }

                if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month ==10 ||month ==12){
                    dayNum = 31;
                }else if(month ==4 || month == 6 || month == 9 || month == 11){
                    dayNum = 30;
                }else if(month == 2 && isLeapYear(year)){
                    dayNum = 29;
                }else{
                    dayNum = 28;
                }

                
                oDate.setDate(1);
                oDate.setMonth(month-1);                
                oDate.setFullYear(year);
                var timeDate = new Date();
                switch(oDate.getDay()){
                    case 0:
                        for(var i = 0;i<dayNum;i++){
                            aTd.eq(i).find('i').html(i+1);
                            aTd.eq(i).addClass('optional');
                            timeDate.setFullYear(year,month,(i+1),0,0,0);
                            aTd.eq(i).attr({
                                'date-sec': timeDate.getTime(),
                                'data-date-format': year+'-'+tuDou(month)+'-'+tuDou((i+1))
                            });
                        }
                    break;
                    case 1:
                        for(var i = 0;i<dayNum;i++){
                            aTd.eq(i+1).find('i').html(i+1);
                            aTd.eq(i+1).addClass('optional');
                            timeDate.setFullYear(year,month,(i+1),0,0,0);
                            aTd.eq(i+1).attr({
                                'date-sec': timeDate.getTime(),
                                'data-date-format': year+'-'+tuDou(month)+'-'+tuDou((i+1))
                            });
                        }
                    break;
                    case 2:
                        for(var i = 0;i<dayNum;i++){
                            aTd.eq(i+2).find('i').html(i+1);
                            aTd.eq(i+2).addClass('optional');
                            timeDate.setFullYear(year,month,(i+1),0,0,0);
                            aTd.eq(i+2).attr({
                                'date-sec': timeDate.getTime(),
                                'data-date-format': year+'-'+tuDou(month)+'-'+tuDou((i+1))
                            });
                        }
                    break;
                    case 3:
                        for(var i = 0;i<dayNum;i++){
                            aTd.eq(i+3).find('i').html(i+1);
                            aTd.eq(i+3).addClass('optional');
                            timeDate.setFullYear(year,month,(i+1),0,0,0);
                            aTd.eq(i+3).attr({
                                'date-sec': timeDate.getTime(),
                                'data-date-format': year+'-'+tuDou(month)+'-'+tuDou((i+1))
                            });
                        }
                    break;
                    case 4:
                        for(var i = 0;i<dayNum;i++){
                            aTd.eq(i+4).find('i').html(i+1);
                            aTd.eq(i+4).addClass('optional');
                            timeDate.setFullYear(year,month,(i+1),0,0,0);
                            aTd.eq(i+4).attr({
                                'date-sec': timeDate.getTime(),
                                'data-date-format': year+'-'+tuDou(month)+'-'+tuDou((i+1))
                            });
                        }
                    break;
                    case 5:
                        for(var i = 0;i<dayNum;i++){
                            aTd.eq(i+5).find('i').html(i+1);
                            aTd.eq(i+5).addClass('optional');
                            timeDate.setFullYear(year,month,(i+1),0,0,0);
                            aTd.eq(i+5).attr({
                                'date-sec': timeDate.getTime(),
                                'data-date-format': year+'-'+tuDou(month)+'-'+tuDou((i+1))
                            });
                        }
                    break;
                    case 6:
                        for(var i = 0;i<dayNum;i++){
                            aTd.eq(i+6).find('i').html(i+1);
                            aTd.eq(i+6).addClass('optional');
                            timeDate.setFullYear(year,month,(i+1),0,0,0);
                            aTd.eq(i+6).attr({
                                'date-sec': timeDate.getTime(),
                                'data-date-format': year+'-'+tuDou(month)+'-'+tuDou((i+1))
                            });
                        }
                    break;
                }
            }
 		};
 		function isLeapYear(year){
 			if(year%4 == 0 && year%100 != 0){
 				return true;
 			}else{
 				if(year%400 == 0){
 					return true;
 				}else{
 					return false;
 				}
 			}
 		}
        function tuDou(n){
            if(n<10){
                return '0'+n;
            }
            return n;
        }
        //过去日期为灰色
        function showColor(table1Td,year,month,date){
            var result = [];
            if(date==Date()){
                var oDate = new Date();
            }else{
                var oDate = date;
            }
            

            for(var i=0;i<table1Td.length;i++){
                result.push(table1Td.eq(i));
            }
            if(parseInt(year) == oDate.getFullYear() && parseInt(month) == (oDate.getMonth()+1)) {
                var thisDate = oDate.getDate();
                for(var i=0;i<thisDate-1;i++){
                    table1Td.eq(i).removeClass();
                    table1Td.eq(i).addClass('gray');
                }
            }              
        }


        //选择后一天日期
        function getDateStr(date,addDayCount) {
            var dd = date;
            dd.setDate(dd.getDate()+addDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;//获取当前月份的日期
            var d = dd.getDate();
            return y+"-"+tuDou(m)+"-"+tuDou(d);
        }        
           

        
        //判断是否需要页面展示日期为当前
        var myDate = new Date(); //日历展示的初始时间


        var nextDate = new Date();//页面展示的初始时间

        if($('.activeStart').find('input').attr('data-isShowTime') == 'true'){
            $('.activeStart').find('input').val(getDateStr(nextDate,0));
            if($('.activeLeave')){
                $('.activeLeave').find('input').val(getDateStr(nextDate,1));
            } 
        }
        //判断table多出的空行
        function trHide(){
            var allTbody = $('.calendar').find('tbody');
            var arr = [];
            var smum = 0;
            for(var j=0;j<allTbody.length;j++){
                arr.push(allTbody.eq(j).find('tr:last'));
                arr.push(allTbody.eq(j).find('tr:last').prev());
            }
            for(var i=0;i<arr.length;i++){            
                for(var t=0;t<arr[i].find('td').length;t++){
                    if(!arr[i].find('td').eq(t).hasClass('optional') && !arr[i].find('td').eq(t).hasClass('gray')){
                        //arr[i].find('td').eq(t).hide();
                        smum++;
                    }
                }
                if(smum==7){
                    arr[i].hide();
                }
                smum=0;
            } 
        }
        

        //过去日期的tr隐藏
        function pastDay(){
            if($('.calendar-day').html()){
                var num = 0;
                var tableTr = $('.calendar-day').find('tbody').eq(0).find('tr');
                for(var i=0; i< tableTr.length; i++){
                    for(var j=0; j<tableTr.eq(i).find('td').length; j++){
                        if(!tableTr.eq(i).find('td').eq(j).hasClass('optional')){
                            num++;
                        }
                    }
                    if(num==7){
                        tableTr.eq(i).hide();
                    }
                    num=0;
                }
            }
        }


        var thisStartAvtive = null;
        var thisLeaveAvtive = null;
        var thisCartModTime = null;
        var isEnd = 0;
        //给可选日期加事件
        $('.calendar').on('click','td.optional',function(){
            var allTd = $('.calendar').find('td.optional');
            /*for(var i=0; i<allTd.length; i++){
                allTd.eq(i).removeClass('selected-start');
            }*/
            $(this).addClass('selected-start');

            //显示日期
            if(dateType=='start'){
                $('.activeStart').eq(thisStartAvtive).find('input').val($(this).attr('data-date-format'));
                if($('.activeStart').eq(thisStartAvtive).next('.activeLeave')){
                    var startTime = $(this).attr('data-date-format');
                    var startDate = new Date(startTime);
                    $('.activeStart').eq(thisStartAvtive).next('.activeLeave').find('input').val(getDateStr(startDate,1));
                }
                $('html').removeClass('more_prohibit_html');
            }else if(dateType =='leave'){
                $('.activeLeave').eq(thisLeaveAvtive).find('input').val($(this).attr('data-date-format'));
                $('html').removeClass('more_prohibit_html');
            }else if(dateType =='cart'){
                if($('.cart-modTime').eq(thisCartModTime).attr('data-end')!='true'){
                    $('.cart-modTime').eq(thisCartModTime).parent().prev().find('input').val($(this).attr('data-date-format'))
                }else{
                    if(isEnd == 0){
                        $('.cart-modTime').eq(thisCartModTime).parent().prev().find('input').eq(0).val($(this).attr('data-date-format'));
                        var spanTime = $(this).attr('data-date-format');
                        var spanDate = new Date(spanTime);
                        var spanEndDate = new Date(spanTime);
                        $('.cart-modTime').eq(thisCartModTime).parent().prev().find('input').eq(1).val(getDateStr(spanEndDate,1));
                        setTimeout(function(){
                            isEnd=1;
                            var endDate = new Date(getDateStr(spanDate,1));
                            $('.calendar .calendar-content').find('.cartPrompt').text(modTimePrompt[1]);

                            $('.calendar').show();
                            $('.calendar-opa').css({'background-color': 'rgba(0,0,0,.5)'});
                            $('.calendar-content').addClass('active');
                            
                            showDate($('.calendar-day'),spanDate.getFullYear(),spanDate.getMonth(),2);
                            showColor($('.calendar table').eq(0).find('td.optional'),spanDate.getFullYear(),spanDate.getMonth()+1,endDate);
                            trHide();
                            pastDay();
                            $('html').addClass('more_prohibit_html');
                        },600)
                    }else{
                        $('.cart-modTime').eq(thisCartModTime).parent().prev().find('input').eq(1).val($(this).attr('data-date-format'));
                        isEnd=0;
                        $('.calendar .cartPrompt').remove();
                    }
                }
            }
            $('.calendar-content').removeClass('active');
            $('.calendar-opa').css({'background-color': 'rgba(0,0,0,0)'});
            setTimeout(function(){
                $('.calendar').hide();
                for(var i=0; i<allTd.length; i++){
                    allTd.eq(i).removeClass('selected-start');
                }
            },300);
        });

        $('.activeStart').each(function(index,item){
            $(item).attr('data-target',index);
        })
        $('.activeLeave').each(function(index,item){
            $(item).attr('data-target',index);
        })
        $('.activeStart').on('click',function(event) {
            thisStartAvtive = $(this).attr('data-target');
            $('.calendar').show();
            $('.calendar-opa').css({'background-color': 'rgba(0,0,0,.5)'});
            $('.calendar-content').addClass('active');
            dateType = $(this).find('input').attr('data-type');
            var resetDate = $(this).find('input').attr('data-reset');
            showDate($('.calendar-day'),myDate.getFullYear(),myDate.getMonth(),resetDate);
            showColor($('.calendar table').eq(0).find('td.optional'),myDate.getFullYear(),myDate.getMonth()+1,Date());
            trHide();
            pastDay();
            //替换当天日期
            //$('.calendar-content').find('td.optional span i').eq(0).text('今天');

            $('html').addClass('more_prohibit_html');
        });

        $('.activeLeave').click(function(event) {
            thisLeaveAvtive= $(this).attr('data-target');
            $('.calendar').show();
            $('.calendar-opa').css({'background-color': 'rgba(0,0,0,.5)'});
            $('.calendar-content').addClass('active');
            dateType = $(this).find('input').attr('data-type');
            var resetDate = $(this).find('input').attr('data-reset');

            var leaveText = $(this).prev('.activeStart').find('input').val();
            var leaveDate = new Date(leaveText);
            var leaveNextDayDate = getDateStr(leaveDate,1);
            var nextDayDate = new Date(leaveNextDayDate);

            showDate($('.calendar-day'),nextDayDate.getFullYear(),nextDayDate.getMonth(),resetDate);
            showColor($('.calendar table').eq(0).find('td.optional'),nextDayDate.getFullYear(),nextDayDate.getMonth()+1,nextDayDate);
            trHide();
            pastDay();
            $('html').addClass('more_prohibit_html');
        });
        $('.calendar-opa').click(function(event) {
            event.stopPropagation();
            $('.calendar-content').removeClass('active');
            setTimeout(function(){
                $('.calendar').hide();
            },300);
            $('html').removeClass('more_prohibit_html');
        }); 

        $('.cart-modTime').each(function(index,item){
            $(item).attr('data-target',index);
            if($(item).parent().prev().find('input').length == 2){
                $(item).attr('data-end',true);
            }
        })
        var modTimePrompt = ['请选择入住日期','请选择离店日期','请选择到达日期'];
        $('.cart-modTime').on('click',function(){
            var resetDate = $(this).attr('data-reset');
            if($('.calendar .calendar-content').find('.cartPrompt').length==0){
                if($(this).attr('data-end')=='true'){
                    var cartPrompt = $('<div class="cartPrompt">'+modTimePrompt[0]+'</div>');
                }else{
                    var cartPrompt = $('<div class="cartPrompt">'+modTimePrompt[2]+'</div>');
                }
                $('.calendar .calendar-content').append(cartPrompt);
            }else{
                $('.calendar .calendar-content').find('.cartPrompt').text(modTimePrompt[0]);
            }



            dateType = 'cart';
            thisCartModTime = $(this).attr('data-target');

            $('.calendar').show();
            $('.calendar-opa').css({'background-color': 'rgba(0,0,0,.5)'});
            $('.calendar-content').addClass('active');
            
            showDate($('.calendar-day'),myDate.getFullYear(),myDate.getMonth(),resetDate);
            showColor($('.calendar table').eq(0).find('td.optional'),myDate.getFullYear(),myDate.getMonth()+1,Date());
            trHide();
            pastDay();
        })
           
 	}
 )()