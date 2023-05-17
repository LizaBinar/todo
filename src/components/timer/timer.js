import './timer.css';
import { useState } from 'react';
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

function Timer({ timer, starter, onStart, onStop }) {
  let countdownApi = null;
  const [time] = useState(timer);
  const [start, setStart] = useState(starter);

  const setRef = (countdown) => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const onStarter = () => {
    countdownApi.start();
    onStart();
    setStart(true);
  };

  const onStoper = () => {
    countdownApi.pause();
    onStop();
    setStart(false);
  };

  return (
    <div className="timer">
      <button className="timer__btn" type="submit" onClick={onStarter}>
        ▶
      </button>
      <button className="timer__btn" type="submit" onClick={onStoper}>
        ⏸
      </button>
      <Countdown ref={setRef} date={time} renderer={renderer} autoStart={start} />
    </div>
  );
}

export default Timer;
