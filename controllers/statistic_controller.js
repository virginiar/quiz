var models = require('../models/models.js');

// GET /quizes/statistics
exports.show = function(req, res) {
	var statistics = {
    quizes : 0,
    comments : 0,
    withComments : 0,
    nonComments : 0
  };

	// Número total de preguntas
	models.Quiz.count()
    .then(function(numQuizes) {
		  statistics.quizes = numQuizes;
      return models.Comment.count();
    })
    .then(function(numComments) {
      statistics.comments = numComments;
      return models.Quiz.count({distinct: true, include :
        [{model: models.Comment, required: true}]});
    })
    .then(function(withComments) {
      statistics.withComments = withComments;
      statistics.nonComments = statistics.quizes - withComments;
      res.render('quizes/statistics', {stats : statistics, errors : [] });
  }).catch(function(error) { next(error);});
};
