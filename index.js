/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// eslint-disable-line @typescript-eslint/no-unused-vars
import i18n from '~/lib/i18n';

AppRegistry.registerComponent(appName, () => App);
