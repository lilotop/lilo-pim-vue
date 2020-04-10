import { Vue } from "vue-property-decorator";

export interface IModule {
    label: string;
    iconClass: string;
    button: IModuleButton;
    pane: IModulePane;
}

export interface IModuleButton {
    items: IModuleButtonListItem[]
    click(): void;
}

export interface IModuleButtonListItem {
    label: string;
    iconClass: string;
    click(): void;
    isSelected: boolean;
}

export interface IModulePane extends Vue{

}
