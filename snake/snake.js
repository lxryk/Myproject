/*

属性

方法：画线    画蛇
 */
function Snake(){
	this.sence=document.querySelector('.sence');
	this.snake=['0_0','1_0','2_0'];
	this.flas=['0_0:true','1_0:true','2_0:true'];
	this.direction=39;
	this.food='';
}
Snake.prototype={
	start:function(){
		this.drawline();
		this.drawsnake();
		this.remove();
		this.key();
		this.dropFood();
	},
	//画线
	drawline:function(){
		for(let i=0;i<20;i++){
			for(let j=0;j<20;j++){
				this.sence.innerHTML+=`<div class='block' id='${i}_${j}'></div>`;
			}
		}
	},
	//画蛇
	drawsnake:function(){
		this.snake.forEach(element=>{
			document.getElementById(element).classList.add('hot');
		})
	},
	//动
	remove:function(){
		//加头   去尾
		let that=this;
		this.t=setInterval(function(){
			let oldt=that.snake[that.snake.length-1];
			let arr=oldt.split('_');
			let newt='';
			//判断方向
			if(that.direction == 37){
				newt=`${arr[0]*1}_${arr[1]*1-1}`;
			}else if(that.direction == 38){
				newt=`${arr[0]*1-1}_${arr[1]*1}`;
			}else if(that.direction == 39){
				newt=`${arr[0]*1}_${arr[1]*1+1}`;
			}else if(that.direction == 40){
				newt=`${arr[0]*1+1}_${arr[1]*1}`;
			}
			//判断是否出界   判断是否咬到自己
			let newarr=newt.split('_');
			if(newarr[0]<0 || newarr[0]>19 || newarr[1]<0 || newarr[1]>19  ||
				that.flas[newt]){
				clearInterval(that.t);
				confirm("Game over! 是否重新开始？")
				/*if(confirm("Game over! 是否重新开始？")){
					Snakes.start();
				}*/
			}
			//新头的坐标  ==   食物的坐标   
			if(newt == that.food){
				that.snake.push(newt);
				that.flas[newt]=true;
				document.getElementById(that.food).style.background='#fff';
				that.dropFood();
			}else{
				that.snake.push(newt);
				that.flas[newt]=true;
				let wb=that.snake.shift();
				delete that.flas[wb];
				document.getElementById(wb).classList.remove('hot');
			}
			that.drawsnake();
		},600)
	},
	//按键  取  方向
	key:function(){
		document.onkeydown=function(e){
			let keys=e.keyCode;
			if(Math.abs(this.direction-keys) == 2){
				return;
			}
			this.direction=keys;
		}.bind(this) 
	},
	//  投放食物
	dropFood:function(){
		let x,y;
		do{
			x=Math.floor(Math.random()*20);
			y=Math.floor(Math.random()*20);
		}while(this.flas[`${x}_${y}`])
		this.food=`${x}_${y}`;
		document.getElementById(this.food).style.background='red';
	},
	//重新开始
	

}