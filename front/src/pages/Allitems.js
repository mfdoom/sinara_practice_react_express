import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material"

import DeleteIcon from "@mui/icons-material/Delete"
import ModeEdit from "@mui/icons-material/ModeEdit"
import BarcodeModal from "../Components/Modal"

function AllItems() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [code, setCode] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getItems()
  }, [])

  async function getItems() {
    setIsLoading(true)
    try {
      const { data } = await axios.get("/items")
      const sortedItems = data.sort(
        (a, b) => new Date(b.time) - new Date(a.time)
      )
      setItems(sortedItems)
    } catch (error) {
      console.error("Error fetching items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function editItem(title, code) {
    setCode(code)
    setTitle(title)
    setShowModal(true)
  }

  async function updateItem(title, code) {
    await axios.put("/updateitem", { name: title, code })
  }

  async function deleteItem(code) {
    try {
      let conf = window.confirm("Уверены?")
      if (conf) {
        let { data } = await axios.post("/deleteitem", { code })
        setItems(data)
      }
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  function formatTime(time) {
    return new Date(time).toLocaleString()
  }

  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} square={true} className="tableitems">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Наим.</TableCell>
                <TableCell>Дата доб.</TableCell>
                <TableCell>Штрихкод</TableCell>
                <TableCell>Удалить</TableCell>
                <TableCell>Изменить продукт</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{formatTime(item.time)}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteItem(item.code)}
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => editItem(item.title, item.code)}
                      variant="contained"
                      color="primary"
                      startIcon={<ModeEdit />}
                    >
                      Изменить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {showModal && (
        <BarcodeModal
          code={code}
          prodName={title}
          showModal={showModal}
          setShowModal={setShowModal}
          titleModal={"Изменить"}
          operation={"edit"}
          updateItem={updateItem}
          getItems={getItems}
        />
      )}
    </>
  )
}

export default AllItems
