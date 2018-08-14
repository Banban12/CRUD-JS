
var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM items ORDER BY id DESC',function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('item/list', {
                    title: 'Item List', 
                    data: ''
                })
            } else {
                res.render('item/list', {
                    title: 'Item List', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/add', function(req, res, next){	
	// render to views/user/add.ejs
	res.render('item/add', {
		title: 'Add New Item',
		id: '',
		name: '',
        qty: '',
        amount: ''		
	})
})



module.exports = app