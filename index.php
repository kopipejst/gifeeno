<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Gifeeno - Animated GIF creator</title>
    <meta description="Web Camera API experiment" />
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

    <div id="thumbs-holder">
        <div class="close" id="thumbs-holder-close"></div>
        <img src="img/your_funny_images.png" />
        <div id="thumbs"></div>

    </div>

    <div id="main-window">

        <div id="video-holder">
            <img src="img/start.gif" id="start-image" />
            <video autoplay id="video"></video>
            <canvas width="320" height="240" style="display: none;"></canvas>
            <div id="showSettings"></div>
            <div id="indicator"></div>
        </div>

        <button class="button" id="start">
            Start
        </button>

        <div class="share">
            Share: <a href="http://twitter.com/share?text=Use%20Web%20Camera%20API%20to%20Create%20Animated%20GIF%20%23gifeeno&url=http://gifeeno.workshop.rs" class="social twitter">&nbsp;</a> <a href="http://www.facebook.com/sharer.php?u=http://gifeeno.workshop.rs" class="social facebook">&nbsp;</a>
        </div>

    </div>

    <div id="note">
        <b>Please note:</b>
        <p>
            Gifeeno is Web Camera API experiment and works only in modern browsers such as Google Chrome.
        </p>
        <p>
            Unfortunately, due to limited storage space, saving on server is not possible at the moment.
        </p>
        <p>
            This is open source project, so feel free to fork on <a href="https://github.com/kopipejst/gifeeno">GitHub</a>.
        </p>
    </div>

    
    <div id="footer">
        Created by <a href="http://workshop.rs">Ivan Lazarevic</a> and <a href="http://www.jovanstojanovic.com">Jovan Stojanovic</a>
    </div>



    <div id="overlay-bg"></div>
    <div id="overlay">

        <div class="close" id="overlay-close"></div>

        <div id="preview" class="panel">

            <div id="result-gif"></div>
            <p>
                Right click on image and "Save Image As" to save image on your computer.
            </p>

            <p>
                Unfortunately, due to limited storage space, saving on server is not possible at the moment.
            </p>
            <button class="button disabled" id="save">
                Save Image
            </button>

            or

            <button class="button new">
                Create New
            </button>

            <span id="url"></span>

        </div>

        <div id="settings" class="panel">
            <h2>Settings</h2>
            Delay between snapshots (in miliseconds):<br /><br />
            <input type="range" min="500" max="5000" id="snapshotPause" value="2000" />
            <span class="value">2000</span>
            <br /><br />
            Delay between frames in animated gif (in miliseconds):<br /><br />
            <input type="range" min="100" max="1000" id="framesPause" value="200" />
            <span class="value">200</span>
            <br /><br /><br />
            <button class="button new">
                Create New
            </button>
        </div>

    </div>


    <script src="javascripts/LZWEncoder.js"></script>
    <script src="javascripts/NeuQuant.js"></script>
    <script src="javascripts/GIFEncoder.js"></script>
    <script src="javascripts/b64.js"></script>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

    <script src="javascripts/gifeeno.js"></script>

    <script type="text/javascript">
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
    document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
    try {
    var pageTracker = _gat._getTracker("UA-11860629-1");
    pageTracker._trackPageview();
    } catch(err) {}
    </script>

</body>
</html>