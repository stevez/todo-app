import { ITask } from "@/types/tasks";
import Task from "@/components/Task";

interface TodoListProps {
  tasks: ITask[];
}
const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Tasks</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))
            : <tr>
              <td colSpan={2} className="text-center">No task</td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
