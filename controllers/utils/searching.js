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
    }

}

module.exports = {
    getSearchMethod,
    getSearchProperty
}