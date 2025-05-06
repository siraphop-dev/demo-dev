import express from 'express';
import { listFromSheet, readDataFormSheets } from '../services/sheetService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const roles = await listFromSheet('roles');
        res.json(roles);
    } catch (error) {
        console.error('Error reading roles:', error);
        res.status(500).json({ error: 'Failed to load roles from Google Sheet' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const role = await readDataFormSheets(req.params.id, 'roles');
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.json(role);
    } catch (error) {
        console.error('Error reading role:', error);
        res.status(500).json({ error: 'Failed to load role from Google Sheet' });
    }
});

export default router;
