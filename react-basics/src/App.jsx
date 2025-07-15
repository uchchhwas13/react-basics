import { useState, useEffect } from 'react'
import './App.css'

const Card = ({ title, content }) => {
 const [count, setCount] = useState(0);
  const [hasLiked, setHasliked] = useState(false);
  
  useEffect(() => {
  console.log(`Card with title "${title}" has been liked: "${hasLiked}".`);
}, [hasLiked]);

  return (
    <div className="card" onClick={() => setCount(count + 1)}>
      <h2>{title} <br/> {count|| null}</h2>
      <p>{content}</p>
      <button onClick={() => setHasliked(!hasLiked)}> 
        {hasLiked ? 'Liked':'Like'}
      </button>
    </div>
  )
}

const App = () => {

  return (
    <div className="card-container">
      <Card title="Star wars" content="Great movie" />
      <Card title="Star trek" content="Awesome movie" />
      <Card title="Star Avengers" content="Best superhero movie" />
    </div>
)}

export default App
