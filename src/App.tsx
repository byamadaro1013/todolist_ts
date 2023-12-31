import React from "react";
import "./App.css";

function App() {
  // 入力された値を保持するstateで型はstring
  const [inputValue, setInputValue] = React.useState<string>("");

  // todoリストを保持するstateで型は配列
  const [todos, setTodos] = React.useState<Todo[]>([]);
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  // 入力された値を保持する
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 入力された値を送信する
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 一旦処理を止める
    e.preventDefault();
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  // 編集する
  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
    setInputValue("");
  };

  // チェックする
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.checked === false) {
        todo.checked = true;
      } else {
        todo.checked = false;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>タイトル</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => {
              handleChange(e);
            }}
            className="inputText"
          ></input>
          <input type="submit" value="作成" className="submitButton"></input>
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => {
                  handleEdit(todo.id, e.target.value);
                }}
                className="inputText"
                value={todo.inputValue}
                disabled={todo.checked}
              ></input>
              <input
                type="checkbox"
                onChange={(e) => {
                  handleChecked(todo.id, todo.checked);
                }}
              ></input>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
