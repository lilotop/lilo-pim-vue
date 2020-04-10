export interface IModuleData {
    readonly name: string;
    readonly folders: IModuleFolder[];

    createFolder(folderName: string): IModuleFolder;
    deleteFolder(folderName: string): void;
}

export interface IModuleItem {
    name: string;
}

export interface IModuleFolder extends IModuleItem {
    readonly items: IDataItem[];
    readonly isReadonly: boolean;
    createItem(itemName: string, data?: object): IDataItem;
    deleteItem(itemName: string): void;
}

export interface IDataItem extends IModuleItem {
    data: object;
}

export interface IServer {
    getData(): IModuleData[]
}
