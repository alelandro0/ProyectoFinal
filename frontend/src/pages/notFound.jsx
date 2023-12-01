import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Go to Home page
      <Link to="/" > Here</Link>
      </p>
    </div>
  )
}

export default NotFound
