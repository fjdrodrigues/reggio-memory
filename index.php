<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Reggio Emilia</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="frontend/favicon.ico">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body style="margin: 0; background-color: lightcyan;"></body>
<?php

include_angular_app();
function include_angular_app() {
        echo "<app-root></app-root>";
        echo "<script src=\"frontend/polyfills-es5.js\" nomodule defer></script>";
        echo "<script src=\"frontend/polyfills-es2015.js\" type=\"module\"></script>";
        echo "<script src=\"frontend/runtime-es2015.js\" type=\"module\"></script>";
        echo "<script src=\"frontend/main-es2015.js\" type=\"module\"></script>";
        echo "<script src=\"frontend/runtime-es5.js\" nomodule defer></script>";
        echo "<script src=\"frontend/main-es5.js\" nomodule defer></script>";
        echo "<script src=\"frontend/vendor-es2015.js\" type=\"module\"></script>";
        echo "<script src=\"frontend/styles-es2015.js\" type=\"module\"></script>";
        echo "<script src=\"frontend/vendor-es5.js\" nomodule defer></script>";
        echo "<script src=\"frontend/styles-es5.js\" nomodule defer></script>";
}
?>
</html>