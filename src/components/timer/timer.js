import './timer.css';
import { Component } from 'react';
import Countdown from 'react-countdown';

function Completionist() {
  return <span>No-time!</span>;
}

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  }
  return <span>{`${minutes}:${seconds}`}</span>;
};

class Timer extends Component {
  countdownApi = null;

  constructor(props) {
    const { time, start } = props;
    super(props);
    this.state = {
      time,
      start,
    };
  }

  setRef = (countdown) => {
    if (countdown) {
      this.countdownApi = countdown.getApi();
    }
  };

  onStart = () => {
    const { onStart } = this.props;
    this.countdownApi.start();
    onStart();
    this.setState({
      start: true,
    });
  };

  onStop = () => {
    const { onStop } = this.props;
    this.countdownApi.pause();
    onStop();
    this.setState({
      start: false,
    });
  };

  render() {
    const { time, start } = this.state;
    const { setRef, onComplete } = this;
    return (
      <div className="timer">
        <button className="timer__btn" type="submit" onClick={this.onStart}>
          ▶
        </button>
        <button className="timer__btn" type="submit" onClick={this.onStop}>
          ⏸
        </button>
        <Countdown ref={setRef} date={time} renderer={renderer} autoStart={start} onComplete={onComplete} />
      </div>
    );
  }
}

export default Timer;
