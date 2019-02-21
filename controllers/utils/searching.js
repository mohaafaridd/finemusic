const lastfm = process.env.LAST_FM;
const axios = require('axios');

const errorMessage = 'Something did not go well, review your inputs'

/* Parameters Order */
/* 1. Type */
/* 2. Method */
/* 3. Value */
/* 4. Others */


const getSearchMethod = (type) => {
    switch (type) {
        case 'artist':
        case 'track':
        case 'album':
            return [
                `${type}.search`,
                `${type}.getInfo`,
                `${type}.getTopTracks`
            ];

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

const getBio = async (type, method, value, artist) => {
    value = value.replace(/\s/g, "+");
    console.log(value);

    let params = getParams(type, method, value);

    if (artist) {
        params += `&artist=${artist}`;
    }

    const URL = getURL(params, 1);
    try {
        const results = await axios.get(URL);

        let bio;
        //console.log(URL);
        if (artist) {
            bio = results.data[`${type}`].wiki.summary;
        } else {
            bio = results.data[`${type}`].bio.summary;
        }

        let startPosition = bio.indexOf('<a');

        bio = bio.replace(bio.slice(startPosition), '');

        if (bio.length > 100) {

            startPosition = bio.indexOf('.', 100);
            bio = bio.replace(bio.slice(startPosition), '');
        }

        return bio;

    } catch (error) {
        return 'Error Getting Bio, Sorry.'
    }

}

const getTopSongs = async (type, method, value) => {
    value = value.replace(/\s/g, "+");
    let params = getParams(type, method, value);
    const URL = getURL(params, 3);
    const topSongsRequest = await axios(URL);
    
    try {
        const topSongs = topSongsRequest.data.toptracks.track;
        const topSongsArr = [];
        topSongs.forEach(song => {
            topSongsArr.push({
                name: song.name,
                url: song.url
            });
        });

        console.log(topSongsArr);
        return topSongsArr;    
    } catch (error) {
        return [];
    }
    
};

module.exports = {
    getSearchMethod,
    getParams,
    getURL,
    getSearchProperty,
    getBio,
    getTopSongs
}