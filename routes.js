const express = require('express');
const router = express.Router();
const usuarioController = require('./controllers/usuarioController');

// Rota para listar todos os usuários
router.get('/usuarios', usuarioController.getAllUsuarios);

// Rota para criar um novo usuário
router.post('/usuarios', usuarioController.createUsuario);

// Rota para atualizar um usuário existente
router.put('/usuarios/:id', usuarioController.updateUsuario);

// Rota para excluir um usuário existente
router.delete('/usuarios/:id', usuarioController.deleteUsuario);

module.exports = router;
