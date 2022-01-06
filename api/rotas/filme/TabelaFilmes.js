const Erros = require('../../Erros')
const ModeloTabela = require('./ModeloTabelaFilme')

module.exports = {
    lista() {
        return ModeloTabela.findAll({raw:true})
    },
    async buscarId(id){
        const encontrado = await ModeloTabela.findOne({
            where: {id:id}
        })

        if(!encontrado) throw new Erros.NaoEncontrado()
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
    },
    remover(id){
        return ModeloTabela.destroy({
            where:{id:id}
        })
    }
}