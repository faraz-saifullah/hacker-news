export function findTimeDifference(time) {
  let postedOn = new Date(time);
  let current = new Date(Date.now());
  let yearDiff = current.getFullYear() - postedOn.getFullYear();
  if (yearDiff !== 0) {
    return `${yearDiff} years`;
  }
  let monthDiff = current.getMonth() - postedOn.getMonth();
  if (monthDiff !== 0) {
    return `${monthDiff} months`;
  }
  let dayDiff = current.getDay() - postedOn.getDay();
  if (dayDiff !== 0) {
    return `${dayDiff} days`;
  }
  let hoursDiff = current.getHours() - postedOn.getHours();
  if (hoursDiff !== 0) {
    return `${hoursDiff} hours`;
  }
  let minutesDiff = current.getMinutes() - postedOn.getMinutes();
  if (minutesDiff !== 0) {
    return `${minutesDiff} minutes`;
  }
  let secsDiff = current.getSeconds() - postedOn.getSeconds();
  if (secsDiff !== 0) {
    return `${secsDiff} seconds`;
  }
  return 'no time';
}

export function getDomainName(postLink) {
  let link = postLink.replace('https://', '');
  link = link.replace('www.', '');
  link = link.split('/')[0];
  return link;
}
