import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn Express", status: "Pending" },
    { id: 2, title: "Learn Node Js", status: "Completed" },
    { id: 3, title: "Watch Podcast", status: "Completed" },
    {
      id: 4,
      title:
        "I dont know what should I do next, so I just write something random here",
      status: "Pending",
    },
  ]);

  const getStatusColor = (status) => {
    if (status === "Pending") {
      return "text-teal-500";
    } else if (status === "Completed") {
      return "text-green-500";
    }
  };

  const markCompleted = (e, id) => {
    const { checked } = e.target;

    setTodos((prev) => {
      return prev.map((todo) =>
        todo.id === id
          ? { ...todo, status: checked ? "Completed" : "Pending" }
          : todo
      );
    });
  };
  return (
    <section className="max-w-lg mx-auto w-full my-16 pb-16">
      <h3 className="text-xl font-semibold mb-4">Your ToDo's</h3>

      {/* ToDo's */}
      <div className="w-full flex flex-col space-y-4">
        {todos.map((todo) => (
          <article
            key={todo.id}
            className="border border-stone-100 p-3 rounded-md"
          >
            <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-0 items-start justify-between">
              <div className="flex items-center gap-2">
                <label className="flex items-center cursor-pointer space-x-3">
                  <input
                    type="checkbox"
                    id="marktodo"
                    checked={todo.status === "Completed"}
                    onChange={(e) => markCompleted(e, todo.id)}
                    className="peer hidden"
                  />
                  <span className="w-3 h-3 rounded-full border-2 border-cyan-60000 peer-checked:bg-cyan-400 transition duration-300 ease-in-out peer-checked:shadow-[0_0_10px_#22d3ee,0_0_20px_#22d3ee,0_0_40px_#22d3ee] shadow-[0_0_15px_#444,0_0_30px_#444]" />
                </label>
                <h2 className="text-[16px] md:text-xl font-semibold">
                  {todo.title}
                </h2>
              </div>
              <p className={`${getStatusColor(todo.status)}`}>{todo.status}</p>
            </div>
            <hr className="border-none h-[0.09px] my-2 bg-stone-50/50" />

            {/* Action buttons */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center justify-between gap-4 w-full">
                <button
                  type="button"
                  className="p-1 bg-blue-500 cursor-pointer w-full font-medium duration-300 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="p-1 bg-red-500 cursor-pointer w-full font-medium duration-300 hover:bg-red-600 hover:shadow-md hover:shadow-red-600"
                >
                  Delete
                </button>
              </div>

              {/* Date */}
              <p className="w-full text-right text-stone-400">
                created at: <span className="text-stone-200">9/17/2025</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TodoList;
