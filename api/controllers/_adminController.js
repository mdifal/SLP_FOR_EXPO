const path = require('path');
const basename = path.basename(__filename);

const login = async (req, res) => {

    try {
        const { Username, Password } = req.body;

        if (Username === 'admin-d3' || Username === 'admin-d4') {
            if (Password === 'admin') {
                let token = jwt.sign({ admin: Username }, 'secretKey', { expiresIn: '1h' });
                console.log("Admin: ", JSON.stringify(Username, null, 2));
                console.log(token);
                return res.cookie("access_token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).status(201).json("Login success");
            } else {
                return res.status(401).send('Authentication Failed');
            }
        } else {
            return res.status(401).send('Authentication Failed');
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {login}