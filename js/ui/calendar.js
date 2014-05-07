(function(CF,$,ui){

	ui.calendar=function(){
		this.callSuperMethod();
	};

	ui.extend(ui.calendar,ui.widget,{
		_type_ : "ui",
		_name_ : "calendar",
		statics:{
			css:{
				_c_calendar : '-calendar',
				_c_header : '-calendar-header',
				_c_prev_icon : '-calendar-prev-icon',
				_c_header_label : '-calendar-header-label',
				_c_next_icon : '-calendar-next-icon',
				_c_year_month_box : '-calendar-year-month-box',
				_c_year_month_list : '-calendar-year-month-list',
				_c_day_box : '-calendar-day-box',
				_c_day_list : '-calendar-day-list',
				_c_separator : '-calendar-separator',
				_c_year : '-calendar-year',
				_c_month : '-calendar-month',
				_c_week : '-calendar-week',
				_c_day : '-calendar-day',
				_c_prev_year : '-prev-year',
				_c_next_year : '-next-year',
				_c_prev_month_day : '-prev-month-day',
				_c_next_month_day : '-next-month-day'
			},
			getTemplate: function(config){
				var _class_=ui.calendar;
				ui.widget.applyCSS(config,_class_.css);
				var html=['<div class="',config._c_calendar,'">',
							'<div class="',config._c_header,'">',
								'<div class="',config._c_prev_icon,'">&lt;</div>',
								'<div class="',config._c_header_label,'"><span></span></div>',
								'<div class="',config._c_next_icon,'">&gt;</div>',
							'</div>',
							'<div class="',config._c_day_box,'">',
							'<table class="',config._c_day_list,'">',
							  '<thead>',
								'<tr>'];
				var weekMap=ui.calendar.WEEK_LABEL_MAP;
				var weekLen=weekMap.length;
				for(var i=0;i<weekLen;i++){
					html.push('<td class="',config._c_week,'">',weekMap[i],'</td>');
				}
				html.push(		'</tr>',
								'</thead>',
								'<tbody>'
						  );
				td=[];
				for(var i=0;i<_class_.SUM_DAY_CELL;i++){
					td.push('<td class="',config._c_day,'">&nbsp;</td>');
					if((i+1)%_class_.DAY_COLUMN==0){
						html.push('<tr>',
									td.join(''),
								  '</tr>');
						td=[];
					}
				}
				html.push('</tbody>',
						'</table>',
						'</div>',
					    '<div class="',config._c_year_month_box,'">',
							'<table class="',config._c_year_month_list,'">',
								'<thead>'
						  );
				var td=[];
				for(var i=0;i<_class_.YEAR_CELL;i++){
					td.push('<th class="',config._c_year,'">&nbsp;</th>');
					if((i+1)%_class_.YEAR_COLUMN==0){
						html.push('<tr>',
									td.join(''),
								  '</tr>');
						td=[];
					}
				}
				html.push('<tr><td colspan="',_class_.YEAR_COLUMN,'" class="',config._c_separator,'">&nbsp;</td></tr>',
							'</thead>',
							'<tbody>'
							);
				td=[];
				var monthMap=_class_.MONTH_LABEL_MAP;
				for(var i=0,len=monthMap.length;i<len;i++){
					var month=monthMap[i];
					td.push('<td class="',config._c_month,'">',month,'</td>');
					if((i+1)%_class_.YEAR_COLUMN==0){
						html.push('<tr>',
									td.join(''),
								  '</tr>');
						td=[];
					}
				}
				html.push('</tbody>',
						'</table>',
						'</div>',
					'</div>');
				return html.join('');
			},
			date : new Date(),
			DAY_ROW : 6,
			DAY_COLUMN : 7,
			YEAR_ROW : 3,
			YEAR_COLUMN : 4,
			YEAR_CELL : 12,
			SUM_DAY_CELL: 42,
			//一天转成毫秒  24*60*60*1000;
			DAY_OF_TIME_MILLIS : 86400000,
			YEAR_LABEL:"年",
			MONTH_LABEL:"月",
			WEEK_LABEL_MAP:["日","一","二","三","四","五","六"],
			MONTH_LABEL_MAP:["一月","二月","三月","四月","五月","六月","七月",
							 "八月","九月","十月","十一月","十二月"],
			parse:function(date){
				var _date=new Date();
				if(!date){
					return _date;
				}
				_date.setTime(Date.parse(date));
				return _date;
			},
			date : new Date(),
			getToday : function(){
				this.date.setTime(Date.now());
				return this.date.format('yyyy-MM-dd');
			},
			getStartYear:function(dateTime){
				var millisec=this.date.getTime();

				this.date.setTime(dateTime);

				var year=this.date.getFullYear();

				this.date.setTime(millisec);
				
				var n=(""+year).match(/(\d)+/);

				return year - n[n.length-1] -1;
			},
			getStartDayDateTime:function(dateTime){
				var millisec=this.date.getTime();

				this.date.setTime(dateTime);
				this.date.setDate(1);

				dateTime=this.date.getTime();

				var fillDay=this.date.getDay();

				fillDay = fillDay == 0 ? 7 : fillDay;

				this.date.setTime(millisec);

				return dateTime - ( fillDay * this.DAY_OF_TIME_MILLIS);
			}
		},
		onRenderAfter:function(config){
			CF.logger(this,arguments);
			var $elem=this.$elem;

			var $header=$elem.children("."+config._c_header);

			this.$header=$header;
			this.$prevIcon=$header.children("."+config._c_prev_icon);
			this.$nextIcon=$header.children("."+config._c_next_icon);
			this.$headerLabel=$header.children("."+config._c_header_label).children();

			this.$yearMonthBox=$elem.children("."+config._c_year_month_box);

			this.$dayBox=$elem.children("."+config._c_day_box);

			this.$week=jQuery("."+config._c_week+":first",this.$dayBox);


			this.$yearList=jQuery("."+config._c_year,this.$yearMonthBox);
			this.$monthList=jQuery("."+config._c_month,this.$yearMonthBox);
			this.$dayList=jQuery("."+config._c_day,this.$dayBox);
			
			
			this.callSuperMethod();


			var defaultDate=ui.calendar.parse(this.date);
			if(!defaultDate){
				defaultDate=new Date();
			}
			
			this.date=defaultDate;
			
			var calendarDate=new Date();

			calendarDate.setTime(this.date.getTime());

			this.year=calendarDate.getFullYear();
			
			this.month=calendarDate.getMonth()+1;
			
			this.day=calendarDate.getDate();

			this.calendarDate=calendarDate;

			var calendarDateTime=calendarDate.getTime();

			this.startYear=this._class_.getStartYear(calendarDateTime);

			this.setTDValue();

			this.display="day";
			

			if(this.autoSize==true){
				var width=this.$render.getBoxInnerWidth();
				var height=this.$render.getBoxInnerHeight();
				this.setBoxSize(width,height);
			}
			this.resize();
		},
		onBindEvent:function(){
			CF.logger(this,arguments);

			this.$prevIcon.bindHover();
			this.$nextIcon.bindHover();
			this.$yearList.bindHover();
			this.$monthList.bindHover();
			this.$dayList.bindHover();
			
			
			var me=this;
			
			this.$prevIcon.click(function(){
				if(me.display=='day'){
					me.on("monthPrevPage");
				}else{
					me.on("yearPrevPage");
				}
			});

			this.$nextIcon.click(function(event){
				if(me.display=='day'){
					me.on("monthNextPage");
				}else{
					me.on("yearNextPage");
				}
			});

			this.$headerLabel.click(function(event){
				if(me.display=='day'){
					me.setDisplay('year');
				}else{
					me.setDisplay('day');
				}
			});


			this.$yearMonthBox.bind("mousewheel",function(event){
				if(event.originalEvent.wheelDelta<0){
					me.on("yearNextPage");
				}else{
					me.on("yearPrevPage");
				}
				return false;
			});

			this.$dayBox.bind("mousewheel",function(event){
				if(event.originalEvent.wheelDelta<0){
					me.on("monthNextPage");
				}else{
					me.on("monthPrevPage");
				}
				return false;
			});

			this.$yearList.click(function(event){
				$.removeClass(me._selected_year_td_,"selected");
				$.addClass(this,"selected");

				me._selected_year_td_=this;
				me.year=this._year_;

				
				me.setYear(this._year_);
			});
			
			this.$monthList.click(function(event){
				$.removeClass(me._selected_month_td_,"selected");
				$.addClass(this,"selected");

				me._selected_month_td_=this;
				me.month=this._month_;


				me.setMonth(this._month_);
			});
			
			this.$dayList.click(function(event){
				$.removeClass(me._selected_day_td_,"selected");
				$.addClass(this,"selected");
				
				me._selected_day_td_=this;
				me.year=this._year_;
				me.month=this._month_;
				me.day=this._day_;


				if(me.on("selected",this._date_)==false){
					return false;
				}
			});

		},
		setBoxSize:function(width,height){
			CF.logger(this,arguments);
			if(width<200 ||  height<200){
				return;
			}
			var $elem=this.$elem;
			$elem.css({
				width:width,
				height:height
			});
		},
		resize : function(){
			CF.logger(this,arguments);
			
			var boxInnerHeight=this.$elem.getBoxInnerHeight();
			var headerHeight=this.$header.outerHeight();
			var weekHeight=this.$week.outerHeight();

			var innerHeight= boxInnerHeight - headerHeight;
			var h=parseInt((innerHeight - weekHeight) /6);
			var me=this;

			var ph=innerHeight - weekHeight - h * 6;
			
			this.$week.height(weekHeight+ph);

			this.$dayList.each(function(index,td){
				if(index%6==0){
					$.style(td,"height",h);
				}
			});


			h=parseInt((innerHeight) /6);

			ph=innerHeight - h * 6;
			
			//this.$yearMonthBox.css("margin-top",ph +1);
			
			this.$yearList.each(function(index,td){
				if(index%4==0){
					$.style(td,"height",h);
				}
			});
			
			
			$.style(this.$yearList[0],"height",h + ph + 1);

			this.$monthList.each(function(index,td){
				if(index%4==0){
					$.style(td,"height",h);
				}
			});

		},
		setYear:function(year){
			CF.logger(this,arguments);
			var calendarDate=this.calendarDate;
			calendarDate.setFullYear(year);
			this.setHeaderLabel();
		},		
		setMonth:function(month){
			CF.logger(this,arguments);
			var calendarDate=this.calendarDate;
			calendarDate.setMonth(month-1);
			this.setHeaderLabel();
			this.setDayValue();
			this.setDisplay("day");
		},
		setDisplay:function(display){
			CF.logger(this,arguments);
			/*day,year*/
			if("day"==display){
				this.$yearMonthBox.slideUp();
				this.$dayBox.slideDown();
			}else{
				this.$dayBox.slideUp();
				this.$yearMonthBox.slideDown();
			}
			this.display=display;
		},
		onSelected:function(date){
			CF.logger(this,arguments);
			var calendarDate=this.calendarDate;
			calendarDate.setFullYear(this.year);
			calendarDate.setMonth(this.month-1);
			calendarDate.setDate(this.day);
			this.setHeaderLabel();
			this.setYearValue();
			this.setMonthValue();
		},
		onYearNextPage:function(){
			CF.logger(this,arguments);
			this.startYear+=this._class_.YEAR_CELL-2;
			this.setYearValue();
		},
		onYearPrevPage:function(){
			CF.logger(this,arguments);
			this.startYear-=this._class_.YEAR_CELL-2;
			this.setYearValue();
		},
		onMonthNextPage:function(){
			CF.logger(this,arguments);
			var calendarDate=this.calendarDate;
			calendarDate.setMonth(calendarDate.getMonth()+1);
			this.setTDValue();
		},
		onMonthPrevPage:function(){
			CF.logger(this,arguments);
			var calendarDate=this.calendarDate;
			calendarDate.setMonth(calendarDate.getMonth()-1);
			this.setTDValue();
		},
		setTDValue:function(){
			CF.logger(this,arguments);
			
			this.setHeaderLabel();

			this.setYearValue();
			
			this.setMonthValue();

			this.setDayValue();
			
		},
		setHeaderLabel:function(){
			CF.logger(this,arguments);
			var calendarDate=this.calendarDate;
			
			this.year=calendarDate.getFullYear();
			
			this.month=calendarDate.getMonth()+1;
			
			this.day=calendarDate.getDate();

			this.$headerLabel.html([this.year,ui.calendar.YEAR_LABEL,this.month,ui.calendar.MONTH_LABEL].join(""));
		},
		setYearValue:function(){
			CF.logger(this,arguments);
			
			var _c_year=this._c_year;

			var me=this;
		
			this.$yearList.each(function(index,td){
				var year=me.startYear+index;
				if(me.year==year){
					td.className=_c_year+" selected";
					me._selected_year_td_=td;
				}else{
					td.className=_c_year;
				}
				td._year_=year;
				td.innerHTML=year;
			});
			
			var len=this.$yearList.length;

			$.addClass(this.$yearList[0],this._c_prev_year);
			$.addClass(this.$yearList[len-1],this._c_next_year);

		},
		setMonthValue:function(){
			CF.logger(this,arguments);

			var _c_month=this._c_month;
			
			var me=this;

			this.$monthList.each(function(index,td){
				var month=index+1;
				if(me.month==month){
					td.className=_c_month+" selected";
					me._selected_month_td_=td;
				}else{
					td.className=_c_month;
				}
				td._month_=month;
			});
		},
		setDayValue:function(){
			CF.logger(this,arguments);

			var calendarDate=this.calendarDate;
			var calendarDateTime=calendarDate.getTime();

			var startDateTime=this._class_.getStartDayDateTime(calendarDateTime);

			var DAY_OF_TIME_MILLIS=this._class_.DAY_OF_TIME_MILLIS;

			
			var _c_day=this._c_day;
			var _c_prev_month_day=this._c_prev_month_day;
			var _c_next_month_day=this._c_next_month_day;

			var me=this;

			this.$dayList.each(function(index,td){
				calendarDate.setTime(startDateTime);
				
				var year=calendarDate.getFullYear();
				var month=calendarDate.getMonth()+1;
				var day=calendarDate.getDate();

				var dateString=calendarDate.format('yyyy-MM-dd');
				
				if(me.month<month || me.year>year){
					td.className=_c_day+" "+_c_prev_month_day;
				}else if(me.month>month || me.year<year){
					td.className=_c_day+" "+_c_next_month_day;
				}else if(me.day==day){
					//|| (me.year==year || me.month==month || me.day==day)
					td.className=_c_day+" selected";
					me._selected_day_td_=td;
				}else if(ui.calendar.getToday()==dateString){
					td.className=_c_day+" today";
				}else{
					td.className=_c_day;
				}
				td._year_=year;
				td._month_=month;
				td._day_=day;
				td._date_=dateString;
				td.title=dateString;
				td.innerHTML=day;
				startDateTime+=DAY_OF_TIME_MILLIS;
			});

			calendarDate.setTime(calendarDateTime);

		}
	});

})(CF,$,ui);