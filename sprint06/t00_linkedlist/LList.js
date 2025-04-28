const LLData = require('./LLData');

class LList
{
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    getFirst()
    {
        return this.head;
    }

    getLast()
    {
        return this.tail;
    }

    add(value)
    {
        const newNode = new LLData(value);
        if (!this.head)
        {
            this.head = newNode;
            this.tail = newNode;
        }
        else
        {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    addFromArray(arrayOfData)
    {
        for (const item of arrayOfData)
        {
            this.add(item);
        }
    }

    remove(value)
    {
        if (!this.head) return;

        if (this.head.data === value)
        {
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            this.length--;
            return;
        }

        let current = this.head;
        while (current.next && current.next.data !== value)
        {
            current = current.next;
        }

        if (current.next)
        {
            if (current.next === this.tail) this.tail = current;
            current.next = current.next.next;
            this.length--;
        }
    }

    removeAll(value)
    {
        while (this.head && this.head.data === value)
        {
            this.head = this.head.next;
            this.length--;
        }

        if (!this.head)
        {
            this.tail = null;
            return;
        }

        let current = this.head;
        while (current.next)
        {
            if (current.next.data === value)
            {
                if (current.next === this.tail) this.tail = current;
                current.next = current.next.next;
                this.length--;
            }
            else
            {
                current = current.next;
            }
        }
    }

    contains(value)
    {
        let current = this.head;
        while (current)
        {
            if (current.data === value) return true;
            current = current.next;
        }
        return false;
    }

    clear()
    {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    count()
    {
        return this.length;
    }

    toString()
    {
        const result = [];
        let current = this.head;
        while (current)
        {
            result.push(current.data);
            current = current.next;
        }
        return result.join(', ');
    }

    filter(callback)
    {
        const filteredList = new LList();
        let current = this.head;
        while (current)
        {
            if (callback(current.data))
            {
                filteredList.add(current.data);
            }
            current = current.next;
        }
        return filteredList;
    }

    [Symbol.iterator]()
    {
        let current = this.head;
        return {
            next() {
                if (current)
                {
                    const value = current.data;
                    current = current.next;
                    return { value, done: false };
                }
                else
                {
                    return { done: true };
                }
            }
        };
    }
}

module.exports = { LList };