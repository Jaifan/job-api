const Job = require('../models/jobModel');
const {StatusCodes} = require('http-status-codes');
const NotFound = require('../errors/not-found');

const getAllJobs = async (req,res) => {
    const job = await Job.find({createBy : req.user.userId});
    res.status(StatusCodes.OK).json({nHits :job.length , job});
}
const createJob = async (req,res) => {
    req.body.createBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json({job});
}
const getJob = async (req,res) => {
    const {id : jobId} = req.params;
    const userId = req.user.userId;
    const job = await Job.findOne({createBy : userId,_id : jobId});
    if(!job) throw new NotFound(`No jobs with this jobId ${jobId} !`);
    res.status(StatusCodes.OK).json({ job });
}
const updatejob = async (req,res) => {    
    const { body : {company , position}, user : { userId }, params : {id : jobId} } = req
    const job = await Job.findByIdAndUpdate({
        createBy : userId, _id : jobId}, req.body, {new: true, runValidators: true});

    if(!job) throw new NotFound(`No jobs with this jobId ${jobId} !`);
    res.status(StatusCodes.OK).json({ job });
}
const deletejob =async (req,res) => {    
    const { user : { userId }, params : {id : jobId} } = req
    const job = await Job.findByIdAndDelete({createBy : userId, _id : jobId });

    if(!job) throw new NotFound(`No jobs with this jobId ${jobId} !`);
    res.status(StatusCodes.OK).json({ job });
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updatejob,
    deletejob
};