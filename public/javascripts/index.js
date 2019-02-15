$('select').change(function (e) {

    const val = $(this).val();

    const placeholder = function (value) {
        switch (value) {
            case 'artist':
                return 'Ariana Grande';

            case 'track':
                return 'Hotel California';

            case 'album':
                return 'Evolve';

            default:
                throw new Error('You can not do this');
        }

    };

    $("#search-value").attr('placeholder', placeholder(val));

});