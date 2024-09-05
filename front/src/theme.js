import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    mode: "light", // или 'light', в зависимости от выбранного вами режима
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#6c757d",
    },
    error: {
      main: "#dc3545",
    },
    // другие настройки палитры и стилей
  },
  // другие настройки темы
})

export default theme
