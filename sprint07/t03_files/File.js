const fs = require('fs');
const path = require('path');

class File
{
    constructor(name) {
        this.directory = path.join(__dirname, 'tmp');
        this.filePath = path.join(this.directory, name);

        if (!fs.existsSync(this.directory))
        {
            fs.mkdirSync(this.directory);
        }
    }

    write(content)
    {
        if (fs.existsSync(this.filePath))
        {
            fs.appendFileSync(this.filePath, content);
        }
        else
        {
            fs.writeFileSync(this.filePath, content);
        }
    }

    read()
    {
        if (fs.existsSync(this.filePath))
        {
            return fs.readFileSync(this.filePath, 'utf8');
        }
        return '';
    }

    delete()
    {
        if (fs.existsSync(this.filePath))
        {
            fs.unlinkSync(this.filePath);
        }
    }
}

module.exports = File;
