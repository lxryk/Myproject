window.onload=function(){
/*
单元格td 
保存值    清楚值
创建input
将值给了input
更新值   保存值    
清楚input
将input的值给了td 
 */
let table=document.querySelector('tbody');
let add=document.querySelector('.addBut');
let date=new storage();

load();
function load(){
	let student=date.getDate();
	student.forEach((element,index)=>{
		creatTr(element,index);
	})
}

function creatTr(obj,i){ 
	let Tr=document.createElement('tr');
	Tr.id=i;
	Tr.innerHTML=`
			<td type="name">${obj.name}</td>
			<td type="age">${obj.age}</td>
			<td type="sex">${obj.sex}</td>
			<td type="phone">${obj.phone}</td>
			<td type="address">${obj.address}</td>
			<td class="del">
				<button>删除</button>
			</td>
	`
	table.appendChild(Tr);
}

//删除  修改
 table.ondblclick=function(e){
 	let element=e.target;
 	if(element.nodeName=='TD' && element.className != "del"){
 		let text=element.innerText;
 		element.innerText='';
	 	let input=document.createElement('input');
	 	element.appendChild(input);
	 	input.value=text;
	 	input.onblur=function(){     //失去焦点时
	 		let newtext=this.value;
	 		element.removeChild(input);
	 		if(newtext){
	 			element.innerText=newtext;
	 		}else{
	 			element.innerText=text;
	 		}
	 		//修改
	 		let row=element.parentNode.id,           
	 			index=element.getAttribute('type'),
	 			value=newtext;
	 		date.upDate(row,index,value);	
	 	}
 	 }else if(element.nodeName=='BUTTON'){
 	 	let trs=element.parentNode.parentNode;
 	 	table.removeChild(trs);
 	 	//删除
 	 	let index=element.parentNode.parentNode.id;       
 	 	date.del(index);
 	 	table.innerHTML='';
 	 	load();
 	 }
 }

//添加
	add.onclick=function(){
		table.innerHTML='';
		let obj={name:'李四',age:'20',sex:'男',phone:'123456',address:'山西太原'};
		date.push(obj,table.childElementcont);
		load();
	}

}
