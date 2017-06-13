import App from '../containers/app';
import {home} from './home';
import {personalSet} from './personal-set';
import {RLOperation} from './rl-operation';

export default {
	path: '/',
	component: App,
	childRoutes: [
		home,
		personalSet,
		RLOperation,
	]
};