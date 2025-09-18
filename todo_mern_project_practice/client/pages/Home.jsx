import React from "react";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="px-4">
        <TodoForm />
        <TodoList />
      </div>
    </main>
  );
};

export default Home;
