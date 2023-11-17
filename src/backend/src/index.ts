import App from './infra/App';
import EnvironmentConfig from './infra/config/environment/Environment.config';

const app = new App(new EnvironmentConfig());

if (process.env.NODE_ENV !== 'test') {
    app.start();
}

export default app;
