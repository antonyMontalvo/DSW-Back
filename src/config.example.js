module.exports = {
    HOST: 'localhost:5000',
    db: {
        host: '',
        port: '27017',
        database: 'DB',
        user: '',
        password: '',
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
    image: {
        user: {
            path: __dirname + '/public/images/user',
            publicUrl: '/public/user'
        }
    }
}