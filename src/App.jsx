import { useState } from 'react'
import './App.css'
import NoticeBoard from './comp/notice/NoticeBoard'

function App() {
  const [count, setCount] = useState(0)
  
  
  return (
    <>
      <NoticeBoard/>
    </>
  )
}

export default App
