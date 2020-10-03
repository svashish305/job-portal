const db = require("../../db");

module.exports = {
  getAll,
  getJobApplicationStatus,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const jobs = await db.Job.find();
  return jobs;
}

async function getJobApplicationStatus(user_id, params) {
  const user = await db.User.findById(user_id);
  return user.jobApplications.includes(params.job_id);
}

async function getById(id) {
  const job = await db.Job.findById(id);
  return job;
}

async function create(params) {
  const job = new db.Job(params);
  await job.save();
  return job;
}

async function update(id, params) {
  const job = await getById(id);

  Object.assign(job, params);
  job.updated = Date.now();
  await job.save();

  return job;
}

async function _delete(id) {
  const job = await getById(id);
  await job.remove();
}
