$(function(){
    let color=['c','d','h','s'];
    let poke=[];
    let flag={};
    let index=0;

    while(poke.length<52){
        let hua=color[Math.floor(Math.random()*color.length)];
        let shu=Math.floor(Math.random()*13+1);
        if(!flag[`${shu}_${hua}`]){
            poke.push({shu,hua});
            flag[`${shu}_${hua}`]=true;
        }
    }
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            let left=310-50*i+100*j,
                top=40*i;
            $('<div>').addClass('box').attr('id',`${i}_${j}`)
                .data('num',poke[index].shu)
                .css({background:`url(img/${poke[index].shu}${poke[index].hua}.jpg) center/cover`})
                .appendTo('.zhuozi').delay(i*50).animate({left,top,opacity:'1'});
            index++;
        }
    }
   for(;index<poke.length;index++){
        let left=10,
             top=480;
       $('<div>').addClass('box').data('num',poke[index].shu)
           .attr('id',`${-2}_${-2}`)
           .addClass('zuo')
           .css({background:`url(img/${poke[index].shu}${poke[index].hua}.jpg) center/cover`})
           .appendTo('.zhuozi').delay(index*30).animate({left,top,opacity:'1'});
   }
    let first=null;
   $('.zhuozi').on('click','.box',function(e){
       let element=$(e.target);
       let ele=element.attr('id').split('_');
       let fir=`#${ele[0]*1+1}_${ele[1]*1}`;
       let sec=`#${ele[0]*1+1}_${ele[1]*1+1}`;
       if($(fir).length || $(sec).length){
           return;
       }
       element.toggleClass('active');
       if(element.hasClass('active')){
           element.animate({top:'-=20'})
       }else{
           element.animate({top:'+=20'})
       }
       if(!first){
           first=element;
       }else{
           console.log(first.data('num') + element.data('num'));
           if(first.data('num') + element.data('num') == 14){
               $('.active').animate({left:550,top:0,opacity:0},function(){
                   $(this).remove();
               })
           }else{
               $('.active').animate({top:'+=20'},function(){
                   $(this).removeClass('active')
               })
           }
           first=null;
       }
   })
    let zindex=0;
    $('.buttnR').on('click',function(){
        $('.zuo').eq(-1).css('zIndex',zindex++).animate({left:600,top:400},).removeClass('zuo').addClass('you');
    })
    $('.buttnL').on('click',function(){
        if(!$('.you').length){return}
        zindex=0;
        $('.you').each(function(index){
            $(this).delay(index*100).css('zIndex',zindex++).animate({left:10,top:480}).removeClass('you').addClass('zuo');
        })
    })

})