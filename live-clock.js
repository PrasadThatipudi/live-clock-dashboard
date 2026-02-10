class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timesElapsed: 0, clockStartedAt: Date.now() };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(({ timesElapsed }) => ({ timesElapsed: timesElapsed + 1 }));
    }, 1000);
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

const clock = React.createElement(Clock, null);

const mainContainer = document.getElementById("main_container");
ReactDOM.render(clock, mainContainer);
