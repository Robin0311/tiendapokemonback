const Customer = require('../models/customerSchema')
const { msgFormatConst, resApi, msjPError, msjP } = require("../helpers/helpers");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getCustomers = async(req, res) => {

  try {
  const Customers = await Customer.find({})
  msgFormatConst("getCustomers");
  resApi(res, 'success', Customers)
  } catch {
  msjPError("Error en la consulta");
  }

};

const createCustomer = async (req, res) => {

  try {
    const { name, email, password } = req.body
    const salt = await bcryptjs.genSalt(10)
    const hasedPassword = await bcryptjs.hash(password, salt)
    const newCustomer = await Customer.create({
      name: name,
      email: email,
      password: hasedPassword
    })
    const payload = {
			user: {
				id: newCustomer._id,
			},
		}

		// 2. FIRMAR EL JWT
		jwt.sign(
			payload, // DATOS QUE SE ACOMPAÑARÁN EN EL TOKEN
			process.env.SECRET, // LLAVE PARA DESCIFRAR LA FIRMA ELECTRÓNICA DEL TOKEN,
			{
				expiresIn: 360000, // EXPIRACIÓN DEL TOKEN
			},
			(error, token) => {
				// CALLBACK QUE, EN CASO DE QUE EXISTA UN ERROR, DEVUELVA EL TOKEN
				if (error) throw error
				// res.json(respuestaDB)
				res.json({ token })
			}
		)
	} catch (error) {
		return res.status(400).json({
			msg: error,
		})
	}
  
};

const loginCustomer = async (req, res) => {
  const { email, password } = req.body
  try {
   
    let foundUser = await Customer.findOne({
      email: email
    })

    if (!foundUser) {
      return res.status(400).json({ msg : 'El cliente no esta resgistrado'})
    }

    const passSuccess = await bcryptjs.compare(password, foundUser.password)

    if (!passSuccess) {
      return await res.status(400).json({ msg : 'Password incorrecto'})
    }

    const payload = {
      user: {
        id: foundUser.id
      }
    }

    if(email && passSuccess){
      jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.TIME_TOKEN },
        (error, token) =>{
          if(error) throw error
          res.json({token: token})
        })
    }else {
			res.json({ msg: 'Hubo un error', error })
    }
  } catch (error){
    res.json({ msg: 'Hubo un error', error });
  }
}
  


const verificarCustomer = async (req, res) => {
	try {
		// CONFIRMAMOS QUE EL USUARIO EXISTA EN BASE DE DATOS Y RETORNAMOS SUS DATOS, EXCLUYENDO EL PASSWORD
		const customer = await Customer.findById(req.user.id).select('-password')
		res.json({ customer })
	} catch (error) {
		// EN CASO DE ERROR DEVOLVEMOS UN MENSAJE CON EL ERROR
		res.status(500).json({
			msg: 'Hubo un error',
			error,
		})
	}
}



const updateCustomers = async(req, res) => {
  try {
    const resp = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    
      return res.json({
        message: 'Customers updated successfully',
        detail: resp
      })
      
  } catch (e) {
    return res.json({
      message: 'Error',
      detail: e
    })
  }
};

const deleteCustomers = async(req, res) => {
  try {
    msjP("Delete product");
    const customers = await Customer.findByIdAndDelete(req.params.id);
    resApi(res, "success", customers);
  } catch {
    msjPError("Error Delete Product");
  }
};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomers,
  deleteCustomers,
  loginCustomer,
  verificarCustomer
};




// const loginCustomer = async (req, res) => {
  




// try {
//   msg("Logging in a user")
//   const user = await Customer.findOne({ email: req.body.email })
//   if (!user) {
//     return res.status(400).json({
//       message: "User not found"
//     })
//   }
//   if (!bcrypt.compareSync(req.body.password, user.password)) {
//     return res.status(400).json({
//       message: "Password is correct"
//     })
//   }
//   if (user.email && user.password) {
//     return res.status(400).json({
//       message: "password is incorrect"
//     })
//   }
//   if (user.email && user. password) {

//     jwt.sign(
//       {
//         user: {
//           id: user.id,
//         },
//       },
//       process.env.SECRET,
//       {
//         expiresIn: 60 * 60 *24
//       },
//       (err, token) => {
//         if (err) throw err
//         res.json({ token })
//       }
//     )
//     console.log("token: ", token)
//     console.log("User: ", user)
//   } else {
//     return res.status(400).json({
//       message: "User not found"
//     })
//   }
// } catch (err) {
//   msjPError("Error loggin in user")
//   return res.status(500).json({
//     status: "error"
//   })
// }