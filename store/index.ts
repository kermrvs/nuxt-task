import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
  const todoList = ref([
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

  const doneList = ref([
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

  const inProgressCards = ref([
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

  const backlogsCards = ref([
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
      priority: 'low',
      owner: '',
      assignees: [],
      created: new Date(),
    },
    {
      id: 6,
      status: 'backlog',
      title: 'Backlog test3',
      description: '',
      priority: 'low',
      owner: '',
      assignees: [],
      created: new Date(),
    },
  ]);

  const persons = ['John Doe', 'Jane Smith', 'Andrii Dulkai'];
  const statuses = ['in_progress', 'done', 'todo', 'backlog'];
  const priorities = ['low', 'medium', 'high'];

  const addNewTask = (task) => {
    cards.value.push(task);
  };

  const removeTask = (taskId) => {
    cards.value = cards.value.filter((task) => task.id !== taskId);
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

  return {
    todoList,
    doneList,
    inProgressCards,
    backlogsCards,
    statuses,
    priorities,
    persons,
    addNewTask,
    removeTask,
    updateTask,
  };
});
