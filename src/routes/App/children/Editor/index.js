import React,  { lazy, Suspense, useState }  from 'react'
const CodeEditor = lazy(() => import('./children/CodeEditor'))
const Editor = (props) => {
  const [isShow, setIsShow ] = useState(false)
  return (
    <div className='Editor-component'>
      <button onClick={ () => setIsShow(true) }>click me to show the code editor!</button>
      {
        isShow && (
          <Suspense fallback={ null }>
            <CodeEditor/>
          </Suspense>
        )
      }
    </div>
  )
}

export default Editor
