const pool = require('../db');
const Model = require('../model');

class Hero extends Model
{
    constructor(attributes) {
        super(attributes);
    }

    static async find(id)
    {
        return new Promise((resolve, reject) => {
            pool.execute('SELECT * FROM heroes WHERE id = ?', [id], (err, rows) => {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    if (rows.length === 0)
                    {
                        resolve(null);
                    }
                    else
                    {
                        resolve(new Hero(rows[0]));
                    }
                }
            });
        });
    }

    static async delete(id)
    {
        return new Promise((resolve, reject) => {
            Hero.find(id)
                    .then(hero => {
                        if (!hero)
                        {
                            reject(new Error(`Hero with id ${id} not found`));
                        }
                        else
                        {
                            pool.execute('DELETE FROM heroes WHERE id = ?', [id], (err) => {
                                if (err)
                                {
                                    reject(err);
                                }
                                else
                                {
                                    resolve();
                                }
                            });
                        }
                    })
                    .catch(reject);
        });
    }

    async save()
    {
        return new Promise((resolve, reject) => {
            if (this.id)
            {
                pool.execute(
                        'UPDATE heroes SET name = ?, description = ?, class_role = ?, race_id = ? WHERE id = ?',
                        [this.name, this.description, this.class_role, this.race_id, this.id],
                        (err) => {
                            if (err)
                            {
                                reject(err);
                            }
                            else
                            {
                                resolve();
                            }
                        }
                );
            }
            else
            {
                pool.execute(
                        'INSERT INTO heroes (name, description, class_role, race_id) VALUES (?, ?, ?, ?)',
                        [this.name, this.description, this.class_role, this.race_id],
                        (err, result) => {
                            if (err)
                            {
                                reject(err);
                            }
                            else
                            {
                                this.id = result.insertId;
                                resolve();
                            }
                        }
                );
            }
        });
    }
}

module.exports = Hero;
