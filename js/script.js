/**
 * Created by sergii on 22.12.2016.
 */
var clickStart = document.getElementsByClassName('start')[0];
var clickSplit = document.getElementsByClassName('split')[0];
var clickClear = document.getElementsByClassName('clear')[0];
var innerTime,
    innerMillisecond,
    timeRun,
    newTime,
    statusTime = 0,
    secondTime = 0;
    i = 0;


function procesTime() {
    var dateTime = new Date();
    timeRun = setInterval(function() {
        newTime = new Date() - dateTime + secondTime;
        var millisecond = Math.floor(newTime) % 1000;
        var second = Math.floor(newTime / 1000) % 60;
        var minute = Math.floor(newTime / 60000) % 60;
        var hours = Math.floor(newTime / 3600000) % 24;
        if (millisecond.toString().length == 1) millisecond = '00' + millisecond;
        if (millisecond.toString().length == 2) millisecond = '0' + millisecond;
        if (second.toString().length == 1) second = '0' + second;if (minute.toString().length == 1) minute = '0' + minute;
        if (hours.toString().length == 1) hours = '0' + hours;
        innerTime = hours + ':' + minute + ':' + second;
        document.getElementsByClassName('time_container')[0].innerText = innerTime;
        innerMillisecond = millisecond;
        document.getElementsByClassName('milli_seconds')[0].innerText = innerMillisecond;
    }, 1);
}

function startPause() {
    if (statusTime == 1) {
        clickStart.innerText = 'continue';
        clickStart.style.color = '#00ff02';
        clearInterval(timeRun);
        secondTime = newTime;
        statusTime = 0;
        // console.log(secondTime);
    }
    else{
        clickStart.innerText = 'pause';
        clickStart.style.color = '#ff9d00';
        statusTime = 1;
        procesTime();
    }
}

function splitTime() {
        if (statusTime == 1) {
        var splitText = document.createElement('p');
        splitText.className = 'split_text';
        document.getElementById('split_wrapper').appendChild(splitText);
        document.getElementsByClassName('split_text')[i].innerText = (i + 1) + '. Split: ' + innerTime + '.' + innerMillisecond;
        i++;
    }
}

function clearTime(){
    clearInterval(timeRun);
    clickStart.innerText = 'start';
    clickStart.style.color = '#00ff02';
    statusTime = 0;
    secondTime = 0;
    i = 0;
    document.getElementsByClassName('time_container')[0].innerText = '00:00:00';
    document.getElementsByClassName('milli_seconds')[0].innerText = '000';
    var element = document.getElementsByClassName('split_text');
    while (element[0]) {
        document.getElementById('split_wrapper').removeChild(element[0]);
    }
}

clickStart.addEventListener('click', startPause);
clickSplit.addEventListener('click', splitTime);
clickClear.addEventListener('click', clearTime);

