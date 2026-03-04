import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FinalReview from './pages/FinalReview'
import Home from './pages/Home'
import RecipePage from './pages/RecipePage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/final" element={<FinalReview />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
