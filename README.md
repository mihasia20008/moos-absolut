# Moos-Absolut-UI

## Requirements

For building project, you will only need Node.js installed on your environement.

### Node

Make sure there is a minimum version of [Node](http://nodejs.org/) and [NPM](https://npmjs.org/)

    $ node --version
    v10.15.0

    $ npm --version
    6.4.1

## Install

    $ git clone git@github.com:SuperbCoders/moos-absolut-SPA.git
    $ cd moos-agent-ui
    $ npm install

### Configure app

Copy `public/contentConstants.sample.json` to `contentConstants.json` then edit it with the url where you have setup:

- Copyright, Phone, E-Mail texts on site
- tasks statuses *(if need)*
- `authType` need write one of `keycloak` or `standard`
    - `keycloak` - if need authorize user by Keycloak server
    - `standard` - if need authorize user by session_id in `/api/`
- `formType` need write one of `camunda` or `custom`
    - `camunda` - if need use camunda form
    - `custom` - if need use forms from project
    
File `contentConstants.json` available for edit after build app in build folder, but new build rewrite this file from `public/contentConstants.json` contents.

### Configure Keycloak

Copy `public/keycloak.sample.json` to `keycloak.json` then edit it for contain real keycloak settings.  
File `keycloak.json` available for edit after build app in build folder, but new build rewrite this file from `public/keycloak.json` contents.
    
### Folder structure

    /build - compiled production version of app
    /public - public files that coping in build folder without changing
    /src - app source files

## Start & watch

    $ npm start

## Simple build for production

    $ npm run build

Make sure that nginx is correctly configured to redirect the required server_name to the folder moos-absolut-SPA/build
