
const filter = async (data, collection, key) => {
    let hasValue = await collection.find({ key: data });
    if (hasValue.length) {
        return { message: "No result", findValue: true, result: response }
    } else {
        return { message: "No result" }
    }


}

module.exports = filter