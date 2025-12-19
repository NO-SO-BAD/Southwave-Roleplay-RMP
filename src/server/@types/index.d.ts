import { InteractionMenu } from "@classes/Interaction.class";
import { AccountEntity } from "@entities/Account.entity";
import { CharacterEntity } from "@entities/Character.entity";
import { NativeMenu } from "@classes/NativeMenu.class";
import { RageShared } from "@shared/index";

declare global {
    interface PlayerMpPool {
        getPlayerByName: (stringornumber: string) => PlayerMp | undefined;
    }

interface PlayerMp {
    this: PlayerMp;

    account: AccountEntity | null;
    character: CharacterEntity | null;
    lastPosition: Vector3 | null;
    interactionMenu: InteractionMenu | null;
    fastSlotActive: number | null;
    emoteTimeout: NodeJS.Timeout | null;
    nativemenu: NativeMenu | null;

    cdata: any;

    _attachments: any;
    addAttachment: any;
    hasAttachment: any;

    giveWeaponEx: (weapon: number, totalAmmo: number, ammoInClip?: number) => void;
    showNotify: (type: RageShared.Enums.NotifyType, message: string, skin?: "light" | "dark" | "colored") => void;
    getAdminLevel: () => number;
    getRoleplayName: (checkmask?: boolean) => string;  // 🔹 optional parameter
    requestCollisionAt: (x: number, y: number, z: number) => Promise<boolean>;
    startScreenEffect: (effectName: string, duration: number, looped: boolean) => void;
    stopScreenEffect: (effectName: string) => void;
    setEmoteText: (color: Array4d, text: string, time: number) => void;
    giveMoney: (amount: number, logMessage?: string) => void;
    attachObject: (name: string, attached: boolean) => void;

    getVar: <K extends keyof RageShared.Players.Interfaces.PlayerVars>(key: K) => RageShared.Players.Interfaces.PlayerVars[K];
    setVar: <K extends keyof RageShared.Players.Interfaces.PlayerVars>(key: K, value: RageShared.Players.Interfaces.PlayerVars[K]) => void;
}


    interface VehicleMp {
        _attachments: any;
        addAttachment: any;
        hasAttachment: any;
    }

    interface ColshapeMp {
        enterHandler: (player: PlayerMp) => void;
        exitHandler: (player: PlayerMp) => void;
    }
}
export {};
