import { useCallback, useRef, useState } from 'react'; //react에서 useState이라는 Hook함수를 사용
import './App.css';
import TodoInsert from './components/TodoInsert.js';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';
function App() {
  const [todos, setTodos] = useState([
    {
      id:1,
      text:'운동하기',
      checked:true,
    },
    {
      id:2,
      text:'요리하기',
      checked:true,
    },
    {
      id:3,
      text:'학원가기',
      checked:false,
    }
  ]);
  const nextId = useRef(4);
  console.log(nextId);

  const onInsert = useCallback( (value) => { //todos의 4번째 객체를 만드는 함수 (insert에서 생성한 value로 생성한다.)
    const todo = {
      id: nextId.current,
      text: value,
      checked: false,
    };
    setTodos(todos.concat(todo)); //concat메소드를 사용해서 todos를 바꾼다.
    nextId.current += 1;
  }, [todos]); // todos의 배열 값이 바뀔 때만 onInsult 함수 실행! (안하면 매번 생성됨 > 필요할때만 생성시킴)

  const onToggle = useCallback( (id) =>{
    setTodos(todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo ))
  } ,[todos])
  // 스프레드 연산자
  // map 메소드로 todo객체를 하나하나 가져와서 todo의 id가 id속성이 같을 때? checked속성을 true로 바꾸고, 다를때는? 기존속성에서 반대로 바꿔라
  // ...todo > 투두의 속성을 그대로 가져오고, checked 속성만 바꾸게 한다.
  // 연산자 적용 전{id:1, text: "운동하기",checked: !todo.checked : todo}

  const onRemove = useCallback( (id) =>{
    setTodos(todos.filter(todo => todo.id !== id))
  }, [todos]);
  //filter > 조건에 맞는 것만 가져옴
  //삭제한것을 제외한 나머지 todo만 남아있음

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove}/>
    </TodoTemplate> 
  );
}
export default App;