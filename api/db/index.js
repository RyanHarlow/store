const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDB}`,{logging: false}); // Example for postgres


async function initDb() {
    try {
        await sequelize.authenticate();
        //console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initDb();

    const Person = sequelize.define('Person', {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permission: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'
        },
    }, {
        // Other model options go here
    });


    const Category = sequelize.define('Category', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subCategoryOf: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    const Item = sequelize.define('Item', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        qtyInStock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        photos: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        category: {
            type: DataTypes.INTEGER,
            references: {
                // This is a reference to another model
                model: Category,

                // This is the column name of the referenced model
                key: 'id',
            }
        }
    });


    const Order =  sequelize.define('Order', {
        items: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
        account: {
            type: DataTypes.INTEGER,
            references: {
                // This is a reference to another model
                model: Person,

                // This is the column name of the referenced model
                key: 'id',
            },
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })

    const syncFunction = async () => {
        try {
            await sequelize.sync();
        }catch(err){
            console.log(err);
        }
    }

    syncFunction();

module.exports = {
    sequelize,
    Order,
    Category,
    Person,
    Item
}
