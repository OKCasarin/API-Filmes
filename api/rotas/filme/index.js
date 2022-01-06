const roteador = require('express').Router()
const Tabela = require('./TabelaFilmes')
const Filme = require('./Filme')
const SerializadorFilme = require('../../Serializador').SerializadorFilme


roteador.get('/', async (req,res)=>{
    const resultado = await Tabela.lista()
    const Serializador = new SerializadorFilme(res.getHeader('Content-Type'))
    res.status(200)
    res.send(Serializador.serializar(resultado))
})

roteador.get('/:id', async (req, res, next)=>{
    try{
        const id = req.params.id
        const filme = new Filme({id})
        await filme.carregar()
        const Serializador = new SerializadorFilme(res.getHeader('Content-Type'))
        res.status(200)
        res.send(Serializador.serializar(filme))  
    }
    catch (erro){
        next(erro)
    }
})

roteador.post('/',async (req, res, next)=>{
    try{
        const dados = req.body
        const filme = new Filme(dados)
        await filme.criar()
        const Serializador = new SerializadorFilme(res.getHeader('Content-Type'))
        res.status(201)
        res.send(Serializador.serializar(filme))
    }
    catch(erro){
        next(erro)
    }
})

roteador.put('/:id', async (req, res, next)=>{
    try{
        const dadosRecebidos = req.body
        const id = req.params.id
        const dados = Object.assign({},{id:id},dadosRecebidos)
        const filme = new Filme(dados)
        await filme.atualizar()
        res.status(204).end()
    }
    catch (erro){
        next(erro)
    }
})

roteador.delete('/:id', async (req, res, next)=>{
    try{
        const id = req.params.id
        const filme = new Filme({id:id})
        await filme.remover()
        res.status(204).end()
    }
    catch (erro){
        next(erro)
    }
})

module.exports = roteador