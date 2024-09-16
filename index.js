import { createServer } from 'http';
import { showList, getItemContent, deleteItem, redirectBack } from './dataCRUD.js'; // Adjust import for ES Modules

const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const id = url.searchParams.get('id');
    const parts = req.url.split('/');
    // if (parts.includes('delete')) {
    //     deleteItem(parts[2]);
    //     redirectBack(res, '/');
    // }
    // else {
    //     req.writeHead(200, { 'Content-Type': 'text/html' });
    // }
    // Handle delete operation
    if (parts[1] === 'delete' && parts[2]) {
        deleteItem(parts[2]);  // Delete the item based on its ID
        redirectBack(res, '/');  // Redirect to the home page after deletion
        return;  // Ensure no further processing after redirect
    }
    const constant = `
    <html>
        <body>
            <h2> My Data</h2>
            ${id ? getItemContent(id) : showList()}
        </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.end(constant);
});

server.listen(8080, () => {
    console.log(`Server is listening on port ${server.address().port}`);
});
