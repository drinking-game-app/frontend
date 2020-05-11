const styles = require('./light').default;

module.exports = (fileName: string | number) => styles[fileName] || {};
