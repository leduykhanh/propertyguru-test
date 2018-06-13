<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);
// get the app's di-container
$c = $app->getContainer();
$c['errorHandler'] = function ($c) {
    return function ($request, $response, $error) use ($c) {
        return $c['response']
                ->withHeader("Access-Control-Allow-Methods", 'POST, GET, OPTIONS')
                ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
                ->withHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Accept, Origin, Authorization, X-Requested-With")
                ->withJSON(
                    array("message" => $error->getMessage()),
                    400,
                    JSON_UNESCAPED_UNICODE
                );
    };
};

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';

// Register middleware
require __DIR__ . '/../src/middleware.php';

// Register routes
require __DIR__ . '/../src/routes.php';

// Run app
$app->run();
