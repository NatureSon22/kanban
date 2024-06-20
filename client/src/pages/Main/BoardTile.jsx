const BoardTile = ({ id, tasks, status }) => {
  // Calculate the number of completed subtasks
  const getTaskCompleted = (task) => {
    return task.reduce((acc, subtask) => acc + (subtask.completed ? 1 : 0), 0);
  };

  const formatStatusTitle = () => {
    return `${status[0].toUpperCase() + status.slice(1)} (${tasks.length})`;
  };

  return (
    <div className="min-w-[290px]">
      <p className="text-xs font-bold tracking-widest text-primary-gray">
        {formatStatusTitle()}
      </p>

      <div className="mt-5 grid gap-5">
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="cursor-pointer space-y-1 rounded-md bg-white px-5 py-6 shadow-custom-200"
          >
            <p className="text-[0.95rem] font-bold text-black">{task.title}</p>
            <p className="text-[0.8rem] font-bold text-primary-gray">
              {getTaskCompleted(task.subtasks)} of {task.subtasks.length}{" "}
              subtasks
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardTile;
