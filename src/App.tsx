
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Report from './pages/Report'
import NotFound from './pages/NotFound'
import AppLayout from './components/layout/AppLayout'
import { theme } from './theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import { Transaction } from './types/index'
import { formatMonth } from './utiles/formatting'
// import { collection, getDocs } from 'firebase/firestore'
// import { db } from './firebase'

function App() {
  const transactionsData =[
    {id: "aaaa", date: "2024-06-10", amount: 200, content: "トマトApp", type: "expense",category: "食費"} as Transaction,
    {id: "bbbb", date: "2024-06-10", amount: 150, content: "オニオンApp", type: "expense",category: "食費"} as Transaction,
    {id: "cccc", date: "2024-06-01", amount: 1000, content: "バイトApp", type: "income",category: "副収入"} as Transaction,
    {id: "dddd", date: "2024-05-01", amount: 2000, content: "バイトApp", type: "income",category: "副収入"} as Transaction,
    {id: "eeee", type: "income", category: "お小遣い", amount: 700, content: "母から", date: "2024-06-22" } as Transaction,
    {id: "ffff", type: "expense", category: "教育費", amount: 1200, content: "ドリル", date: "2024-06-22"} as Transaction,
    {id: "eeee", type: "income", category: "給与", amount: 100000, content: "家庭教師", date: "2024-06-25"} as Transaction,
  ]
  
  const[transactions, setTransactions] = useState<Transaction[]>([]);
  const[currentMonth, setCurrentMonth] = useState(new Date());
  
  // // FireStoreのErrorかどうかを判定する型ガード
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === "object"&& err !== null && "code" in err
  }

  // firestoreのデータをすべて取得
  useEffect(()=>{
    const fetchTransactions = async() => {

      try{
        // // FireBaseの読み取り上限を超えたので、モックにする
        // const querySnapshot = await getDocs(collection(db, "transactions"));

        console.log("fetchTransactions is loaded.")
        // const transactionsData = querySnapshot.docs.map(doc => {
        //   return {
        //     ...doc.data(),
        //     id: doc.id,
        //   } as Transaction
        // });
        
        setTransactions(transactionsData);
        
      } catch(err){
        //error
        if(isFireStoreError(err)){
          console.error("firestoreのエラー：", err)
        } else {
          console.error("一般的なエラー：" , err)
        }
      }
    };
    fetchTransactions();
  },[]);

  // ひと月分のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction)=>{
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}/>} />
            <Route path='/report' element={<Report />} />
            <Route path='/*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
