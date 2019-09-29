window.onload = function() {

	//显示输入框
	function show(tagname_1,tagname_2) {

		if (document.getElementsByClassName(tagname_1)[0].getAttribute('name') == 1) {
			document.getElementsByClassName(tagname_1)[0].style.display = 'none';
			document.getElementsByClassName(tagname_1)[0].setAttribute('name', 0);
			document.getElementsByClassName(tagname_2)[0].setAttribute('name', 0);
			document.getElementsByClassName(tagname_2)[0].style.display = 'none';
		} else {
			document.getElementsByClassName(tagname_1)[0].style.display = 'block';
			document.getElementsByClassName(tagname_1)[0].setAttribute('name', 1);
			document.getElementsByClassName(tagname_2)[0].setAttribute('name', 0);
			document.getElementsByClassName(tagname_2)[0].style.display = 'none';
		}

	}
	
	//添加名字按钮
	document.querySelector('.addName').onclick = function() {
		show('head','count');
	}
	//添加人数按钮
	document.querySelector('.addNum').onclick = function() {
		show('count','head');
	}
	


	//向本地取值
	var name = localStorage.getItem('name');
	name = name ? JSON.parse(name) : {};

	if (!name.arr) {
		name.arr = [];
	}
	if (!name.number) {
		name.number = [];
	}
	
	
	
	//重置人数
	document.querySelector('.again').onclick = function(){
		var bool = confirm('是否确认重置学号？');
		if(bool){
			name.number = [];
			localStorage.setItem('name', JSON.stringify(name));
			//初始化人数
			initName('number');
		}
	}
	
	//返回上个名字
	document.querySelector('.return').onclick = function(){
		var bool = confirm('是否确认删除？');
		if(bool){
			name.arr.pop();
			localStorage.setItem('name', JSON.stringify(name));
			//初始化人数
			initName('arr');
		}
		
	}
	
	
	//向本地存储数据
	function add(elem,type){
		var stuName = document.querySelector(elem+'>input').value;
		document.querySelector(elem+'>input').value = '';
		if(type == 'arr'){
			name.arr.push(stuName);
		}else{
			for(var i = 0; i < stuName; i++){
				name.number.push((i+1));
			}
			
		}
		localStorage.setItem('name', JSON.stringify(name));
		initName(type);
	}
	
	
	//提交名字按钮
	document.querySelector('.head>button').onclick = function(){
		add('.head','arr');
	}
	
	//提交人数按钮
	document.querySelector('.count>button').onclick = function(){
		add('.count','number');
		document.querySelector('.count').style.display = 'none';
	}


	//向页面插入数据
	function initName(type) {
		document.querySelector('.nameBox').innerHTML = '';
		for (var i = 0; i < name[type].length; i++) {
			var li = document.createElement('li');
			li.innerHTML = name[type][i];
			document.querySelector('.nameBox').appendChild(li);
		}
	}
	initName('arr');
	
	
	//显示名单
	document.querySelector('.showName').onclick = function(){
		initName('arr');
		document.querySelector('.name>button').setAttribute('name','showName');
		
		startType();
	}
	
	//显示学号
	document.querySelector('.showNum').onclick = function(){
		initName('number');
		document.querySelector('.name>button').setAttribute('name','showNum');
		
		startType();
	}
	
	
	//点名类型
	function startType(){
		if(document.querySelector('.name>button').getAttribute('name') == 'showNum'){
			start('number');
		}else{
			start('arr');
		}
	}


	//开始点名
	function start(type) {
		document.querySelector('.name>button').onclick = function() {
			var li = document.querySelectorAll('.nameBox>li');
			var count = 0;
			var num = 0;
			var times = setInterval(function() {

				for (var i = 0; i < name[type].length; i++) {
					li[i].className = '';
				}

				var num = parseInt(Math.random() * name[type].length);

				li[num].className = 'activ';

				count++;
				if (count >= 10) {
					clearInterval(times);
				}
				
			}, 500);
		}
	}
	start('arr');
	

}
