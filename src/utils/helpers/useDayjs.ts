import dayjs from 'dayjs';
import updateLocale from "dayjs/plugin/updateLocale";
import localeData from "dayjs/plugin/localeData";

const myDayjs = dayjs

myDayjs.extend(localeData)
myDayjs.localeData()
myDayjs.extend(updateLocale)
myDayjs.updateLocale('en', {
    weekdays: [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
}
)

const globalLocaleData = myDayjs.localeData()

export { myDayjs, globalLocaleData }