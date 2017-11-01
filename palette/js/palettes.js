window.onload=function(){
    let canvas=document.querySelector('canvas');
    let ctx=canvas.getContext('2d');
    let opacity=document.querySelector('.zhezhao');
    let erasers=document.querySelector('.xiangpi');
    let eraser=document.querySelector('#eraser');
    let tool=document.querySelectorAll('.tool');
    let fill=document.querySelector('#fill');
    let font=document.querySelector('#font');
    let clips=document.querySelector('.clips');
    let clip=document.querySelector('#clip');
    let fills=document.querySelectorAll('#stroke,#fill');
    let colors=document.querySelectorAll('#strokeStyle,#fillStyle');
    let save=document.querySelector('#save');
    let recall=document.querySelector('#recall');
    let clear=document.querySelector('#clear');
    let reverse=document.querySelector('#reverse');
    let pale=new Palette(opacity,ctx,canvas,erasers);
    console.log(save);
    tool.forEach(element=>{
       element.onclick=function(){
           document.querySelector('li[active=true]').setAttribute('active',false);
           this.setAttribute('active',true);
          /* for(let i=0;i<tool.length;i++){
               tool[i].style.border='2px solid #fff';
           }
           element.style.border='2px solid #ff6700';*/
           let num=0;
           if(this.id == 'poly' || this.id == 'polyJ'){
               num=prompt('边数',5);
           }
           if(this.id=='pencil'){
               pale.pencil();
           }
           if(this.id == 'recall'){
               pale.recall();
           }
           pale.drow(this.id,num);

       }
    })
    fills.forEach(element=>{
        element.onclick=function(){
            for(let i=0;i<fills.length;i++){
                fills[i].setAttribute('active',false);
            }
            this.setAttribute('active',true);
            pale.style=this.id;
        }
    })
    colors.forEach(element=>{
        element.onclick=function(){
            for(let i=0;i<fills.length;i++){
                colors[i].parentNode.setAttribute('active',false);
            }
            this.parentNode.setAttribute('active',true);
            element.onchange=function(){
                pale[this.id]=this.value;
            }
        }
    })
    save.onclick=function(){
        let date=canvas.toDataURL('image/png');
        save.href=date;
        save.download='li.png';
    }
    recall.onclick=function(){
        pale.recall();
    }
    clear.onclick=function(){
        pale.clear();
    }
    reverse.onclick=function(){
        pale.reverse();
    }
    //先触发
    tool[0].onclick();
    eraser.onclick=function(){
        pale.eraser();
    }
    font.onclick=function(){
        pale.font();
    }
    clip.onclick=function(){
        pale.clip(clips);
    }
}