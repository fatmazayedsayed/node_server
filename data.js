let id = 1;

export const newId = () => {
    return id++;
}

const data = [
    { id: newId(), make: 'fender', model: 'start' },
    { id: newId(), make: 'fender#1', model: 'startxyz ' },
    { id: newId(), make: 'fender#2', model: 'start MNO' },
    { id: newId(), make: 'fender#3', model: 'start ABC' },
    { id: newId(), make: 'fender#4', model: 'start Test' },
];

export default data;

export const totalCount = () => {
    return data.length;  // Correct spelling and reference to the array
};