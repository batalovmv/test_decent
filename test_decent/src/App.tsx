
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';

const App = () => {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<CountriesList />} />
                        <Route path="/countries/:countryCode" element={<CountryDetails />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
