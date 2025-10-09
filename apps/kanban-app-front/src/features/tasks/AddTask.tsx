import { useContext, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { AddTaskForm } from './AddTaskForm';

type Props = {};

const AddTask = (props: Props) => {
  const { state, dispatch } = useContext(ModalContext);

  console.log(state);

  // TODO add controlled state to add new task in board

  return (
    <div className="absolute left-1/2 top-48 w-11/12 -translate-x-1/2 -translate-y-24 transform rounded-lg bg-white pr-3">
      <div className="px-8 py-4">
        <h2 className="my-2 text-2xl font-bold text-primary-black">
          Add New Taskfdsfdsfds
        </h2>
        <AddTaskForm />
      </div>
    </div>
  );
};

export default AddTask;
