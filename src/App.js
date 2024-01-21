import './App.css';
import WeatherPage from '../src/pages/MainPage.jsx'
function App() {
  window.DATA_PER_DAY = 8;
  window.HOURS = 12;
  return (
    <div className='wrapper'>
      <WeatherPage/>
    </div>
  );
}

export default App;
