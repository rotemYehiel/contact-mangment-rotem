const config = require('../../dbconfig');
const sql = require('mssql');
const tableName = 'Contacts';
const tableToConnect = 'Users';

const getContacts = async (userId, filterBy) => {
    try {
        var pool = await sql.connect(config);
        if (filterBy) {
            const filterQuery = `AND c.ContactName like '${filterBy}%'`;
            let contacts = await pool.request().query(`SELECT c.* from ${tableName} as c inner join ${tableToConnect} as u on c.UserId=u.Id where c.UserId=${userId} ${filterQuery ? (filterQuery) : ''}`);
            // console.log("contacts.recordset:", contacts.recordset)

            const newContacts = contacts.recordset.map(contact => {
                contact['Address'] = _createAddressOb(contact['Address']);
                contact['ContactName'] = _createNameOb(contact['ContactName']);
                return contact;
            })

            return newContacts;
        } else {
            let contacts = await pool.request().query(`SELECT c.* from ${tableName} as c inner join ${tableToConnect} as u on c.UserId=u.Id where c.UserId=${userId}`);
            console.log("contacts.recordset:", contacts.recordset)

            const newContacts = contacts.recordset.map(contact => {
                contact['Address'] = _createAddressOb(contact['Address']);
                contact['ContactName'] = _createNameOb(contact['ContactName']);
                return contact;
            })
            // console.log("newContacts:", newContacts)
            return newContacts;
        }
    } catch (error) {
        console.log(error)
    }
}

const getContactById = async (userId, contactId) => {
    try {
        var pool = await sql.connect(config);
        let contact = await pool.request()
            .query(`SELECT c.*
            from ${tableName} as c
            inner join ${tableToConnect} as u on c.UserId=u.Id
            where c.UserId=${userId} and c.Id=${contactId}`);
        const currContact = contact.recordset[0];
        currContact['Address'] = _createAddressOb(currContact['Address']);
        currContact['ContactName'] = _createNameOb(currContact['ContactName']);
        return currContact;
    } catch (error) {
        console.log(error)
    }
}

const addContact = async (contact) => {
    try {
        const name = _createNameStr(contact['ContactName']);
        const address = _createAddressStr(contact['Address']);
        console.log("address:", address)
        var pool = await sql.connect(config);
        let insertContact = await pool.request()
            .query(`insert into ${tableName} (ContactName, Phone, Email, Address,UserId ,UpdatedDate) values ('${name}','${contact['Phone']}','${contact['Email']}','${address}','${contact['UserId']}',GETDATE()); SELECT SCOPE_IDENTITY() AS id`);
        return {
            rowsAffected: insertContact.rowsAffected[0],
            id: insertContact.recordset[0].id
        };
    } catch (error) {
        console.log(error)
    }
}

const updateContact = async (userId, contact) => {
    try {
        const name = _createNameStr(contact['ContactName']);
        const address = _createAddressStr(contact['Address']);
        var pool = await sql.connect(config);
        let updateContact = await pool.request()
            .query(`UPDATE ${tableName} SET ContactName='${name}',Phone='${contact['Phone']}',Email='${contact['Email']}',Address='${address}',UpdatedDate=GETDATE() WHERE Id='${contact['Id']}' and UserId='${userId}'`);
        return { rowsAffected: updateContact.rowsAffected[0] };
    } catch (error) {
        console.log(error)
    }
}

const deleteContact = async (contactId) => {
    try {
        var pool = await sql.connect(config);
        let deleteContact = await pool.request()
            .query(`DELETE FROM ${tableName} WHERE Id=${contactId}`);
        return deleteContact.rowsAffected;
    } catch (error) {
        console.log(error)
    }
}

const _createAddressStr = (address) => {
    const values = Object.values(address);
    const keys = Object.keys(address);
    const foundValues = values.filter((value, index) => {
        if (value !== null) return value;
        return `${value} ${keys[index]}`
    })
    // let str = foundValues.join(" ,")
    let str = foundValues.join(",")
    return str
    // return `${address['Street'] ? address['Street'] : null} ,${address['City'] ? address['City'] : null} ,${address['State'] ? address['State'] : null} ,${address['Postal Code']}`
}
const _createAddressOb = (addressStr) => {
    const arr = addressStr.split(',');
    const addressOb = {
        'Street': arr[0] ? (arr[0].substr(0, arr[0].length - 1)) : null,
        'City': arr[1] ? (arr[1].substr(0, arr[1].length - 1)) : null,
        'State': arr[2] ? (arr[2].substr(0, arr[2].length - 1)) : null,
        'Postal Code': arr[3] ? arr[3] : null
    };
    return addressOb

}
const _createNameOb = (nameStr) => {
    const arr = nameStr.split(' ');
    return {
        'FirstName': arr[0],
        'LastName': arr[1]
    };
}
const _createNameStr = (name) => {
    return `${name['FirstName']} ${name['LastName']}`;
}
module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact
}
