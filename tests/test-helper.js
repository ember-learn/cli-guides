import Application from '@ember-learn/cli-guides/app';
import config from '@ember-learn/cli-guides/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
