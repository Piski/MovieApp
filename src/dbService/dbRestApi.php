<?php

require('Slim/Slim.php');
require_once('medoo.min.php');


$app = new Slim();
$app->get('/movie/:id', 'getMovie');
$app->get('/movies', 'getMovies');
$app->post('/add_movie/:title/:actors/:plot/:poster', 'addMovie');
$app->put('/update_movie/:id/:title/:actors/:plot/:poster', 'updateMovie');
$app->delete('/delete_movie/:id', 'deleteMovie');
$app->run();


function getMovie($id) {
    $database = dbConnection();
    $data = $database->get('movies', [
        'title',
        'actors',
        'plot',
        'poster'
    ],[
        "id" => $id
    ]);
    echo json_encode($data);
}

function getMovies() {
    $database = dbConnection();
    $data = $database->select('movies', [
        'id',
        'title',
        'actors',
        'plot',
        'poster'
    ]);
    echo json_encode($data);
}

function addMovie($title, $actors, $plot, $poster) {
    $poster = urldecode($poster);
    $database = dbConnection();
    $database->insert("movies", [
        "title" => $title,
        "actors" => $actors,
        "plot" => $plot,
        "poster" => $poster
    ]);
}

function updateMovie($id, $title, $actors, $plot, $poster) {
    $poster = decapsulateUrl($poster);
    $database = dbConnection();
    $database->update("movies", [
        "title" => $title,
        "actors" => $actors,
        "plot" => $plot,
        "poster" => $poster
    ], [
        "id" => $id
    ]);
}

function deleteMovie($id) {
    $database = dbConnection();
    $database->delete("movies", [
        "id" => $id
    ]);
}

function dbConnection() {
    $database = new medoo([
        'database_type' => 'mysql',
        'database_name' => 'MovieApp',
        'server' => 'localhost',
        'username' => 'root',
        'password' => 'eskimo',
        'charset' => 'utf8'
    ]);
    return $database;
}
