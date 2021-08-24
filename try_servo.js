const Gpio = require('pigpio').Gpio;

const motor = new Gpio(10, {mode: Gpio.OUTPUT})

let statusOpenClose = true;
let statusGetOpen = true;
let pulseWidth = 1800;

const close = setInterval(() => {
    motor.servoWrite(pulseWidth);
    console.log(pulseWidth)
    // clearInterval(close)
    if(pulseWidth == 1800) {
        pulseWidth = 2200 // tutup
    } else {
        pulseWidth = 1800 // buka
        
    }
}, 3000)
close