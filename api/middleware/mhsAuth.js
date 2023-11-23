//importing modules
const express = require("express");
const db = require("../models/models");
const jwt = require('jsonwebtoken');

//Assigning db.users to User variable
const Mhs = db.Data_Mahasiswa;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
        const username = await Mhs.findOne({
            where: {
                NIM: req.body.NIM,
            },
        });
        //if username exist in the database respond with a status of 409
        if (username) {
            return res.json(409).send("NIM already exists");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

const authorizedUser = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).send("Token does not exist");
    }
    try {
        const data = jwt.verify(token, "secretKey");
        req.NIM = data.NIM;
        req.Nama = data.Nama;
        console.log("Auth success, token: " + token);
        return next();
    } catch (error) {
        console.log(error);
        return res.status(403).send("An error occurred");
    }
}

//exporting module
module.exports = {
    saveUser,
    authorizedUser
};