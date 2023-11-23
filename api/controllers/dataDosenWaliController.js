// const Data_Dosen_Wali = require('../models/models/dataDosenWali');
const path = require('path');
const basename = path.basename(__filename);
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const fs = require('fs');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const { mainModel } = require('../common/models');
const Data_Dosen_Wali = new mainModel("Data_Dosen_Wali");
const Data_Dosen = new mainModel("Data_Dosen");
const hbs = require('nodemailer-express-handlebars');

function generatePassword() {
    // Bagian awal password
    const prefix = "*Polbanjtk";

    // Mendapatkan angka acak antara 1000 hingga 9999
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    // Bagian akhir password
    const suffix = "#";

    // Menggabungkan semua bagian untuk membuat password
    const password = `${prefix}${randomDigits}${suffix}`;

    return password;
}

// Get all adviser lecturers
exports.getAllAdviserLecturers = async(req, res) => {
    try {
        const adviserLecturers = await Data_Dosen_Wali.getAll();
        // res.json(adviserLecturers);
        res.send({
            message: "Adviser Lecturers sent successfully",
            data: adviserLecturers
        });
        console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.loginAdviserLecturer = async(req, res) => {
    try {
        const { Email_Dosen, Password } = req.body;
        const dosenWali = await Data_Dosen.get({
            where: {
                Email_Dosen: Email_Dosen
            }
        });
        console.log('dosenWali: ', JSON.stringify(dosenWali.id));
        if (!dosenWali) {
            return res.status(401).json({ message: 'Invalid username or password' });
        } else {
            const pwd = await Data_Dosen_Wali.get({
                where: {
                    ID_Dosen: dosenWali.id
                }
            });
            const passwordMatch = await bcrypt.compare(Password, pwd.Password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            } else {
                const token = jwt.sign({ userId: dosenWali.Email_Dosen }, 'secretKey', { expiresIn: '1h' });
                res.status(200).json({ token });
            }
        }
    } catch (error) {
        console.error(error);
    }
};

exports.getIdDosenWali = async(req, res) => {
    try {
        const { username } = req.params;
        const dosenWali = await Data_Dosen.get({
            where: {
                Email_Dosen: username
            }
        });

        if (!dosenWali) {
            return res.status(401).json({ message: 'Invalid username or password' });
        } else {
            const pwd = await Data_Dosen_Wali.get({
                where: {
                    ID_Dosen: dosenWali.id
                }
            });

            if (!pwd) {
                return res.status(401).json({ message: 'Data not found' });
            } else {
                res.send({
                    message: "Adviser Lecturers sent successfully",
                    data: pwd
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
};

exports.registerAdviserLecturer = async(req, res) => {
    try {
        const { Email_Dosen, Password } = req.body;
        const dosenWali = await Data_Dosen_Wali.get(Email_Dosen);
        const passwordMatch = await bcrypt.compare(Password, dosenWali.Password);
        if (!dosenWali || !passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: dosenWali.Email_Dosen }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
    }
};


exports.getOneDataDosenWali = async(req, res) => {
    try {
        const { id } = req.params; // Ambil ID dari parameter URL
        const dataDosenWali = await Data_Dosen_Wali.get({ where: { id } }); // Menggunakan metode 'get' dengan kriteria ID

        if (dataDosenWali) {
            res.send({
                message: "Data Dosen Wali found successfully",
                data: dataDosenWali,
            });
            console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
        } else {
            res.status(404).json({ message: "Data Dosen Wali not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createDataDosenWali = async(req, res) => { //sudah bisa menjadi fk di data_dosen_wali
    try {
        const { Password, ID_Dosen } = req.body;

        // Pastikan ID_Dosen yang diberikan ada di tabel Data_Dosen
        const dosen = await Data_Dosen.get({
            where: { id: ID_Dosen },
        });

        if (!dosen) {
            return res.status(404).json({ message: 'Data Dosen not found' });
        }

        // Lanjutkan dengan membuat Data Dosen Wali
        await Data_Dosen_Wali.post({
            Password: await bcrypt.hash(Password, 10),
            ID_Dosen, // Pastikan Anda sudah mengirimkan ID_Dosen dalam permintaan POST
        });

        const dosenWali = await Data_Dosen.get({
            where: {
                id: ID_Dosen,
            }
        });

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'intljax6@gmail.com', // Your Gmail email address
                pass: 'esxddggcmpvbfwwf', // Your Gmail email password or app password
            },
        });

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        };

        transporter.use('compile', hbs(handlebarOptions))

        const mailOptions = {
            from: 'intljax6@gmail.com', // sender address
            template: "emailNewAccount", // the name of the template file, i.e., email.handlebars
            to: dosenWali.Email_Dosen, //mahasiswa.Email,
            subject: `Halo ${dosenWali.Nama_Dosen}, ini akun baru anda`,
            context: {
                username: dosenWali.Email_Dosen,
                password: Password,
            },
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ' + error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({ msg: 'Data Dosen Wali created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editDataDosenWali = async(req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const whereClause = { id };

        const updatedRowCount = await Data_Dosen_Wali.patch(newData, whereClause);

        if (updatedRowCount === 0) {
            return res.status(404).json({ msg: 'Data Dosen Wali not found' });
        }

        res.status(200).json({ msg: 'Data Dosen Wali updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Delete
exports.deleteDataDosenWali = async(req, res) => {
    try {
        const whereClause = { id: req.params.id }; // Contoh: menghapus data berdasarkan ID
        const deletedRowCount = await Data_Dosen_Wali.delete(whereClause);

        if (deletedRowCount === 0) {
            return res.status(404).json({ msg: 'Data Dosen Wali not found' });
        }

        res.status(200).json({ msg: 'Data Dosen Wali deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Forgot Password
exports.forgotPassword = async(req, res) => {
    try {
        const { Email_Dosen } = req.body;
        const dosenWali = await Data_Dosen.get({ where: { Email_Dosen } });
        const ID_Dosen = dosenWali.id;
        if (!dosenWali) {
            return res.status(404).json({ message: 'Data Dosen Wali not found' });
        }
        const Password = generatePassword();
        const hashedPassword = await bcrypt.hash(Password, 10);
        await Data_Dosen_Wali.patch({ Password: hashedPassword }, { ID_Dosen });
        res.status(200).json({ message: 'Password updated successfully' });

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'intljax6@gmail.com', // Your Gmail email address
                pass: 'esxddggcmpvbfwwf', // Your Gmail email password or app password
            },
        });

        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        };

        transporter.use('compile', hbs(handlebarOptions))

        const mailOptions = {
            from: 'intljax6@gmail.com', // sender address
            template: "emailForgotPassword", // the name of the template file, i.e., email.handlebars
            // to: dosenWali.Email_Dosen, //mahasiswa.Email,
            to: 'jaxsix06@gmail.com',
            subject: `Halo ${dosenWali.Nama_Dosen}, ini password baru anda`,
            context: {
                password: Password,
            },
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ' + error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}