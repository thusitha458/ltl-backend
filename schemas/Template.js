const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    name: {type: String, trim: true, required: true},
    fields: [
        {
            id: {type: Number, required: true}, 
            innerFields: [{
                id: {type: Number, required: true}, 
                name: {type: String, required: true}, 
                type: {type: String, required: true},
                defaultValue: {type: Schema.Types.Mixed, required: true},
                editable: {type: Boolean, required: true},
                editableRoles: {type: Array, required: false},
                enum: {type: Array, required: false},
                autoSetFromEnum: {type: Object, required: false},
                // required: {type: Boolean, required: true},
            }],
        },
        // {
        //     "id": 0, 
        //     "innerFields": [
        //         {"id": 0, "name": "activity", "type": "String", "defaultValue": "Design Work", "editable": false},
        //         {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "EE", "editable": false},
        //         {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //         {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "EE"]}]
        // },
        // {
        //     "id": 1, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Checking of the Design Output using Design Review Checklist", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "EE", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "EE"]}]
        // },
        // {
        //     "id": 2, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Fill the remaining cages of the Transformer Technical Specification Sheet", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "EE", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "EE"]}]
        // },
        // {
        //     "id": 3, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Inform the customer", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "SPE", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "SPE"]}]
        // },
        // {
        //     "id": 4, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Complete the Bill of Material", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "EE", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "EE"]}]
        // },
        // {
        //     "id": 5, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Prepare the Purchasing Specification", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "EE", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "EE"]}]
        // },
        // {
        //     "id": 6, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Material Ordering Date", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "EC&P", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "EC&P"]}]
        // },
        // {
        //     "id": 7, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Material Receiving Date", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "EL&I", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "EL&I"]}]
        // },
        // {
        //     "id": 8, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Preparation of manufacturing specifications (Design Data O/P Sheet, Active Part Drawings, Tank Drawings)", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "EE", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "EE"]}]
        // },
        // {
        //     "id": 9, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Production (Winding & Core Manufacturing, Assembling, Tank Manufacturing, Tanking)", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "PE", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "PE"]}]
        // },
        // {
        //     "id": 10, 
        //     "innerFields": [{"id": 0, "name": "activity", "type": "String", "defaultValue": "Testing (Pressure Test, Electrical Test)", "editable": false},
        //     {"id": 1, "name": "responsibility", "type": "String", "defaultValue": "TE", "editable": false},
        //     {"id": 2, "name": "targetDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN"]},
        //     {"id": 3, "name": "completedDate", "type": "Date", "defaultValue": "", "editable": true, "editableRoles": ["ADMIN", "TE"]}]
        // },
    ],
});

module.exports = mongoose.model('Template', TemplateSchema);