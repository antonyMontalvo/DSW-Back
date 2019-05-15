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
        USER_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW50b255IEFiZWwiLCJwYXNzd29yZCI6OTg3NjU0MzIxLCJjcmVkZW50aWFsIjoiYWRtaW4ifQ.ruKiqFFxdOtZ1kAaGVtx6fcXs7orucfq3f99jYIxEiM'
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