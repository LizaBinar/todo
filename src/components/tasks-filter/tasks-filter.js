import './tasks-filter.css';

const TasksFilter = (props) => {
  const selectedClass = props.selected ? 'selected' : null;

  return (
    <button className={`button ${selectedClass}`} onClick={() => props.onFilterChanged()}>
      {props.children}
    </button>
  );
};

export default TasksFilter;
