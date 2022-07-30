const express = require('express');
const router = express.Router();
const {getAllJobs,getJob,createJob,updatejob,deletejob}=require('../controller/jobs');


router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deletejob).patch(updatejob)

module.exports = router;