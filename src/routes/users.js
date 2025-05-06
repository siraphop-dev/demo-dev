import express from 'express';
import { listFromSheet, readDataFormSheets } from '../services/sheetService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await listFromSheet('users');
        res.json(users);
    } catch (error) {
        console.error('Error reading users:', error);
        res.status(500).json({ error: 'Failed to load users from Google Sheet' });
    }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
    try {
        const user = await readDataFormSheets(req.params.id, 'users');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error reading user:', error);
        res.status(500).json({ error: 'Failed to load user from Google Sheet' });
    }
});

export default router;
