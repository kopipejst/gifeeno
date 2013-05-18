<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>camera capture to gif</title>
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
            <video autoplay></video>
            <div id="indicator"></div>
        </div>

        <button class="button" id="start">
            Start
        </button>

    </div>

    <canvas width="320" height="240" style="display: none;"></canvas>


    <div id="note">
        <b>Please note:</b>
        <p>
            Gifeeno is Web Camera API experiment and will work only in modern browsers like Google Chrome.
        </p>

        <p>
            This is open source project, so feel free to fork on GitHub.
        </p>
    </div>

    
    <div id="footer">
        &copy; Copyright 2013, Gifeeno<br />
        Created by <a href="#">Ivan Lazarevic</a> and <a href="#">Jovan Stojanovic</a>
    </div>



    <div id="overlay-bg"></div>
    <div id="overlay">
        
        <div id="result-gif"></div>
        <p>
            Right click on image and "Save Image As" to save image on your computer.
        </p>

        <p>
            Due to storage limitation saving images on server is not possible at the moment.
        </p>
        <button class="button disabled" id="save">
            Save Image
        </button>

        or

        <button class="button" id="new">
            Create New
        </button>

        <span id="url"></span>
    </div>


    <script src="javascripts/LZWEncoder.js"></script>
    <script src="javascripts/NeuQuant.js"></script>
    <script src="javascripts/GIFEncoder.js"></script>
    <script src="javascripts/b64.js"></script>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

    <script src="javascripts/gifeeno.js"></script>



</body>
</html>