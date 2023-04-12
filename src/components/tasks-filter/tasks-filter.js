import './tasks-filter.css';

function TasksFilter({ children, selected, onFilterChanged }) {
  const selectedClass = selected ? 'selected' : null;

  return (
    <button type="button" className={`button ${selectedClass}`} onClick={() => onFilterChanged()}>
      {children}
    </button>
  );
}

export default TasksFilter;
