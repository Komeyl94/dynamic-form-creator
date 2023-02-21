export type Service = {
    id: string;
    name: string;
    url: string;
    time: "beforeInit" | "afterInit" | "beforeSubmit" | "afterSubmit";
}