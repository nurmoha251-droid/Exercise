


export const initialState = [];

export function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'delete':
      return state.filter((todo) => todo.id !== action.payload);
    case 'clear-completed':
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
}
