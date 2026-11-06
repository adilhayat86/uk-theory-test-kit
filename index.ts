import { registerRootComponent } from 'expo';
import App from './App';

// Keep root registration in TypeScript so a missing default export fails CI.
registerRootComponent(App);
