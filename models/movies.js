var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let hallSchema = new Schema({
    hallName: {
        type: String
    },
    showTimings: {
        type: String,
        default: []
    },
    availableSeats: {
        type: [Number],
        default: []
    }
});

let movieSchema = new Schema( {
	unique_id: Number,
	movieName:{
        type: String,
        required: true
    },
    cinemaHall: {
        type: Map,
        of: hallSchema,
        required: true
    }
});

movieModel = mongoose.model('Movies', movieSchema, 'movies');

module.exports = movieModel;