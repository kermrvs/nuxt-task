import { defineStore } from 'pinia';
import type { Card } from '~/types/card';
import { v4 as uuidv4 } from 'uuid';
import { updateObject } from '~/util/update.object';

export const useStore = defineStore('store', () => {
  const todoList = ref<Card[]>([
    {
      id: 2,
      status: 'todo',
      title: 'TODO test',
      description: '',
      priority: 'low',
      owner: 'John Doe',
      assignees: ['John Doe', 'Jane Smith'],
      created: new Date(),
    },
  ]);

  const doneList = ref<Card[]>([
    {
      id: 3,
      status: 'done',
      title: 'Done test1',
      description: '',
      priority: 'low',
      owner: 'John Doe',
      assignees: ['Jane Smith'],
      created: new Date(),
    },
    {
      id: 5,
      status: 'done',
      title: 'Done test2',
      description: '',
      priority: 'low',
      owner: 'John Doe',
      assignees: ['Jane Smith'],
      created: new Date(),
    },
  ]);

  const inProgressCards = ref<Card[]>([
    {
      id: 1,
      status: 'in_progress',
      title: 'In progress test',
      description: '',
      priority: 'low',
      owner: 'John Doe',
      assignees: ['John Doe'],
      created: new Date(),
    },
  ]);

  const backlogsCards = ref<Card[]>([
    {
      id: 4,
      status: 'backlog',
      title: 'Backlog test',
      description: '',
      priority: 'low',
      owner: 'John Doe',
      assignees: ['John Doe'],
      created: new Date(),
    },
    {
      id: 5,
      status: 'backlog',
      title: 'Backlog test2',
      description: '',
      priority: 'medium',
      owner: 'John Doe',
      assignees: ['John Doe'],
      created: new Date(),
    },
    {
      id: 6,
      status: 'backlog',
      title: 'Backlog test3',
      description: '',
      priority: 'high',
      owner: 'John Doe',
      assignees: ['John Doe'],
      created: new Date(),
    },
  ]);

  const persons = ['John Doe', 'Jane Smith', 'Andrii Dulkai'];

  const statuses = ['in_progress', 'done', 'todo', 'backlog'];

  const priorities = ['low', 'medium', 'high'];

  const dialogSettings = ref({
    active: false,
    status: '',
    item: null,
  });

  const onRemoveDialogSettings = ref({
    active: false,
    taskId: null,
    status: null,
  });

  watch(
    () => dialogSettings.value.active,
    (newVal) => {
      if (!newVal) {
        dialogSettings.value.item = null;
      }
    },
  );

  watch(
    () => onRemoveDialogSettings.value.active,
    (newVal) => {
      if (!newVal) {
        dialogSettings.value.taskId = null;
        dialogSettings.value.status = null;
      }
    },
  );

  const onRemoveTask = (taskId, status) => {
    onRemoveDialogSettings.value.taskId = taskId;
    onRemoveDialogSettings.value.status = status;
    onRemoveDialogSettings.value.active = true;
  };

  const removeTask = (taskId, status) => {
    try {
      switch (status) {
        case 'done': {
          doneList.value = doneList.value.filter((el) => el.id !== taskId);
          break;
        }
        case 'in_progress': {
          inProgressCards.value = inProgressCards.value.filter(
            (el) => el.id !== taskId,
          );
          break;
        }
        case 'todo': {
          todoList.value = todoList.value.filter((el) => el.id !== taskId);
          break;
        }
        case 'backlog': {
          backlogsCards.value = backlogsCards.value.filter(
            (el) => el.id !== taskId,
          );
          break;
        }
        default: {
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createTask = (task, status) => {
    try {
      switch (status) {
        case 'done': {
          doneList.value.push({
            ...task,
            id: uuidv4(),
            created: new Date(),
          });
          break;
        }
        case 'in_progress': {
          inProgressCards.value.push({
            ...task,
            id: uuidv4(),
            created: new Date(),
          });
          break;
        }
        case 'todo': {
          todoList.value.push({
            ...task,
            id: uuidv4(),
            created: new Date(),
          });
          break;
        }
        case 'backlog': {
          backlogsCards.value.push({
            ...task,
            id: uuidv4(),
            created: new Date(),
          });
          break;
        }
        default: {
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateTask = (task, newStatus) => {
    try {
      switch (newStatus) {
        case 'done': {
          const item = doneList.value.find((el) => el.id === task.id);

          if (item) {
            task.status = 'done';
            updateObject(task, item);
          }
          break;
        }
        case 'in_progress': {
          const item = inProgressCards.value.find((el) => el.id === task.id);

          if (item) {
            task.status = 'in_progress';
            updateObject(task, item);
          }
          break;
        }
        case 'todo': {
          const item = todoList.value.find((el) => el.id === task.id);

          if (item) {
            task.status = 'todo';
            updateObject(task, item);
          }
          break;
        }
        case 'backlog': {
          const item = backlogsCards.value.find((el) => el.id === task.id);

          if (item) {
            task.status = 'backlog';
            updateObject(task, item);
          }
          break;
        }
        default: {
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateLists = ({ task, newStatus, prevStatus }) => {
    try {
      switch (prevStatus) {
        case 'done': {
          doneList.value = doneList.value.filter((el) => el.id !== task.id);
          break;
        }
        case 'in_progress': {
          inProgressCards.value = inProgressCards.value.filter(
            (el) => el.id !== task.id,
          );
          break;
        }
        case 'todo': {
          todoList.value = todoList.value.filter((el) => el.id !== task.id);
          break;
        }
        case 'backlog': {
          backlogsCards.value = backlogsCards.value.filter(
            (el) => el.id !== task.id,
          );
          break;
        }
        default: {
          break;
        }
      }

      switch (newStatus) {
        case 'done': {
          doneList.value.push(task);
          break;
        }
        case 'in_progress': {
          inProgressCards.value.push(task);
          break;
        }
        case 'todo': {
          todoList.value.push(task);
          break;
        }
        case 'backlog': {
          backlogsCards.value.push(task);
          break;
        }
        default: {
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openDialog = (status: string, body?: Card) => {
    try {
      if (body) {
        dialogSettings.value.item = body;
      }
      dialogSettings.value.status = status;
      dialogSettings.value.active = true;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    todoList,
    doneList,
    dialogSettings,
    inProgressCards,
    backlogsCards,
    statuses,
    priorities,
    persons,
    onRemoveDialogSettings,
    updateLists,
    createTask,
    openDialog,
    removeTask,
    updateTask,
    onRemoveTask,
  };
});
