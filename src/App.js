import Header from './Components/Header/Header';
import routes from './routes';
import './App.css';

function App() {
  return (
    <section className="App">
      <Header />
      { routes }
    </section>
  );
}

export default App;
