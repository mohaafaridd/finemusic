const lastfm = process.env.LAST_FM;

const getParams = (type, method, value) => {

    value = value.replace(' ', '+');

    switch (type) {
        case 'artist':
        case 'track':
        case 'album':
            return `?method=${method}&${type}=${value}&api_key=${lastfm}`;

        default:
            throw new Error(errorMessage);
    }
}

const getURL = (params, limit) => {
    return `http://ws.audioscrobbler.com/2.0/${params}&limit=${limit}&format=json`;
}

module.exports = {
    getParams,
    getURL
}