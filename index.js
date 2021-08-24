const Gpio = require('pigpio').Gpio;

const motor = new Gpio(10, {mode: Gpio.OUTPUT})
const echo = new Gpio(17, {mode: Gpio.INPUT, alert: true});
var amqp = require('amqplib/callback_api')

let pulseOpen = 1800;
let pulseClose = 2200;
var sttBuah = "jelek";

motor.servoWrite(pulseClose);

amqp.connect('amqp://192.168.0.112', function(error0, connection) {
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
            sttBuah = pesan
        }, {
            noAck: true
        });
    });
});

const watchHCSR04 = () => {
  let startTick;

  echo.on('alert', (level, tick) => {
      // console.log(level)
      // console.log(tick >> 0)
    if (level == 1) {
      // startTick = tick
      if(sttBuah == "jelek"){
        motor.servoWrite(pulseOpen);
      }else {
        motor.servoWrite(pulseClose);
      }
    //   startTick = tick;
    } else {
      // const endTick = tick;
      // const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      // console.log("diff = "+diff)
    //   console.log(diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
};
watchHCSR04()