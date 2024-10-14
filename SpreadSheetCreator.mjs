import fs from 'fs/promises';
import path from 'path';
import xlsx from 'xlsx';

function sanitizeSheetName(name) {
    const invalidChars = /[\\/?*\[\]:]/g;
    let sanitized = name.replace(invalidChars, '');
    if (sanitized.length > 31) {
        sanitized = sanitized.substring(0, 31);
    }
    return sanitized || 'Sheet';
}

async function main() {
    try {
        const itemsDir = path.join(process.cwd(), 'src/items');
        const subfolders = await fs.readdir(itemsDir, { withFileTypes: true });

        const workbook = xlsx.utils.book_new();
        const errors = [];

        console.log('Starting processing of items...');

        const totalSubfolders = subfolders.filter(dirent => dirent.isDirectory()).length;
        let processedSubfolders = 0;

        for (const dirent of subfolders) {
            if (dirent.isDirectory()) {
                const subfolderName = dirent.name;
                const subfolderPath = path.join(itemsDir, subfolderName);
                let files;
                try {
                    files = await fs.readdir(subfolderPath);
                } catch (err) {
                    console.error(`Error reading directory ${subfolderPath}: ${err.message}`);
                    errors.push({ file: subfolderPath, error: err.message });
                    processedSubfolders++;
                    continue;
                }
                const data = [];

                console.log(`\nProcessing folder: ${subfolderName}`);

                const jsonFiles = files.filter(file => file.endsWith('.json'));
                const totalFiles = jsonFiles.length;
                let processedFiles = 0;

                for (const file of jsonFiles) {
                    const filePath = path.join(subfolderPath, file);
                    try {
                        const fileContent = await fs.readFile(filePath, 'utf8');
                        const jsonData = JSON.parse(fileContent);

                        const name = jsonData.name || '';
                        const type = jsonData.type || '';
                        let description = '';
                        let descFlag = '';

                        if (jsonData.description && jsonData.description.value !== undefined) {
                            description = jsonData.description.value;
                        } else if (jsonData.system && jsonData.system.description && jsonData.system.description.value !== undefined) {
                            description = jsonData.system.description.value;
                        }

                        // Check if description is empty or only whitespace
                        if (!description || !description.trim()) {
                            descFlag = 'NODESC';
                        }

                        // Truncate description if it exceeds 32767 characters
                        if (description && description.length > 32767) {
                            description = description.substring(0, 32767);
                            descFlag = descFlag ? descFlag + '; TRUNCATED' : 'TRUNCATED';
                        }

                        data.push({
                            name,
                            type,
                            description,
                            flag: descFlag
                        });

                    } catch (err) {
                        const errorMsg = `Error processing file ${filePath}: ${err.message}`;
                        console.error(errorMsg);
                        errors.push({ file: filePath, error: err.message });
                    }
                    processedFiles++;
                    // Simple progress display for files
                    process.stdout.write(`\rProcessed ${processedFiles}/${totalFiles} files in ${subfolderName}`);
                }
                console.log(); // Move to next line after processing files

                // Convert data to worksheet
                const worksheetData = data.map(item => ({
                    'Name': item.name,
                    'Type': item.type,
                    'Description': item.description,
                    'Flag': item.flag
                }));

                const worksheet = xlsx.utils.json_to_sheet(worksheetData);
                const sheetName = sanitizeSheetName(subfolderName);
                xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

                processedSubfolders++;
                // Simple progress display for subfolders
                process.stdout.write(`\rProcessed ${processedSubfolders}/${totalSubfolders} folders`);
            }
        }

        console.log('\n\nProcessing complete.');

        // Add errors sheet if there are errors
        if (errors.length > 0) {
            const errorSheetData = errors.map(err => ({
                'File': err.file,
                'Error': err.error
            }));
            const errorSheet = xlsx.utils.json_to_sheet(errorSheetData);
            xlsx.utils.book_append_sheet(workbook, errorSheet, 'Errors');
            console.log(`\nEncountered ${errors.length} errors. See 'Errors' sheet in output.xlsx for details.`);
        }

        // Write workbook to file
        xlsx.writeFile(workbook, 'output.xlsx');
        console.log('\nSpreadsheet generated successfully as output.xlsx');
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

main();
