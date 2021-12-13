const ModeloTabela = require('./ModeloTabelaFilme')

module.exports = {
    lista() {
        return ModeloTabela.findAll()
    }
}