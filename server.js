const express = require('express');

const app =  express();
const PORT = 3000;
app.use(express.static('./dist'));

const template = `
  <html>
    <head>
      <title>React Fiber</title>
    </head>
    <body>
      <div id="root"></div>
			<script src="bundle.js"></script>
    </body>
  </html>
`;

app.get('*', (req, res) => {
  res.send(template);
});

app.listen(PORT, () => {
  console.log('server is running');
});