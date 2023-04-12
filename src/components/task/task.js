import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

function throwError(label) {
  throw new Error(`Ты не передал ${label}`);
}

function Task({ completed, label, dateCreated, onCompleted, onEditTask, onDeleted }) {
  const completedClass = completed ? 'completed' : null;

  const makeLabel = () => (
    <div className="label">
      <span className="description">{label}</span>
      <span className="created">
        {`created ${formatDistanceToNow(dateCreated, {
          includeSeconds: true,
          addSuffix: true,
        })}`}
      </span>
    </div>
  );

  return (
    <div className={`view ${completedClass}`}>
      <input className="toggle" type="checkbox" checked={completed} readOnly onClick={onCompleted.bind(this)} />
      {makeLabel()}
      <button type="button" className="icon icon-edit" onClick={onEditTask} aria-label="">
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
