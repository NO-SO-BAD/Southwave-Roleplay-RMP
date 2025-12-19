"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobsInstance = void 0;
exports.setPlayerJob = setPlayerJob;
exports.getPlayerJob = getPlayerJob;
// server/src/jobs/jobs.ts
const Jobs_class_1 = require("../classes/Jobs.class");
const Database_module_1 = require("../database/Database.module");
const Job_entity_1 = require("./../database/entity/Job.entity");
const jobsInstance = Jobs_class_1.Jobs.getInstance();
exports.jobsInstance = jobsInstance;
const jobRepo = Database_module_1.MainDataSource.getRepository(Job_entity_1.JobEntity);
// Asignar un job a un jugador
async function setPlayerJob(character, jobId, rankId, salary) {
    let job = await jobRepo.findOne({ where: { character: { id: character.id } } });
    if (!job) {
        job = jobRepo.create({ character, jobId, rankId: rankId || null, salary: salary || 0 });
    }
    else {
        job.jobId = jobId;
        job.rankId = rankId || null;
        job.salary = salary || 0;
    }
    await jobRepo.save(job);
}
// Obtener job actual del jugador
async function getPlayerJob(character) {
    const job = await jobRepo.findOne({ where: { character: { id: character.id } } });
    if (!job)
        return null;
    const jobData = jobsInstance.getJobById(job.jobId);
    const rank = jobData?.ranks.find(r => r.id === job.rankId);
    return { job: jobData, rank, salary: parseFloat(job.salary.toString()) };
}
// Ejemplo de uso en un evento
mp.events.addCommand("setjob", async (player, fullText, jobIdStr) => {
    const jobId = parseInt(jobIdStr);
    const character = player.character;
    if (!character)
        return player.outputChatBox("No character loaded.");
    if (!jobsInstance.getJobById(jobId))
        return player.outputChatBox("Trabajo inválido.");
    await setPlayerJob(character, jobId);
    player.outputChatBox(`Ahora trabajas como: ${jobsInstance.getJobById(jobId)?.name}`);
});
