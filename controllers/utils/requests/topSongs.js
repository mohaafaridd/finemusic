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
