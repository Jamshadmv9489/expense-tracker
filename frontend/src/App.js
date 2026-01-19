import React, { useEffect } from 'react'
import API from './services/api';

const App = () => {
  const test = async () => {
    try {
      const { data } = await API.get('/hello');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    test();
  }, [])

  return (
    <div>expense tracker</div>
  )
}

export default App