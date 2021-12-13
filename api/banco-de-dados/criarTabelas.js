const ModeloTabela = require('../rotas/filme/ModeloTabelaFilme')

ModeloTabela
    .sync()
    .then(()=>{console.log('Tabela criada')})
    .catch(console.log)