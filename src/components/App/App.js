import {HashRouter as Router, Route, Link as RouterLink } from 'react-router-dom';
import './App.css';
//Source Components
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details.jsx';
import AddMovie from '../AddMovie/AddMovie';

//MUI stuff
import { Box, Button } from '@mui/material';
import Link from '@mui/material/Link';

function App() {
  return (
    <Box   
      bgcolor="primary.main"
      className="App"
    >
      <Router>
        <Box 
        height="3em"
        bgcolor="secondary.dark">
          <nav display="flex">
            <Link 
              component={RouterLink} 
              underline="hover" 
              to="/addmovie"
              onClick={() => {console.info("Link to Add Movie");}}
            >
              <Button variant="outlined">Add A Movie</Button>
            </Link>
            <span> 🍿 </span>
            <Link 
              component={RouterLink}
              underline="hover"
              to="/"
              onClick={() => {console.info("Link to Movie Gallery");}}
            > 
            <Button variant="outlined">Movie Gallery</Button>
            </Link>
            <span> 🍿 </span>
            <Link 
              component={RouterLink} 
              underline="hover" 
              to="/details"
              onClick={() => {console.info("Link to Single Movie Detail");}}
            >
              <Button variant="outlined">Movie Details</Button>
            </Link>
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
