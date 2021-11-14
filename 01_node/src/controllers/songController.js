const fs = require('fs');
const path = require("path");
const {ResultModel, ResultDataModel} = require("../models/resultModel");
const {validationResult} = require("express-validator");
const songModel = require("../models/songModel");

const uploadAction = async (req, resp, next) => {
    const song = req.file;
    const basepath = __dirname.substring(0,__dirname.length-16);
    const songname = song.originalname.replace(' ','');
    const filepath = path.join(basepath,"public","songs",songname);

    //file upload
    fs.writeFile(filepath, Buffer.from(new Uint8Array(song.buffer)), (err) => {
        let result= null;
        if(err) {
            result = new ResultModel(false,"not uploaded",[err.message]);
            resp.status(200).json(result);
        } else {
            
            //validate
            req.body.path= `/songs/${songname}`;
            const errors = validationResult(req.body).isEmpty();
            if(!errors) {
                result = new ResultModel(false, "not uploaded", errors.array().map(x => `${x.msg} for ${x.param}`));
                resp.status(200).json(result);
            } else {

                //db insert           
                songModel.create(req.body)
                    .then(inserted => {
                        result = new ResultDataModel(true, inserted,"uploaded",null);
                        resp.status(200).json(result);
                    })
                    .catch(err => {
                        result = new ResultDataModel(false, err, "not inserted to db",["not inserted to db"]);
                        resp.status(200).json(result);
                    })
            }
        }
    }); 
};

const getAllAction = async (req, resp, next) => {
    var songs = await songModel.find();
    var result = new ResultDataModel(true, songs, "");
    resp.status(200).json(result);
};

const getAsPartAction = async (req, resp, next) => {
    const hadCount = req.body.hadCount;
    const dbCount = await songModel.find().count();
    let partCount = 8;
    if(hadCount < dbCount) {
        partCount = dbCount - hadCount > partCount ? partCount : dbCount - hadCount;
        const songs = await songModel.find().skip(hadCount).limit(partCount);
        const result = new ResultDataModel(true, songs, "");
        resp.status(200).json(result);
    } else {
        const result = new ResultModel(false, "you already had all");
        resp.status(200).json(result);
    }
};

const updateAction = async (req, resp, next) => {
    songModel.findOneAndUpdate(
    {
        _id: req.body._id
    }, 
    {
        title: req.body.title,
        genre: req.body.genre,
    },
    {
        new: true,
    }
    ).then(updated => {
        const result = new ResultDataModel(true, updated, "");
        resp.status(200).json(result);
    }).catch(err => {
        const result = new ResultModel(true, "not updated", err);
        resp.status(200).json(result);
    });
};

const deleteAction = async (req, resp, next) => {
    songModel.findOneAndDelete(
    {
        _id: req.params._id
    }).then(deleted => {
        const result = new ResultDataModel(true, deleted, "");
        resp.status(200).json(result);
    }).catch(err => {
        const result = new ResultModel(true, "not deleted", err);
        resp.status(200).json(result);
    });
};

module.exports = {
    uploadAction,
    getAllAction,
    getAsPartAction,
    updateAction,
    deleteAction,
}
