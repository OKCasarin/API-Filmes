const roteador = require('express').Router()
const Tabela = require('./TabelaFilmes')

roteador.get('/', async (req,res)=>{
    const resultado = await Tabela.lista()
    res.json(resultado)
})

module.exports = roteador