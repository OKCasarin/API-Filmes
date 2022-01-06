const express = require('express')
const config = require('config')
const bodyParser = require('body-parser')
const roteador = require('./rotas/filme/index')

const app = express()
app.use(bodyParser.json())
app.use('/api/filme',roteador)
app.use((erro, req, res, next)=>{
    let status = 500
    if(erro.idErro===0) status = 404
    else if(erro.idErro===1) status = 400
    else if(erro.idErro===2) status = 400
    res.status(status)
    res.json({id:erro.idErro, mensagem:erro.message})
})

app.listen(config.get('api.porta'),(erro)=>{
    if (erro) console.log(erro)
    else console.log('API rodando na porta ' + config.get('api.porta'))
})