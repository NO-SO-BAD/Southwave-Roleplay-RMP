"use strict";
// src/client/src/classes/Jobs.Class.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
class Jobs {
    constructor() {
        this.jobs = [];
        this.initJobs();
    }
    static getInstance() {
        if (!Jobs.instance) {
            Jobs.instance = new Jobs();
        }
        return Jobs.instance;
    }
    initJobs() {
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
    getJobById(id) {
        return this.jobs.find(job => job.id === id);
    }
    getAllJobs() {
        return this.jobs;
    }
    getJobsByType(type) {
        return this.jobs.filter(job => job.type === type);
    }
    addDivision(jobId, division) {
        const job = this.getJobById(jobId);
        if (job) {
            job.divisions.push(division);
        }
    }
    addRank(jobId, rank) {
        const job = this.getJobById(jobId);
        if (job) {
            job.ranks.push(rank);
        }
    }
}
exports.Jobs = Jobs;
// Ejemplo de uso
const jobs = Jobs.getInstance();
console.log(jobs.getAllJobs());
