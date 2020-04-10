import { IDataItem, IModuleData, IModuleFolder, IServer } from './models'
import { ItemNotFoundException, ReadonlyException } from "@/exceptions";

/**
 * For demo purposes only. Will be replaced in production by calls to actual server
 */
export default class LocalStorageServer implements IServer {
    getData(): IModuleData[] {
        return getLocalStorage();
    }

}

class DataItem implements IDataItem {
    get data(): object {
        return this._data;
    }

    set data(newData: object) {
        this._data = newData;
        saveLocalStorage();
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
        saveLocalStorage();
    }

    private _name: string;
    static deserialize(serializedItem: DataItem) {
        return new DataItem(serializedItem._name, serializedItem._data);
    }
    constructor(name: string, data: object = {}) {
        this._name = name;
        this._data = data;
    }

    private _data: object;

}

class ModuleFolder implements IModuleFolder {
    constructor(name: string, public readonly isReadonly: boolean = false, public readonly items: IDataItem[] = []) {
        this._name = name;
    }

    static deserialize(serializedFolder: ModuleFolder) {
        let items = serializedFolder.items.map(itemObj => DataItem.deserialize(itemObj as DataItem));
        return new ModuleFolder(serializedFolder._name, serializedFolder.isReadonly, items);
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        if (this.isReadonly) {
            throw new ReadonlyException('', this.name);
        }
        this._name = newName;
        saveLocalStorage();
    }

    createItem(itemName: string): IDataItem {
        let item = new DataItem(itemName);
        this.items.push(item);
        saveLocalStorage();
        return item;
    }

    deleteItem(itemName: string): void {
        let index = this.items.findIndex(item => item.name === itemName);
        if (~index) {
            this.items.splice(index, 1);
            saveLocalStorage();
        } else {
            throw new ItemNotFoundException(this._name, itemName);
        }

    }

}

class ModuleData implements IModuleData {

    constructor(public readonly name: string, public readonly folders: IModuleFolder[]) {
    }

    static deserialize(serializedModuleData: ModuleData) {
        let folders = serializedModuleData.folders.map(folderObj => {
            return ModuleFolder.deserialize(folderObj as ModuleFolder);
        });
        return new ModuleData(serializedModuleData.name, folders);

    }

    createFolder(folderName: string): IModuleFolder {
        let folder = new ModuleFolder(folderName);
        this.folders.push(folder);
        saveLocalStorage();
        return folder;
    }

    deleteFolder(folderName: string): void {
        let index = this.folders.findIndex(folder => folder.name === folderName);
        if (~index) {
            if (this.folders[index].isReadonly) {
                throw new ReadonlyException(this.name, folderName);
            }
            this.folders.splice(index, 1);
            saveLocalStorage();
        } else {
            throw new ItemNotFoundException(this.name, folderName);
        }
    }
}

const STORAGE_ID = 'lilo-pim-modules';
let data: IModuleData[];

function initLocalStorage() {
    let modules = [
        initModule('calendar', ['personal', 'work']),
        initModule('mail', ['inbox', 'sent']),
        initModule('notes', ['unfiled']),
    ];

    localStorage.setItem(STORAGE_ID, JSON.stringify(modules));
    return modules;
}

function getLocalStorage(): IModuleData[] {
    if (!data) {
        let modulesString = localStorage.getItem(STORAGE_ID);
        if (modulesString) {
            // parse the string into objects hierarchy
            let modulesObj: Array<ModuleData> = JSON.parse(modulesString);

            // convert the objects to our data classes
            data = modulesObj.map(moduleObj => {
                return ModuleData.deserialize(moduleObj);
            });
        } else {
            data = initLocalStorage();
        }
    }
    return data;

}

function saveLocalStorage() {
    localStorage.setItem(STORAGE_ID, JSON.stringify(data || []));
}

function initModule(moduleName: string, folderNames: string[]): ModuleData {
    let folders = folderNames.map(folderName => new ModuleFolder(folderName, true));
    return new ModuleData(moduleName, folders);
}
