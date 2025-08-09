import {Plugin, SettingsTypes} from "@highlite/plugin-api";
import { PanelManager } from "@highlite/plugin-api";
import lookupTable from './lookupTable.json';

export default class ImprovedSkillGuides extends Plugin {
    panelManager: PanelManager = new PanelManager();
    pluginName = "ImprovedSkillGuides";
    author: string = "0rangeYouGlad";

    constructor() {
        super();

        this.pluginName = "Improved Skill Guides";
        this.author = "0rangeYouGlad";

        this.settings.showRecipe = {
            text: "Show Recipes",
            type: SettingsTypes.checkbox,
            value: true,
            callback: () => {},
        };

        this.settings.showXp = {
            text: "Show XP",
            type: SettingsTypes.checkbox,
            value: false,
            callback: () => {},
        };

        this.settings.showTool = {
            text: "Show Tool",
            type: SettingsTypes.checkbox,
            value: true,
            callback: () => {},
        };

        this.settings.showFacility = {
            text: "Show Facility",
            type: SettingsTypes.checkbox,
            value: false,
            callback: () => {},
        };

        this.settings.showItemEffects = {
            text: "Show Item Details",
            type: SettingsTypes.checkbox,
            value: false,
            callback: () => {},
        };
    };

    init(): void {
    }

    start(): void {
        this.log("ImprovedSkillGuides started");
    }

    stop(): void {
        this.log("ImprovedSkillGuides stopped");
    } 

    // TODO - move this into a manager like https://github.com/Highl1te/Core/commit/a9011e05b0a4a410e4f8a9a3dbd9873e92a0d4c1
    GameLoop_update() {
        let skillMenu = document.getElementById("hs-skill-guide-menu");
        if(!skillMenu) return;
        
        let childSkillEntries = Array.from(skillMenu.getElementsByClassName("hs-unlockable-skill-panel"));

        childSkillEntries.forEach((child) => {
            let subject = child.childNodes[1].childNodes[0].textContent || ""; 
            // this.log("Processing subject: " + subject);
            // this.log("Lookuptable: " + JSON.stringify(lookupTable[subject]));
          if (lookupTable[subject] && child.childNodes[1].childNodes.length < 3) {

            Object.entries(lookupTable[subject]).forEach((line) => {

                if(line[0] === "recipe" && !this.settings.showRecipe.value) {
                    // this.log("Skipping Recipe");
                } else if(line[0] === "xp" && !this.settings.showXp.value) {
                    // this.log("Skipping XP");
                } else if(line[0] === "facility" && !this.settings.showFacility.value) {
                    // this.log("Skipping Facility");
                } else if(line[0] === "tool" && !this.settings.showTool.value) {
                    // this.log("Skipping Tool");
                } else if(line[0] === "itemEffects" && !this.settings.showItemEffects.value) {
                    // this.log("Skipping Item Effects");
                } else {
                    // this.log("Creating for " + subject);
                    let newText = document.createElement("span");
                    newText.className = "hs-text--yellow";
                    newText.style = "color: rgb(240, 230, 140) !important;";
                    newText.innerText = `${line[1]}`;
                    child.childNodes[1].appendChild(newText);
                }
            })


            }
        })
    }
}
