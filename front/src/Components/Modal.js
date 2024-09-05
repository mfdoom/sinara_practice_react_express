import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Backdrop,
  Fade,
  Grid,
} from "@mui/material"

export default function BarcodeModal({
  code,
  setCode,
  showModal,
  setShowModal,
  titleModal,
  prodName,
  operation,
  updateItem,
  getItems,
}) {
  const [title, setTitle] = useState(prodName)

  async function postItem() {
    await axios.post("/additem", { title, code })
    setCode("Не найден")
  }

  async function upd(title, code) {
    await updateItem(title, code)
    await getItems()
  }

  function validForm() {
    return code && title?.length > 0
  }

  useEffect(() => {}, [code])

  const handleClose = () => setShowModal(false)

  return (
    <Grid container justifyContent="center" mt={0}>
      <Box maxWidth="md" mx="auto" mt={5}>
        <Modal
          open={showModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" component="h2">
                {titleModal} штрих-код
              </Typography>
              <Box mt={2}>
                <TextField
                  fullWidth
                  label="Штрих-код"
                  variant="outlined"
                  value={code}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Название"
                  variant="outlined"
                  value={title}
                  autoComplete="off"
                  onChange={(e) =>
                    setTitle(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                  sx={{ mb: 2 }}
                />
              </Box>
              <Box display="flex" justifyContent="space-around" mt={3}>
                <Button
                  variant="text"
                  color="error"
                  onClick={handleClose}
                  sx={{ textTransform: "uppercase" }}
                >
                  Закрыть
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  disabled={!validForm()}
                  onClick={() => {
                    operation === "add" ? postItem() : upd(title, code)

                    handleClose()
                  }}
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  Сохранить
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Grid>
  )
}
