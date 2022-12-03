import _ from "lodash";

type RecurringSchedule = {
    days: (1 | 2 | 3 | 4 | 5 | 6 | 7)[],
    start_date: string, // date string,
    daily_start_time: string, // time string,
    end_date: string, // date string,
    daily_end_time: string, // time string,
};

const toRecurringSchedule = (data: any): RecurringSchedule | undefined => {
    const days = _.get(data, "days");
    const startDate = _.get(data, "start_date");
    const dailyStartTime = _.get(data, "daily_start_time");
    const endDate = _.get(data, "end_date");
    const dailyEndTime = _.get(data, "daily_end_time");

    if (_.isNil(days) || !_.isArray(days) || days.some(d => _.isNaN(d) || ![1, 2, 3, 4, 5, 6, 7].includes(Number(d)))) {
        return undefined;
    }
    if (_.isNil(startDate) || !_.isString(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
        return undefined;
    }
    if (_.isNil(dailyStartTime) || !_.isString(dailyStartTime) || !/^\d{2}:\d{2}$/.test(dailyStartTime)) {
        return undefined;
    }
    if (_.isNil(endDate) || !_.isString(endDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
        return undefined;
    }
    if (_.isNil(dailyEndTime) || !_.isString(dailyEndTime) || !/^\d{2}:\d{2}$/.test(dailyEndTime)) {
        return undefined;
    }

    return {
        days: days,
        start_date: startDate,
        daily_start_time: dailyStartTime,
        end_date: endDate,
        daily_end_time: dailyEndTime,
    };
};

export { RecurringSchedule, toRecurringSchedule };
