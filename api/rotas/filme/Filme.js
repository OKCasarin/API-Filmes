const TabelaFilme = require('./TabelaFilmes')

class Filme{
    constructor({id, titulo, ano, diretor, produtora, dataCriacao, dataAtualizacao, versao}){
        this.id = id
        this.titulo = titulo
        this.ano = ano
        this.diretor = diretor
        this.produtora = produtora
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao

        this.validaTitulo = ()=>{
            const valor = this.titulo
            if(typeof valor === 'string' && valor.length>0) return true
            return false
        }

        this.validaAno = ()=>{
            const valor = this.ano
            if(typeof valor === 'number' && valor >= 1800) {
                return true
            }
            return false
        }

        this.validaDiretor = ()=>{
            const valor = this.diretor
            if(typeof valor === 'string' && valor.length>0) return true
            return false
        }

        this.validaProdutora = ()=>{
            const valor = this.produtora
            if (typeof valor === 'string' && valor.length>0) return true
            return false
        }
    }

    async carregar(){
        const encontrado = await TabelaFilme.buscarId(this.id)
        this.titulo = encontrado.titulo
        this.ano = encontrado.ano
        this.diretor = encontrado.diretor
        this.produtora = encontrado.produtora
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async criar(){
        const campos = ['titulo','ano','diretor','produtora']
        const validacao = {
            'titulo':this.validaTitulo(),
            'ano':this.validaAno(),
            'diretor':this.validaDiretor(),
            'produtora':this.validaProdutora()
        }
        const dados = {}
        campos.forEach((campo)=>{
            if(validacao[campo]) dados[campo]=this[campo]
        })
        if(dados.length=0) throw new Error('Não foram fornecidos dados de inserção válidos')
        const resultado = await TabelaFilme.inserir(dados)
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async atualizar(){
        const campos = ['titulo','ano','diretor','produtora']
        const validacao = {
            'titulo':this.validaTitulo(),
            'ano':this.validaAno(),
            'diretor':this.validaDiretor(),
            'produtora':this.validaProdutora()
        }
        const dados = {}
        campos.forEach((campo)=>{
            if(validacao[campo]) dados[campo]=this[campo]
        })
        if(dados.length=0) throw new Error('Não foram fornecidos dados de atualização válidos')
        await TabelaFilme.atualizar(this.id, dados)
    }

    async remover(){
        await TabelaFilme.buscarId(this.id)
        return await TabelaFilme.remover(this.id)
    }
}

module.exports = Filme