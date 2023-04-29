import './new-task-form.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

function goodInputValue(value) {
  return value === '' || /\S/.test(value);
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

function NewTaskForm({ addTask, maxInput }) {
  const [task, setTask] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onChangeTask = ({ target }) => {
    if (goodInputValue(target.value)) {
      setTask(target.value);
    }
  };

  const onChangeMin = ({ target }) => {
    if (checkStr(target.value)) {
      setMin(target.value);
    }
  };

  const onChangeSec = ({ target }) => {
    if (checkStr(target.value)) {
      setSec(target.value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!goodInputValue(task)) {
      return false;
    }
    addTask(task, min, sec);
    setTask('');
    setMin('');
    setSec('');
    return true;
  };

  return (
    <form className="new-todo" onSubmit={onSubmit.bind(this)}>
      <input
        value={task}
        className="new-todo__input task"
        onChange={onChangeTask}
        type="text"
        maxLength={maxInput}
        placeholder="What needs to be done?"
      />
      <input
        className="new-todo__input time"
        type="text"
        maxLength={2}
        onChange={onChangeMin}
        placeholder="Min"
        value={min}
      />
      <input
        className="new-todo__input time"
        type="text"
        maxLength={2}
        onChange={onChangeSec}
        placeholder="Sec"
        value={sec}
      />
      <input type="submit" hidden />
    </form>
  );
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
