import { TIME_SERIES_INTRADAY } from "../constants";

const modifyDateTime = (date: string, func: string) => {
  switch (func) {
    case TIME_SERIES_INTRADAY:
      return new Date(date.split(" ").join("T")).getTime();
    default:
      return new Date(date);
  }
};

export default modifyDateTime;
