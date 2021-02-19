import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Characters from './pages/Characters';

import CharactersComics from './pages/CharactersComics';
import CharactersStories from './pages/CharactersStories';
import CharactersDetail from './pages/CharactersDetail';

import Comics from './pages/Comics';
import ComicsDetail from './pages/ComicsDetail';
import ComicsCharacters from './pages/ComicsCharacters';
import ComicsStories from './pages/ComicsStories';

import Stories from './pages/Stories';
import StoriesCharacters from './pages/StoriesCharacters';
import StoriesComics from './pages/StoriesComics';

import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/characters" />
                </Route>
                <Route
                exact
                path="/characters"
                component={Characters} />
                <Route
                exact
                path="/characters/:id"
                component={CharactersDetail} />
                <Route
                exact
                path="/characters/comics/:id"
                component={CharactersComics} />
                <Route
                exact
                path="/characters/stories/:id"
                component={CharactersStories} />
                <Route
                exact
                path="/comics"
                component={Comics} />
                <Route
                exact
                path="/comics/:id"
                component={ComicsDetail} />
                <Route
                exact
                path="/comics/characters/:id"
                component={ComicsCharacters} />
                <Route
                exact
                path="/comics/stories/:id"
                component={ComicsStories} />
                <Route
                exact
                path="/stories"
                component={Stories} />
                <Route
                exact
                path="/stories/characters/:id"
                component={StoriesCharacters} />
                <Route
                exact
                path="/stories/comics/:id"
                component={StoriesComics} />
                <Route
                exact
                path="/favorites"
                component={Favorites} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}
export default App;
