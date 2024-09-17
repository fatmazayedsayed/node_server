
import dataDefault from './data.js';
import * as querystring from 'querystring';  // Import querystring module
export const createList = ({ id, make, model }) =>
    `<li>
        <a href="/view/${id}">${make} ${model}</a>
        <a href="/delete/${id}">Delete</a>
    </li>`;

export const showList = () => {
    return `
     <a href="/add">Add New Item</a>
    <ul>
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
    const item = dataDefault.findIndex(g => g.id == id);  // Filter out the item
    dataDefault.splice(item, 1);
}

export const redirectBack = (response, to) => {
    response.writeHead(302, { location: to, 'Content-Type': "text/plain" });
    response.end(`redirect to ${to}`);
}

export const getForm = () => {
    return `<form method='post' action='/save'>
    <div>
         <div> Make: <input type='text' name='make' /></div>
         <div> Model: <input type='text' name='model' /></div>
         <button type='submit'>Save</button>
    </div>
    </form>`;
}

export const save = (req, res) => {
    let body = '';

    // Listen for 'data' event to collect chunks of data
    req.on('data', (chunk) => {
        body += chunk.toString();  // Convert binary buffer to string and append to body
    });

    // When the request has finished receiving the data
    req.on('end', () => {
        const parsedData = querystring.parse(body);  // Parse the form data using querystring.parse
        console.log(parsedData);
        const make = parsedData.make;
        const model = parsedData.model;

        // Add the new item to your data (assuming you have a data array)
        const newItem = {
            id: Date.now(),  // Use current timestamp as a unique ID
            make,
            model
        };

        // Assuming `dataDefault` is accessible here, either by import or some shared state
        dataDefault.push(newItem);  // Add the new item to the data array

        // Redirect back to the home page after saving
        res.writeHead(302, { 'Location': '/' });
        res.end();
    });
}
