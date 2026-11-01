import { useReducer, useState } from 'react';
import { reducers, initialState } from './reducers';

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      
      dispatch({ type: 'add', payload: newTodo });
      setText('');
    }
  };

  return (
    /* Matches plain CSS container styling */
    <div className="max-w-[450px] mx-auto my-[50px] p-[30px] bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] font-sans">
      
      {/* Matches plain CSS h2 styling */}
      <h2 className="text-[#2d3748] mt-0 mb-6 text-[28px] font-bold text-center">Todo App</h2>
      
      {/* Input and Add Button layout */}
      <div className="flex">
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Enter a new todo" 
          /* Matches exact widths, dimensions, and borders from CSS */
          className="w-[calc(100%-90px)] px-4 py-3 text-16px border-2 border-[#e2e8f0] rounded-l-[8px] outline-none focus:border-[#4f46e5] transition-colors box-border"
        />
        <button 
          onClick={handleAdd}
          /* Matches exact custom button colors and behavior from CSS */
          className="w-[90px] py-3 bg-[#4f46e5] border-2 border-[#4f46e5] text-white font-semibold text-16px rounded-r-[8px] hover:bg-[#4338ca] hover:border-[#4338ca] transition-all cursor-pointer box-border"
        >
          Add
        </button>
      </div>
      
      {/* Matches plain CSS ul container */}
      <ul className="list-none p-0 mt-6 mb-0">
        {state.map((todo) => (
          /* Matches plain CSS li wrapper */
          <li key={todo.id} className="flex justify-between items-center px-4 py-3 mb-[10px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] gap-3">
            <span 
              onClick={() => dispatch({ type: 'toggle', payload: todo.id })}
              /* Inline logic handling text-decoration natively while matching exact text styling */
              className={`flex-1 cursor-pointer text-16px text-[#334155] select-none break-all ${
                todo.completed ? 'line-through' : 'no-underline'
              }`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => dispatch({ type: 'delete', payload: todo.id })}
              /* Matches custom transparent-to-red delete button design from CSS */
              className="px-3 py-1.5 text-sm font-semibold text-[#ef4444] bg-transparent border border-[#fee2e2] rounded-[6px] hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] transition-all cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
