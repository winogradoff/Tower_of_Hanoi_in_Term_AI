$(function () {
    var intervalId;

    function start() {
        intervalId = window.setInterval(update, 1000);
    }

    function stop() {
        clearInterval(intervalId);
    }

    function update() {
        $.getJSON('/get_game_state')
            .done(function (json) {
                var board = $('.board');
                board.empty();
                $.each(json['board'], function (pyramidIndex, disks) {
                    console.log(pyramidIndex + ': ' + disks);
                    var pyramid = $('<div class="pyramid">');
                    $.each(disks, function (diskIndex, disk) {
                        pyramid.append('<div class="disk">' + disk + '</div>');
                    });
                    board.append(pyramid)
                });

                console.log(json['status']);

                // Выйти при победе
                if (json['status'] == "Win") {
                    stop();
                    alert("YOU WIN!")
                    return;
                }
            })
            .fail(function () {
                console.log("fail");
                stop();
            })
    }

    start();
});
