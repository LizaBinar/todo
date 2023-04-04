import './app.css';
import { Component } from 'react';

import AppHeader from '../app-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer/footer';

class App extends Component {
  // static propTypes = {} // Нет пропсов
  // static defaultProps = {} // Нет пропсов

  static filterTasks = (tasks, filter) => {
    switch (filter) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  idCounter = 0;

  state = {
    todoData: [this.createTask('Drink Coffee'), this.createTask('Eat Meat'), this.createTask('Buy E-ON energy')],
    filter: 'all', // all active completed
  };

  createTask(label) {
    this.idCounter += 1;
    return {
      label,
      completed: false,
      id: this.idCounter,
      dateCreated: new Date(),
    };
  }

  addTask(label) {
    const task = this.createTask(label);
    this.setState((state) => ({
      todoData: [...state.todoData, task],
    }));
  }

  onCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      const newTask = { ...todoData[idx], completed: !todoData[idx].completed };
      return {
        todoData: [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)],
      };
    });
  };

  onFilterChanged(name) {
    this.setState({
      filter: name,
    });
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((todo) => todo.id === id);
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
      };
    });
  };

  deleteCompletedTask() {
    this.state.todoData.forEach((task) => {
      if (task.completed) {
        this.deleteTask(task.id);
      }
    });
  }

  render() {
    const visibleTasks = App.filterTasks(this.state.todoData, this.state.filter);
    return (
      <section className={'base-style'}>
        <AppHeader />
        <div className="todoapp">
          <NewTaskForm addTask={this.addTask.bind(this)} />
          <section className="main">
            <TaskList
              todoData={visibleTasks}
              onDeleted={this.deleteTask.bind(this)}
              onCompleted={this.onCompleted.bind(this)}
            />
            <Footer
              todoData={this.state.todoData}
              filter={this.state.filter}
              onFilterChanged={this.onFilterChanged.bind(this)}
              deleteCompletedTask={this.deleteCompletedTask.bind(this)}
            />
          </section>
        </div>
      </section>
    );
  }
}

export default App;
