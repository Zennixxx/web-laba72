$(document).ready(function () {
    function loadCharacters(sortBy = '') {
        $.ajax({
            url: 'http://lab.vntu.org/api-server/lab7.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (sortBy === 'name') {
                    data.sort((a, b) => a.name.localeCompare(b.name));
                } else if (sortBy === 'affiliation') {
                    data.sort((a, b) => a.affiliation.localeCompare(b.affiliation));
                }

                $('#characters-table tbody').empty();

                $.each(data, function (index, character) {
                    $('#characters-table tbody').append(`
                        <tr>
                            <td>${character.name}</td>
                            <td>${character.affiliation}</td>
                            <td>${character.rank}</td>
                            <td>${character.location}</td>
                        </tr>
                    `);
                });
            },
            error: function () {
                alert('Не вдалося завантажити дані.');
            }
        });
    }

    loadCharacters();

    $('#refresh-button').on('click', function () {
        loadCharacters();
    });

    $('#sort-name').on('click', function () {
        loadCharacters('name');
    });

    $('#sort-affiliation').on('click', function () {
        loadCharacters('affiliation');
    });
});
