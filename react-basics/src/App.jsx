import { useState } from 'react'
import './App.css'

const Card = ({ title, content }) => {
  const [hasLiked, setHasliked] = useState(false);
  return (
    <div className="card">
      <h2>{title}</h2>
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
