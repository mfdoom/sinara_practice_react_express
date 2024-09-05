import BarcodeScannerComponent from "react-qr-barcode-scanner"
import BarcodeModal from "../Components/Modal"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { CircularProgress, Box, Typography, Grid, Button } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

function ScanPage() {
  const [code, setCode] = useState("Не найден")
  const [foundItem, setFoundItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [manualCode, setManualCode] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [prodName, setProdName] = useState("")

  useEffect(() => {
    const fetchItem = async () => {
      if (code !== "Не найден") {
        setIsLoading(true)
        try {
          const response = await axios.post("/checkitem", { code })
          setFoundItem(response.data)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchItem()
  }, [code])

  const handleScanResult = (err, result) => {
    if (result?.text) {
      setCode(result.text)
    }
  }

  const handleManualCodeChange = (event) => {
    setManualCode(event.target.value)
  }

  const handleManualCodeSubmit = () => {
    setCode(manualCode) // Установка введенного пользователем штрих-кода в состояние code
  }

  return (
    <>
      <Box>
        <Grid container justifyContent="center">
          <Grid item>
            <BarcodeScannerComponent
              delay={500}
              width={500}
              height={500}
              onUpdate={handleScanResult}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Grid item>
            <Box
              sx={{
                typography: "h1",
                bgcolor: code === "Не найден" ? "error.main" : "lightgreen",
                p: 2,
                color: code === "Не найден" ? "white" : "black",
                mt: 2,
                borderRadius: 1,
              }}
            >
              <Typography variant="h3" align="center">
                Штрих-код:
              </Typography>
              <Typography variant="h3" align="center">
                {code}
              </Typography>
            </Box>

            {isLoading && (
              <Box
                role="status"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={4}
              >
                <CircularProgress />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      {foundItem ? (
        <Grid container justifyContent="center" mt={5}>
          <Grid item>
            <Typography variant="h4">{foundItem.title}</Typography>
          </Grid>
          <Grid item>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              bgcolor="lightgreen"
              borderRadius="50%"
              ml={2}
            >
              <CheckCircleIcon />
            </Box>
          </Grid>
        </Grid>
      ) : (
        // <BarcodeModal
        //   code={code}
        //   onChange={setCode}
        //   manualCode={manualCode}
        //   onManualCodeChange={handleManualCodeChange}
        //   onManualCodeSubmit={handleManualCodeSubmit}
        //   setCode={setCode}
        // />
        <Grid container justifyContent="center" mt={0}>
          <Box maxWidth="md" mx="auto" mt={5}>
            <Button
              disabled={code === "Не найден" || isLoading}
              variant="contained"
              color={code === "Не найден" ? "error" : "primary"}
              onClick={() => setShowModal(true)}
              sx={{
                textTransform: "uppercase",
                fontSize: "1.5rem",
                py: 1,
                px: 3,
              }}
            >
              Добавить
            </Button>
          </Box>
        </Grid>
      )}
      {showModal && (
        <BarcodeModal
          code={code}
          onChange={setCode}
          manualCode={manualCode}
          onManualCodeChange={handleManualCodeChange}
          onManualCodeSubmit={handleManualCodeSubmit}
          setCode={setCode}
          showModal={showModal}
          setShowModal={setShowModal}
          prodName={prodName}
          titleModal={"Добавить"}
          operation={"add"}
        />
      )}
    </>
  )
}

export default ScanPage
