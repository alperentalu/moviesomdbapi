

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Dashboard from './pages/MoviesList';
import MovieDetail from './pages/MovieDetail';
import { MovieProvider } from './context/MovieContext';

const App = () => {
  return (
    <MovieProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/moviedetail" element={<MovieDetail />} />
      </Routes>
    </Router>
    </MovieProvider>
  );
};

export default App;