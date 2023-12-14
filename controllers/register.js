const handleRegister = (req, res, db, bcrypt)=>{
	const { email,name,password } = req.body;
	if (!email || !name || !password){
		return res.status(400).json('insorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(logInEmail=>{
			return trx('users')
	           .returning('*')
	           .insert({
	             name: name,
	             email: logInEmail[0].email,
	             joined: new Date()
        })
	.then(user =>{
	res.json(user[0]);
		})
	})
	.then(trx.commit)
	.catch(trx.rollback)
 })	
	.catch(err => res.status(400).json('unable to register'))
}
module.exports = {
handleRegister:handleRegister
};