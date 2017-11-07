$(function(){
    for(let i=0;i<15;i++){
        $('<div>').appendTo('.qipan').addClass('heng');
        $('<span>').appendTo('.qipan').addClass('shu');
        for(let j=0;j<15;j++){
            $('<li>').appendTo('.qipan').addClass('qizi').attr('id',i+'_'+j).data('pos',{x:i,y:j});
        }
    }
    let flag=true;
    let hei={};
    let bai={};
    $('.qizi').on('click',function(){
        if($(this).hasClass('hei') || $(this).hasClass('bai')){
            return;
        }
        let pos=$(this).data('pos')
        if(flag){
         hei[pos.x+'_'+pos.y]=true;
            $(this).addClass('hei');
            if(panduan(pos,hei)>=5){
                $('.qizi').off();
                alert('黑棋胜');
            }
        }else{
            bai[pos.x+'_'+pos.y]=true;
            $(this).addClass('bai');
            if(panduan(pos,bai)>=5){
                $('.qizi').off();
                alert('白棋胜');
            }
        }
        flag=!flag;
    })

    function panduan(pos,obj){
        let rows=1,cols=1,zx=1,yx=1;
        // 横
        let i=pos.x,j=pos.y+1;
        while(obj[i+'_'+j]){
            j++;
            rows++;
        }
        i=pos.x;
        j=pos.y-1;
        while(obj[i+'_'+j]){
            j--;
            rows++;
        }
        //竖
        i=pos.x+1;
        j=pos.y;
        while(obj[i+'_'+j]){
            i++;
            cols++;
        }
        i=pos.x-1;
        j=pos.y;
        while(obj[i+'_'+j]){
            i--;
            cols++;
        }
        //左斜
        i=pos.x-1;
        j=pos.y+1;
        while(obj[i+'_'+j]){
            j++;
            i--;
            zx++;
        }
       i=pos.x+1;
       j=pos.y-1;
       while(obj[i+'_'+j]){
            j--;
            i++;
            zx++;
       }
       //右斜
       i=pos.x-1;
       j=pos.y-1;
       while(obj[i+'_'+j]){
            i--;
            j--;
            yx++;
       }
       i=pos.x+1;
       j=pos.y+1;
       while(obj[i+'_'+j]){
            i++;
            j++;
            yx++;
       }
       return Math.max(rows,cols,zx,yx);
    }
    

})