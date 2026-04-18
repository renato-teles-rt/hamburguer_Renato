import { Model, DataTypes } from "sequelize";
import sequelize from "./Database.js";

export default class Avaliacao extends Model {
  static associate(models) {
    Avaliacao.belongsTo(models.Pedido, {
      foreignKey: 'pedido_id',
      as: 'pedido'
    });
  }
}

Avaliacao.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pedidos',
      key: 'id'
    }
  },
  nota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
      isInt: true
    }
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Avaliacao',
  tableName: 'avaliacoes',
  paranoid: true,
  timestamps: true
});