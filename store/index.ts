import { defineStore } from 'pinia';
import type { Card } from '~/types/card';

export const useStore = defineStore('store', () => {
  const todoList = ref<Card[]>([
    {
      id: 2,
      status: 'todo',
      title: 'TODO test',
      description: '',
      priority: 'low',
      owner: '',
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
      owner: '',
      assignees: ['Jane Smith'],
      created: new Date(),
    },
    {
      id: 5,
      status: 'done',
      title: 'Done test2',
      description: '',
      priority: 'low',
      owner: '',
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
      owner: '',
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
      owner: '',
      assignees: [],
      created: new Date(),
    },
    {
      id: 5,
      status: 'backlog',
      title: 'Backlog test2',
      description: '',
      priority: 'medium',
      owner: '',
      assignees: [],
      created: new Date(),
    },
    {
      id: 6,
      status: 'backlog',
      title: 'Backlog test3',
      description: '',
      priority: 'high',
      owner: '',
      assignees: [],
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

  watch(
    () => dialogSettings.value.active,
    (newVal) => {
      if (!newVal) {
        dialogSettings.value.item = null;
      }
    },
  );

  const addNewTask = (task) => {
    cards.value.push(task);
  };

  const removeTask = (taskId, status) => {
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
  };

  const updateTask = ({ task, newStatus }) => {
    switch (newStatus) {
      case 'done': {
        const item = doneList.value.find((el) => el.id === task.id);

        if (item) {
          item.status = 'done';
        }
        break;
      }
      case 'in_progress': {
        const item = inProgressCards.value.find((el) => el.id === task.id);

        if (item) {
          item.status = 'in_progress';
        }
        break;
      }
      case 'todo': {
        const item = todoList.value.find((el) => el.id === task.id);

        if (item) {
          item.status = 'todo';
        }
        console.log(item);
        break;
      }
      case 'backlog': {
        const item = backlogsCards.value.find((el) => el.id === task.id);

        if (item) {
          item.status = 'backlog';
        }
        break;
      }
      default: {
        break;
      }
    }
  };

  const openDialog = (status: string, body?: Card) => {
    dialogSettings.value.active = true;
    dialogSettings.value.status = status;

    if (body) {
      dialogSettings.value.item = body;
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
    openDialog,
    addNewTask,
    removeTask,
    updateTask,
  };
});
