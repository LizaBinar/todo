import { Component } from 'react';
import './edit-task.css';

function goodInputValue(value) {
  return value !== '' && /\S/.test(value);
}

class Task extends Component {
  state = {
    value: this.props.task.label,
  };

  value = this.state.value;

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (goodInputValue(this.state.value)) {
      event.target.blur();
      this.props.editeTask(this.state.value);
      this.setState({
        value: '',
      });
    }
  }

  render() {
    return (
      <div className="edit">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            className="edit__input"
            placeholder={this.value}
            maxLength={this.props.maxInput}
            autoFocus
            onChange={this.onChange.bind(this)}
            value={this.state.value}
          />
        </form>
      </div>
    );
  }
}

export default Task;
