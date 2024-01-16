// JavaScript Document
// 读取a.txt文件的内容
fetch('trainDict.txt')
.then(response => response.text())
.then(data => {
const lines = data.split('\n');  // 按行分割数据  
    const tableContainer = document.getElementById('tableContainer');  // 获取表格容器元素
    const table = document.createElement('table');  // 创建表格元素
    const thead = document.createElement('thead');  // 创建表头行
    const tbody = document.createElement('tbody');  // 创建表格主体部分
    // 创建表头
    const thRow = document.createElement('tr');  // 创建表头行中的单元格
    thRow.innerHTML = '<th>序号</th><th>单词</th><th>中文+专业解释</th>';  // 设置表头内容
    thead.appendChild(thRow);  // 将表头行添加到表头部分
    // 填充表格数据
    for (let i = 0; i < lines.length; i += 2) {  // 修改循环条件，每次取两行数据
        const num = (i/2+1);
        const line1 = lines[i];
        const line2 = lines[i + 1];
        const cells = [num, line1, line2].map(cell => `<td>${cell}</td>`);  // 将每两行数据分割为两个单元格
        const tr = document.createElement('tr');  // 创建表格行中的单元格
        tr.innerHTML = cells.join('');  // 设置表格行内容，合并单元格HTML字符串
        tbody.appendChild(tr);  // 将表格行添加到表格主体部分
    }
    // 将表头和表格主体部分添加到表格元素中，并将表格元素添加到表格容器中
    table.appendChild(thead);  // 将表头添加到表格元素中
    table.appendChild(tbody);  // 将表格主体部分添加到表格元素中
    tableContainer.appendChild(table);  // 将表格元素添加到表格容器中  
})
.catch(error => console.error('Error:', error));  // 错误处理，打印错误信息到控制台