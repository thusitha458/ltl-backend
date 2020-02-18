const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    ct: {type: String, trim: true, required: true},
    customer: {
        name: {type: String, trim: true, required: true},
    },
    // actionPlan: [
    //     {
    //         id: {type: Number, required: true}, 
    //         activity: {type: String, required: true},
    //         responsibility: {type: String, required: true},
    //         targetDate: Date,
    //         completedDate: Date,
    //     },
    //     // {id: 0, activity: 'Design Work', responsibility: 'EE', targetDate: Date, completedDate: Date},
    //     // {id: 1, activity: 'Checking of the Design Output using Design Review Checklist', responsibility: 'EE', targetDate: Date, completedDate: Date},
    //     // {id: 2, activity: 'Fill the remaining cages of the Transformer Technical Specification Sheet', responsibility: 'EE', targetDate: Date, completedDate: Date},
    //     // {id: 3, activity: 'Inform the customer', responsibility: 'SPE', targetDate: Date, completedDate: Date},
    //     // {id: 4, activity: 'Complete the Bill of Material', responsibility: 'EE', targetDate: Date, completedDate: Date},
    //     // {id: 5, activity: 'Prepare the Purchasing Specification', responsibility: 'EE', targetDate: Date, completedDate: Date},
    //     // {id: 6, activity: 'Material Ordering Date', responsibility: 'EC&P', targetDate: Date, completedDate: Date},
    //     // {id: 7, activity: 'Material Receiving Date', responsibility: 'EL&I', targetDate: Date, completedDate: Date},
    //     // {id: 8, activity: 'Preparation of manufacturing specifications (Design Data O/P Sheet, Active Part Drawings, Tank Drawings)', responsibility: 'EE', targetDate: Date, completedDate: Date},
    //     // {id: 9, activity: 'Production (Winding & Core Manufacturing, Assembling, Tank Manufacturing, Tanking)', responsibility: 'PE', targetDate: Date, completedDate: Date},
    //     // {id: 10, activity: 'Testing (Pressure Test, Electrical Test)', responsibility: 'TE', targetDate: Date, completedDate: Date},
    // ],
    actionPlan: Array,
});

module.exports = mongoose.model('Project', ProjectSchema);