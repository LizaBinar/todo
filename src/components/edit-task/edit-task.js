import { Component } from 'react';
import './edit-task.css';

function goodInputValue(value) {
  return value !== '' && /\S/.test(value);
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.task.label,
    };
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    const { editeTask } = this.props;
    if (goodInputValue(value)) {
      event.target.blur();
      editeTask(value);
      this.setState({
        value: '',
      });
    }
  }

  render() {
    const { maxInput } = this.props;
    const { value } = this.state;
    return (
      <div className="edit edit-element">
        <form onSubmit={this.onSubmit.bind(this)} className="edit-element">
          <input
            type="text"
            className="edit__input edit-element"
            placeholder={this.value}
            maxLength={maxInput}
            onChange={this.onChange.bind(this)}
            value={value}
          />
        </form>
      </div>
    );
  }
}

export default Task;
