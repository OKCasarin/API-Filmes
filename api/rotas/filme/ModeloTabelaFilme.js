const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados/index')

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull:false
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    diretor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    produtora: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    TableName: 'filmes',
    timeStamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('filmes', colunas, opcoes)