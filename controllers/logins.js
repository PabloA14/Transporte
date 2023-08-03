import Login from "../models/logins.js";

const httplogin = {

    getLogin: async (req, res) => {
        const login = await Login.find()
        res.json({ login })
    },

    postLogin: async (req, res) => {
        const { usuario, clave } = req.body
        const login = await Login({ usuario, clave })
        await login.save()
        res.json({ login })
    }
}

export default httplogin

