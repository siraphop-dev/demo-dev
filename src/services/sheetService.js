import doc from '../config/google.js';

export const listFromSheet = async (sheetName) => {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetName] || doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    return rows.map(row => row.toObject());
};

export const readDataFormSheets = async (id, sheetName) => {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetName] || doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const row = rows.find(row => {
        const rowObj = row.toObject();
        return rowObj.id?.toString() === id.toString();
    });
    return row ? row.toObject() : null;
};

