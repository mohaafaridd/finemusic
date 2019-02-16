const lastfm = process.env.LAST_FM;

const errorMessage = 'Something did not go well, review your inputs'

const getSearchMethod = (type) => {
    switch (type) {
        case 'artist':
        case 'track':
        case 'album':
            return `${type}.search`;

        default:
            throw new Error(errorMessage);
    }
}

const getURL = (type, method, value) => {

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

const getSearchProperty = (value) => {

    switch (value) {
        case 'artist':
            return 'artistmatches';

        case 'track':
            return 'trackmatches';

        case 'album':
            return 'albummatches';

        default:
            throw new Error(errorMessage)
    }

}

module.exports = {
    getSearchMethod,
    getURL,
    getSearchProperty
}