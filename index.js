import { createServer } from 'http';
import { showList, getItemContent, deleteItem, redirectBack, save, getForm } from './dataCRUD.js'; // Adjust import for ES Modules
import { totalCount } from './data.js';     // Import newId

const server = createServer((req, res) => {
    const parts = req.url.split('/');

    switch (parts[1]) {
        case 'view':
            {
                const content = getItemContent(parts[2]);  // Get the content of the item based on its ID
                res.setHeader('Content-Type', 'text/html');
                res.end(`<html><body>${content}</body></html>`);
                break;
            }
        case 'delete':
            {
                deleteItem(parts[2]);  // Delete the item based on its ID
                redirectBack(res, '/');  // Redirect to the home page after deletion
                break;
            }
        case 'add':
            {
                const form = getForm();  // Get the form HTML for adding an item
                res.setHeader('Content-Type', 'text/html');
                res.end(`<html><body>${form}</body></html>`);
                break;
            }

        case 'save':
            {
                save(req, res);
                break;
            }
        default:
            {
                const url = new URL(req.url, 'http://localhost');
                const id = url.searchParams.get('id');
                const constant = `
                <html>
                    <body>
                        <h2>My Data Total Count = ${totalCount()}</h2>
                        ${id ? getItemContent(id) : showList()}
                    </body>
                </html>
                `;
                res.setHeader('Content-Type', 'text/html');
                res.end(constant);
                break;
            }
    }
});

server.listen(8080, () => {
    console.log(`Server is listening on port ${server.address().port}`);
});
