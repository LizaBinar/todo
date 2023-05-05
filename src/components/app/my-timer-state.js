function del(todoData, id) {
  const idx = todoData.findIndex((todo) => todo.id === id);
  return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
}

function complet(todoData, id) {
  const idx = todoData.findIndex((todo) => todo.id === id);
  const newTask = { ...todoData[idx], completed: !todoData[idx].completed };
  return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
}

const changeStatus = (todoData, id, status, value) => {
  const idx = todoData.findIndex((todo) => todo.id === id);
  const newTask = { ...todoData[idx] };
  newTask[status] = value;
  return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
};

const makeEdit = (todoData, id, label) => {
  const idx = todoData.findIndex((todo) => todo.id === id);
  const task = todoData[idx];
  task.label = label;
  task.edit = false;
  return [...todoData.slice(0, idx), task, ...todoData.slice(idx + 1)];
};

const notEdit = (todoData) => {
  const tasks = [];
  todoData.forEach((task) => {
    task.edit = false;
    tasks.push(task);
  });
  return tasks;
};

const start = (todoData, task) => {
  const newIdx = todoData.findIndex((todo) => todo.id === task.id);
  if (todoData[newIdx]) {
    todoData[newIdx] = task;
  } else {
    clearInterval(task.mainTimer);
  }
  return todoData;
};

const stop = (todoData, id) => {
  const idx = todoData.findIndex((todo) => todo.id === id);
  const task = todoData[idx];
  if (task.start) {
    task.start = false;
    clearInterval(task.mainTimer);
  }
  return todoData;
};

const changeTodoData = (todoData, obj) => {
  const { func, task, id, label } = obj;
  switch (func) {
    case 'add':
      return [...todoData, task];
    case 'del':
      return del(todoData, id);
    case 'complet':
      return complet(todoData, id);
    case 'edit':
      return changeStatus(todoData, id, func, true);
    case 'makeEdit':
      return makeEdit(todoData, id, label);
    case 'notEdit':
      return notEdit(todoData);
    case 'start':
      return start(todoData, task);
    case 'stop':
      return stop(todoData, id);
    default:
      return todoData;
  }
};

export default changeTodoData;
