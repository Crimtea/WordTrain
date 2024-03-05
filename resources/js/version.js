// JavaScript Document
// 向页脚插入版本信息
fetch('/WordTrain/resources/public/version.txt') // 获取文件
.then(response => response.text())
.then(data => {
	document.getElementById('version').innerText = data;
})
.catch(error => console.error('Error:', error));