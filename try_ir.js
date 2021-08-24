const Gpio = require('pigpio').Gpio;
const echo = new Gpio(17, {mode: Gpio.INPUT, alert: true});

const watchHCSR04 = () => {
//   let startTick;

  echo.on('alert', (level, tick) => {
      console.log(level)
    //   console.log(tick)
    if (level == 1) {
    //   startTick = tick;
    } else {
    //   const endTick = tick;
    //   const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
    //   console.log(diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
};
watchHCSR04()