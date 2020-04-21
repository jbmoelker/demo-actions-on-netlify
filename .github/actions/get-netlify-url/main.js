'use strict';

const fs = require('fs');

const core = require('@actions/core');

core.debug(`GitHub Event Name: ${process.env.GITHUB_EVENT_NAME}`);
core.debug(`GitHub Event Path: ${process.env.GITHUB_EVENT_PATH}`);

const eventData = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH));

core.debug(`GitHub Event Data: ${JSON.stringify(eventData, null, 2)}`);

const siteName = core.getInput('site-name') || eventData.repository.name;
const basicAuthUsername = core.getInput('basic-auth-username');
const basicAuthPassword = core.getInput('basic-auth-password');
const basicAuth = basicAuthUsername && basicAuthPassword
  ? `${basicAuthUsername}:${basicAuthPassword}@`
  : '';

core.debug(`Context: ${eventData.number ? 'pull request' : 'none'}`);
core.debug(`Site name: ${siteName}`);

core.setOutput(
  'url',
  eventData.number
    ? `https://${basicAuth}deploy-preview-${eventData.number}--${siteName}.netlify.app/`
    : `https://${basicAuth}${siteName}.netlify.com/`
);
