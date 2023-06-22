import dayjs from 'dayjs';
import updateLocale from "dayjs/plugin/updateLocale";
import localeData from "dayjs/plugin/localeData";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import customParseFormat from "dayjs/plugin/customParseFormat";

const Dayjs = dayjs

Dayjs.extend(localeData)
Dayjs.localeData()
Dayjs.extend(updateLocale)
Dayjs.updateLocale('en', {
    weekdays: [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
}
)
Dayjs.extend(isSameOrAfter)
Dayjs.extend(customParseFormat)

const globalLocaleData = Dayjs.localeData()

export { Dayjs, globalLocaleData }