window.addEventListener('load',function(){
	let  dl=document.querySelector('dl');
	let aside=document.querySelector('.aside');
	console.log(aside);
	let into=[
		{name:'李鑫荣',tell:'18406581501',py:'lixinrong'},
	{name:'张艳鑫',tell:'18406581402',py:'zhangyanxin'},
	{name:'何楚慧',tell:'18406581403',py:'hechuhui'},
	{name:'李泽宙',tell:'18406581404',py:'lizezhou'},
	{name:'牛佳琪',tell:'18406581405',py:'niujiaqi'},
	{name:'张秀荣',tell:'18406581406',py:'zhangxiurong'},
	{name:'贾亚男',tell:'18406581407',py:'jiayanan'},
	{name:'樊振敏',tell:'18406581408',py:'fanzhenmin'},
	{name:'荆振国',tell:'18406581409',py:'jingzhenguo'},
	{name:'燕剑豪',tell:'18406581411',py:'yanjianhao'},
	{name:'张三',tell:'18406581412',py:'zhangsan'},
	{name:'李四',tell:'18406581413',py:'lisi'},
	{name:'王五',tell:'18406581414',py:'wangwu'},
	{name:'赵四',tell:'18406581415',py:'zhoasi'},
	{name:'赵六',tell:'18406581416',py:'zhaoliu'},
	{name:'李玲',tell:'18406581417',py:'liling'},
	{name:'李丽',tell:'18406581418',py:'lili'},
	{name:'王娜',tell:'18406581419',py:'wangna'},
	{name:'陈斌',tell:'18406581420',py:'chenbin'},
	{name:'王斌',tell:'18406581421',py:'wangbin'},
	{name:'小小',tell:'18406581422',py:'xiaoxiao'},
	{name:'李娜',tell:'18406581423',py:'lina'},
	];

    //搜索
	let input=document.querySelector('header>input');
	input.onkeyup=function(){
		let value=this.value.trim();
		let num=into.filter(function(element){
			return element.py.includes(value)
			||element.name.includes(value)||element.tell.includes(value);
		})
		render(num);
	}

	render(into);
	let dt=document.querySelectorAll('dt');
	let tips=document.querySelector('.tips');
	let heights=document.querySelector('header').offsetHeight;
	let top=[];
	dt.forEach(element=>{
		top.push(element.offsetTop);
	})
	//滑动页面时让首字母保留
	window.onscroll=function(){
		tips.innerHTML='';
		let bhs=document.body.scrollTop;
		top.forEach((element,index)=>{
			if(bhs+heights>=element-50){
				tips.innerHTML=dt[index].innerHTML;
			}
		})
	}
	//获取数据
	function render(arr){
		dl.innerHTML='';
		aside.innerHTML='';
		let obj=[];
		arr.forEach(function(element){
			let value=element.py.charAt(0).toUpperCase();
			if(!obj[value]){
				obj[value]=[];
			}
			obj[value].push(element);
		})
		//获取对象的某一个属性： keys（），并且将数组进行排序。
		let newobj=Object.keys(obj).sort();
		newobj.forEach(element=>{
			dl.innerHTML+=`<dt>${element}</dt>`;
			aside.innerHTML+=`<li>${element}</li>`;
			obj[element].forEach(value=>{
				dl.innerHTML+=`<dd><a href="tel:${value.tell}">${value.name}</a></dd>`
			})
		})
	}
	aside.style.top=`${aside.offsetHeight/2}px`;




	
})
  