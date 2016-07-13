module.exports = function(express, bodyParser, callback){
	try{
		if(typeof express == 'undefined' || typeof bodyParser == 'undefined'){
			throw new Error("You must define parameters pointing to " +
				" express and body parser modules");
		}else{
			callback(null, {
				promoRouter: function(){
					var promoRouter = express.Router();
					promoRouter.use(bodyParser.json());
					promoRouter.route('/')
					.all(function(req, res, next){
						res.writeHead(200, {'Content-Type' : 'text/plain'});
						next();
					})
					.get(function(req, res, next){
						res.end('Will send all the promotions to you!');
					})
					.post(function(req, res, next){
						res.end('Will add the promotion' + 
							req.body.name + ' with details: ' + req.body.description);
					}).delete(function(req, res, next){
						res.end('Deleting all the promotions');
					});

					promoRouter.route('/:promotionId')
					.all(function(req, res, next){
						res.writeHead(200, {'Content-Type' : 'text/plain'});
						next();
					})
					.get(function(req, res, next){
						res.end('Will send details of the promotion: ' + req.params.promotionId + 'to you');
					})
					.put(function(req, res, next){
						res.write('Updating the promotion: ' + req.params.promotionId + '\n');
						res.end('Will update the promotion: ' + 
							req.body.name + ' with details ' + req.body.description);
					})
					.delete(function(req, res, next){
						res.end('Deleting promotion :' + req.params.promotionId);
					});

					return promoRouter;
				}
			});
		}
	}catch(error){
		callback(error,null);
	}

}
