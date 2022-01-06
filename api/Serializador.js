const { json } = require("body-parser")
const Erros = require('./Erros')

class Serializador {

    json(dados){
        return JSON.stringify(dados)
    }

    serializar(dados){
        if (this.contentType === 'application/json') return this.json(this.filtrar(dados))
        throw new Erros.TipoNaoSuportado()
    }

    filtrarObjeto(dado){
        const novoObjeto = {}
        this.camposPublicos.forEach(campo=>{
            if(dado.hasOwnProperty(campo)) novoObjeto[campo]=dado[campo]
        })
        return novoObjeto
    }

    filtrar(dados){
        if (Array.isArray(dados)) dados = dados.map(dado=>this.filtrarObjeto(dado))
        else dados = this.filtrarObjeto(dados)
        return dados
    }
}

class SerializadorFilme extends Serializador{
    constructor(contentType){
        super()
        this.contentType = contentType
        this.camposPublicos = ['titulo','ano','diretor','produtora']
    }
}

class SerialiadorErros extends Serializador{
    constructor(contentType){
        super()
        this.contentType = contentType
        this.camposPublicos = ['id','mensagem']
    }
}

module.exports = {
    tiposSuportados:['application/json'],
    Serializador:Serializador,
    SerializadorFilme:SerializadorFilme,
    SerialiadorErros:SerialiadorErros
}