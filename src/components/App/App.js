import {HashRouter as Router, Route, Link as RouterLink } from 'react-router-dom';
import './App.css';
//Source Components
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details.jsx';
import AddMovie from '../AddMovie/AddMovie';

//MUI stuff
import { Box, Button, AppBar, Typography } from '@mui/material';
import Link from '@mui/material/Link';

function App() {
  return (
    <Box   
      bgcolor="primary.light"
      className="App"
    >
      <Router>
        <Box sx={{flexGrow: 1}}>
          <AppBar position="static">
          <Typography variant="h3" color="secondary.dark" component="div" sx={{ flexGrow: 1 }}>
            Epic Sagas
          </Typography>
          <nav display="flex">
            <Link 
              component={RouterLink}
              color="inherit"
              underline="hover" 
              to="/addmovie"
              onClick={() => {console.info("Link to Add Movie");}}
            >
              <Button variant="contained" color="secondary">Add Movie</Button>
            </Link>
            <span> 🍿 </span>
            <Link 
              component={RouterLink}
              underline="hover"
              to="/"
              onClick={() => {console.info("Link to Movie Gallery");}}
            > 
            <Button variant="contained" color="secondary">Gallery</Button>
            </Link>
            <span> 🍿 </span>
            <Link 
              component={RouterLink} 
              underline="hover" 
              to="/details"
              onClick={() => {console.info("Link to Single Movie Detail");}}
            >
              <Button variant="contained" color="secondary">Details</Button>
            </Link>
          </nav>
          </AppBar>
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
