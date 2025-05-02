const fs = require('fs');
const path = require('path');

class FileList
{
    constructor() {
        this.directory = path.join(__dirname, 'tmp');

        if (!fs.existsSync(this.directory))
        {
            fs.mkdirSync(this.directory);
        }
    }

    getList()
    {
        return fs.readdirSync(this.directory);
    }

    hasFiles()
    {
        return this.getList().length > 0;
    }

    getHTMLList()
    {
        return '<ul>' +
                this.getList()
                        .map(file => `<li><a href="/select-file?file=${encodeURIComponent(file)}">${file}</a></li>`)
                        .join('') +
                '</ul>';
    }
}

module.exports = FileList;
