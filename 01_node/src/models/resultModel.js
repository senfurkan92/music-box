class ResultModel {
    constructor(success, description, errors = null) {
        this.success = success;
        this.description = description;
        this.errors = errors;
    }
}

class ResultDataModel extends ResultModel {
    constructor(success, data, description, errors = null) {
        super(success, description, errors);
        this.data = data;
    }
}

module.exports = {
    ResultModel,
    ResultDataModel
}