// src/client/src/classes/Jobs.Class.ts

export type Rank = {
    id: number;
    name: string;
};

export type Division = {
    id: number;
    name: string;
};

export type Job = {
    id: number;
    name: string;
    type: "default" | "player";
    divisions: Division[];
    ranks: Rank[];
};

export class Jobs {
    private static instance: Jobs;
    public jobs: Job[] = [];

    private constructor() {
        this.initJobs();
    }

    public static getInstance(): Jobs {
        if (!Jobs.instance) {
            Jobs.instance = new Jobs();
        }
        return Jobs.instance;
    }

    private initJobs() {
        // ----------------------
        // LSPD
        // ----------------------
        this.jobs.push({
            id: 1,
            name: "LSPD",
            type: "default",
            divisions: [
                { id: 1, name: "Administrative Division" },
                { id: 2, name: "Patrol Division" },
                { id: 3, name: "Traffic Division" }
            ],
            ranks: [
                { id: 1, name: "Police Officer 1" },
                { id: 2, name: "Short PO1" },
                { id: 3, name: "Police Officer 2" },
                { id: 4, name: "Police Officer 3" },
                { id: 5, name: "Sergeant" },
                { id: 6, name: "Lieutenant" },
                { id: 7, name: "Commander" },
                { id: 8, name: "Deputy Chief" },
                { id: 9, name: "Chief" }
            ]
        });

        // ----------------------
        // LSSD
        // ----------------------
        this.jobs.push({
            id: 2,
            name: "LSSD",
            type: "default",
            divisions: [],
            ranks: []
        });

        // ----------------------
        // Department of Sanitation
        // ----------------------
        this.jobs.push({
            id: 3,
            name: "Department of Sanitation",
            type: "default",
            divisions: [],
            ranks: []
        });

        // ----------------------
        // Los Santos Water and Power
        // ----------------------
        this.jobs.push({
            id: 4,
            name: "Los Santos Water and Power",
            type: "default",
            divisions: [],
            ranks: []
        });

        // ----------------------
        // Los Santos Dept of Maintenance
        // ----------------------
        this.jobs.push({
            id: 5,
            name: "Los Santos Dept of Maintenance",
            type: "default",
            divisions: [],
            ranks: []
        });

        // ----------------------
        // LSCoFD
        // ----------------------
        this.jobs.push({
            id: 6,
            name: "LSCoFD",
            type: "default",
            divisions: [],
            ranks: []
        });

        // ----------------------
        // Los Santos Medical Services
        // ----------------------
        this.jobs.push({
            id: 7,
            name: "Los Santos Medical Services",
            type: "default",
            divisions: [],
            ranks: []
        });

        // ----------------------
        // Gobierno Estatal
        // ----------------------
        this.jobs.push({
            id: 8,
            name: "Gobierno Estatal",
            type: "default",
            divisions: [],
            ranks: []
        });

        // ----------------------
        // Fiscalia
        // ----------------------
        this.jobs.push({
            id: 9,
            name: "Fiscalia",
            type: "default",
            divisions: [],
            ranks: []
        });

        // ----------------------
        // Trabajos comerciales / default
        // ----------------------
        this.jobs.push({
            id: 10,
            name: "Los Santos Customs",
            type: "default",
            divisions: [],
            ranks: []
        });

        this.jobs.push({
            id: 11,
            name: "Envíos / Delivery",
            type: "default",
            divisions: [],
            ranks: []
        });

        this.jobs.push({
            id: 12,
            name: "Tienda 24/7",
            type: "default",
            divisions: [],
            ranks: []
        });

        this.jobs.push({
            id: 13,
            name: "Gasolinera",
            type: "default",
            divisions: [],
            ranks: []
        });

        // ----------------------
        //  más trabajos default o player-controlled
        // ----------------------
    }

    // Métodos de acceso
    public getJobById(id: number): Job | undefined {
        return this.jobs.find(job => job.id === id);
    }

    public getAllJobs(): Job[] {
        return this.jobs;
    }

    public getJobsByType(type: "default" | "player"): Job[] {
        return this.jobs.filter(job => job.type === type);
    }

    public addDivision(jobId: number, division: Division) {
        const job = this.getJobById(jobId);
        if (job) {
            job.divisions.push(division);
        }
    }

    public addRank(jobId: number, rank: Rank) {
        const job = this.getJobById(jobId);
        if (job) {
            job.ranks.push(rank);
        }
    }
}

// Ejemplo de uso
const jobs = Jobs.getInstance();
console.log(jobs.getAllJobs());
