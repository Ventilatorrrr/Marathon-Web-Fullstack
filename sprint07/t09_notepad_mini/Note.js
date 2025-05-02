class Note
{
    constructor(name, importance, text) {
        this.date = new Date().toISOString().replace('T', ' ').split('.')[0];
        this.name = name;
        this.importance = importance;
        this.text = text;
    }
}

module.exports = Note;
