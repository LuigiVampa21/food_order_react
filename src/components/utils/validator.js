const isEmpty = value => {
    return value.trim() === "";
}

const isFiveChars = value => {
    return value.trim().length === 5;
}

module.exports = {isEmpty, isFiveChars};