"use client";

import { ITask } from "@/types/tasks";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FormEventHandler, useState } from "react";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [isTaskDone, setIsTaskDone] = useState(false);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });

    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  const handleDoneTask = () => {
    setIsTaskDone(!isTaskDone);
  };

  return (
    <tr key={task.id}>
      <td className="w-full">
        <input
          type="checkbox"
          checked={isTaskDone}
          className="checkbox checkbox-xs mr-5 checkbox-primary"
          onChange={handleDoneTask}
        />
        <span style={{ textDecoration: isTaskDone ? "line-through" : "none" }}>
          {" "}
          {task.text}
        </span>
      </td>

      <td className="flex gap-5">
        <span
          onClick={() => setOpenModalEdit(true)}
          style={{ cursor: "pointer" }}
        >
          <FiEdit color="blue" size={25} />
        </span>
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>

            <div className="modal-action">
              <input
                type="text"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full"
              />

              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <span
          onClick={() => setOpenModalDeleted(true)}
          style={{ cursor: "pointer" }}
        >
          <FaRegTrashAlt color="red" size={25} />
        </span>
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
