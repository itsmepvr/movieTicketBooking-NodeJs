var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let movieSchema = new Schema( {
	unique_id: Number,
	movieName:{
        type: String,
        required: true
    },
    nested: [{
        hallName: {
            type: String
        },
        showTimings: {
            type: String
        },
        availableSeats: {
            type: [Number]
        }
    }]
});

movieModel = mongoose.model('Movies', movieSchema, 'movies');

module.exports = movieModel;