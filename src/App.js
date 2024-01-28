import Home from './Components/Home/home'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import './App.css';

function App() {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxl"
    >
      <div className="App">
        <Home/>
      </div>
    </ThemeProvider>
  );
}

export default App;

