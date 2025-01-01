"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "@/components/Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add New Task
        <div className="ml-2">
          <AiOutlinePlus size={18} />
        </div>
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add New Task</h3>

          <div className="modal-action">
            <input
              type="text"
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />

            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
