import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task/task';
import EditTask from '../edit-task';

function throwError(label) {
  throw new Error(`Ты не передал ${label}`);
}

function TaskList({ todoData, onDeleted, onCompleted, onEditTask, maxInput, editeTask }) {
  const elements = todoData.map((item) => {
    if (item.edit === false) {
      return (
        <li key={item.id}>
          <Task
            completed={item.completed}
            label={item.label}
            dateCreated={item.dateCreated}
            onDeleted={() => onDeleted(item.id)}
            onCompleted={() => onCompleted(item.id)}
            onEditTask={() => onEditTask(item.id)}
          />
        </li>
      );
    }
    const { id } = item;
    return (
      <li key={id}>
        <EditTask task={item} maxInput={maxInput} editeTask={(label) => editeTask(id, label)} />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
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
  onEditTask: throwError.bind(this, 'onEditTask'),
  editeTask: throwError.bind(this, 'editeTask'),
  maxInput: 20,
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onCompleted: PropTypes.func,
  onEditTask: PropTypes.func,
  editeTask: PropTypes.func,
  maxInput: PropTypes.number,
};

export default TaskList;
