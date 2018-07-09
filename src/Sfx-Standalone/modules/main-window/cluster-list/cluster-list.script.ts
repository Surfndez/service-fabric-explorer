import * as $ from "jquery";
import { } from "bootstrap";

// import { ICommunicator, AsyncRequestHandler, IRoutePattern } from "sfx.remoting";
import { ipcRenderer, ipcMain } from "electron";
import { IMainWindow, IComponent } from "sfx.main-window";
import { SfxContainer } from "../sfx-container/sfx-container.script";
import { electron } from "../../../utilities/electron-adapter";
import { IComponentInfo } from "sfx.module-manager";
import { DialogService } from "../index.page";

export class ClusterList implements IComponent {
    public static getComponentInfo(): IComponentInfo {
        return {
            name: "cluster-list",
            version: electron.app.getVersion(),
            singleton: true,
            descriptor: () => new ClusterList(),
            deps: []
        };
    }

    handleButtonClickAsync(button: HTMLElement): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

(async () => {
    sfxModuleManager.registerComponents([ ClusterList.getComponentInfo() ]);

    console.log("cluster-list loaded");

    try {
        const $button = $("button#c-button-cluster-list");

        $button.click(() => {
            console.log("button clicked");
            // TODO: refresh sfxContainer here        
        });

        $("#cluster-list-connect").click(() => {
            console.log("cluster-list-connect clicked");

            sfxModuleManager.getComponentAsync<DialogService>("dialog-service", ipcRenderer).then(s => { 
                console.log("dialog service", s);
                s.ShowDialog("./cluster-list/connect-cluster.html");
            });
        });

    } catch (error) {
        console.log(error);
    }
})();
