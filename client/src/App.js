import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloProvider, ApolloClient,  InMemoryCache, } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<SearchBooks/>} />
            <Route path="/saved" exact element={<SavedBooks/>} />
            <Route render={() => <h1 className="display-2">Wrong Page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  )
}

export default App;
