let houseMixin = {
    wordReplace(oldWord, newWord)
    {
        if (this.description.includes(oldWord))
        {
            this.description = this.description.replace(oldWord, newWord);
        }
    },

    wordInsertAfter(targetWord, newWord)
    {
        if (this.description.includes(targetWord))
        {
            this.description = this.description.replace(targetWord, `${targetWord} ${newWord}`);
        }
    },

    wordDelete(word)
    {
        this.description = this.description.replace(word, '');
    },

    wordEncrypt()
    {
        let result = '';
        for (let i = 0; i < this.description.length; i++)
        {
            let char = this.description[i];
            let code = char.charCodeAt(0);

            if (code >= 65 && code <= 90)
            {
                result += String.fromCharCode(((code - 65 + 13) % 26) + 65);
            } else if (code >= 97 && code <= 122)
            {
                result += String.fromCharCode(((code - 97 + 13) % 26) + 97);
            } else
            {
                result += char;
            }
        }
        this.description = result;
    },

    wordDecrypt()
    {
        this.wordEncrypt();
    }
}