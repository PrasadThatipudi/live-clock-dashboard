class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timesElapsed: 0, clockStartedAt: Date.now() };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(({ timesElapsed }) => ({ timesElapsed: timesElapsed + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timeInHMS(timestamp) {
    const date = new Date(timestamp);

    const asTwoDigits = (number) => number.toString().padStart(2, "0");

    const hoursAsString = asTwoDigits(date.getHours());
    const minutesAsString = asTwoDigits(date.getMinutes());
    const secondsAsString = asTwoDigits(date.getSeconds());

    return `${hoursAsString}:${minutesAsString}:${secondsAsString}`;
  }

  render() {
    const timeInSeconds =
      this.state.clockStartedAt + this.state.timesElapsed * 1000;

    const timer = React.createElement(
      "p",
      null,
      `${this.timeInHMS(timeInSeconds)}`,
    );

    return timer;
  }
}

class HaltableClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { finished: false };
  }

  render() {
    const clock = React.createElement(Clock, null);

    const haltButton = React.createElement(
      "button",
      {
        onClick: () => this.setState({ finished: true }),
      },
      "Stop Clock",
    );

    return this.state.finished
      ? React.createElement("p", null, "Clock stopped!")
      : React.createElement("div", null, clock, haltButton);
  }
}

const clock = React.createElement(Clock, null);

const mainContainer = document.getElementById("main_container");
const haltableClock = React.createElement(HaltableClock, null);

ReactDOM.render(haltableClock, mainContainer);
