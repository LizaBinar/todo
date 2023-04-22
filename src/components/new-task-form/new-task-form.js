import './new-task-form.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

function goodInputValue(value) {
  return value !== '' && /\S/.test(value);
}

function addTaskError() {
  throw new Error('Ты забыл передать addTask в пропсы');
}

function checkStr(str) {
  if ((/^\d+$/.test(str) && Number(str) < 60) || str === '') {
    return true;
  }
  return false;
}

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      min: '',
      sec: '',
    };
  }

  onChangeTask = ({ target }) => {
    if (goodInputValue(target.value)) {
      this.setState({
        task: target.value,
      });
    }
  };

  onChangeMin = ({ target }) => {
    if (checkStr(target.value)) {
      this.setState({
        min: target.value,
      });
    }
  };

  onChangeSec = ({ target }) => {
    if (checkStr(target.value)) {
      this.setState({
        sec: target.value,
      });
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { task, min, sec } = this.state;
    const { addTask } = this.props;
    if (!goodInputValue(task)) {
      return false;
    }
    addTask(task, min, sec);
    this.setState({
      task: '',
      sec: '',
      min: '',
    });
    return true;
  };

  render() {
    const { task, min, sec } = this.state;
    const { maxInput } = this.props;
    return (
      <form className="new-todo" onSubmit={this.onSubmit.bind(this)}>
        <input
          value={task}
          className="new-todo__input task"
          onChange={this.onChangeTask}
          type="text"
          maxLength={maxInput}
          placeholder="What needs to be done?"
        />
        <input
          className="new-todo__input time"
          type="text"
          maxLength={2}
          onChange={this.onChangeMin}
          placeholder="Min"
          value={min}
        />
        <input
          className="new-todo__input time"
          type="text"
          maxLength={2}
          onChange={this.onChangeSec}
          placeholder="Sec"
          value={sec}
        />
        <input type="submit" hidden />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
  maxInput: PropTypes.number,
};

NewTaskForm.defaultProps = {
  addTask: addTaskError,
  maxInput: 20,
};

export default NewTaskForm;
