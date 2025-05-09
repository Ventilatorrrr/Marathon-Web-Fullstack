class Model
{
    constructor(attributes) {
        if (attributes)
        {
            Object.assign(this, attributes);
        }
    }

    static async find(id)
    {
        throw new Error('find() method should be implemented in the subclass');
    }

    static async delete(id)
    {
        throw new Error('delete() method should be implemented in the subclass');
    }

    async save()
    {
        throw new Error('save() method should be implemented in the subclass');
    }
}

module.exports = Model;
