import React from "react";

const TodoForm = () => {
  return (
    <form className="max-w-lg mx-auto w-full border border-stone-100 mt-20 rounded-tl-lg rounded-tr-lg overflow-hidden flex items-center flex-col md:flex-row">
      <input
        type="text"
        name="todo"
        id="todo"
        placeholder="Enter your todo"
        className="w-full md:w-[80%] p-3 outline-none border-b border--b-stone-100 md:border-none"
      />
      <button
        type="submit"
        className="w-full md:w-[20%] bg-stone-500 p-3 text-white font-medium duration-300 hover:bg-stone-600 cursor-pointer"
      >
        Add ToDo
      </button>
    </form>
  );
};

export default TodoForm;
