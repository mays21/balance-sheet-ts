import { PaletteColor, PaletteColorOptions, createTheme } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
    // カスタムカラーの設定
    interface Palette {
        incomeColor: PaletteColor,
        expenseColor: PaletteColor,
        balanceColor: PaletteColor
    }

    // Palatte初期設定の適用
    interface PaletteOptions {
        incomeColor: PaletteColorOptions,
        expenseColor: PaletteColorOptions,
        balanceColor: PaletteColorOptions
     }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Noto Sans JP, Roboto,"Helvetica",Arial, sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold:800
        },
    // https://mui.com/material-ui/customization/color/
    palette: {
        //収入用の色を定義
        incomeColor:{
            main: blue[500],
            light: blue[100],
            dark: blue[700],
        },
        //支出用の色を定義
        expenseColor:{
            main: red[500],
            light: red[100],
            dark: red[700],
        },        
        //残高用の色を定義
        balanceColor:{
            main: green[500],
            light: green[100],
            dark: green[700],
        }
    }
    });

