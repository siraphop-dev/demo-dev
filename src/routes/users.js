import express from 'express';
import {
    listFromSheet,
    readDataFormSheets,
    addRowToSheet,
    updateRowById,
    deleteRowById
} from '../services/sheetService.js';

const router = express.Router();

const SHEET_NAME = 'users';

router.get('/', async (req, res) => {
    const users = await listFromSheet(SHEET_NAME);
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await readDataFormSheets(req.params.id, SHEET_NAME);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

router.post('/', async (req, res) => {
    try {
        const newUser = await addRowToSheet(SHEET_NAME, req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updated = await updateRowById(req.params.id, SHEET_NAME, req.body);
        if (!updated) return res.status(404).json({ error: 'User not found' });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

router.delete('/:id', async (req, res) => {
    const deleted = await deleteRowById(req.params.id, SHEET_NAME);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
});

export default router;
