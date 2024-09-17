import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { showList, getItemContent, deleteItem, redirectBack, save, getForm } from './dataCRUD.js';
import { totalCount } from './data.js';

const server = createServer(async (req, res) => {
    const parts = req.url.split('/');

    // Asynchronously read the CSS file
    let css = '';
    try {
        css = await readFile('./public/assets/css/style.css', { encoding: 'utf-8' });
    } catch (err) {
        console.error("CSS file not found", err);
    }

    const styleTag = `<style>${css}</style>`; // Embed CSS inside <style> tags for inline styling

    switch (parts[1]) {
        case 'view':
            {
                const content = getItemContent(parts[2]);
                res.setHeader('Content-Type', 'text/html');
                res.end(`<html>
                    <head>${styleTag}</head>
                    <body>${content}</body>
                </html>`);
                break;
            }
        case 'delete':
            {
                deleteItem(parts[2]);
                redirectBack(res, '/');
                break;
            }
        case 'add':
            {
                const form = getForm();
                res.setHeader('Content-Type', 'text/html');
                res.end(`<html>
                    <head>${styleTag}</head>
                    <body>${form}</body>
                </html>`);
                break;
            }
        case 'save':
            {
                save(req, res);
                break;
            }
        default:
            {
                const url = new URL(req.url, 'http://localhost:8080');
                const id = url.searchParams.get('id');
                const content = id ? getItemContent(id) : showList();
                res.setHeader('Content-Type', 'text/html');
                res.end(`
                <html>
                    <head>${styleTag}</head>
                    <body>
                        <h2>My Data Total Count = ${totalCount()}</h2>
                        ${content}
                    </body>
                </html>
                `);
                break;
            }
    }
});

server.listen(8080, () => {
    console.log(`Server is listening on port ${server.address().port}`);
});
