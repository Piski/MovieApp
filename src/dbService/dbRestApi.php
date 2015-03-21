<?php

require('Slim/Slim.php');
require_once('medoo.min.php');


$app = new Slim();
$app->get('/movie/:id', 'getMovie');
$app->get('/movies', 'getMovies');
$app->post('/add_movie/:title/:actors/:plot/:poster/:rating/:genres', 'addMovie');
$app->put('/update_movie/:id/:title/:actors/:plot/:poster/:rating/:genres', 'updateMovie');
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
    $movie = $database->select('movies', [
        'id',
        'title',
        'plot',
        'poster',
        'rating'
    ]);

    $actors = $database->select("actor", [
        "[>]movie_actors" => ["id" => "aid"],
    ], [
        "actor.name"
    ]);
    
    $genres = $database->select("genres", [
        "[>]movie_genre" => ["id" => "gid"],
    ], [
        "genres.genre"
    ]);
    
    
    $data = array_merge($movie, $actors, $genres);
    //var_dump($data);
    echo json_encode($data);
}

/*
 *  ADD MOVIE
 */

function addMovie($title, $actors, $plot, $poster, $rating, $genres) {
    $actor = explode(', ', $actors);
    $genre = explode(', ', $genres);
    $poster = urldecode($poster);
    $newMovie = false;
    $database = dbConnection();
    if(!$database->has("movies", ["title" => $title])) {
        $database->insert("movies", [
            "title" => $title,
            "plot" => $plot,
            "poster" => $poster,
            "rating" => $rating
        ]);
        $newMovie = true;
    };

    foreach($actor as $name) {
        if(!$database->has("actor", ["name" => $name])) {
            $database->insert("actor", [
                "name" => $name
            ]);
        };
    };
    foreach($genre as $name) {
        if(!$database->has("genres", ["genre" => $name])) {
            $database->insert("genres", [
                "genre" => $name
            ]);
        };
    };
    
    
    
    if($newMovie) {
        $movie_id = $database->get('movies', [
            'id'
        ],[
            "title" => $title
        ]);
        
        foreach($actor as $name) {
            $actor_id = $database->get('actor', [
                'id'
            ],[
                "name" => $name
            ]);
            $database->insert("movie_actors", [
                "mid" => $movie_id['id'],
                "aid" => $actor_id['id']
            ]);
        };

    
    
        foreach($genre as $name) {
            $genre_id = $database->get('genres', [
                'id'
            ],[
                "genre" => $name
            ]);
            $database->insert("movie_genre", [
                "mid" => $movie_id['id'],
                "gid" => $genre_id['id']
            ]);
        };
    };
    
    
    
    

    /*
     * TODO: make sure that not adding duplicates to movie_actors and movie_genre
     */
    
    /*
     * TODO: ...
     */
}

/*
 * UPDATE MOVIE
 */

function updateMovie($id, $title, $actors, $plot, $poster) {
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
        'database_name' => 'movieapp',
        'server' => 'localhost',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8'
    ]);
    return $database;
}
