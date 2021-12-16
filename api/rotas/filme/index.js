const roteador = require('express').Router()
const Tabela = require('./TabelaFilmes')
const Filme = require('./Filme')

roteador.get('/', async (req,res)=>{
    const resultado = await Tabela.lista()
    res.json(resultado)
})

roteador.get('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const filme = new Filme({id})
        await filme.carregar()
        res.json(filme)   
    }
    catch (erro){
        res.json({mensagem: erro.message})
    }
})

roteador.post('/',async (req, res)=>{
    try{
        const dados = req.body
        const filme = new Filme(dados)
        await filme.criar()
        res.json(filme)
    }
    catch(erro){
        res.json({mensagem: erro.message})
    }
})

roteador.put('/:id', async (req, res)=>{
    try{
        const dadosRecebidos = req.body
        const id = req.params.id
        const dados = Object.assign({},{id:id},dadosRecebidos)
        console.log(dados)
        const filme = new Filme(dados)
        await filme.atualizar()
        res.end()
    }
    catch (erro){
        res.json({mensagem: erro.message})
    }
})

module.exports = roteador