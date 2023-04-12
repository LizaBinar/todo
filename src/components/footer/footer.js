import './footer.css';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter/tasks-filter';

function throwError(label) {
  throw new Error(`Ты не передал ${label}`);
}

function Footer({ todoData, deleteCompletedTask, filter, onFilterChanged }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttonsEls = buttons.map(({ name, label }) => (
    <li key={name}>
      <TasksFilter
        selected={filter === name}
        onFilterChanged={() => {
          onFilterChanged(name);
        }}
      >
        {label}
      </TasksFilter>
    </li>
  ));

  return (
    <footer className="footer">
      <span className="todo-count">{`${todoData.filter((el) => !el.completed).length} items left`}</span>
      <ul className="filters">{buttonsEls}</ul>
      <button type="button" className="clear-completed" onClick={deleteCompletedTask}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  onFilterChanged: PropTypes.func,
  deleteCompletedTask: PropTypes.func,
};

Footer.defaultProps = {
  todoData: [
    {
      label: 'default',
      completed: false,
      id: 3,
      dateCreated: Date.now(),
    },
  ],
  filter: 'all',
  onFilterChanged: throwError.bind(this, 'onFilterChanged'),
  deleteCompletedTask: throwError.bind(this, 'deleteCompletedTask'),
};

export default Footer;
