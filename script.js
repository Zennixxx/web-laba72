$(document).ready(function () {
    // Функція для завантаження даних з API
    function loadCharacters(sortBy = '') {
        $.ajax({
            url: 'http://lab.vntu.org/api-server/lab7.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Якщо передано параметр сортування, сортуємо відповідно
                if (sortBy === 'name') {
                    data.sort((a, b) => a.name.localeCompare(b.name));
                } else if (sortBy === 'affiliation') {
                    data.sort((a, b) => a.affiliation.localeCompare(b.affiliation));
                }

                // Очищуємо таблицю перед завантаженням нових даних
                $('#characters-table tbody').empty();

                // Проходимо по масиву персонажів і додаємо їх до таблиці
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
