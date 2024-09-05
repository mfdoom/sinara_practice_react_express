import React from "react"
import { Link } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import ListIcon from "@mui/icons-material/List"

function Header() {
  return (
    <Box sx={{}}>
      <AppBar position="static" sx={{}}>
        <Toolbar sx={{ justifyContent: "center", gap: 5, background: "black" }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "none",
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "#dc3c5e",
              },
            }}
          >
            <HomeIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Сканировать</Typography>
          </Button>

          <Button
            component={Link}
            to="/allitems"
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "none",
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "#dc3c5e",
              },
            }}
          >
            <ListIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Все товары</Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Divider sx={{ my: 4 }} />
    </Box>
  )
}

export default Header
