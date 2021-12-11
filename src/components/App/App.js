import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
//Source Components
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details.jsx';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <nav display="flex">
          <Link to="/addmovie">Add A Movie</Link>
          <span> 🍿 </span>
          <Link to="/"> Movie Gallery</Link>
          <span> 🍿 </span>
          <Link to="/details"> Movie Details</Link>
        </nav>        
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
      </Router>
    </div>
  );
}


export default App;
