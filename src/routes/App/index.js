import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

const Home = lazy(() => import('./children/Home/index'))
const Editor = lazy(() => import('./children/Editor'))

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/editor" component={Editor}/>
      </Switch>
    </Suspense>
  </BrowserRouter>
)
export default App


