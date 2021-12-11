import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
//Source Components
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details.jsx';
import AddMovie from '../AddMovie/AddMovie';

//MUI stuff
import { Box } from '@mui/material';

function App() {
  return (
    <Box   
      bgcolor="primary.main"
      className="App"
    >
      <Router>
        <Box bgcolor="secondary.dark">
          <h1>The Movies Saga!</h1>
          <nav display="flex">
            <Link to="/addmovie">Add A Movie</Link>
            <span> 🍿 </span>
            <Link to="/"> Movie Gallery</Link>
            <span> 🍿 </span>
            <Link to="/details"> Movie Details</Link>
          </nav>
        </Box>
        <Box>
          <Route path="/" exact>
            <MovieList />
          </Route>
          {/* Details page */}
          <Route exact path="/details">
            <Details/>
          </Route>
          {/* Add Movie page */}
          <Route exact path="/addmovie">
            <AddMovie />
          </Route>
        </Box>
      </Router>
    </Box>
  );
}


export default App;
