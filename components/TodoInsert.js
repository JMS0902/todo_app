import React, {useState} from 'react'
import { MdAdd } from "react-icons/md";
import '../styles/TodoInsert.scss';
import { useCallback } from 'react';

function TodoInsert({onInsert}) {
  const [value, setValue] = useState('');

  const onChange = useCallback( (e) => {
    console.log(e);
    setValue(e.target.value);
  }, []) //state값이 없어도 매번 실행됨

  const onSubmit = useCallback( (e) => {
    onInsert(value);
    setValue('');
    e.preventDefault();
    // submit이벤트는 브라우저에서 새로고침을 발생시킨다.
  }, [value])
  //배열 안에 바뀌는 state값 넣어주기★ > value값이 바뀔때만 함수 실행 (안넣으면 실행 안됨)

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input type="text" placeholder="할일을 입력하세요" onChange={onChange} value={value} />
      <button type="submit"> <MdAdd /> </button>
    </form>
  )
}
export default TodoInsert