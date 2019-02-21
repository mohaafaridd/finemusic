const getObject = (object) => {

    return {
        name: object.name,
        image: getBestImage(object.image)
    }

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