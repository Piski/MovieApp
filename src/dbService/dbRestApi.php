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
        'id',
        'title',
        'plot',
        'poster',
        'rating'
    ],[
        'id' => $id
    ]);

    $actors = $database->select("actor", [
        "[>]movie_actors" => ["id" => "aid"],
    ], [
        "actor.name"
    ],[
        "movie_actors.mid" => $id
    ]);

    $genres = $database->select("genres", [
        "[>]movie_genre" => ["id" => "gid"],
    ], [
        "genres.genre"
    ],[
        "movie_genre.mid" => $id
    ]);

    $data["actors"] = toString($actors);
    $data["genres"] = toString($genres);

    echo json_encode($data);
}

/*
 * GET ALL MOVIES
 */

function getMovies() {
    $database = dbConnection();
    $ids = $database->select("movies",[
        "id"
    ]);
    foreach($ids as $i=>$id) {
        $data[$i] = $database->get('movies', [
            'id',
            'title',
            'plot',
            'poster',
            'rating'
        ],[
            'id' => $id
        ]);

        $actors = $database->select("actor", [
            "[>]movie_actors" => ["id" => "aid"],
        ], [
            "actor.name"
        ],[
            "movie_actors.mid" => $id
        ]);

        $genres = $database->select("genres", [
            "[>]movie_genre" => ["id" => "gid"],
        ], [
            "genres.genre"
        ],[
            "movie_genre.mid" => $id
        ]);

        $data[$i]["actors"] = toString($actors);
        $data[$i]["genres"] = toString($genres);
    }
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
}

/*
 * UPDATE MOVIE
 */

function updateMovie($id, $title, $actors, $plot, $poster, $rating, $genres) {
    $actor = explode(', ', $actors);
    $genre = explode(', ', $genres);
    $poster = urldecode($poster);
    $newActor = false;
    $newGenre = false;
    $database = dbConnection();
    
    /*
     * UPDATE MOVIES TABLE
     */
    
    $database->update("movies", [
        "title" => $title,
        "plot" => $plot,
        "poster" => $poster,
        "rating" => $rating
    ],[
        "id" => $id
    ]);
    
    /*
     * IF NEW GENRE OR ACTOR. DO NOT DELETE ACTORS BECAUSE HE MIGHT BE ON MORE THAN ONE FILM
     */
    foreach($actor as $name) {
        if(!$database->has("actor", ["name" => $name])) {
            $database->insert("actor", [
                "name" => $name
            ]);
            $newActor = true;
        };
    };
    foreach($genre as $name) {
        if(!$database->has("genres", ["genre" => $name])) {
            $database->insert("genres", [
                "genre" => $name
            ]);
            $newGenre = true;
        };
    };
    
    if($newActor) {
        $database->delete("movie_actors", [
            "mid" => $id
        ]);
        foreach($actor as $name) {
            $actor_id = $database->get('actor', [
                'id'
            ],[
                "name" => $name
            ]);
            $database->insert("movie_actors", [
                "mid" => $id,
                "aid" => $actor_id['id']
            ]);
        };
    };
    
    if($newGenre) {
        $database->delete("movie_genre", [
            "mid" => $id
        ]);
        foreach($genre as $name) {
            $genre_id = $database->get('genres', [
                'id'
            ],[
                "genre" => $name
            ]);
            $database->insert("movie_genre", [
                "mid" => $id,
                "gid" => $genre_id['id']
            ]);
        };
    };
};

/*
 * DELETE MOVIE
 */

function deleteMovie($id) {
    $database = dbConnection();
    $database->delete("movie_actors", [
        "mid" => $id
    ]);
    $database->delete("movie_genre", [
        "mid" => $id
    ]);
    $database->delete("movies", [
        "id" => $id
    ]);
};

function dbConnection() {
    $database = new medoo([
        'database_type' => 'mysql',
        'database_name' => 'movieapp',
        'server' => 'localhost',
        'username' => 'root',
        'password' => 'eskimo',
        'charset' => 'utf8'
    ]);
    return $database;
};

function toString($data) {
    $out = array();
    foreach($data as $y=>$x) {
        foreach($x as $j=>$i) {
            array_push($out, $i);
        };
    };
    return implode(', ', $out);
};
