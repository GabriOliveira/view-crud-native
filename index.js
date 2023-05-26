const express = require('express');
const app = express();
const port = 30000;
const usuarioRouter = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(usuarioRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
