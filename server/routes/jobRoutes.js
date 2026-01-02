import express from "express";
import {getJobById, getJobs} from "../controllers/jobController.js"

const router = express.Router()

//route to get all jobs data
router.get('/',getJobs)


//route to get a single job by ID

router.get('/:id',getJobById)

export default router; 

/*import express from "express";
import { applyForJob } from "../controllers/applicationController.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.post("/apply/:jobId", requireAuth(), applyForJob);

export default router;*/
