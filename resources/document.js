'use strict';

const assign = require('lodash/assign');
const fs = require('fs');
const FormData = require('form-data');

const base = require('../mixins/index');

/**
 * Create a Digital Account instance.
 *
 * @param {Juno} juno Reference to the Juno instance
 * @constructor
 * @public
 */
function Document(juno) {
  this.juno = juno;

  this.name = 'documents';
  this.key = '';
}

assign(Document.prototype, base);

/**
 * Uploads files for a digital account.
 *
 * @param {String} id Document id
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Document.prototype.sendDocuments = function sendDocuments(id, params) {
  const url = this.buildUrl(`${id}/files`);
  var key = 'files';
  // const form = buildForm('files', params);
  // console.log(form);
  return this.juno.request(url, 'POST', key, params, { 'content-type': 'multipart/form-data; boundary=---011000010111000001101001' });
};

function buildForm(key, files) {
  const form = new FormData();

  for (var index = 0; index < files.length; index++) {
    form.append(`${key}[]`, fs.createReadStream(files[index].tmpPath));
  }

  return form;
}

module.exports = Document;
