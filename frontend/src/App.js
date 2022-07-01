import Login from './pages/auth/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main';
import AuthContextProvider from './contexts/AuthContext';
import Landing from './pages/layout/Landing';
import SignUp from './pages/auth/SignUp'
import Contact from './pages/Contact'
import ListLesson from './pages/ListLesson'
import './assets/fonts/ionicons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';




function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/main/*' element={<Main />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/ListLesson" element={<ListLesson />} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>

    );
}

export default App;
