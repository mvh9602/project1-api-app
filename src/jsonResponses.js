const entries = {
  midterm: {
    name: 'midterm',
    link: 'https://people.rit.edu/mvh9602/media/Electronic.wav',
    desc: 'Midterm project for Electronic Music Production 2. A synthy electronic song with my most robust percussion section I\'ve ever made.',
    genre: 'electronic',
  },
  hardbass: {
    name: 'hardbass',
    link: 'https://people.rit.edu/mvh9602/media/Hardbass.wav',
    desc: 'Final project for Electronic Music Production. An experiment in exploring a popular russian eurobeat genre.',
    genre: 'eurobeat',
  },
  normalDimension: {
    name: 'normalDimension',
    link: 'https://people.rit.edu/mvh9602/media/MultiverseNormal.wav',
    desc: 'Song for student project \'Multiverse Inc\'. This song is used for an office being corrupted a dimension shifting device.',
    genre: 'game',
  },
  westernDimension: {
    name: 'westernDimension',
    link: 'https://people.rit.edu/mvh9602/media/MultiverseWestern.wav',
    desc: 'Song for student project \'Multiverse Inc\'. This song is used for a dimension comprised of western movie tropes.',
    genre: 'game',
  },
};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getEntries = (request, response, params) => {
  let responseJSON = {
    entries,
  };


  if (params == null) {
    console.log(params);
    return respondJSON(request, response, 200, responseJSON);
  }

  if (params.genre) {
    responseJSON = {};
    responseJSON.entries = {};
    for (const [key, value] of Object.entries(entries)) {
      if (value.genre === params.genre) {
        responseJSON.entries[key] = value;
      }
    }

    if (Object.keys(responseJSON.entries) <= 0) {
      responseJSON.message = 'No entries found matching genre query parameter.';
      responseJSON.id = 'badRequest';
      return respondJSON(request, response, 400, responseJSON);
    }
  }
  return respondJSON(request, response, 200, responseJSON);
};

const getEntriesMeta = (request, response) => respondJSONMeta(request, response, 200);

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for is not real.',
    id: 'notReal',
  };

  return respondJSON(request, response, 404, responseJSON);
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
