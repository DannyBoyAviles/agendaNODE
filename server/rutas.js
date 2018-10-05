const Router = require('express').Router();
const Users = require('./models/user.model')
const Events = require('./models/events.model')
//var Operaciones = require('./CRUD.js')
//-----------------logear usuario

Router.get('/import',function(req,res){
    const u = new Users({
        _id: new mongoose.Types.ObjectId(),
        name:'NextU',
        password:'123',
        email:'nextu@email.com'
    });

    u.save(function(err,response){
        if(err){
            console.log(`Hubo un error ${err}`)
            res.end()
        }else{
            console.log(`Registro exitoso ${response}`)
            res.send('OK')
            res.end()
        }
    })
   
});

Router.post('/login', function(req, res) {  
    pass = req.body.pass
    user = req.body.user
    req.session.user = user

	Users.find({email:user,password:pass}, function(err, doc){
		if (err) {
        	res.status(500)
        	res.json(err)
    	}
    	console.log(doc);
    	if(doc!=""){
            res.send("Validado");
    	}else{
    		res.send('Negado');
    	}
    });

/*
    Users.findOne({email:user}, function(err, result) {
        if (err) throw err;
        // test a matching password
        result.comparePassword(pass, function(err, isMatch) {
            if (err) throw err;
            console.log(pass, isMatch, req.session.user); // -> Password: true/false
            if(isMatch) {
                res.send('Validado')
                console.log(result._id);
            }else {
                res.send('Negado')
            }
        });      
    });
*/
})

Router.get('/main',function(req,res){
    if (req.session.user){
        res.send('true')
    }else{
        res.send('false')
    }
});

Router.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            res.negotiate(err);
        }
        res.send('closed')
    })
})

Router.post('/events/new', function(req,res){

    Users.findOne({}).exec(function(error, result){
        if(error){
            console.log(error);
        }else if(result){
            userId=(result._id);  
            let event = new Events({
                _id : new mongoose.Types.ObjectId(),
                title: req.body.title,
                start: req.body.start,
                end: req.body.end,
                userId:userId
            })
                event.save(function(err,response){
                    if(err){
                        res.json(`Hubo un error ${err}`)
                        console.log(`Hubo un error ${err}`)   
                    }else{
                        res.status(200)
                        res.json('Registro exitoso')
                        console.log(`Registro exitoso ${response}`)
                    }
                })
            
        }
    })
})

Router.get('/all', function(req, res){
    if (req.session.user){
        colorEvento = "#" + (Math.round(Math.random() * 0XFFFFFF)).toString(16);
        Events.find({},{"_id":1,"title":1,"start":1,"end":1, "color":colorEvento}).exec(function(err,docs){
            if(err){
                res.status(500)
                res.json(err)
            }
            res.json(docs)
        });
    }else{
        console.log('noLOGIN');
        res.send('noLOGIN')
    }
})

Router.post('/events/update', function(req, res){
    eventId = req.body.id
    let evento=new Events({
		start:req.body.start,
		end:req.body.end
    });
	Events.update({_id:eventId},evento,function(error){
		if(error){
			res.status(500)
			res.json(error)
		}
		res.send("Evento Actualizado")
    })
})

Router.post('/events/delete', function(req, res) {
    eventId = req.body.id
    console.log(eventId);    
    Events.remove({_id: eventId}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})

module.exports = Router



























/* Router.post('/login', function(req,res){
    
    Users.find({}, function(error, usuarios){
        res.send(usuarios)
        console.log(usuarios);   
    })  
   
   Events.find({}).exec(function(err, docs) {
    if (err) {
        res.status(500)
        res.json(err)
    }
    res.json(docs)
    console.log(docs);    
  })
 })
*/



/*
//Obtener todos los usuarios
Router.get('/all', function(req, res) {
    Users.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})
// Obtener un usuario por su id
Router.get('/', function(req, res) {
    let nombre = req.query.nombre
    Users.findOne({nombres: nombre}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(doc)
    })
})
// Agregar a un usuario
Router.post('/new', function(req, res) {
    let user = new Users({
        userId: Math.floor(Math.random() * 50),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        sexo: req.body.sexo,
        estado: "Activo"
    })
    user.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})
// Eliminar un usuario por su id
Router.get('/delete/:id', function(req, res) {
    let uid = req.params.id
    Users.remove({userId: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})
// Inactivar un usuario por su id
Router.post('/inactive/:id', function(req, res) {
})
// Activar un usuario por su id
Router.post('/active/:id', function(req, res) {
})
*/

