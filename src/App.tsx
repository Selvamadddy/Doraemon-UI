import './App.css'
import NavComp from './Components/Common/NavComp.tsx'
import MainBody from './Components/MainBody.tsx'
import { Provider } from 'react-redux';
import { store } from './ReduxManager/Store.tsx';

function App() {
  
  return (
    <Provider store={store}>
      <div style={{ fontFamily: "Fredoka, sans-serif" }}>
        <NavComp />
        <MainBody />
      </div>
    </Provider>
  )
}

export default App
