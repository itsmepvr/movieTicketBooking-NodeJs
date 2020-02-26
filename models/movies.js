var mongoose = require('mongoose');
var Schema = mongoose.Schema;

hallSchema = new Schema({
    hallName: {
        type: String
    },
    showTimings: {
        type: String
    },
    availableSeats: {
        type: String,
        default: []
    }
});

movieSchema = new Schema( {
	unique_id: Number,
	movieName:{
        type: String,
        required: true
    },
    cinemaHall: {
        type: Map,
        of: hallSchema
    }
});

movieModel = mongoose.model('Movies', movieSchema, 'movies');

module.exports = movieModel;