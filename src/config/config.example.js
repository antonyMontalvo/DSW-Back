module.exports = {
    server: {
        host: 'localhost',
        port: '5009'
    },
    db: {
        host: 'localhost',
        port: '27017',
        database: 'DSWDB',
        user: '',
        password: '',
        dialect: 'mongodb'
    },
    tokens: {
        USER_KEY: ''
    },
    email: {
        service: 'gmail',
        user: '',
        pass: ''
    },
    url: {
        urlV1: '/api/v1'
    },
    image:{
        user: {
            path: __dirname + '/public/images/user',
            publicUrl: '/public/user'
        }
    }
}