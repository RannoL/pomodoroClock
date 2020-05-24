let startClock = false;
let pomodoro;
let breakIdenty = false;
/* let breakCount = 0; */
let initialClock = "25:00";
let shortBreak = "05:00";
let longBreak = "10:00";

function countdown () {
    
    let clockText = document.querySelector('#clockText').textContent;
    let arr = clockText.split(":");

    if(arr[0] <= 0 && arr[1] <= 0){
        stop();
        return
    }

    let toSeconds = ((arr[0] * 60 )+ parseInt(arr[1]))-1;
    let minutes = Math.floor(toSeconds/60);
    let seconds = toSeconds - (minutes*60);

    seconds < 10 ? seconds = "0" + seconds : void(0);
    minutes < 10 ? minutes = "0" + minutes : void(0);

    document.querySelector('#clockText').textContent = `${minutes}:${seconds}`;

    if(minutes === "00" && seconds === "00"){
        document.querySelector('#clockText').textContent = `00:00`;
        clearInterval(startClock);  
        playSound();
/*         breakCounter++;
        breakCounter < 4 ? breakState("short") : () => {
            breakState("long");
            breakCounter = 0;
        } */
        pomodoroDone();

    }
}

function pomodoroDone(){
    document.querySelector('h2').textContent = "It's time to rest!";
    document.getElementById('bodyWrap').style.background = "#48A9A6";
    document.querySelector('#startBtn').textContent = 'Reset'
    document.querySelector('#startBtn').setAttribute('onclick', `resetTimer()`)
}

function toUpperCase(str){
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function changeStartBtn (state) {
    document.querySelector('#startBtn').textContent = `${toUpperCase(state)}`;
    document.querySelector('#startBtn').setAttribute('onclick', `${state}()`)

}

function start (){
    startClock = setInterval(countdown, 10);
    changeStartBtn("stop");
}

function stop(){
    clearInterval(startClock)
    startClock = false;
    changeStartBtn("start");

}

function resetTimer(){
    stop();
    document.querySelector('h2').textContent = "It's time to work!";
    document.getElementById('bodyWrap').style.background = "#D92B33";
    document.querySelector("#clockText").textContent = initialClock;
    breakIdenty = false;
    document.querySelector('#startBtn').setAttribute('onclick', `start()`)
    start();

}

function breakState(type) {
    document.querySelector('h2').textContent = "It's time to rest!";
    document.getElementById('bodyWrap').style.background = "#48A9A6";
    if(type === "short"){
        document.querySelector("#clockText").textContent = shortBreak;
        breakIdenty = type;
        return
    }else if (type === "long") {
        document.querySelector("#clockText").textContent = longBreak;
        breakIdenty = type;
        return
    }
}

function sBreak(){
    stop();
    breakState("short");
    start();
}

function lBreak(){
    stop();
    breakState("long");
    start();
}

function openSettings(){
    const modal = document.querySelector("#modalWrap");
    const closeSpan = document.querySelector('#close');
    modal.style.display = "block";
    closeSpan.onclick = () => modal.style.display = "none";
    window.onclick = (e) => e.target == modal ? modal.style.display = 'none':void(0)
}

function saveCustoms(){
    const modal = document.querySelector("#modalWrap");
    const cstmTimes = document.querySelector("#cstmTimesForm");

    //2 last values are submits
    for(i = 0; i < cstmTimes.length - 2; i++){
        switch(i){
            case 0:
                initialClock = cstmTimes.elements[i].value;
                cstmTimes.elements[i].placeholder = initialClock;
                //Otherwise clock would show 1:00
                initialClock < 10 ? initialClock = "0" + initialClock + ":00" 
                : initialClock += ":00";
                break;
            case 1:
                shortBreak = cstmTimes.elements[i].value;
                cstmTimes.elements[i].placeholder = shortBreak;
                shortBreak < 10 ? shortBreak = "0" + shortBreak + ":00" 
                :shortBreak+= ":00";
                break;
            case 2:
                longBreak = cstmTimes.elements[i].value;
                cstmTimes.elements[i].placeholder = longBreak;
                longBreak < 10 ? longBreak = "0" + longBreak + ":00" 
                :longBreak+= ":00";
                break;
        }
    }
    modal.style.display ='none';
    if(startClock === false){
        if(breakIdenty === false){
            document.querySelector("#clockText").textContent = initialClock;
        }else if(breakIdenty === "short"){
            document.querySelector("#clockText").textContent = shortBreak;
        }else if(breakIdenty === "long"){
            document.querySelector("#clockText").textContent = longBreak;
        }
       
    }
}

function resetCustoms(){
    const cstmTimes = document.querySelector("#cstmTimesForm");

    for(i=0;i < cstmTimes.length-2;i++){
        switch(i){
            case 0:
                cstmTimes.elements[i].value = "25";
                break;
            case 1:
                cstmTimes.elements[i].value = "5";
                break;
            case 2:
                cstmTimes.elements[i].value = "10";
                break;
        }
    }
    saveCustoms();
}

function playSound(){
    const sound = new Audio('sounds/digital_alarm.mp3');
/*     let repeatCount = 2;

    sound.addEventListener('ended', () => {
        repeatCount--;
        if (repeatCount > 0) {
            sound.currentTime = 0;
            sound.play();
        }
    },false) */
    sound.play();
    sound.volume = 0.1;
}
