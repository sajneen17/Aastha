const bcrypt = require("bcryptjs");
const db = require("../config/dbconfig");
const alert = require("alert");


exports.login=async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    if(req.body.email===''||req.body.password===''){
         return res.status(400).render('pages/login');
    
    }

    db.query("SELECT * FROM `users` WHERE email=?",[email],async (err,result)=>{

        if(err){
            return res.status(400).send({
                msg:err
            })
        }
        console.log(result.length);
        //check whether the user with that email exists or not.
            //0 means doesn't exist.
        if(result.length===0){
            return res.status(401).send({
                msg:'email is incorrect'
            })
            }
           //check password
           const isMatch = await bcrypt.compare(password , result[0].password);
           console.log(result[0].password);
        //    console.log(password);
        //    console.log(isMatch);
           
            if(isMatch===false){
                return res.status(401).render('pages/login',{
                // msg:"Password is incorrect "
                    alert : alert('NOT success')
                })
            }else{
            return res.status(200).render('pages/home',{
                // msg:"logged in successfully",
                alert : alert('success'),
                // user:result[0]
            })
        }
    })

}

  
exports.register = async(req, res) => {
    // get data from registraion form
    const { f_name,l_name, email, password, passwordConfirm , number } = req.body;
    // console.log(req.body);
    db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                return res.send({
                    message: 'The email is already in use'
                })
            } else if (password != passwordConfirm) {
                return res.send({
                    message: 'Password dont match'
                });
            }
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        // console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { f_name: f_name,l_name:l_name, email: email, password: hashedPassword, number:number },(err, results) => {
            if (err) {
                console.log(err);
            } else {
                return res.render('pages/login', {
                    // message: 'User registered'
                });
            }
        })
    })
    // res.send("Form submitted");
}

// exports.isLoggedIn = async (req, res, next) => {
    
//     try {
//             // 1. Verify the token
//         const decoded = await promisify(jwt.verify)(req.cookies.userSave,
//             key
//         );
//             console.log(decoded);

//             // 2. Check if the user still exist
//             db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
//             console.log(results);
//             if (!results) {
//                 return next();
//             }
//             req.user = results[0];
//            return next();
//         });
//     } catch (err) {
//             console.log(err)
//             return next();
//     }
// } 
// exports.logout = (req, res) => {
//     res.cookie('userSave', 'logout', {
//         expires: new Date(Date.now() + 2 * 1000),
//         httpOnly: true
//     });
//     res.status(200).redirect("/");
// }

// router.post('/authentication', function(req, res, next) {
//     var email = req.body.email;
//     var password = req.body.password;
//     connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
//     if(err) throw err
//     // if user not found
//     if (rows.length <= 0) {
//     req.flash('error', 'Please correct enter email and Password!')
//     res.redirect('/login')
//     }
//     else { // if user found
//     // render to views/user/edit.ejs template file
//     req.session.loggedin = true;
//     req.session.name = name;
//     res.redirect('/home');
//     }            
//     })
//     })

