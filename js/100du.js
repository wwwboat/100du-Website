$(function(){
				//搜索切换
				(function(){
					var aLi=$("#menu li");
					var oText=$(".bar form").find(".text");
					var arrText=[
					    '例如：荷塘鱼坊烧鱼 或 日本樱花料理',
					    '例如：昌平区育新站龙旗广场2号楼609室',
					    '例如：万达影院双人情侣券',
					    '例如：东莞出事了，大老虎是谁？',
					    '例如：北京初春降雪，天气变幻莫测'
					];
					var iNow=0;
					
					aLi.each(function(index){
						$(this).click(function(){
						
							aLi.attr("class","gradient");
							$(this).attr("class","active");
							iNow=index;
							oText.val(arrText[iNow]);
						});
					});
					
					oText.focus(function(){
						//console.log();
						if($(this).val()==arrText[iNow]){
							$(this).val("");
						} 
					}).blur(function(){
						if($(this).val()==""){
							$(this).val(arrText[iNow]);
						}
					});
				})();
				
				//update文字滚动
				(function(){
					var oUl=$(".update ul");
					
					//console.log(liH);
					var updateData=[
					    {"name":"枫枫","time":7,"title":"那些华美的瞬间","url":"https://wenku.baidu.com/view/b9de537bb8f67c1cfad6b8cd.html?from=search"},
					    {"name":"远远","time":6,"title":"广东3天抓获涉黄疑犯","url":"http://news.163.com/14/0212/19/9KTH6TUH00014AEE.html"},
					    {"name":"Amy","time":5,"title":"美国官员：就朝鲜问题正与中国合作","url":"http://finance.ifeng.com/a/20170416/15303063_0.shtml"},
					    {"name":"珠珠","time":4,"title":"华人南非乘坐大巴遭武装抢劫 背部中枪卡缝隙里","url":"http://news.sohu.com/20170417/n488969510.shtml"},
					    {"name":"豆豆","time":3,"title":"《印囧》引热议，徐峥霸气回应","url":"https://www.jiankang.com/detail/185676.shtml"},
					    {"name":"毛毛","time":2,"title":"在海边玩耍看到这个东西千万不要用手触碰","url":"http://travel.sohu.com/20170416/n488803711.shtml"},
					    {"name":"王嘉怡","time":1,"title":"车险这样组合最合适 拒绝再花冤枉钱","url":"http://auto.sina.com.cn/j_kandian.d.html?docid=fyafenm2664023&subch=uauto"},
					];
					var str="";
					var oBtnUp=$("#updateBtn");
					var oBtnDown=$("#downdateBtn");
					var iNow=0;
					var timer=null;
					var oDiv=$(".update");
					
					for(var i=0;i<updateData.length;i++){
						str+="<li><a href="+updateData[i].url+"><strong>"+updateData[i].name+"</strong><span>"+updateData[i].time+"分钟前</span>写了一篇新文章："+updateData[i].title+"</a></li>"
					}
					oUl.html(str);
					
					var liH=oUl.find("li").height();
					
					oBtnUp.click(function(){
						doMove(-1);
						//alert(iNow);
					})
					oBtnDown.click(function(){
						doMove(1);
						//alert(1);
					})
					oDiv.hover(function(){
						clearInterval(timer);
					},autoPlay);
					function autoPlay(){
						timer=setInterval(function(){
							doMove(-1);
						},3000)
					}
					autoPlay();
					function doMove(num){
						iNow+=num;
						if(Math.abs(iNow)>updateData.length-1){
							iNow=0;
						}
						if(iNow>0){
							iNow=-(updateData.length-1);
						}
						oUl.stop().animate({"top":liH*iNow},2000,"elasticOut");
					}
				})();
				
				
				//options选项卡切换
				(function(){
					fnTab($(".tabNav1"),$(".tabCon1"));
					fnTab($(".tabNav2"),$(".tabCon2"));
					fnTab($(".tabNav3"),$(".tabCon3"));
					fnTab($(".tabNav4"),$(".tabCon4"));
					
					function fnTab(oNav,aCon){
						var aElem=oNav.children();
						aCon.hide().eq(0).show();
						aElem.each(function(index){
						$(this).click(function(){
							aElem.removeClass("active").addClass("gradient");
							$(this).removeClass("gradient").addClass("active");
							aElem.find("a").attr("class","triangle_down_gray");
							$(this).find("a").attr("class","triangle_down_red");
							aCon.hide().eq(index).show();
						})
					})
					}
				})();
				
				//自动播放焦点图
				(function(){
					var oDiv=$("#fade");
					var aUlLi=oDiv.find("ul li");
					var aOlLi=oDiv.find("ol li");
					var oP=oDiv.find("p");
					var arr=["爸爸去哪啊～","人像摄影中的光影感","娇柔妩媚，美颜大方"];
					var iNow=0;
					var timer=null;
					
					fnFade();
					autoPlay();
					aOlLi.click(function(){
						iNow=$(this).index();
						fnFade();
					})
					oDiv.hover(function(){
						clearInterval(timer);
					},autoPlay);
					
					function fnFade(){
						aUlLi.each(function(i){
							if(i!=iNow){
								aUlLi.eq(i).fadeOut().css("z-index",1);
								aOlLi.eq(i).removeClass("active");
							}else{
								aUlLi.eq(i).fadeIn().css("z-index",2);
								aOlLi.eq(i).addClass("active");
								oP.text(arr[iNow]);
							}
						})
					}
					function autoPlay(){
						timer=setInterval(function(){
							iNow++;
							iNow%=arr.length;
							fnFade();
						},2000);
					}
				})();
				
				
				//日历提示说明
				
				(function(){
					var aSpan=$(".calendar h3 span");
					var aImg=$(".calendar .img");
					var oPrompt=$(".toda_info");
					var oImg=oPrompt.find("img");
					var oStrong=oPrompt.find("strong");
					var oP=oPrompt.find("p");
					
					aImg.hover(function(){
						var iTop=$(this).parent().position().top-30;
						var iLeft=$(this).parent().position().left+50;
						var num=$(this).parent().index()%aSpan.size();
						
						oPrompt.show().css({"left":iLeft,"top":iTop});
						oP.text($(this).attr("info"));
						oImg.attr("src",$(this).attr("src"));
						oStrong.text(aSpan.eq(num).text());
						},function(){
							oPrompt.hide();
						});
				})();
				
				
				//BBS高亮显示
				(function(){
					$(".bbs ol li").mouseover(function(i){
						$(".bbs ol li").removeClass("active");
						$(this).addClass("active");
						//$(".bbs ol li em").eq(i).text(arr[i]);
					})
				})();
				
				//显示遮罩层
				(function(){
					var aLi=$(".hotArea ul li");
					var arr=[
					"",
					"用户1<br/>用户信息",
					"用户名：性感宝贝<br>	区域：朝阳CBD<br/>人气：124987",
					"用户3<br/>用户信息",
					"用户4<br/>用户信息",
					"用户5<br/>用户信息",
					"用户6<br/>用户信息",
					"用户7<br/>用户信息",
					"用户8<br/>用户信息",
					"用户9<br/>用户信息",
					"用户10<br/>用户信息",
					"用户11<br/>用户信息",
					]
					
					aLi.mouseover(function(){
						if($(this).index()==0) return;
						$(".hotArea li p").remove();
						$(this).append("<p>"+arr[$(this).index()]+"</p>");
					})
				})();
			})