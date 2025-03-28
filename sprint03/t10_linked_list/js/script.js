class Node
{
    constructor(data)
    {
        this.data = data;
        this.next = null;
    }
}

class LinkedList
{
    constructor()
    {
        this.head = null;
        this.length = 0;
    }

    add(value)
    {
        const newNode = new Node(value);
        if (!this.head)
        {
            this.head = newNode;
        } else
        {
            let current = this.head;
            while (current.next)
            {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }

    remove(value)
    {
        if (!this.head)
        {
            return false;
        }

        if (this.head.data === value)
        {
            this.head = this.head.next;
            this.length--;
            return true;
        }

        let current = this.head;
        while (current.next)
        {
            if (current.next.data === value)
            {
                current.next = current.next.next;
                this.length--;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    contains(value)
    {
        let current = this.head;
        while (current)
        {
            if (current.data === value)
            {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    [Symbol.iterator]()
    {
        let current = this.head;
        return{
            next()
            {
                if (current)
                {
                    const value = current.data;
                    current = current.next;
                    return { value: value, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

    clear()
    {
        this.head = null;
        this.length = 0;
    }

    count()
    {
        return this.length;
    }

    log()
    {
        let current = this.head;
        let result = "";
        while (current)
        {
            result += current.data;
            if (current.next)
            {
                result += ", ";
            }
            current = current.next;
        }
        console.log(result);
    }
}

function createLinkedList(arr)
{
    const list = new LinkedList();
    for (const value of arr)
    {
        list.add(value);
    }
    return list;
}