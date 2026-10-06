import './styles/main.scss';
import { App } from './App';

const main = () => {
	const app = new App({ rootSelector: '#app' });
	window.addEventListener('beforeunload', () => app.destroy());
};

main();
