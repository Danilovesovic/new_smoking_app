let startBtn = document.querySelector('.btnHolder button');
let hoursDiv = document.querySelector('hours');
let minutesDiv = document.querySelector('.minutes');
let secondsDiv = document.querySelector('seconds');
// global var for stats
let totalCigarNumber;


configApp();


startBtn.addEventListener('click',smokeOne);



function smokeOne() {
    // setLastSmoked();
    startTimer();
}

function startTimer() {
    let h = 0;
    let m = 0;
    let s = 0;
    if (localStorage.lastSmoked) {
     let now = new Date().getTime();
     let lastTime = parseInt(localStorage.lastSmoked);
     let dif = now - lastTime;
     // calculate h m s from diff        
    }
    
}

function setLastSmoked(){
    localStorage.lastSmoked = new Date().getTime();
}

function configApp(){
    if (localStorage.totalCigarNumber) {
        totalCigarNumber = parseInt(localStorage.totalCigarNumber);
    } else {
        totalCigarNumber = 0;
    }
}