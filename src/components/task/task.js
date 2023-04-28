import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

import Timer from '../timer';

function throwError(label) {
  throw new Error(`Ты не передал ${label}`);
}

function MakeBody({ label, dateCreated, time, start, onStart, onStop }) {
  return (
    <div className="label">
      <div className="description">{label}</div>
      <Timer time={time} start={start} onStart={onStart} onStop={onStop} />
      <div className="created">
        {`created ${formatDistanceToNow(dateCreated, {
          includeSeconds: true,
          addSuffix: true,
        })}`}
      </div>
    </div>
  );
}

function Task(props) {
  const { id, completed, label, dateCreated, time, onCompleted, onEdit, onDeleted, start, onStart, onStop } = props;
  const completedClass = completed ? 'completed' : null;

  // const onTickManage = (total) => {
  //   onTick(total, id);
  // };

  const onStartManage = () => {
    onStart(id);
  };

  const onStopManage = () => {
    onStop(id);
  };

  return (
    <div className={`view ${completedClass}`}>
      <input className="toggle" type="checkbox" checked={completed} readOnly onClick={onCompleted.bind(this)} />
      <MakeBody
        label={label}
        dateCreated={dateCreated}
        time={time}
        start={start}
        onStart={onStartManage}
        onStop={onStopManage}
      />
      <button type="button" className="icon icon-edit" onClick={onEdit} aria-label="">
        ✎
      </button>
      <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="">
        ×
      </button>
    </div>
  );
}

Task.propTypes = {
  completed: PropTypes.bool,
  label: PropTypes.string,
  dateCreated: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func,
  onCompleted: PropTypes.func,
};

Task.defaultProps = {
  completed: false,
  label: 'default',
  dateCreated: Date.now(),
  onDeleted: throwError.bind(this, 'onDeleted'),
  onCompleted: throwError.bind(this, 'onCompleted'),
};

export default Task;
