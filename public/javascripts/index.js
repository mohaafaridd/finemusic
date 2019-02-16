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

const alert = `<div class="alert alert-danger alert-dismissible" role="alert">
<strong>Alert!</strong> <span>Enter some text to search for.</span>
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
</button>
</div>`

$('#search-btn').click(function (e) {

    const searchValue = $('#search-value').val();

    if (!searchValue.trim()) {

        e.preventDefault();

        $('.alert').alert('close');

        $('body').append(alert);

        $('.alert').alert();

    }

});