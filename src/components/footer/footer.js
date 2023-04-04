import './footer.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter/tasks-filter';

function throwError(label) {
  throw new Error(`Ты не передал ${label}`);
}

class Footer extends Component {
  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
    onFilterChanged: PropTypes.func,
    deleteCompletedTask: PropTypes.func,
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
    filter: 'all',
    onFilterChanged: throwError.bind(this, 'onFilterChanged'),
    deleteCompletedTask: throwError.bind(this, 'deleteCompletedTask'),
  };

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const buttons = this.buttons.map(({ name, label }) => (
      <li key={name}>
        <TasksFilter
          selected={this.props.filter === name}
          onFilterChanged={this.props.onFilterChanged.bind(this, name)}
        >
          {label}
        </TasksFilter>
      </li>
    ));

    return (
      <footer className="footer">
        <span className="todo-count">{this.props.todoData.filter((el) => !el.completed).length} items left</span>
        <ul className="filters">{buttons}</ul>
        <button className="clear-completed" onClick={this.props.deleteCompletedTask}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
