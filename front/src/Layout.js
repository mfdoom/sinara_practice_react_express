import React from "react"
import Header from "./Components/Header"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="">
      <Header></Header>
      <Outlet> </Outlet>
    </div>
  )
}
