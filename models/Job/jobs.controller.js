const express = require("express");
const router = express.Router();
const authorize = require("../../middleware/authorize");
const Role = require("../../role");
const jobService = require("./job.service");
router.get("/", authorize(), getAll);
router.get("/applicants/:id", authorize(Role.Admin), getApplicantsOfJob);
router.get("/:id", authorize(Role.Admin), getById);
router.post("/", authorize(Role.Admin), create);
router.patch("/:id", authorize(Role.Admin), update);
router.delete("/:id", authorize(Role.Admin), _delete);
module.exports = router;

function getAll(req, res, next) {
  jobService
    .getAll()
    .then((jobs) => res.json(jobs))
    .catch(next);
}

function getById(req, res, next) {
  jobService
    .getById(req.params.id)
    .then((job) =>
      job && (job.userId === req.user.id || req.user.role === Role.Admin)
        ? res.json(job)
        : res.sendStatus(404)
    )
    .catch(next);
}

function create(req, res, next) {
  jobService
    .create({
      ...req.body,
      userId: req.user.id,
      updated: Date.now(),
    })
    .then((job) => res.json(job))
    .catch(next);
}

function update(req, res, next) {
  jobService
    .update(req.params.id, req.body)
    .then((job) => res.json(job))
    .catch(next);
}

function _delete(req, res, next) {
  jobService
    .delete(req.params.id)
    .then(() => res.json({ message: "Job deleted successfully" }))
    .catch(next);
}

function getApplicantsOfJob(req, res, next) {
  jobService
    .getApplicants(req.params.id)
    .then((applicants) => res.json(applicants))
    .catch(next);
}
