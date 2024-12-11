import type { Card } from '~/types/card';

export const updateObject = (newTask: Card, prevTask: Card) => {
  prevTask.status = newTask.status;
  prevTask.title = newTask.title;
  prevTask.owner = newTask.owner;
  prevTask.assignees = newTask.assignees;
  prevTask.description = newTask.description;
  prevTask.priority = newTask.priority;
};
