import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Profile from "./Pages/Profile/Profile"
import Stocks from "./Pages/Stocks/Stocks"

const App = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar/>
            <div className="flex-1 overflow-hidden m-4">
                <Routes>
                    <Route path="/" element={<Profile />} />
                    <Route path="/stocks" element={<Stocks />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
