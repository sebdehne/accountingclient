export const comma = ",";
export const digit_separator = ".";

export const amountToString = function (amount) {
  var asStr = amount.toString();

  var negative = "";
  if (asStr.indexOf("-") === 0) {
    negative = "-";
    asStr = asStr.substring(1);
  }

  // add padding
  if (asStr.length == 1) {
    asStr = "0" + asStr;
  }
  if (asStr.length == 2) {
    asStr = "0" + asStr;
  }

  // ore
  var ore = asStr.substring(asStr.length - 2);
  var krone = asStr.substring(0, asStr.length - 2);

  var tmp = "";
  while (krone.length > 0) {

    if (tmp.length > 0) {
      tmp = digit_separator + tmp;
    }

    tmp = krone.substring(krone.length - 3) + tmp;
    krone = krone.substring(0, krone.length - 3);
  }

  return negative + tmp + comma + ore;
};

export const unixTimestampToDateString = function (timestamp) {
  var date = new Date(timestamp * 1000);
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString();
  if (month.length == 1) {
    month = "0" + month;
  }
  var day = date.getDate().toString();
  if (day.length == 1) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
};