class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTime: Date.now() };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ currentTime: Date.now() });
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
    const timer = React.createElement(
      "p",
      null,
      `${this.timeInHMS(this.state.currentTime)}`,
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

    const restartButton = React.createElement(
      "button",
      { onClick: () => this.setState({ finished: false }) },
      "Restart",
    );

    const clockStoppedMessage = React.createElement(
      "p",
      null,
      "Clock stopped!",
    );

    return this.state.finished
      ? React.createElement("div", null, clockStoppedMessage, restartButton)
      : React.createElement("div", null, clock, haltButton);
  }
}

const clock = React.createElement(Clock, null);

const mainContainer = document.getElementById("main_container");
const haltableClock = React.createElement(HaltableClock, null);

ReactDOM.render(haltableClock, mainContainer);
