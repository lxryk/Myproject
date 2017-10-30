/*
属性
字母   个数    速度   位置     生命    分数
方法
产生字符、   下落   消除   重新开始     下一关    重复   重叠
 */


function Game(){
	this.Arr=[['Z','img/Z.png'],
	['X','img/X.png'],
	['C','img/C.png'],
	['V','img/V.png'],
	['B','img/B.png'],
	['N','img/N.png'],
	['M','img/M.png'],
	['A','img/A.png'],
	['S','img/S.png'],
	['D','img/D.png'],
	['F','img/F.png'],
	['G','img/G.png'],
	['H','img/H.png'],
	['J','img/J.png'],
	['K','img/K.png'],
	['L','img/L.png'],
	['P','img/P.png'],
	['O','img/O.png'],
	['I','img/I.png'],
	['U','img/U.png'],
	['Y','img/Y.png'],
	['T','img/T.png'],
	['R','img/R.png'],
	['E','img/E.png'],
	['W','img/W.png'],
	['Q','img/Q.png']
	];
	//存储字母
	this.current=[];
	//页面中出现的字母个数
	this.num=5;
	this.speed=10;     //下落速度
	this.score=10;     //闯关分数
	this.sc=0;        //分数累计
	this.overlap=[];     //去重叠
	this.lifes=10;       //生命值
	this.scorebox=document.querySelector('.scorebox>span');
	this.life=document.querySelector('.life>span');
	this.level=document.querySelector('.level>span');
	this.gameover=document.querySelector('.gameover');
	this.chong=document.querySelector('.chong');
	this.stopp=document.querySelector('.stop');
	this.startt=document.querySelector('.start');
}
Game.prototype={
	start:function(){
		this.Gamechars();
		this.drop();
		this.key();
	},
	Gamechars:function(){
		for(let i=0;i<this.num;i++){
			this.Gamechar();	
		}
	},
	Gamechar:function(){
		let index=Math.floor(Math.random()*this.Arr.length);
		//创建div
		let divs=document.createElement('div');
		while(this.checkRepeat(this.Arr[index][0])){
		   index=Math.floor(Math.random()*this.Arr.length);  
		}
		divs.innerHTML=this.Arr[index][0];
		divs.classList.add('char');
		let tops=Math.random()*100;
		let lefts=Math.random()*(innerWidth-400)+200;
		while(this.checkleft(lefts,this.overlap)){
			lefts=Math.random()*(innerWidth-400)+200;
		}
		divs.style.top=tops+'px';
		divs.style.left=lefts+'px';
		divs.style.backgroundImage=`url(${this.Arr[index][1]})`;
		divs.style.fontSize='0';
		document.body.appendChild(divs);
		this.current.push(divs);
		this.overlap.push(lefts);
	},
	//去重复
	checkRepeat:function(value){
		return this.current.some(element=>{
			return element.innerText==value
		})
	},
	//去重叠
	checkleft:function(lefts){
		let leftb=this.overlap.some(function(value){
			return Math.abs(value-lefts)<40;
		});
		return leftb;
	},
	//掉落
	drop:function(){
		let that=this;
		this.t=setInterval(function(){
			for(let i=0;i<that.current.length;i++){
				let tops=that.current[i].offsetTop+that.speed;
				that.current[i].style.top=`${tops}px`;
				that.stopp.onclick=function(){
					that.stop();
				}
				that.startt.onclick=function(){
					console.log(1)
					that.drop();
				}
				if(tops>=600){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.overlap.splice(i,1);
					that.lifes-=1;
					that.life.innerText=that.lifes;
					if(that.life.innerText<=0){
						// confirm("是否重新开始？")
						that.gameover.style.top='70%';
						that.stop();
						that.chong.onclick=function(){
							that.gameover.style.top=0;
							that.restart();
							
						}
						/*if(true){
							that.restart();
						}else{
							close();
						}*/
					}
					that.Gamechar();
				}
			}
		},200);
	},
	//按键时消除
	key:function(){
		let that=this;
		document.onkeydown=function(e){
			for(let i=0;i<that.current.length;i++){
				//e.keyCode      String.fromcharCode();   
				//divs.innerHTML.charCodeAt();
				//字符串转换
				if(that.current[i].innerHTML==String.fromCharCode(e.keyCode)){
					that.sc+=1;
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.overlap.splice(i,1);
					that.scorebox.innerHTML=that.sc;
					that.Gamechar();
					if(that.sc==that.score){
						confirm("是否进行下一关？")
						that.next();
					}
				}
			}
		}
	},
	//下一关
	next:function(){
		let that=this;
		clearInterval(this.t);
		for(let i=0;i<this.current.length;i++){
			document.body.removeChild(this.current[i]);
		}
		this.current.length=0;
		this.overlap.length=0;
		this.num++;
		this.score+=10;
		this.sc=0;
		this.start();
		if(this.num<=6){
			that.level.innerHTML='simple';
		}else if(this.num>=6 && this.num<=14){
			that.level.innerHTML='general';
		}else{
			that.level.innerHTML='hard';
		}
	},
	//重新开始
	restart:function(){
		clearInterval(this.t);
		for(let i=0;i<this.current.length;i++){
			document.body.removeChild(this.current[i]);
		}
		this.current.length=0;
		this.overlap.length=0;
		this.lifes=10;
		this.sc=0;
		this.score+=10;
		this.life.innerText=this.lifes;
		this.num=5;
		this.start();
	},
	stop:function(){
		clearInterval(this.t);
		// let that=this;
		for(let i=0;i<this.current.length;i++){
				let topss=this.current[i].offsetTop;
				this.current[i].style.top=`${topss}px`;
			}

	}

}