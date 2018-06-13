<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);
$app->add(function($request, $response, $next) {
    $route = $request->getAttribute("route");
    $methods = [];

    if (!empty($route)) {
        $pattern = $route->getPattern();

        foreach ($this->router->getRoutes() as $route) {
            if ($pattern === $route->getPattern()) {
                $methods = array_merge_recursive($methods, $route->getMethods());
            }
        }
    } else {
        $methods[] = $request->getMethod();
    }

    $response = $next($request, $response);


    return $response->withHeader("Access-Control-Allow-Methods", implode(",", $methods))
                    ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
                    ->withHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
});
