/*
方法： 画线、虚线、矩形、多角形、多边形、圆、铅笔、文字、
        撤消、橡皮、裁切、新建、保存、
属性：线宽、线端点样式、填充、描边、样式、边数、
*/
class Palette{
    constructor(opacity,ctx,canvas,erasers){
        this.opacity=opacity;
        this.erasers=erasers;
        this.canvas=canvas;
        this.ctx=ctx;
        this.cw=this.canvas.width;
        this.ch=this.canvas.height;
        this.lineWidth=1;
        this.lineCap='butt';
        this.style='stroke';
        this.strokeStyle='#000';
        this.fillStyle='#000';
        /* 历史记录 */
        this.history=[];
        /*  裁切 */
        this.temp=null;
    }
    intn(){
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.lineCap=this.lineCap;
        this.ctx.fillStyle=this.fillStyle;
        this.ctx.strokeStyle=this.strokeStyle;
    }
    /* 直线 */
    line(cx,cy,ox,oy){
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.lineTo(ox,oy);
        this.ctx.setLineDash([3,0]);
        this.ctx.stroke();
    }
    /* 虚线 */
    imag(cx,cy,ox,oy){
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.lineTo(ox,oy);
        this.ctx.closePath();
        this.ctx.setLineDash([3,5]);
        this.ctx.stroke();

    }
    /* 多边形 */
    poly(cx,cy,ox,oy,num){
        let rad=Math.PI*2/num;
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        this.ctx.beginPath();
        this.ctx.moveTo(cx+r,cy);
        for(let i=0;i<=num;i++){
            let x=cx+r*Math.cos(rad*i),
                y=cy+r*Math.sin(rad*i);
            this.ctx.lineTo(x,y);
            this.ctx.setLineDash([3,0]);
            this.ctx[this.style]();
        }
    }
    /* 多角形 */
    polyJ(cx,cy,ox,oy,num){
        let rad=Math.PI/num;
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        this.ctx.beginPath();
        this.ctx.moveTo(cx+r/2,cy);
        for(let i=0;i<=num*2;i++){
            let rr=i%2==0? r/2 : r ;
            let x=cx+rr*Math.cos(rad*i),
                y=cy+rr*Math.sin(rad*i);
           this.ctx.lineTo(x,y);
            this.ctx.setLineDash([3,0]);
            this.ctx[this.style]();
        }
    }
    /* 圆 */
    cricle(cx,cy,ox,oy){
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        this.ctx.beginPath();
        this.ctx.arc(cx,cy,r,0,Math.PI*2);
        this.ctx.setLineDash([3,0]);
        this.ctx[this.style]();
    }
    /* 铅笔 */
    pencil(){
        let that=this;
        this.opacity.onmousedown=function(e){
            let cx=e.offsetX, cy=e.offsetY;
            that.ctx.beginPath();
            that.ctx.moveTo(cx,cy);
            that.opacity.onmousemove=function(e){
                let ox=e.offsetX, oy=e.offsetY;
                that.ctx.lineTo(ox,oy);
                that.ctx.setLineDash([2,0]);
                that.ctx.stroke();
            }
            that.opacity.onmouseup=function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.opacity.onmousemove=null;
                that.opacity.onmouseup=null;
            }
        }
    }
    /* 矩形 */
    rect(cx,cy,ox,oy){
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.lineTo(cx,oy);
        this.ctx.lineTo(ox,oy);
        this.ctx.lineTo(ox,cy);
        this.ctx.closePath();
        this.ctx.setLineDash([3,0]);
        this.ctx[this.style]();
    }
    /* 橡皮  */
    eraser(){
        // let that=this;
        this.opacity.onmousedown=function(e){
            let cx=e.offsetX, cy=e.offsetY;
            this.erasers.style.display='block';
            this.erasers.style.top=`${cy}px`;
            this.erasers.style.left=`${cx}px`;
            this.opacity.onmousemove=function(e){
                let ox=e.offsetX-10, oy=e.offsetY-10;
                /* 边界 */
                this.erasers.style.top=`${oy}px`;
                this.erasers.style.left=`${ox}px`;
                this.ctx.clearRect(ox,oy,20,20);
            }.bind(this)
            this.opacity.onmouseup=function(){
                this.erasers.style.display='none';
                this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
                this.opacity.onmousemove=null;
                this.opacity.onmouseup=null;
            }.bind(this)
        }.bind(this)
    }
    /* 撤消 */
    recall(){
        if(!this.history.length){return};
        this.history.pop();
        this.ctx.clearRect(0,0,this.cw,this.ch);
        this.ctx.putImageData(this.history[this.history.length-1],0,0);
    }
    /* 字体 */
    font(){
        let that=this;
        let tops=0, lefts=0;
        this.opacity.onmousedown=function(e){
            that.opacity.onmousedown=null;
            let divs=document.createElement('div');
            let cx=e.offsetX, cy=e.offsetY;
            divs.contentEditable='true';
            divs.style.cssText=`
            width:150px;height:30px;border:1px solid blue;
            position:absolute;top:${cy}px;left:${cx}px;cursor:move;
            `;
            this.appendChild(divs);
            divs.onmousedown=function(e){
                let cx=e.clientX, cy=e.clientY;
                let left=divs.offsetLeft,top=divs.offsetTop;
                that.opacity.onmousemove=function(e){
                    let ox=e.clientX, oy=e.clientY;
                    lefts=left+ox-cx;
                    tops=top+oy-cy;
                    if(lefts<=0){
                        lefts=0;
                    }
                    if(lefts>=that.cw-150){
                        lefts=that.cw-150;
                    }
                    divs.style.left=`${lefts}px`;
                    divs.style.top=`${tops}px`;
                }
                divs.onmouseup=function(){
                    that.opacity.onmousemove=null;
                    divs.onmouseup=null;
                }
            }
            divs.onblur=function(){
                that.opacity.removeChild(divs);
                let value=this.innerText;
                divs=null;
                that.ctx.strokeText(value,lefts,tops);
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.ctx.font='bold 25px sers-serif';
            }
        }
    }
    /*  裁切  */
    clip(obj){
        let that=this;
        let w,h,minX,minY;
        this.opacity.onmousedown=function(e){
            obj.style.display='block';
            let cx=e.offsetX, cy=e.offsetY;
            that.opacity.onmousemove=function(e){
                let ox=e.offsetX, oy=e.offsetY;
                w=Math.abs(ox-cx), h=Math.abs(oy-cy);
                minX=ox<cx?ox:cx;
                minY=oy<cy?oy:cy;
                obj.style.top=`${minY}px`;
                obj.style.left=`${minX}px`;
                obj.style.width=`${w}px`;
                obj.style.height=`${h}px`;
            }
            that.opacity.onmouseup=function(){
                that.temp=that.ctx.getImageData(minX,minY,w,h);
                that.ctx.clearRect(minX,minY,w,h);
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.ctx.putImageData(that.temp,minX,minY);
                // obj.style.display='none';
                that.opacity.onmousemove=null;
                that.opacity.onmouseup=null;
                that.drag(minX,minY,obj);
            }
        }
    }
    drag(x,y,obj){
        let that=this;
        this.opacity.onmousedown=function(e){
            let cx=e.offsetX, cy=e.offsetY;
            that.opacity.onmousemove=function(e){
                let ox=e.offsetX,oy=e.offsetY;
                let lefts=x+ox-cx,
                    tops=y+oy-cy;
                obj.style.left=`${lefts}px`;
                obj.style.top=`${tops}px`;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.putImageData(that.temp,lefts,tops);
            }
            that.opacity.onmouseup=function(){
                obj.style.display='none';
                that.temp=null;
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.opacity.onmousemove=null;
                that.opacity.onmouseup=null;
            }
        }
    }

    /* 清除 */
    clear(){
        this.ctx.clearRect(0,0,this.cw,this.ch);
        this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
    }
    /* 反向 */
    reverse(){
        let image=this.ctx.getImageData(0,0,this.cw,this.ch);
        for(let i=0;i<image.data.length;i+=4){
            image.data[i]=255-image.data[i];
            image.data[i+1]=255-image.data[i+1];
            image.data[i+2]=255-image.data[i+2];
        }
        this.ctx.putImageData(image,0,0);
    }

    drow(type,num){
        let that=this;
        this.opacity.onmousedown=function(e){
            let cx=e.offsetX, cy=e.offsetY;
            that.opacity.onmousemove=function(e){
                let ox=e.offsetX, oy=e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.intn();
                that[type](cx,cy,ox,oy,num);

            }
            that.opacity.onmouseup=function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.opacity.onmousemove=null;
                that.opacity.onmouseup=null;
            }
        }
    }


}