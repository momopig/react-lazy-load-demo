import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

const Home = lazy(() => import('./children/Home'))
const Editor = lazy(() => import('./children/Editor'))

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/editor" component={Editor}/>
      </Switch>
    </Suspense>
  </Router>
)
export default App
