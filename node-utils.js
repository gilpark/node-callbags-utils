module.exports.promisify = (fn) => {
    return function promisified(...params) {
        return new Promise((resolve, reject) => fn(...params.concat([(err, ...args) => err ? reject(err) : resolve( args.length < 2 ? args[0] : args )])))
    }
}

module.exports.toLocaleUTCDateString = (date) => {
    let formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })

    return formatter.formatToParts(date).map(({type, value}) => {
        switch (type) {
            case 'day': return date.getUTCDate();
            case 'hour': return date.getUTCHours();
            case 'minute': return date.getUTCMinutes();
            case 'month': return date.getUTCMonth() + 1;
            case 'second': return date.getUTCSeconds();
            case 'timeZoneName': return "UTC";
            case 'year': return date.getUTCFullYear();
            default : return value;
        }
    }).reduce((string, part) => string + part);
}

//todo use regex to return mm/dd/yyyy or mm/dd etc
function getDateTime() {
    let d = new Date();
    return ("00" + (d.getMonth() + 1)).slice(-2) + "/" +
        ("00" + d.getDate()).slice(-2) + "/" +
        ("00" + d.getFullYear()).slice(-2) + "-" +
        ("00" + d.getHours()).slice(-2) + ":" +
        ("00" + d.getMinutes()).slice(-2) + ":" +
        ("00" + d.getSeconds()).slice(-2)
}
