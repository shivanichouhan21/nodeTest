const db = require("../models");
const Tutorial = db.tutorials;
const director = db.imdb_director
const Imdb_movies = db.Imdb_movies
const Imdb_actor_movies = db.imdb_actor_role
const Director_genere = db.director_generes
const movies_directors = db.movies_directors
const movie_genre = db.movies_genre

exports.findAllMovies = (req, res) => {
    //     const title = req.query.title;
    //     var condition = title ? { title: { [Op.like]: ‘% ${ title }%’
    // }}: null;

    Imdb_movies.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error have occurred when retrieving the tutorials."
        });
    });
};



exports.findAllMoviesByPagination = (req, res) => {
    let limit = 10;   // number of records per page
    let offset = 0;
    Imdb_movies.findAndCountAll()
        .then((data) => {
            let page = req.query.page;
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            Imdb_movies.findAll({
                // attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
                limit: limit,
                offset: offset,
                $sort: { id: 1 }
            })
                .then((users) => {
                    res.status(200).json({ 'result': users, 'count': data.count, 'pages': pages });
                });
        })
        .catch(function (error) {
            res.status(500).send('Internal Server Error');
        });
};

// director.belongsToMany(director, { through: movies_directors });
// Imdb_movies.belongsToMany(Imdb_movies, { through: movies_directors });
// (director as a).belongsToMany(Server, { through: 'Server_User' });
// (director as a).belongsToMany(User, { through: 'Server_User' });
exports.findAlldirector = (req, res) => {
    let limit = 10;   // number of records per page
    let offset = 0;
    movies_directors.findAll({
        // where: {},
        model: Imdb_movies,
        include: [{
            model: Imdb_movies,
            as:"imdb_movies"
            }
          ]  
      }).then((data) => {
            
            console.log("*********************\n\n\n\n\n",data);
            res.send(data)
      });

    // Imdb_movies.findAndCountAll()
    //     .then((data) => {
    //         let page = req.query.page;
    //         let director = req.query.director      // page number
    //         let pages = Math.ceil(data.count / limit);
    //         offset = limit * (page - 1);
    //         Imdb_movies.findAll({
    //             // attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
    //             limit: limit,
    //             offset: offset,
    //             $sort: { id: 1 }
    //         })
    //             .then((users) => {
    //                 res.status(200).json({ 'result': users, 'count': data.count, 'pages': pages });
    //             });
    //     })
    //     .catch(function (error) {
    //         res.status(500).send('Internal Server Error');
    //     });
};



exports.Actors_list = (req, res) => {
    let limit = 10;   // number of records per page
    let offset = 0;
    movies_directors.findAll({
        where: {},
        include: [{
            model: 'imdb_movies',
            where: {}
        }]
      }).then((data) => {
            
            console.log("*********************\n\n\n\n\n",data);
            res.send(data)
      });

    // Imdb_movies.findAndCountAll()
    //     .then((data) => {
    //         let page = req.query.page;
    //         let director = req.query.director      // page number
    //         let pages = Math.ceil(data.count / limit);
    //         offset = limit * (page - 1);
    //         Imdb_movies.findAll({
    //             // attributes: ['id', 'first_name', 'last_name', 'date_of_birth'],
    //             limit: limit,
    //             offset: offset,
    //             $sort: { id: 1 }
    //         })
    //             .then((users) => {
    //                 res.status(200).json({ 'result': users, 'count': data.count, 'pages': pages });
    //             });
    //     })
    //     .catch(function (error) {
    //         res.status(500).send('Internal Server Error');
    //     });
};