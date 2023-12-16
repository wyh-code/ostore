import { useState } from 'react'
import { Table, useForm } from './components';

function App() {
  const [count, setCount] = useState(0)
  const form = useForm();
  console.log(form, '--form-')
  
  return (
    <div>
      <Table />
    </div>
  )
}

export default App
