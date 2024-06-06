
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Footer from './components/layout/footer.jsx';
import Header from './components/layout/header.jsx';

import  { Toaster } from 'react-hot-toast';
import useUserRoutes from './components/routes/userRoutes.jsx';
import useAdminRoutes from "./components/routes/adminRoutes.jsx"
import Notfound from './components/layout/Notfound.jsx';
function App() {
  const userRoutes= useUserRoutes();
  const adminRoutes =useAdminRoutes()
  return (
    <div className="App">
    <Toaster position="top-center"/>
    <Header/>
    <div className='container'>
    <Routes>
   {userRoutes}
   {adminRoutes}
   <Route path='*' element={<Notfound/>}/>
    </Routes>
 
   
    </div>
    <Footer/>
    </div>
  );
}

export default App;
