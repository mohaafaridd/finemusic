const { getBio } = require('./requests/bio');
const { getTopSongs } = require('./requests/topSongs');

const getObject = async (object, type, method) => {

    const model = {
        name: object.name,
        image: getBestImage(object.image)
    }

    if (!model.image) {
        model.corrupt = true;
    }

    if (type === 'artist') {

        model['bio'] = await getBio(type, method[1], model);
        model['songs'] = await getTopSongs('artist', method[2], model);

    }

    else {

        model['artist'] = object.artist;
        model['bio'] = await getBio(type, method[1], model, model['artist']);

    }

    return model
}

const getBestImage = (array) => {
    array = array.reverse();
    let image;
    array.forEach(element => {
        if (!image) {
            image = element['#text'];
        }
    });

    return image;
}

module.exports = {
    getObject
}