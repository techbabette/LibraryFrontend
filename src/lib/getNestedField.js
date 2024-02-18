function getValue(obj, nestedField) {
    if (!nestedField) return obj;
    const properties = nestedField.split('.');
    return getValue(obj[properties.shift()], properties.join('.'))
}

export default getValue;