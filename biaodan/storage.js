/*
属性
	存储
方法
	增、删、改、查
 */

class storage{
	constructor(){
		this.date=[{name:'张三',age:'20',sex:'男',phone:'123456',address:'山西太原'},
		{name:'李四',age:'20',sex:'男',phone:'123456',address:'山西太原'},
		{name:'王五',age:'18',sex:'男',phone:'25416',address:'山西大同'},
		{name:'小丽',age:'22',sex:'女',phone:'9854120',address:'山西临汾'},
		{name:'小明',age:'17',sex:'女',phone:'562314',address:'山西吕梁'},
		{name:'李泽宙',age:'20',sex:'男',phone:'123456',address:'山西太原'},
		{name:'李泽宙',age:'20',sex:'男',phone:'123456',address:'山西太原'}];
	}
	_init(){
		localStorage.setItem("student",JSON.stringify(this.date));
	}
	getDate(){
		let date=localStorage.getItem("student");
		if(!date){
			this._init();
		}
		return this.date=JSON.parse(localStorage.getItem("student"));
	}
	upDate(row,index,value){
		this.date[row][index]=value;
		this.save();
	}
	del(index){
		this.date.splice(index,1);
		this.save();
	}
	push(obj){
		this.date.push(obj);
		this.save();
	}
	save(){
		localStorage.setItem("student",JSON.stringify(this.date));
	}
}
