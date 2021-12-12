import {HashRouter as Router, Route, Link as RouterLink } from 'react-router-dom';
import './App.css';
//Source Components
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details.jsx';
import AddMovie from '../AddMovie/AddMovie';

//MUI stuff
import { Box, Button, AppBar, Typography, Grid } from '@mui/material';
import Link from '@mui/material/Link';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

function App() {
  return (
    <Box   
      bgcolor="primary.light"
      className="App"
    >
      <Router>
        <Box sx={{flexGrow: 1}}>
          <AppBar position="static">
            <nav display="flex" >
              <Grid container spacing={2} 
                direction="row"
                justifyContent="space-evenly"
                alignItems="baseline"
              >
                <Grid item xs={12}>
                  <Typography float="left" variant="h3" color="secondary.dark" component="div" sx={{ flexGrow: 1 }}>
                    <LocalMoviesIcon/>Epic Sagas<LocalMoviesIcon/>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Link 
                    component={RouterLink}
                    underline="hover" 
                    to="/addmovie"
                    onClick={() => {console.info("Link to Add Movie");}}
                  >
                    <Button fullWidth variant="contained" color="secondary">Add Movie</Button>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link 
                    component={RouterLink}
                    underline="hover"
                    to="/"
                    onClick={() => {console.info("Link to Movie Gallery");}}
                  > 
                    <Button fullWidth variant="contained" color="secondary">Gallery</Button>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link 
                    component={RouterLink} 
                    underline="hover" 
                    to="/details"
                    onClick={() => {console.info("Link to Single Movie Detail");}}
                  >
                    <Button fullWidth variant="contained" color="secondary">Details</Button>
                  </Link>
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
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
