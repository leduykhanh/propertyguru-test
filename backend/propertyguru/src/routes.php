<?php
require_once __DIR__ . '/functions/parse-file.php';
use Slim\Http\Request;
use Slim\Http\Response;

// Routes
//there is only one route for this demo
$app->post('/data', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    $this->logger->info("request route /data");
    $this->logger->info(print_r($data, true));

    $request_data = [];
    $return_data = array("data" => []);
    $request_data['path'] = filter_var($data['path'], FILTER_SANITIZE_STRING);
    $request_data['start_index'] = filter_var($data['startIndex'], FILTER_SANITIZE_STRING);
    $request_data['page_size'] = filter_var($data['pageSize'], FILTER_SANITIZE_STRING);
    $request_data['is_first_call'] = filter_var($data['isFirstCall'], FILTER_SANITIZE_STRING);

    if(!$request_data['path']){
      throw new Exception("path is required");
    }

    $return_data["data"] = parse_file($request_data['path'], $request_data['start_index'], $request_data['page_size']);

    if ($request_data['is_first_call']) {
      $return_data["lineCount"] = get_line_count($request_data['path']);
    }
    
    return $response->withJSON(
        $return_data,
        200,
        JSON_UNESCAPED_UNICODE
    );

});
