 (
 	function() {
        var dateType = '';
 		function showDate(obj,year,month){
            obj.html('');

 			var oDate = new Date();

            var oTable = $("<table class='table'></table>");

            var oTbody = $("<tbody></tbody>");
            for(var i = 0;i<6;i++){
                var oTr = $("<tr></tr>");
                for(var j = 0;j<7;j++){
                    var oTd = $("<td><i></i></td>");
                    oTr.append(oTd);
                }
                oTbody.append(oTr);
            }

            oTable.append(oTbody);
            obj.append(oTable);
            $(obj).parents('.datebox').find('.year').text(year);
            $(obj).parents('.datebox').find('.month').text(month);
            
            var aTd = $(obj).find("table").find("td");
            
            for(var i = 0; i<aTd.length;i++){
                aTd.eq(i).find('i').html('');
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
            var timeDate = '';
            switch(oDate.getDay()){
                case 0:
                    for(var i = 0;i<dayNum;i++){
                        aTd.eq(i).find('i').html(i+1);
                        aTd.eq(i).addClass('optional');
                        timeDate= new Date(year,month,(i+1));
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
                        timeDate= new Date(year,month,(i+1));
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
                        timeDate= new Date(year,month,(i+1));
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
                        timeDate= new Date(year,month,(i+1));
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
                        timeDate= new Date(year,month,(i+1));
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
                        timeDate= new Date(year,month,(i+1));
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
                        timeDate= new Date(year,month,(i+1));
                        aTd.eq(i+6).attr({
                            'date-sec': timeDate.getTime(),
                            'data-date-format': year+'-'+tuDou(month)+'-'+tuDou((i+1))
                        });
                    }
                break;
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
        //选择后一天日期
        function getDateStr(date,addDayCount) {
            var dd = date;
            dd.setDate(dd.getDate()+addDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;//获取当前月份的日期
            var d = dd.getDate();
            return y+"-"+tuDou(m)+"-"+tuDou(d);
        }    
        function defaultTime(){
            $('#endDate').find('input').val(getDateStr(myDate,0));
            $('#startDate').find('input').val(getDateStr(myDate,-1));
            
        }
        /*function hideTr(){
            var atr = $('.datebox').find('tr');
            var snum = 0;
            for(var i=0; i<atr.length; i++){
                for(var j=0; j<7; j++){
                    if(!atr.eq(i).find('td').eq(j).hasClass('optional') && !atr.eq(i).find('td').eq(j).hasClass('gray')){
                        snum++;
                    }
                }
                if(snum!=7){
                    snum=0;
                }else{
                    atr.eq(i).hide();
                }
            }
        }*/
        function getTimeNum(str){
            var strArr = str.split('-');
            var date = new Date(strArr[0],strArr[1],strArr[2]);
            return date.getTime();
        }

        function limitDateRange(){
            var atd = $('.datebox').find('td');
            var result = [];
            for(var i=0; i<atd.length; i++){
                if(atd.eq(i).find('i').html() != ''){
                    result.push(atd.eq(i));
                }
            }
            var minDate = '';
            var maxDate = '';
            if(dateType == 'start'){
                minDate = $('#startDate').find('input').attr('data-mindate');
                maxDate = $('#startDate').find('input').attr('data-maxdate');
            }else if(dateType == 'end'){
                minDate = $('#endDate').find('input').attr('data-mindate');
                maxDate = $('#endDate').find('input').attr('data-maxdate');
            }else{
                return;
            }
            //有开始无结束
            if(minDate !='' && maxDate == '' ){
                for(var j=0; j< result.length; j++){
                    if(parseInt(result[j].attr('date-sec')) < getTimeNum(minDate)){
                        result[j].removeClass('optional').addClass('gray');
                    }
                }
            }
            //有开始有结束
            if(minDate !='' && maxDate != ''){
                for(var j=0; j< result.length; j++){
                    if(parseInt(result[j].attr('date-sec')) < getTimeNum(minDate)){
                        result[j].removeClass('optional').addClass('gray');
                    }
                    if(parseInt(result[j].attr('date-sec')) > getTimeNum(maxDate)){
                        result[j].removeClass('optional').addClass('gray');
                    }
                }
            }
            //无开始有结束
            if(minDate =='' && maxDate != ''){
                for(var j=0; j< result.length; j++){
                    if(parseInt(result[j].attr('date-sec')) > getTimeNum(maxDate)){
                        result[j].removeClass('optional').addClass('gray');
                    }
                }
            }
        }
        function endShowColor(){
            var activeStart = $('#startDate').find('input').val();
            var activeStartTime = getTimeNum(activeStart);
            var thisAllTd = $('.datebox').find('td.optional');
            for(var i=0; i<thisAllTd.length; i++){
                if(parseInt(thisAllTd.eq(i).attr('date-sec')) <= activeStartTime){
                    thisAllTd.eq(i).removeClass('optional').addClass('gray');
                }
            }
        }


        //判断是否需要页面展示日期为当前
        var myDate = new Date(); //日历展示的初始时间

        defaultTime();


        $('#startDate').on('click',function(){
            $('.datebox').show();
            $('.datebox-opa').addClass('active');
            $('.datebox-content').addClass('active');
            $('html').addClass('more_prohibit_html');
            dateType = $(this).find('input').attr('data-type');

            var thisActiveDate = $(this).find('input').val();
            var data = new Date(getTimeNum(thisActiveDate));

            showDate($('#datebox-day'),data.getFullYear(),data.getMonth());
            limitDateRange();
        })
        $('#endDate').on('click',function(){
            $('.datebox').show();
            $('.datebox-opa').addClass('active');
            $('.datebox-content').addClass('active');
            $('html').addClass('more_prohibit_html');
            dateType = $(this).find('input').attr('data-type');

            var thisActiveDate = $(this).find('input').val();
            var data = new Date(getTimeNum(thisActiveDate));

            showDate($('#datebox-day'),data.getFullYear(),data.getMonth());
            endShowColor();
            limitDateRange();
        })
        $('.datebox-opa').click(function(event) {
            event.stopPropagation();
            $('.datebox-content').removeClass('active');
            $('.datebox-opa').removeClass('active');
            setTimeout(function(){
                $('.datebox').hide();
            },300);
            $('html').removeClass('more_prohibit_html');
        });


        //给可选日期加事件
        $('.datebox').on('click','td.optional',function(){
            
            $(this).addClass('selected');

            //赋值日期
            if(dateType=='start'){
                var thisformat = $(this).attr('data-date-format');
                $('#startDate').find('input').val(thisformat);

                var endVal = $('#endDate').find('input').val();
                var startTime = new Date(thisformat);
                var endTime = new Date(endVal);

                if(startTime.getTime() >= endTime.getTime() || endVal==''){
                    $('#endDate').find('input').val(getDateStr(startTime,1));
                }
            }else if(dateType =='end'){
                var thisformat = $(this).attr('data-date-format');
                $('#endDate').find('input').val(thisformat);
            }else{
                return;
            }
            
            $('.datebox-content').removeClass('active');
            $('.datebox-opa').removeClass('active');
            setTimeout(function(){
                $('.datebox').hide();
            },300);
            $('html').removeClass('more_prohibit_html');
        });
        $('.datebox').find('.before').on('click',function(){
            var year = $(this).next().find('.year').text();
            var month = $(this).next().find('.month').text();

            month--;
            if(month == 0){
                year--;
                month = 12;
            }
            $(this).next().find('.year').text(year);
            $(this).next().find('.month').text(month);
            showDate($('#datebox-day'),year,month);
            if(dateType =='end'){
                endShowColor();
            }
            limitDateRange();
        });
        $('.datebox').find('.after').on('click',function(){
            var year = $(this).prev().find('.year').text();
            var month = $(this).prev().find('.month').text();

            month++;
            if(month > 12){
                year++;
                month = 1;
            }
            $(this).prev().find('.year').text(year);
            $(this).prev().find('.month').text(month);
            showDate($('#datebox-day'),year,month);
            if(dateType =='end'){
                endShowColor();
            }
            limitDateRange();
        });
 	}
 )()