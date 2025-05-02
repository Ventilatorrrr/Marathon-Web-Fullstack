const fs = require('fs');
const path = './notes.json';

class NotePad
{
    constructor() {
        this.notes = this.loadNotes();
    }

    loadNotes()
    {
        try
        {
            const raw = fs.readFileSync(path, 'utf-8');
            return JSON.parse(raw);
        }
        catch (e)
        {
            return [];
        }
    }

    saveNotes()
    {
        fs.writeFileSync(path, JSON.stringify(this.notes, null, 2));
    }

    add(note)
    {
        this.notes.push(note);
        this.saveNotes();
    }

    delete(date)
    {
        this.notes = this.notes.filter(n => n.date !== date);
        this.saveNotes();
    }

    find(date)
    {
        return this.notes.find(n => n.date === date);
    }

    all()
    {
        return this.notes;
    }
}

module.exports = NotePad;
