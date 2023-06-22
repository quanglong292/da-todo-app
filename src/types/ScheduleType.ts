type ScheduleItemType = {
    title: string;
    status: "DONE" | "DOING";
    type?: "ADD"
};

type ScheduleType = {
    date: string,
    items: ScheduleItemType[]
}

export type { ScheduleType, ScheduleItemType }