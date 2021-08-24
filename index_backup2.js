const Gpio = require('pigpio').Gpio;

const motor = new Gpio(10, {mode: Gpio.OUTPUT})
var amqp = require('amqplib/callback_api')

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

// const openclose = () => {
//     pulseWidth = 1800
//     motor.servoWrite(pulseWidth);
//     pulseWidth = 2200
//     setTimeout(() =>  {
//         motor.servoWrite(pulseWidth)
//         setTimeout(()=>{
//             statusOpenClose = true
//             console.log('close')
//         },1000)
        
//     }, 2000)
//     // await close
// }
// amqp.connect('amqp://192.168.0.102', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
    
//     motor.servoWrite(2200);
//     statusGetOpen = false;
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }

//         var queue = 'hello';

//         channel.assertQueue(queue, {
//             durable: false
//         });

//         console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

//         channel.consume(queue, function(msg) {
//             const pesan = msg.content.toString()
//             console.log(" [x] Received %s", pesan);
//             if(pesan == "jelek") {
//                 if(!statusGetOpen) {
//                     console.log('open')
//                     motor.servoWrite(1800);
//                     statusGetOpen = true
//                 }
//             } else{
//                 if(statusGetOpen) {
//                     console.log('close')
//                     motor.servoWrite(2200);
//                     statusGetOpen = false
//                 }
//             }

//         }, {
//             noAck: true
//         });
//     });
// });
// // close
// const Gpio = require('pigpio').Gpio;

// // The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
// const MICROSECDONDS_PER_CM = 1e6/34321;

// const trigger = new Gpio(23, {mode: Gpio.OUTPUT});
// const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

// trigger.digitalWrite(0); // Make sure trigger is low

// const watchHCSR04 = () => {
//   let startTick;

//   echo.on('alert', (level, tick) => {
//     if (level == 1) {
//       startTick = tick;
//     } else {
//       const endTick = tick;
//       const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
//       console.log(diff / 2 / MICROSECDONDS_PER_CM);
//     }
//   });
// };

// watchHCSR04();

// // Trigger a distance measurement once per second
// setInterval(() => {
//   trigger.trigger(10, 1); // Set trigger high for 10 microseconds
// }, 20);

// const Gpio = require('pigpio').Gpio;
// const echo = new Gpio(17, {mode: Gpio.INPUT, alert: true});

// const watchHCSR04 = () => {
// //   let startTick;

//   echo.on('alert', (level, tick) => {
//       console.log(level)
//       console.log(tick)
//     if (level == 1) {
//     //   startTick = tick;
//     } else {
//     //   const endTick = tick;
//     //   const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
//     //   console.log(diff / 2 / MICROSECDONDS_PER_CM);
//     }
//   });
// };
// watchHCSR04()