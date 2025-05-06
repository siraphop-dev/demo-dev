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
    const row = rows.find(row => row.toObject().id?.toString() === id.toString());
    return row ? row.toObject() : null;
};

export const addRowToSheet = async (sheetName, data) => {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetName] || doc.sheetsByIndex[0];
    const newRow = await sheet.addRow(data);
    return newRow.toObject();
};

export const updateRowById = async (id, sheetName, newData) => {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetName] || doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const row = rows.find(r => {
        const obj = r.toObject();
        return obj.id?.toString() === id.toString();
    });

    if (!row) return null;

    row.assign(newData);     // ✅ อัปเดตหลาย key พร้อมกัน
    await row.save();        // ✅ ต้องเรียก save()
    return row.toObject();
};

export const deleteRowById = async (id, sheetName) => {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[sheetName] || doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const row = rows.find(row => row.toObject().id?.toString() === id.toString());
    if (!row) return false;

    await row.delete();
    return true;
};
