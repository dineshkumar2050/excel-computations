/* eslint-disable import/no-anonymous-default-export */
export default () => {
    onmessage = function(event) {
        const t0 = performance.now();
        const getResultantData = (data) => {
            const { dataToBeSent, repeatingDataIndex, companyNameIndexToInsertInDataAt, resultantLabel, resultantLabelWithIndexes, startIndex } = data;
            const dataWithoutLabel = [];
            let index = startIndex;
            for(const company in dataToBeSent) {
                const elem = new Array(resultantLabel.length).fill(null);
                elem[0] = index;
                elem[companyNameIndexToInsertInDataAt] = company;
                for(const date in dataToBeSent[company]) {
                    const indexToInsertValueAt = resultantLabelWithIndexes[date];
                    elem[indexToInsertValueAt] = dataToBeSent[company][date][repeatingDataIndex];
                }
                dataWithoutLabel.push(elem)
                index++;
            }
            return dataWithoutLabel;
        }
        const result = getResultantData(event.data);
        const t1 = performance.now();
        const diff = Math.round(t1 - t0);
        console.log("::Start Calculation for resultant converted dta:: ", t0, t1);
        postMessage({ result, timeTaken: diff });
    }
}
