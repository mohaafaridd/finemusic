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
