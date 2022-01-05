const roteador = require('express').Router()
const Tabela = require('./TabelaFilmes')
const Filme = require('./Filme')

roteador.get('/', async (req,res)=>{
    const resultado = await Tabela.lista()
    res.status(400).json(resultado)
})

roteador.get('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const filme = new Filme({id})
        await filme.carregar()
        res.status(200).json(filme)   
    }
    catch (erro){
        res.status(404).json({mensagem: erro.message})
    }
})

roteador.post('/',async (req, res)=>{
    try{
        const dados = req.body
        const filme = new Filme(dados)
        await filme.criar()
        res.status(201).json(filme)
    }
    catch(erro){
        res.status(400).json({mensagem: erro.message})
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
        res.status(204).end()
    }
    catch (erro){
        res.status(400).json({mensagem: erro.message})
    }
})

roteador.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const filme = new Filme({id:id})
        filme.remover()
        res.status(204).end()
    }
    catch (erro){
        res.status(404).json({mensagem:erro.message})
    }
})

module.exports = roteador