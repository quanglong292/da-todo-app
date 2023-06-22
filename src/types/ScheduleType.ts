type ScheduleItemType = {
    title: string;
    status: "DONE" | "DOING";
    type?: "ADD",
    id?: string;
};

type ScheduleType = {
    date: string,
    items: ScheduleItemType[]
}

export type { ScheduleType, ScheduleItemType }