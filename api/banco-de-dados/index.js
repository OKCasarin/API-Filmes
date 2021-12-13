const Sequelize = require('sequelize')
const config = require('config')
const instancia = new Sequelize(
    config.get('banco.nome'),
    config.get('banco.usuario'),
    config.get('banco.senha'),
    {
        host:config.get('banco.host'),
        dialect:'mysql'
    }
)

module.exports = instancia