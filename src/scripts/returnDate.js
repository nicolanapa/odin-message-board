function returnDate() {
    const actualDate = new Date();

    return (
        (actualDate.getUTCHours() < 10 ? "0" + actualDate.getUTCHours() : actualDate.getUTCHours()) +
        ":" +
        (actualDate.getUTCMinutes() < 10 ? "0" + actualDate.getUTCMinutes() : actualDate.getUTCMinutes()) +
        ":" +
        (actualDate.getUTCSeconds() < 10 ? "0" + actualDate.getUTCSeconds() : actualDate.getUTCSeconds()) +
        ", " +
        actualDate.getUTCDate() +
        "/" +
        (actualDate.getUTCMonth() + 1) +
        "/" +
        actualDate.getUTCFullYear()
    );
}

export default returnDate;
