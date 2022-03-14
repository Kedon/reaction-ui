import logo from './logo.svg';
import AppRoute from './screens/Router'
import './assets/scss/app.scss';
import { withToastProvider } from './components/toast'

function App() {
  return (
    <AppRoute />
  );
}

export default withToastProvider(App);
