$(function(){
	/* 下拉导航 */
let lists=$('.line>ul>li');
lists.on('mouseenter mouseleave',function(){
	$(this).find('dl').stop();
	$(this).find('dl').slideToggle();
})

let yuan=$('.boxll');
yuan.each(function() {
	$(this).delay(2000).animate({width:104,height:104});
});

/* 轮播图 */
let list=$('.box>ul>li');
let imgw=list.width();

let now=next=0;
let t=setInterval(move,1000);

function move(){
	next++;
	if(next == list.length){
		next=0;
	}
	list.eq(next).css({left:imgw});
	list.eq(next).animate({left:0});
	list.eq(now).animate({left:-imgw});
	now=next;
}


})

