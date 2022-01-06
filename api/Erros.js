class NaoEncontrado extends Error{
    constructor(){
        super('Filme não encontrado')
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

class CampoInvalido extends Error{
    constructor(campo){
        super(`O campo ${campo} está inválido`)
        this.name = 'CampoInvalido'
        this.idErro = 1
    }
}

class DadosNaoFornecidos extends Error{
    constructor(){
        super('Nao foram fornecidos dados')
        this.name = 'DadosNaoFornecidos'
        this.idErro = 2
    }
}

module.exports = {
    NaoEncontrado: NaoEncontrado,
    CampoInvalido: CampoInvalido,
    DadosNaoFornecidos: DadosNaoFornecidos
}