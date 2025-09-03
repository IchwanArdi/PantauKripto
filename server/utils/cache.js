const NodeCache = require('node-cache');

// Cache untuk menyimpan response selama 5 menit
const cache = new NodeCache({ stdTTL: 300 });

module.exports = cache;
