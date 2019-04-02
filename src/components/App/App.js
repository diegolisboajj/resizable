import React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Sidebar from '../Sidebar'
import Layout from '../Layout'

import './App.css'

const App = () => (
  <div className={'App'}>
    <DragDropContextProvider backend={HTML5Backend}>
      <Sidebar/>
      <Layout/>
    </DragDropContextProvider>
  </div>
)

export default App
