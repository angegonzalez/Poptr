import { Stack } from './Stack';
import React from 'react';
import Task from '../components/Task';

const notificationsStack = new Stack();

const task = <Task key={1} name="Interactua" description="Publica sobre algun trámite que requieras"></Task>;
const task2 = <Task key={2} name="Ayuda a otros usuarios" description="Comenta en alguna publicación con información relevante"></Task>;
const task3 = <Task key={3}name="Explora la app" description="Tenemos grandes funcionalidades para ti"></Task>;
const task4 = <Task key={4} name="Explora trámites" description="Tenemos grandes funcionalidades para ti"></Task>;


notificationsStack.push(task2);
notificationsStack.push(task4);
notificationsStack.push(task3);
notificationsStack.push(task);

export default notificationsStack;