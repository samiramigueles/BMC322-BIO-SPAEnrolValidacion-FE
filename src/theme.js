import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        h1: {
            fontfamily: "Open Sans",
            fontSize: "17px",
            fontWeight: "700",
            lineheight: "40px",
            letterSpacing: "0px",
            textAlign: "center",
        },
        h2: {
            fontfamily: "Open Sans",
            fontSize: "18px",
            fontWeight: "500",
            lineheight: "100px",
            letterSpacing: "0px",
            textAlign: "center",
        },
        h3: {
            fontfamily: "Open Sans",
            fontSize: "15px",
            fontWeight: "400",
            lineheight: "100px",
            letterSpacing: "0px",
            textAlign: "center",
        },
        h4: {
            fontfamily: "Open Sans",
            fontSize: "15px",
            fontWeight: "600",
            lineheight: "54px",
            color: "#606060",
        },
    },
    palette: {
        primary: {
            main: "#1C2E51",
        },
        secondary: {
            main: "#FF9104",
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "100px",
                    color: "white",
                    fontfamily: "Open Sans",
                    fontSize: "18px",
                    fontWeight: "500",
                    lineheight: "100px",
                },
            },
        },
    },
});

export default theme;
