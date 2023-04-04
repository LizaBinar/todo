import './task-list.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import Task from '../task/task';

function throwError(label) {
  throw new Error(`Ты не передал ${label}`);
}

class TaskList extends Component {
  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
  };

  static defaultProps = {
    todoData: [
      {
        label: 'default',
        completed: false,
        id: 3,
        dateCreated: Date.now(),
      },
    ],
    onDeleted: throwError.bind(this, 'onDeleted'),
    onCompleted: throwError.bind(this, 'onCompleted'),
  };

  render() {
    const elements = this.props.todoData.map((item) => (
      <li key={item.id}>
        <Task
          item={item}
          onDeleted={() => this.props.onDeleted(item.id)}
          onCompleted={() => this.props.onCompleted(item.id)}
        />
      </li>
    ));

    return <ul className="todo-list">{elements}</ul>;
  }
}

export default TaskList;
