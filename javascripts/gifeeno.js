/*global GIFEncoder,encode64*/
var encoder = new GIFEncoder(),
    video = document.querySelector('video'),
    canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    localMediaStream = null,
    snapshotPause = 1000,
    recording = true,
    framesPause = 200,
    maxFrames = 9,
    totalFrames = 0,
    t;

encoder.setSize(320, 240);
encoder.setRepeat(0);
encoder.setDelay(framesPause);
encoder.setQuality(20);

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({
            audio: true,
            video: true
        }, function (stream) {
            $('#start-image, #start-fake').hide();
            $('#video, #start').show();
            video.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
        }, function (e) {
            console.log('Error:', e);
        }
    );
} else {
    console.log('not supported');
}

function snapshot() {
    if (localMediaStream) {
        ctx.drawImage(video, 0, 0, 320, 240);
        encoder.addFrame(ctx);

        var image = $('<img />').attr('src', canvas.toDataURL('image/webp'));
        $('#thumbs').append(image);
        totalFrames++;
        if (totalFrames === maxFrames) {
            recordingEnd();
        }
    }
}

function recordingEnd() {
    var binaryGif = encoder.stream().getData(),
        dataUrl = 'data:image/gif;base64,' + encode64(binaryGif),
        gif = $('<img />').attr('src', dataUrl);

    totalFrames = 0;
    recording = !recording;

    $('#start').html('Start');
    clearInterval(t);
    $('#indicator').hide();

    encoder.finish();

    $('#result-gif').html('').append(gif);
    overlayShow('preview');
    //b64 = encode64(binaryGif);
}

function overlayShow(panel) {
    $('.panel').hide();
    $('#' + panel).show();
    $('#overlay-bg').show();
    $('#overlay').show();
}

function overlayHide() {
    $('#overlay-bg').hide();
    $('#overlay').hide();
}

$('#start').click(function () {

    if (recording) {

        recording = !recording;

        $('#thumbs-holder-close').show();
        $('#thumbs-holder').animate({
            'margin-left': '320px'
        }, 300);
        $('#thumbs').html('');
        encoder.start();

        $('#indicator').show().animate({
            width: '100%'
        }, snapshotPause, function () {
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

        recordingEnd();
    }

});




$('#thumbs-holder-close').click(function () {
    $(this).hide();
    $('#thumbs-holder').animate({
        'margin-left': 0
    }, 300);
});

$('#overlay-close').click(function () {
    overlayHide();
});

$('.new').click(function () {
    overlayHide();
});

$('#showSettings').click(function () {
    overlayShow('settings');
});

$('input[type=range]').change(function () {
    var id = $(this).attr('id'),
        val = $(this).val();
    $(this).next().html(val);
    window[id] = parseInt(val);
    if (id === 'framesPause') {
        framesPause = val;
        encoder.setDelay(framesPause);
    }
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

