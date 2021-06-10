
// 都輸入身高和體重之後，點擊'看結果'按鈕後，按鈕會告訴狀態，另外記錄到下面的bmilist，重整也不會消失。


// 資料----------

// 觸發
var inputHeight = document.querySelector('.input-height');
var inputWeight = document.querySelector('.input-weight');
var btnGetBMI = document.querySelector('.btn-getBMI');
var btnReset = document.querySelector('.btn-reset');

var deleteBtn = document.createElement('a');
deleteBtn.textContent = '刪除列表';
deleteBtn.setAttribute('href', '#');
deleteBtn.setAttribute('class', 'd-inline-block');
document.querySelector('.delete-box').appendChild(deleteBtn);


// 目標
var bmiResult = document.querySelector('.bmi-result');
var bmiResultNum = document.querySelector('.bmi-result-num');
var bmiDesc = document.querySelector('.bmi-desc');

var bmiList = document.querySelector('.bmi-list');
var data = JSON.parse(localStorage.getItem('data')) || [];
var Today = new Date();
var bmiIndex = {
    light: '過輕',
    narmal: '理想',
    heavy: '過重',
    lfat: '輕度肥胖',
    xlfat: '中度肥胖',
    xxlfat: '重度肥胖',
}

var heightNum = parseInt(inputHeight.value) / 100;
var weightNum = parseInt(inputWeight.value);
// BMI = 體重 / 身高的平方
var bmiNum = (weightNum / Math.pow(heightNum, 2)).toFixed(2);


// 介面----------

// 得到bmi結果
function getResult() {

    var heightNum = parseInt(inputHeight.value) / 100;
    var weightNum = parseInt(inputWeight.value);
    // BMI = 體重 / 身高的平方
    var bmiNum = (weightNum / Math.pow(heightNum, 2)).toFixed(2);

    // 當身高跟體重都有填寫，'看結果'按鈕消失，結果圓圈出現
    if (inputHeight.value && inputWeight.value !== '') {
        btnGetBMI.style.display = 'none';
        bmiResult.style.display = 'inline-block';
        bmiResultNum.innerHTML = bmiNum;
    }
    // 如果沒有都填寫，就會跳以下alert
    else if (inputHeight.value == '') {
        alert('您尚未填寫 身高 的欄位喔 !');
    }
    else if (inputWeight.value == '') {
        alert('您尚未填寫 體重 的欄位喔 !');
    }

    // BMI 
    if (bmiNum <= 18.5) {
        bmiDesc.innerHTML = bmiIndex.light;
        document.querySelector('.bmi-circle').classList.add("blue");
        borderColor = 'blue';
    } else if (bmiNum >= 18.5 && bmiNum <= 25) {
        bmiDesc.innerHTML = bmiIndex.narmal;
        document.querySelector('.bmi-circle').classList.add("green");
        borderColor = 'green';
    } else if (bmiNum >= 25 && bmiNum <= 30) {
        bmiDesc.innerHTML = bmiIndex.heavy;
        document.querySelector('.bmi-circle').classList.add("orangelight");
        borderColor = 'orangelight';
    } else if (bmiNum >= 30 && bmiNum <= 35) {
        bmiDesc.innerHTML = bmiIndex.lfat;
        document.querySelector('.bmi-circle').classList.add("orangemid");
        borderColor = 'orangemid';
    } else if (bmiNum >= 35 && bmiNum <= 40) {
        bmiDesc.innerHTML = bmiIndex.xlfat;
        document.querySelector('.bmi-circle').classList.add("orangemid");
        borderColor = 'orangemid';
    } else if (bmiNum >= 40) {
        bmiDesc.innerHTML = bmiIndex.xxlfat;
        document.querySelector('.bmi-circle').classList.add("red");
        borderColor = 'red';
    }

    // 設定加到localStorage的value
    var value = {
        borderColor: borderColor,
        desc: bmiDesc.innerHTML,
        bmi: (parseInt(inputWeight.value) / Math.pow(parseInt(inputHeight.value) / 100, 2)).toFixed(2),
        weight: parseInt(inputWeight.value),
        height: parseInt(inputHeight.value) / 100 * 100,
        date: (Today.getMonth() + 1) + '-' + Today.getDate() + '-' + Today.getFullYear(),
    };

    // 如果身高體重都有填寫資料，才會跑list出來
    if (inputHeight.value && inputWeight.value !== '') {
        data.push(value);
        localStorage.setItem('data', JSON.stringify(data));
        addList(data);
    };

}


// 新增bmi list
function addList(items) {

    var listLen = items.length;
    var str = '';
    for (var i = 0; i < listLen; i++) {
        str +=
            '<li class="'+ 
            data[i].borderColor + 
            '"><div class="row align-items-center"><div class="Block--2"><p class="desc">' +
            data[i].desc +
            '</p></div><div class="Block--10"><div class="row align-items-center"><div class="Block--3 text-center"><p class="bmi"><span>BMI</span>' +
            data[i].bmi +
            '</p></div><div class="Block--3 text-center"><p class="weight"><span>weight</span>' +
            data[i].weight + 'kg' +
            '</p></div><div class="Block--3 text-center"><p class="height"><span>height</span>' +
            data[i].height + 'cm' +
            '</p></div><div class="Block--3 text-right"><p class="date">' +
            data[i].date +
            '</p></div></div></div></div></li>';
    }
    bmiList.innerHTML = str;

}


// 清除localStorage 和 BMI 紀錄
function deleteList(e) {
    e.preventDefault();
    localStorage.clear();
    data = [];
    addList(data);
}

// 重新測試
function reset() {
    // 按reset按鈕後，'看結果'按鈕出現，結果圓圈消失
    btnGetBMI.style.display = 'inline-block';
    bmiResult.style.display = 'none';
    inputHeight.value = '';
    inputWeight.value = '';
}




// 事件---------- 順序要對
btnGetBMI.addEventListener('click', getResult); // 要先執行這個
btnReset.addEventListener('click', reset);
deleteBtn.addEventListener('click', deleteList);


addList(data);