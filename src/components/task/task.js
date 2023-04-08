import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

// import EditTask from '../edit-task';

function throwError(label) {
  throw new Error(`Ты не передал ${label}`);
}

class Task extends Component {
  static propTypes = {
    item: PropTypes.object,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
  };

  static defaultProps = {
    item: {
      label: 'default',
      completed: false,
      id: 3,
      dateCreated: Date.now(),
    },
    onDeleted: throwError.bind(this, 'onDeleted'),
    onCompleted: throwError.bind(this, 'onCompleted'),
  };

  render() {
    const completedClass = this.props.item.completed ? 'completed' : null;

    const makeLabel = () => (
      <div className="label">
        <span className="description">{this.props.item.label}</span>
        <span className="created">
          {`created ${formatDistanceToNow(this.props.item.dateCreated, {
            includeSeconds: true,
            addSuffix: true,
          })}`}
        </span>
      </div>
    );

    return (
      <div className={`view ${completedClass}`}>
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.item.completed}
          readOnly
          onClick={this.props.onCompleted.bind(this)}
        />
        {makeLabel()}
        <button className="icon icon-edit" onClick={this.props.onEditTask}></button>
        <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
      </div>
    );
  }
}

export default Task;
