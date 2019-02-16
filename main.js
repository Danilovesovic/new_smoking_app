let startBtn = document.querySelector('.btnHolder button');
let vildana = new Date().getDay();
if(vildana == 0){
vildana = 6;
}
let todayTab = document.querySelectorAll('.tab')[vildana];
let varName = 'day' + vildana;

let hoursDiv = document.querySelector('.hours');
let minutesDiv = document.querySelector('.minutes');
let secondsDiv = document.querySelector('.seconds');
// global var for stats
let totalCigarNumber = 0;
let todayCigarNumber = 0;
let loop;
displayTodayCigars()
configApp();
if (localStorage.totalCigarNumber) {
    startTimer();    
}

startBtn.addEventListener('click',smokeOne);



function smokeOne() {
    this.style.display = "none";
    clearInterval(loop);
    setLastSmoked();
    startTimer();
    // set todayCigs
    if (localStorage[varName]) {
        localStorage[varName] = parseInt(localStorage[varName])+1;
    }else{
        localStorage[varName] = 1;
    }
    displayTodayCigars();
}


function startTimer() {
    let h = 0;
    let m = 0;
    let s = 0;

    let min = 0;
    let sec = 0;

    function display() {
        sec++;
        if (sec >= 60) {
            sec = 0;
            min++;
            if (min >= 60) {
                min = 0;
                h++;
            }
        }
        hoursDiv.innerHTML = h;
        minutesDiv.innerHTML = min;
        secondsDiv.innerHTML = sec;
    }

    if (localStorage.lastSmoked) {
     let now = new Date().getTime();
     let lastTime = parseInt(localStorage.lastSmoked);
     let dif = now - lastTime;
     // calculate h m s from diff
        s = dif / (1000)
        m = Math.floor(s / 60);
        h = Math.floor(m / 60);

         min = Math.floor(m - (h * 60))
         sec = Math.floor(s - (m * 60))     
        // resio genije 
    
        display();
        loop = setInterval(display, 1000);
    }else {
        display();
        loop = setInterval(display, 1000);

    }
    
}

function setLastSmoked(){
    localStorage.lastSmoked = new Date().getTime();
    localStorage.totalCigarNumber = totalCigarNumber + 1;
}

function configApp(){
    // highlight today tab
    // body > div: nth - child(2) > div: nth - child(7)
    todayTab.style.boxShadow = "0px 0px 5px black";
    if (localStorage.totalCigarNumber) {
        totalCigarNumber = parseInt(localStorage.totalCigarNumber);
    }

    if (localStorage.todayCigarNumber) {
        todayCigarNumber = parseInt(localStorage.todayCigarNumber)
    }
}

function displayTodayCigars() {
    let innerTab = todayTab.querySelector('.procent');
    innerTab.innerHTML = localStorage[varName] || 0;
    var theCSSprop = parseInt(window.getComputedStyle(innerTab, null).getPropertyValue("height"));
    let procent = parseInt(localStorage[varName]) * 4;
    innerTab.style.height = procent + "%";
    
    
    
}