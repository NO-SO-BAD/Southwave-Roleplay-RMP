"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOB_TEAMS = void 0;
exports.JOB_TEAMS = [
    // =====================
    // EMERGENCY SERVICES
    // =====================
    {
        id: "lspd",
        name: "Los Santos Police Department",
        category: "Emergency Services",
        whitelisted: true,
        divisions: [
            {
                id: "patrol",
                name: "Patrol Division",
                ranks: [
                    { id: "cadet", name: "Cadet", level: 1 },
                    { id: "officer1", name: "Police Officer I", level: 2 },
                    { id: "officer2", name: "Police Officer II", level: 3 },
                    { id: "senior", name: "Senior Officer", level: 4 },
                    { id: "corporal", name: "Corporal", level: 5 },
                    { id: "sergeant", name: "Sergeant", level: 6 },
                    { id: "lieutenant", name: "Lieutenant", level: 7 },
                    { id: "captain", name: "Captain", level: 8 }
                ]
            },
            {
                id: "detectives",
                name: "Detective Bureau",
                ranks: [
                    { id: "det1", name: "Detective I", level: 3 },
                    { id: "det2", name: "Detective II", level: 4 },
                    { id: "senior_det", name: "Senior Detective", level: 5 },
                    { id: "lead_det", name: "Lead Detective", level: 6 },
                    { id: "bureau_lt", name: "Bureau Lieutenant", level: 7 }
                ]
            },
            {
                id: "swat",
                name: "Special Response Team (SWAT)",
                ranks: [
                    { id: "operator", name: "SWAT Operator", level: 4 },
                    { id: "senior_op", name: "Senior Operator", level: 5 },
                    { id: "leader", name: "Team Leader", level: 6 },
                    { id: "commander", name: "SWAT Commander", level: 7 }
                ]
            },
            {
                id: "command",
                name: "Command Staff",
                ranks: [
                    { id: "dep_chief", name: "Deputy Chief", level: 8 },
                    { id: "asst_chief", name: "Assistant Chief", level: 9 },
                    { id: "chief", name: "Chief of Police", level: 10 }
                ]
            }
        ]
    },
    {
        id: "lssd",
        name: "Los Santos Sheriff's Department",
        category: "Emergency Services",
        whitelisted: true,
        divisions: [
            {
                id: "patrol",
                name: "Patrol Division",
                ranks: [
                    { id: "deputy1", name: "Deputy I", level: 2 },
                    { id: "deputy2", name: "Deputy II", level: 3 },
                    { id: "senior", name: "Senior Deputy", level: 4 },
                    { id: "sergeant", name: "Sergeant", level: 5 },
                    { id: "lieutenant", name: "Lieutenant", level: 6 },
                    { id: "captain", name: "Captain", level: 7 }
                ]
            },
            {
                id: "corrections",
                name: "Corrections Division",
                ranks: [
                    { id: "co", name: "Corrections Officer", level: 2 },
                    { id: "senior_co", name: "Senior Corrections Officer", level: 3 },
                    { id: "supervisor", name: "Supervisor", level: 5 }
                ]
            },
            {
                id: "command",
                name: "Command Staff",
                ranks: [
                    { id: "undersheriff", name: "Undersheriff", level: 9 },
                    { id: "sheriff", name: "Sheriff", level: 10 }
                ]
            }
        ]
    },
    {
        id: "lscofd",
        name: "Los Santos County Fire Department",
        category: "Emergency Services",
        whitelisted: true,
        divisions: [
            {
                id: "fire",
                name: "Fire Suppression",
                ranks: [
                    { id: "firefighter", name: "Firefighter", level: 1 },
                    { id: "engineer", name: "Engineer", level: 3 },
                    { id: "lieutenant", name: "Lieutenant", level: 5 },
                    { id: "captain", name: "Captain", level: 6 }
                ]
            },
            {
                id: "ems",
                name: "EMS Division",
                ranks: [
                    { id: "emt", name: "EMT", level: 2 },
                    { id: "paramedic", name: "Paramedic", level: 3 },
                    { id: "ems_supervisor", name: "EMS Supervisor", level: 6 }
                ]
            },
            {
                id: "command",
                name: "Command Staff",
                ranks: [
                    { id: "assistant_chief", name: "Assistant Fire Chief", level: 9 },
                    { id: "chief", name: "Fire Chief", level: 10 }
                ]
            }
        ]
    },
    {
        id: "fib",
        name: "Federal Investigation Bureau",
        category: "Emergency Services",
        whitelisted: true,
        divisions: [
            {
                id: "field_ops",
                name: "Field Operations",
                ranks: [
                    { id: "junior_agent", name: "Junior Agent", level: 3 },
                    { id: "agent", name: "Special Agent", level: 4 },
                    { id: "senior_agent", name: "Senior Agent", level: 5 },
                    { id: "supervisor", name: "Supervisory Agent", level: 6 }
                ]
            },
            {
                id: "cyber",
                name: "Cyber Crime Division",
                ranks: [
                    { id: "analyst", name: "Cyber Analyst", level: 4 },
                    { id: "cyber_agent", name: "Cyber Agent", level: 5 },
                    { id: "chief", name: "Cyber Division Chief", level: 7 }
                ]
            },
            {
                id: "command",
                name: "Command Directorate",
                ranks: [
                    { id: "deputy_director", name: "Deputy Director", level: 9 },
                    { id: "director", name: "Director", level: 10 }
                ]
            }
        ]
    },
    // =====================
    // PUBLIC SERVICES
    // =====================
    {
        id: "government",
        name: "Government of San Andreas",
        category: "Public Services",
        whitelisted: true,
        divisions: [
            {
                id: "executive",
                name: "Executive Office",
                ranks: [
                    { id: "assistant", name: "Executive Assistant", level: 2 },
                    { id: "secretary", name: "Secretary", level: 4 },
                    { id: "chief_staff", name: "Chief of Staff", level: 7 }
                ]
            },
            {
                id: "security_ministry",
                name: "Ministry of Security",
                ranks: [
                    { id: "advisor", name: "Security Advisor", level: 5 },
                    { id: "minister", name: "Minister of Security", level: 9 }
                ]
            }
        ]
    },
    {
        id: "prosecution",
        name: "San Andreas District Attorney Office",
        category: "Public Services",
        whitelisted: true,
        divisions: [
            {
                id: "penal",
                name: "Penal Division",
                ranks: [
                    { id: "assistant_da", name: "Assistant Prosecutor", level: 3 },
                    { id: "da", name: "Prosecutor", level: 5 },
                    { id: "senior_da", name: "Senior Prosecutor", level: 6 }
                ]
            },
            {
                id: "federal",
                name: "Federal Division",
                ranks: [
                    { id: "federal_da", name: "Federal Prosecutor", level: 6 },
                    { id: "attorney_general", name: "Attorney General", level: 10 }
                ]
            }
        ]
    },
    // =====================
    // DEFAULT / CIVIL JOBS
    // =====================
    {
        id: "public_mechanic",
        name: "Public Mechanic",
        category: "Civil Jobs",
        whitelisted: false,
        divisions: [
            {
                id: "workshop",
                name: "Workshop",
                ranks: [
                    { id: "apprentice", name: "Apprentice Mechanic", level: 1 },
                    { id: "mechanic", name: "Mechanic", level: 2 },
                    { id: "senior", name: "Senior Mechanic", level: 3 },
                    { id: "manager", name: "Shop Manager", level: 5 }
                ]
            }
        ]
    },
    {
        id: "store_clerk",
        name: "Retail Worker",
        category: "Civil Jobs",
        whitelisted: false,
        divisions: [
            {
                id: "commerce",
                name: "Commerce",
                ranks: [
                    { id: "clerk", name: "Store Clerk", level: 1 },
                    { id: "senior_clerk", name: "Senior Clerk", level: 2 },
                    { id: "supervisor", name: "Shift Supervisor", level: 3 },
                    { id: "manager", name: "Store Manager", level: 4 }
                ]
            }
        ]
    },
    {
        id: "transport",
        name: "Public Transport",
        category: "Civil Jobs",
        whitelisted: false,
        divisions: [
            {
                id: "taxi",
                name: "Taxi Service",
                ranks: [
                    { id: "driver", name: "Taxi Driver", level: 1 },
                    { id: "senior_driver", name: "Senior Driver", level: 2 },
                    { id: "fleet_supervisor", name: "Fleet Supervisor", level: 4 }
                ]
            },
            {
                id: "bus",
                name: "Bus Service",
                ranks: [
                    { id: "bus_driver", name: "Bus Driver", level: 1 },
                    { id: "route_supervisor", name: "Route Supervisor", level: 3 }
                ]
            }
        ]
    }
];
