const ModeloTabela = require('./ModeloTabelaFilme')

module.exports = {
    lista() {
        return ModeloTabela.findAll()
    },
    async buscarId(id){
        const encontrado = await ModeloTabela.findOne({
            where: {id:id}
        })

        if(!encontrado) throw new Error('Filme não encontrado')
        return encontrado
    },
    inserir(filme){
        return ModeloTabela.create(filme)
    },
    atualizar(id, dados){
        return ModeloTabela.update(
            dados,
            {
                where: {id}
            }
        )
    }
}