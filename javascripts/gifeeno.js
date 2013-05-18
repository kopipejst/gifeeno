/*global GIFEncoder,encode64*/
var encoder = new GIFEncoder(),
    video = document.querySelector('video'),
    canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    localMediaStream = null,
    snapshotPause = 1000,
    recording = false,
    t;

encoder.setSize(320, 240);
encoder.setRepeat(0);
encoder.setDelay(100);
encoder.setQuality(20);

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({
            audio: true,
            video: true
        }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
        }, function (e) {
            console.log('Error:', e);
        }
    );
} else {
    alert('not supported');
}

function snapshot() {
    if (localMediaStream) {
        ctx.drawImage(video, 0, 0, 320, 240);
        encoder.addFrame(ctx);

        var image = $('<img />').attr('src', canvas.toDataURL('image/webp'));
        $('#thumbs').append(image);
    }
}

function overlayShow() {
    $('#overlay-bg').show();
    $('#overlay').show();
}

function overlayHide() {
    $('#overlay-bg').hide();
    $('#overlay').hide();
}

$('#start').click(function () {

    recording = !recording;

    if (recording) {

        $('#thumbs-holder-close').show();
        $('#thumbs-holder').animate({
            'margin-left': '320px'
        }, 300);
        $('#thumbs').html('');
        encoder.start();

        $('#indicator').show().animate({
            width: '100%'
        }, snapshotPause, function  () {
            $('#indicator').css({
                'width': '0'
            });
        });

        t = setInterval(function () {

            snapshot();
            $('#indicator').animate({
                width: '100%'
            }, snapshotPause, function () {
                $('#indicator').css({
                    'width': '0'
                });
            });
        }, snapshotPause);

        $(this).html('Stop');

    } else {

        var binaryGif = encoder.stream().getData(),
            dataUrl = 'data:image/gif;base64,' + encode64(binaryGif),
            gif = $('<img />').attr('src', dataUrl);

        $(this).html('Start');
        clearInterval(t);
        $('#indicator').hide();

        encoder.finish();

        $('#result-gif').html('').append(gif);
        overlayShow();
        //b64 = encode64(binaryGif);
    }

});

$('#thumbs-holder-close').click(function () {
    $(this).hide();
    $('#thumbs-holder').animate({
        'margin-left': 0
    }, 300);
});

$('#new').click(function () {
    overlayHide();
});

// $('#save').click(function () {

//     $.ajax({
//         url: 'images/save.php',
//         method: 'POST',
//         data: {
//             image: b64
//         },
//         dataType: 'json',
//         success: function(data) {
//             var a = $('<a />').attr('href', "images/" + data.name).html('permalink');
//             $('#url').append(a);
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });


// });






