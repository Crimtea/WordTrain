// JavaScript Document
// 切换按钮部分颜色的显示，以向用户提示当前处于何种模式
var modeType = 1;
function switchModeColor() {
	var mode1Color = document.getElementById("text_mode1");
	var mode2Color = document.getElementById("text_mode2");
	var mode3Color = document.getElementById("text_mode3");
	if (modeType == 1){
		modeType = 2;
		mode1Color.style.color="black";
		mode2Color.style.color="red";
	} else if (modeType == 2) {
		modeType = 3;
		mode2Color.style.color="black";
		mode3Color.style.color="red";
	} else if (modeType == 3) {
		modeType = 1;
		mode1Color.style.color="red";
		mode3Color.style.color="black";
	}
	switchMode(modeType);
}

// 切换模式
var inputExist = false;  // 用来记录输入框是否存在，初始为不存在
function switchMode(num_mode) {
	var word = document.getElementById("text_word");
	var yourInput = document.getElementById("your_input");
	var annotation = document.getElementById("text_annotation");
	if (num_mode == 1){
		word.style.display = "block";
		yourInput.style.display = "none";
		annotation.style.color = "black";
		inputExist = false;
	} else if (num_mode == 2){
		word.style.display = "block";
		yourInput.style.display = "none";
		annotation.style.color = "white";
	} else if (num_mode == 3){
		word.style.display = "none";
		yourInput.style.display = "block";
		annotation.style.color = "black";
		inputExist = true;
	}
}

// 点击 下一个
function clickBtn() {
	if (inputExist == true) {
		checkWord();
	} else {
		readRandomLine();
	}
}

// 判断输入框的正误
function checkWord() {
	var targetWord = document.getElementById("text_word");
	var yourWord = document.getElementById('your_input');
	if (targetWord.value == yourWord.value) {
		// 拼写正确情况下 清空输入框 并将输入框背景颜色改为 绿
		yourWord.placeholder = "- 对咯 -";
		yourWord.style.backgroundColor = "#55bb8a";
		readRandomLine();
	} else {
		// 拼写错误情况下 输入框加入提示 并将输入框背景颜色改为 红
		yourWord.placeholder = "- 错啦 -";
		yourWord.style.backgroundColor = "#de1c31";
	}
	document.getElementById('your_input').value = "";
	setTimeout(function() {
			yourWord.placeholder = "";
			yourWord.style.backgroundColor = "white";
		}, 200);
}

// 生成 min ~ max 之间的随机数
function getRandomNumber(min, max) {
	var num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

// 随机插入 start 到 end 之间的项
function readRandomLine() {
	var start = parseInt(document.getElementById('start').value, 10);
	var end = parseInt(document.getElementById('end').value, 10);
	fetch('trainDict.txt')
	.then(response => response.text())
	.then(data => {
		var lines = data.split('\n'); // 将文件内容分割成行
		var randomLine = getRandomNumber(start, end); // 会给出 start 到 end 范围的数字
		document.getElementById('text_word').value = lines[randomLine*2-2];
		document.getElementById('text_annotation').innerHTML = lines[randomLine*2-1];
	});
}
readRandomLine();

// 获取按钮元素
var btnEnter = document.getElementById("btn_run");

// 当按钮被点击时执行的函数
function handleClick() {
	clickBtn();
}

// 当按下Enter键时执行的函数
document.addEventListener('keydown', function(event) {
	if (event.code === 'Enter') {
		event.preventDefault(); // 防止默认提交表单等动作发生
		handleClick(); // 调用按钮被点击时的函数
	}
});

// 将按钮点击事件与handleClick函数关联起来
btnEnter.onclick = handleClick;