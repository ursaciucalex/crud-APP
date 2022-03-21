const userdb = require('../model/model');
const bcrypt = require("bcrypt");


const user_get_all = async (req, res) => {
    try{
        const data = await userdb.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

}
const user_get_byID = (req, res) => {
    const id = req.params.id;
    userdb.findById(id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
}
const user_create = async (req, res) => {
    const schema = new userdb(req.body);
    const salt = await bcrypt.genSalt(10);
    schema.password = await bcrypt.hash(schema.password, salt);
    schema.save()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
}

const user_delete = (req, res) => {
    const id = req.params.id;
    userdb.findByIdAndDelete(id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
}

const update_user =async (req, res) => {
    const schema = req.body;
    const id = req.params.id;
    if(schema.password)
        {
            const salt = await bcrypt.genSalt(10);
            schema.password = await bcrypt.hash(schema.password, salt);
        
        }
    userdb.findByIdAndUpdate(
        id, schema
    )
    .then(result => {
            res.status(200).send(result);
        })
        .catch(err =>{
            res.status(400).send(err);
        });
}

const login_user = async (req, res) => {
    const body = req.body;
    const user = await userdb.findOne({ mail: body.mail });
    if (user) {
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  };


module.exports = {
    user_get_all,
    user_get_byID,
    user_create,
    user_delete,
    update_user,
    login_user
}
