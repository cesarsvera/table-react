import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'
import { TableMaterialReact } from './TableMaterialReact'
import { TableReact } from './TableReact'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   {/* <TableReact/> */}
   <TableMaterialReact/>
  </React.StrictMode>
)
