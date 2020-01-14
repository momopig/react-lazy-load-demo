import React from 'react';
import { Link } from 'react-router-dom'
const Home = (props) => (
  <div className='Home-component'>
    <p>This is home page!</p>
    <Link to={`/editor`}>link to code editor page!</Link>
  </div>
)
export default Home
