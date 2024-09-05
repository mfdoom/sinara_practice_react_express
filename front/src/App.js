import React from "react"

import { Routes, Route } from "react-router-dom"
import ScanPage from "./pages/ScanPage"
import Allitems from "./pages/Allitems"
import Layout from "./Layout"
import axios from "axios"
import styles from "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = process.env.REACT_APP_CREDENTIALS

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<ScanPage />}></Route>
          <Route path="/allitems" element={<Allitems />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
