// import './index.css'
import '@radix-ui/themes/styles.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './reducers/store'
import { Theme } from '@radix-ui/themes'

console.log('INITIAL STORE STATE: ', store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
        <App />
      </Theme>
    </Provider>
  </Router>
)