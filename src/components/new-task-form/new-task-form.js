import './new-task-form.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

function goodInputValue(value) {
  return value !== '' && /\S/.test(value);
}

function addTaskError() {
  throw new Error('Ты забыл передать addTask в пропсы');
}

class NewTaskForm extends Component {
  static propTypes = {
    addTask: PropTypes.func,
  };

  static defaultProps = {
    addTask: addTaskError,
  };

  onSubmit(event) {
    event.preventDefault();
    const input = event.target.firstElementChild;
    if (goodInputValue(input.value)) {
      console.log('onSubmit');
      this.props.addTask(input.value);
      input.value = '';
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input
          className="new-todo"
          type="text"
          maxLength={this.props.maxInput}
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    );
  }
}

export default NewTaskForm;
