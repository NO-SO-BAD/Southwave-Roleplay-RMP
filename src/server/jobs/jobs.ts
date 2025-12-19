// server/src/jobs/jobs.ts
import { Jobs } from "../classes/Jobs.class";
import { MainDataSource} from "../database/Database.module";
import { CharacterEntity } from "@entities/Character.entity";
import { Entity } from 'typeorm';
import { JobEntity } from './../database/entity/Job.entity';


const jobsInstance = Jobs.getInstance();
const jobRepo = MainDataSource.getRepository(JobEntity);

// Asignar un job a un jugador
export async function setPlayerJob(character: CharacterEntity, jobId: number, rankId?: number, salary?: number) {
    let job = await jobRepo.findOne({ where: { character: { id: character.id } } });
    if (!job) {
        job = jobRepo.create({ character, jobId, rankId: rankId || null, salary: salary || 0 });
    } else {
        job.jobId = jobId;
        job.rankId = rankId || null;
        job.salary = salary || 0;
    }
    await jobRepo.save(job);
}

// Obtener job actual del jugador
export async function getPlayerJob(character: CharacterEntity) {
    const job = await jobRepo.findOne({ where: { character: { id: character.id } } });
    if (!job) return null;

    const jobData = jobsInstance.getJobById(job.jobId);
    const rank = jobData?.ranks.find(r => r.id === job.rankId);
    return { job: jobData, rank, salary: parseFloat(job.salary.toString()) };
}

// Ejemplo de uso en un evento
mp.events.addCommand("setjob", async (player, fullText, jobIdStr) => {
    const jobId = parseInt(jobIdStr);
    const character = player.character as CharacterEntity;
    if (!character) return player.outputChatBox("No character loaded.");

    if (!jobsInstance.getJobById(jobId)) return player.outputChatBox("Trabajo inválido.");

    await setPlayerJob(character, jobId);
    player.outputChatBox(`Ahora trabajas como: ${jobsInstance.getJobById(jobId)?.name}`);
});

export { jobsInstance };
