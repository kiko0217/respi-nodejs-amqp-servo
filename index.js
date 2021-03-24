const Gpio = require('pigpio').Gpio;

const motor = new Gpio(10, {mode: Gpio.OUTPUT})
var amqp = require('amqplib/callback_api')

let statusOpenClose = true;
let pulseWidth = 1800;

// const close = setInterval(() => {
//     motor.servoWrite(pulseWidth);
//     console.log(pulseWidth)
//     // clearInterval(close)
//     if(pulseWidth == 1800) {
//         pulseWidth = 2500
//     } else {
//         pulseWidth = 1800
        
//     }
// }, 3000)
// close
const openclose = () => {
    pulseWidth = 1800
    motor.servoWrite(pulseWidth);
    pulseWidth = 2500
    setTimeout(() =>  {
        motor.servoWrite(pulseWidth)
        setTimeout(()=>{
            statusOpenClose = true
            console.log('close')
        },1000)
        
    }, 1000)
    // await close
}
amqp.connect('amqp://192.168.0.106', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            const pesan = msg.content.toString()
            console.log(" [x] Received %s", pesan);
            if(pesan == "tomat jelek") {
                if(statusOpenClose) {
                    console.log('open')
                    statusOpenClose = false
                    setTimeout(openclose, 500)
                }
                
            }

        }, {
            noAck: true
        });
    });
});
// close