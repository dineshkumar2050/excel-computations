export const dateValidator = (label, value) => {
    const stringifiedCurrentValue = String(label.toLowerCase());
    const dateRegex = /[0-9]{4,4}[-][0-9]{2,2}[-][0-9]{2,2}/;
    const isDateFilter = (stringifiedCurrentValue.includes('date') || 
        stringifiedCurrentValue.includes('year') || 
        stringifiedCurrentValue.includes('month') || 
        stringifiedCurrentValue.includes('day')) &&
        dateRegex.test(value);

    return isDateFilter;
}

export const dateConverter = (dateValue) => {
    const dateContent = String(dateValue).split('-');    
    const monthValue = dateContent[1];
    const yearValue = dateContent[0];
    return `${yearValue}${monthValue}`;
}
