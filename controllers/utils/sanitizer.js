const { getBio } = require('./requests/bio');
const { getTopSongs } = require('./requests/topSongs');
const { isRepeated } = require('./validationUtils');

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
        model['url'] = object.url;
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

const getOutput = async (input, type, methods) => {

    const output = [];

    for (let index = 0; index < input.length; index++) {


        if (isRepeated(output, input[index].name)) {
            continue;
        }

        const selected = await getObject(input[index], type, methods);

        const isArtist = type === 'artist' ? true : false;

        selected['isArtist'] = isArtist;

        if (!selected.corrupt)
            output.push(selected);

    }

    return output;
}

module.exports = {
    getOutput
}
