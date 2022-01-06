const TabelaFilme = require('./TabelaFilmes')
const Erros = require('../../Erros')

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
            if(typeof valor === 'number' && valor >= 1900) {
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
        const dadosValidos = this.valida()
        const dadosEsperados = ['titulo','ano','diretor','produtora']
        dadosEsperados.forEach(campo=>{
            if(!dadosValidos[campo]) throw new Erros.CampoInvalido(campo)
        })
        const resultado = await TabelaFilme.inserir(dadosValidos)
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async atualizar(){
        const dadosValidos = this.valida()
        console.log(Object.keys(dadosValidos).length)
        if(!Object.keys(dadosValidos).length) throw new Erros.DadosNaoFornecidos()
        await TabelaFilme.atualizar(this.id, dadosValidos)
    }

    async remover(){
        await TabelaFilme.buscarId(this.id)
        return await TabelaFilme.remover(this.id)
    }

    valida(){
        const campos = ['titulo','ano','diretor','produtora']
        const validacoes = {
            'titulo':this.validaTitulo(),
            'ano':this.validaAno(),
            'diretor':this.validaDiretor(),
            'produtora':this.validaProdutora()
        }
        const dadosValidos = {}
        campos.forEach(campo=>{
            if (validacoes[campo]) dadosValidos[campo]=this[campo]
        })
        return dadosValidos
    }
}

module.exports = Filme