
import dataDefault from './data.js';

export const createList = ({ id, make, model }) =>
    `<li>
        <a href="?id=${id}">${make} ${model}</a>
        <a href="/delete/${id}">Delete</a>
    </li>`;

export const showList = () => {
    return `<ul>
      ${dataDefault.map(createList).join('\n')}
    </ul>`;
};

export const getItemContent = (id) => {
    const item = dataDefault.find(g => g.id == id);
    if (item) {
        return `<h2>Item: ${item.model}, Make: ${item.make}</h2>`;
    }
    return 'Item not found';
};

export const deleteItem = (id) => {
     //dataDefault.filter(g => g.id != id);  // Filter out the item
     const item=dataDefault.findIndex(g => g.id == id);  // Filter out the item
     dataDefault.splice(item,1);
}
export const redirectBack = (response, to) => {
    response.writeHead(302, { location: to, 'Content-Type': "text/plain" });
    response.end(`redirect to ${to}`);
}
