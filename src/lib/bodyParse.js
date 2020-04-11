function bodyParse(req) {
    return new Promise((resolve, reject) => {
        let totalData = '';

        req
            .on('data', chunk => {
                totalData += chunk;
            })

            .on('end', () => {
                req.body = JSON.parse(totalData);
                resolve();
            })

            .on('error', (error) => {
                console.log(error);
                reject();
            })
    })
}

module.exports = {bodyParse}