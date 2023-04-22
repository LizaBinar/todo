import './timer.css';
import { Component } from 'react';
import Countdown from 'react-countdown';

function Completionist() {
  return <span>You are good to go!</span>;
}

// Renderer callback with condition
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  }
  return <span>{`${minutes}:${seconds}`}</span>;
};

class Timer extends Component {
  countdownApi = null;

  setRef = (countdown) => {
    if (countdown) {
      this.countdownApi = countdown.getApi();
    }
  };

  onStart = () => {
    this.countdownApi.start();
  };

  onStop = () => {
    this.countdownApi.pause();
  };

  onTick = ({ total }) => {
    const { onTick } = this.props;
    onTick(total);
  };

  render() {
    const { time } = this.props;
    const { setRef, onTick } = this;
    return (
      <div className="timer">
        <button className="timer__btn" type="submit" onClick={this.onStart}>
          ▶
        </button>
        <button className="timer__btn" type="submit" onClick={this.onStop}>
          ⏸
        </button>
        <Countdown ref={setRef} date={time} renderer={renderer} autoStart={false} onTick={onTick} />
      </div>
    );
  }
}

export default Timer;
