
import './App.css'

const Card = ({ title, content }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
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
