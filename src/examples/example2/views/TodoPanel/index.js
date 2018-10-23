import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Footer from './Footer';

const TodoPanel = () => (
  <div>
    <TodoForm />
    <TodoList />
    <Footer />
  </div>
);

export default TodoPanel;