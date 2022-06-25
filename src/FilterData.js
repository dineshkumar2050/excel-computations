export const filterData = (data, month, year, filterByIndex) => {
    if(!year || !month) return false;
    let filterStr = '';
    // if(!month) {
    //     filterStr = String(month);
    // } else if(!year) {
    //     filterStr = String(year);
    // } 
    // else {
        filterStr = `${year}${month}`;
    // }
    if(data[filterByIndex] && data[filterByIndex].length && String(data[filterByIndex]).includes(filterStr)) return true;
    return false;
}
