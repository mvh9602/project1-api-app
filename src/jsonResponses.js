const entries = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getEntries = (request, response) => {
  const responseJSON = {
    entries,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getEntriesMeta = (request, response) => respondJSONMeta(request, response, 200);

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for is not real.',
    id: 'notReal',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

const addEntry = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.link || !body.genre) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (entries[body.name]) {
    responseCode = 204;
  } else {
    entries[body.name] = {};
  }

  entries[body.name].name = body.name;
  entries[body.name].link = body.link;
  entries[body.name].desc = body.desc;
  entries[body.name].genre = body.genre;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getEntries,
  getEntriesMeta,
  addEntry,
  notReal,
  notRealMeta,
};
