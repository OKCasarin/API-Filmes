const express = require('express')
const config = require('config')
const bodyParser = require('body-parser')
const roteador = require('./rotas/filme/index')

const app = express()
app.use(bodyParser.json())
app.use('/api/filme',roteador)

app.listen(config.get('api.porta'),(erro)=>{
    if (erro) console.log(erro)
    else console.log('API rodando na porta ' + config.get('api.porta'))
})