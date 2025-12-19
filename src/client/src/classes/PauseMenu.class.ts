// src/client/src/classes/PauseMenu.class.ts

export class PauseMenu {
    // ==========================
    // Archivos YTD
    // ==========================
    private ytdFiles: string[] = [
        "minimap_0_0",
        "minimap_0_1",
        "minimap_1_0",
        "minimap_1_1",
        "minimap_2_0",
        "minimap_2_1",
        "minimap_lod_128",
        "minimap_sea_0_0",
        "minimap_sea_0_1",
        "minimap_sea_1_0",
        "minimap_sea_1_1",
        "minimap_sea_2_0",
        "minimap_sea_2_1"
    ];

    // ==========================
    // Archivos YDD
    // ==========================
    private yddFiles: string[] = [
        "minimap_0_2","minimap_0_3","minimap_0_4","minimap_0_5","minimap_0_6",
        "minimap_1_1","minimap_1_2","minimap_1_3","minimap_1_4","minimap_1_5",
        "minimap_1_6","minimap_1_7","minimap_1_8","minimap_2_0","minimap_2_1",
        "minimap_2_2","minimap_2_3","minimap_2_4","minimap_2_5","minimap_2_6",
        "minimap_2_7","minimap_2_8","minimap_3_0","minimap_3_1","minimap_3_2",
        "minimap_3_3","minimap_3_4","minimap_3_5","minimap_3_6","minimap_3_7",
        "minimap_3_8","minimap_4_0","minimap_4_1","minimap_4_2","minimap_4_3",
        "minimap_4_4","minimap_4_5","minimap_4_6","minimap_4_7","minimap_4_8",
        "minimap_5_0","minimap_5_1","minimap_5_2","minimap_5_3","minimap_5_4",
        "minimap_5_5","minimap_5_6","minimap_5_7","minimap_5_8","minimap_6_0",
        "minimap_6_1","minimap_6_2","minimap_6_3","minimap_6_4","minimap_6_5",
        "minimap_6_6","minimap_6_7","minimap_6_8","minimap_7_0","minimap_7_1",
        "minimap_7_2","minimap_7_3","minimap_7_4","minimap_7_5","minimap_7_6"
    ];

    // ==========================
    // Archivos GFX
    // ==========================
    private gfxFiles: string[] = [
        "int3232302352",
        "minimap"
    ];

    constructor() {
        this.loadAllTextures();
        this.initRenderLoop();
    }

    // ==========================
    // Cargar todas las texturas
    // ==========================
    private loadAllTextures() {
        // Cargar YTDs
        this.ytdFiles.forEach(name => {
            mp.game.graphics.requestStreamedTextureDict(name, true);
        });

        // Cargar YDDs
        this.yddFiles.forEach(name => {
            const hash = mp.game.joaat(name);
            mp.game.streaming.requestModel(hash);
        });

        // Cargar GFX
        this.gfxFiles.forEach(name => {
            const hash = mp.game.joaat(name);
            mp.game.streaming.requestModel(hash);
        });
    }

    // ==========================
    // Ocultar elementos innecesarios del menú de pausa
    // ==========================
    private customizePauseMenu() {
        mp.game.invoke("0xC3B07BA00A83B0F1", false); // SET_PAUSE_MENU_PED_LIGHTING
        mp.game.invoke("0xF1A6C18B35BCADE6", false); // SET_PAUSE_MENU_PED_SLEEP_STATE
        mp.game.invoke("0x50978C8CD8C4B52F", false); // SET_PAUSE_MENU_PED_CAMERA
    }

    // ==========================
    // Radar / mapa
    // ==========================
    private customizeRadar() {
        mp.game.invoke("0xD2049635DEB9C375", 0); // SET_RADAR_ZOOM
        mp.game.invoke("0xB3C94A90D9FC9E62"); // SET_RADAR_AS_EXTERIOR_THIS_FRAME
    }

    // ==========================
    // Loop de render
    // ==========================
    private initRenderLoop() {
        mp.events.add("render", () => {
            const isPaused = mp.game.invoke("0x5E9564D8246B909A"); // IS_PAUSE_MENU_ACTIVE
            if (isPaused) {
                this.customizePauseMenu();
                this.customizeRadar();
            }
        });
    }
}

// ==========================
// Inicializar
// ==========================
const pauseMenu = new PauseMenu();
