import _Categories from './Categories/Categories.js';
import _Games from './Games/Games.js';
import _Mechanics_Type from './Mechanics_Type/Mechanics_Type.js';
import _Message from './Message/Message.js';
import _Publishers from './Publishers/Publishers.js';
import _Renting_Or_Buying_Games from './Renting_Or_Buying_Games/Renting_Or_Buying_Games.js';
import _Rents from './Rents/Rents.js';
import _Users from './Users/Users.js';
import { defineUsersRelations } from './Users/relations.js';
import { defineRentsRelations } from './Rents/relations.js';
import { definePublishersRelations } from './Publishers/relations.js';
import { defineMessageRelations } from './Message/relations.js';
import { defineGamesRelations } from './Games/relations.js';
import { defineCategoriesRelations } from './Categories/relations.js';
import { defineMechanicTypeRelations } from './Mechanics_Type/relations.js';
import { defineRentingOrBuyingGamesRelations } from './Renting_Or_Buying_Games/relations.js';
import db from '../../config/db.config.js';

function initModels(sequelize) {
  let games = _Games(sequelize);
  let categories = _Categories(sequelize);
  let mechanicsType = _Mechanics_Type(sequelize);
  let message = _Message(sequelize);
  let publishers = _Publishers(sequelize);
  let rentingOrBuyingGames = _Renting_Or_Buying_Games(sequelize);
  let rents = _Rents(sequelize);
  let users = _Users(sequelize);

  const models = {
    categories,
    games,
    mechanicsType,
    message,
    publishers,
    rentingOrBuyingGames,
    rents,
    users,
  };

  defineCategoriesRelations(models);
  defineGamesRelations(models);
  defineMechanicTypeRelations(models);
  defineMessageRelations(models);
  definePublishersRelations(models);
  defineRentingOrBuyingGamesRelations(models);
  defineRentsRelations(models);
  defineUsersRelations(models);

  return models;
}

/**
 * @typedef {import('@types/sequelize').Model} Model
 * @typedef {import('@types/sequelize').ModelCtor} ModelCtor
 */

/**
 * @typedef {Object} Models
 * @property {ModelCtor<Model>} games
 * @property {ModelCtor<Model>} categories
 * @property {ModelCtor<Model>} mechanicsType
 * @property {ModelCtor<Model>} message
 * @property {ModelCtor<Model>} publishers
 * @property {ModelCtor<Model>} rentingOrBuyingGames
 * @property {ModelCtor<Model>} rents
 * @property {ModelCtor<Model>} users
 */
/** @type {Models} */
const models = initModels(db.sequelize);
export default models;
