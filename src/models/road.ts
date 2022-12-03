import _ from "lodash";

interface Road {
    name: string,
    from?: string,
    direction: string,
    to?: string,
    state?: string,
    delay?: string,
};

const isRoad = (data: any) => {
    const name = _.get(data, "name");
    const from = _.get(data, "from");
    const direction = _.get(data, "direction");
    const to = _.get(data, "to");
    const state = _.get(data, "state");
    const delay = _.get(data, "delay");

    if (!_.isString(name) || !_.isString(direction)) {
        return false;
    }

    if (!_.isNil(from) && !_.isString(from)) {
        return false;
    }
    if (!_.isNil(to) && !_.isString(to)) {
        return false;
    }
    if (!_.isNil(state) && !_.isString(state)) {
        return false;
    }
    if (!_.isNil(delay) && !_.isString(delay)) {
        return false;
    }

    return true;
};

export { Road, isRoad };
