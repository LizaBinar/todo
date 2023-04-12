import './new-task-form.css';
import PropTypes from 'prop-types';

function goodInputValue(value) {
  return value !== '' && /\S/.test(value);
}

function addTaskError() {
  throw new Error('Ты забыл передать addTask в пропсы');
}

function NewTaskForm({ maxInput, addTask }) {
  const onSubmit = (event) => {
    event.preventDefault();
    const input = event.target.firstElementChild;
    if (goodInputValue(input.value)) {
      addTask(input.value);
      input.value = '';
    }
  };

  return (
    <form onSubmit={onSubmit.bind(this)}>
      <input className="new-todo" type="text" maxLength={maxInput} placeholder="What needs to be done?" />
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
