
var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM items ORDER BY id DESC',function(err, rows, fields) {
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
	res.render('item/add', {
		title: 'Add New Item',
		id: '',
		name: '',
        qty: '',
        amount: ''		
	})
})

// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('id', 'ID is required').notEmpty()           
	req.assert('name', 'Nam is required').notEmpty()             
    req.assert('qty', 'QTY is required').notEmpty()  
    req.assert('amount', 'Amount is required').notEmpty()  

    var errors = req.validationErrors()
    
    if( !errors ) {  
		
	
		var user = {
			id: req.sanitize('id').escape().trim(),
			name: req.sanitize('name').escape().trim(),
            qty: req.sanitize('qty').escape().trim(),
            amount: req.sanitize('amount').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO items SET ?', user, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					
					res.render('item/add', {
						title: 'Add New User',
						id: user.id,
						name: user.name,
                        qty: user.qty,
                        amount: user.amount					
					})
				} else {				
					req.flash('success', 'Data added successfully!')
					
					
					res.render('item/add', {
						title: 'Add New User',
						id: '',
						name: '',
                        qty: '',
                        amount: ''					
					})
				}
			})
		})
	}
	else {  
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		
        res.render('item/add', { 
            title: 'Add New User',
            id: req.body.id,
            name: req.body.name,
            qty: req.body.qty,
            amount: req.body.amount
        })
    }
})




module.exports = app