const db = require("../../db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getApplicants,
};

async function getAll() {
  const jobs = await db.Job.find();
  return jobs;
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

async function getApplicants(id) {
  const job = await getById(id);
  let candidates = [];
  for (let i = 0; i < job.applicants.length; i++) {
    let applicant = await db.User.findById(job.applicants[i]);
    candidates.push(applicant);
  }
  return candidates;
}
