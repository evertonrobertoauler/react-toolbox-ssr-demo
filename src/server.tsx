import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as React from 'react';
import { RouterComponent } from './app/router.component';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { readFileSync } from 'fs';

const PORT = process.env.PONTO_PORT || 3000;

const style = readFileSync('dist/styles.css');

const html = `
  <html>
    <head>
      <title>Ponto APP</title>
      <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1">
      <style>${style}</style>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
      <style>html, body { margin: 0; padding: 0; }</style>
    </head>
    <body>
      <div id="root">{SRR}</div>
      <script src="browser.js"></script>
    <body>
  </html>
`;

async function startServer() {
  const app = express();

  app.use(bodyParser.json());

  app.post('/login', (req, res) => {
    console.log(req.body);
    setTimeout(() => res.send({id: 1}), 500);
  })

  app.post('/registrarPonto', (req, res) => {
    console.log(req.body);
    setTimeout(() => res.send({}), 500);
  })

  app.get('*.*', express.static('dist'));

  app.get('*', (req, res) => {
    const content = renderToString(
      <StaticRouter location={req.url} context={{}}>
        <RouterComponent cookie={req.headers.cookie || 'user='} />
      </StaticRouter>
    );
    res.send(html.replace('{SRR}', content));
  });

  return new Promise(resolve => app.listen(PORT, resolve));
}

startServer().then(() => {
  console.log(`Listening on http://localhost:${PORT}`);
});
