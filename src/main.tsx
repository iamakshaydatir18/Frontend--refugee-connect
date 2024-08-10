
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this path is correct
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import 'mapbox-gl/dist/mapbox-gl.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <App />
    <I18nextProvider i18n={i18n}></I18nextProvider>
  </Provider>
);
