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

class TipoNaoSuportado extends Error{
    constructor(){
        super('Tipo solicitado não suportado pela API')
        this.name = 'TipoNaoSuportado'
        this.idErro = 3
    }
}

module.exports = {
    NaoEncontrado: NaoEncontrado,
    CampoInvalido: CampoInvalido,
    DadosNaoFornecidos: DadosNaoFornecidos,
    TipoNaoSuportado: TipoNaoSuportado
}