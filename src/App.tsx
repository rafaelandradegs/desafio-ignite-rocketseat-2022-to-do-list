import React from 'react';
import { v4 as uuid } from 'uuid';

import * as Checkbox from '@radix-ui/react-checkbox';
import {
  Barbell,
  Check,
  ClipboardText,
  PlusCircle,
  Trash,
} from 'phosphor-react';
import './styles/main.css';

interface PropsTask {
  id: string;
  nameTask: string;
  isCompleted: boolean;
}

export function App() {
  const [task, setTask] = React.useState<string>('');
  const [isCompleted, setIscompleted] = React.useState<boolean>(false);
  const [todoList, setTodoList] = React.useState<PropsTask[]>([]);

  function handleWriteTask(
    event: React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent,
  ) {
    setTask(event.target.value);

    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      setTask(event.target.value);
      handleCreateNewTask();
    }
  }

  function handleCreateNewTask() {
    const idTask = uuid();

    const newTask = { id: idTask, nameTask: task, isCompleted: false };

    setTodoList([...todoList, newTask]);
    setTask('');
  }

  function handleDeleteTask(id: string) {
    const newListWithoutTaskDeleted = todoList.filter(list => list.id !== id);
    setTodoList(newListWithoutTaskDeleted);
  }

  function handleCheckedTask(taskId: string) {
    const newListWithCheckedSelected = todoList.map(list => {
      if (list.id === taskId) {
        return {
          ...list,
          isCompleted: !list.isCompleted,
        };
      }
      return list;
    });
    setTodoList(newListWithCheckedSelected);
  }

  return (
    <div>
      <header className="bg-gray-700 h-48 flex justify-center items-center gap-3">
        <Barbell size={32} color="#111827" />
        <h1 className="text-purple-300 text-3xl">
          Treino <span className="text-gray-900">Hoje</span>
        </h1>
      </header>
      <div className="max-w-[736px] mx-auto flex justify-space-between mt-[-24px] gap-2">
        <input
          type="text"
          name="task"
          value={task}
          onChange={handleWriteTask}
          onKeyDown={handleWriteTask}
          placeholder="Vamos começar as atividades?"
          className="w-[638px] h-12 rounded p-4 bg-purple-200"
        />
        <button
          onClick={handleCreateNewTask}
          className="w-[90px] bg-purple-200 text-gray-900 rounded flex items-center justify-center gap-2"
        >
          Criar
          <PlusCircle size={16} weight="thin" />
        </button>
      </div>
      <div className="max-w-[736px] mx-auto flex flex-col justify-space-between mt-16">
        <div className="flex justify-between w-[100%] p-2">
          <p className="text-purple-700">
            Tarefas criadas{' '}
            <span className="bg-purple-200 p-[3px 9px] rounded-[999px] p-1 text-sm">
              {todoList.length}
            </span>
          </p>
          <p className="text-gray-900">
            Concluidas{' '}
            <span className="bg-purple-200 p-[3px 9px] rounded-[999px] p-1 text-sm">
              {`${todoList.filter(task => task.isCompleted).length} de ${
                todoList.length
              }`}
            </span>
          </p>
        </div>

        {!todoList.length && (
          <div>
            <p className="bg-purple-300 pt-0.5 mt-4 rounded"></p>
            <div className="flex flex-col items-center justify-center">
              <ClipboardText size={56} weight="thin" className="mt-16 mb-4" />
              <strong>Voce ainda nao tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        )}

        {todoList.map(({ id, nameTask, isCompleted }) => (
          <div
            key={id}
            className="flex flex-row justify-around items-start bg-purple-100 w-full border-2 border-purple-300 rounded-lg p-4 mb-3"
          >
            <div className="flex flex-row justify-around items-center bg-purple-100 w-full">
              <Checkbox.Root
                name={nameTask}
                value={nameTask}
                checked={isCompleted}
                onCheckedChange={() => handleCheckedTask(id)}
                className={`w-5 h-5 rounded-full border-solid border-2 border-gray-700 focus:ring-0 ${
                  isCompleted && 'bg-purple-200'
                }`}
              >
                <Checkbox.Indicator>
                  <Check className="text-purple-700" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <p
                className={`w-[80%] ${
                  !isCompleted ? ' text-gray-900' : 'text-gray-400 line-through'
                }`}
              >
                {nameTask}
              </p>

              <button onClick={() => handleDeleteTask(id)}>
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
