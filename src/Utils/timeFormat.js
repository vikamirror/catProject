export function formatDateTime (isoString) {
    const date = new Date(isoString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    // return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${strTime}`;
}

export function timeFromNow (previousISOString) {
    const perMinute = 60 * 1000;
    const perHour = perMinute * 60;
    const perDay = perHour * 24;
    const perMonth = perDay * 30;
    const perYear = perDay * 365;

    const currentTime = new Date();
    const previousTime = new Date(previousISOString);
    const elapsed = currentTime - previousTime;

    if (elapsed < perMinute) {
        return `${Math.round(elapsed/1000)}秒鐘 前`;
    }
    else if (elapsed < perHour) {
        return `${Math.round(elapsed/perMinute)}分鐘 前`;
    }
    else if (elapsed < perDay) {
        return `${Math.round(elapsed/perHour)}小時 前`;
    }
    else if (elapsed < perMonth) {
        return `${Math.round(elapsed/perDay)}天 前`;
    }
    else if (elapsed < perYear) {
        return `${Math.round(elapsed/perMonth)}個月 前`;
    }
    else {
        return `${Math.round(elapsed/perYear)}年 前`;
    }
}