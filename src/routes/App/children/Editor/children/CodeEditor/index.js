import React from "react"
import AceEditor from "react-ace"
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'

const CodeEditor = () => (
  <AceEditor mode="java" theme="github" onChange={() => {}} name="code" />
)

export default CodeEditor
