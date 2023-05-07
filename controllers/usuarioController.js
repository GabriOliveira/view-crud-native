const Usuario = require('./../models/usuario');

exports.createUsuario = (req, res) => {
  const { name, email, password } = req.body;

  Usuario.create(name, email, password, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao inserir usuário');
    } else {
      res.send('Usuário criado com sucesso');
    }
  });
};

exports.updateUsuario = (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  Usuario.update(id, name, email, password, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar usuário');
    } else {
      res.send('Usuário atualizado com sucesso');
    }
  });
};

exports.deleteUsuario = (req, res) => {
  const id = req.params.id;

  Usuario.delete(id, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao excluir usuário');
    } else {
      res.send('Usuário excluído com sucesso');
    }
  });
};

exports.getAllUsuarios = (req, res) => {
  Usuario.all((err, users) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar usuários');
    } else {
      res.send(users);
    }
  });
};
