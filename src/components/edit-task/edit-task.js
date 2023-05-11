import { useState } from 'react';
import './edit-task.css';

function goodInputValue(value) {
  return value !== '' && /\S/.test(value);
}

function EditTask({ task, editeTask, maxInput }) {
  const [value, setValue] = useState(task.label);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (goodInputValue(value)) {
      event.target.blur();
      editeTask(value);
      setValue('');
    }
  };

  return (
    <div className="edit edit-element">
      <form onSubmit={onSubmit} className="edit-element">
        <input
          type="text"
          className="edit__input edit-element"
          placeholder={value}
          maxLength={maxInput}
          onChange={onChange}
          value={value}
        />
      </form>
    </div>
  );
}

export default EditTask;
