const styles = require('./light').default;

module.exports = fileName => styles[fileName] || {};
