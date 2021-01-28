const axios = require('axios')
const _ = require('lodash')
const instance = axios.create({
    baseURL: 'https://api.production.fidelidade.cplug.info/',
})
instance.interceptors.request.use(config => {
    config.headers[
        'Authorization'
    ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJyb2dlcmlvQGJ1YmJsZW1peHRlYS5jb20iLCJ1aWRfdHlwZSI6ImFkbWluIiwianRpIjoidE1oWXVQcmVSYXY4MWVzWnRlaUxkSCIsImlzcyI6IkNvbm5lY3RQbHVnIiwiaWF0IjoxNjExNzY5Mjg4MDMzLCJleHAiOjE2MTE4MDUyODgwMzMsIm5hbWUiOiJSb2fDqXJpbyBBcmNhbmpvIiwicm9sZXMiOlt7ImNvbXBhbnlfaWQiOiJ2eTFGU21MRmRZalQ3czhDaHBmYmRCIiwicm9sZSI6ImFkbWluIn1dLCJjb21wYW55X2lkIjoidnkxRlNtTEZkWWpUN3M4Q2hwZmJkQiJ9.3rWQMpUZdz8ljFmQpX0dIOWSNwsywYXGSAfNvIjxB08`
    config.headers['Accept'] = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    config.headers['company-id'] = 'vy1FSmLFdYjT7s8ChpfbdB'
    config.headers['Accept-Language'] = 'pt-BR'
    // Precisa que data seja um objeto para enviar o Content-Type
    if (!config.data) {
        config.data = {}
    }
    // config.baseURL = process.env.API_HOST
    config.timeout = 15000
    return config
})


async function deleteAllCustomers() {
    for (let i = 1; i < 2000; i++) {
        await getCustomers(i)
    }
}

async function getCustomers(page) {
    let response = await instance.get('customer/list', {
        params: {
            per_page: 5,
            page,
        },
    })
    _.forEach(response.data, async (value) => {
        await deleteCustomers(value.id)

        console.log(value.id)
    })

}

async function deleteCustomers(id){
    let response = await instance.delete('customer', {
        params: {
            customer_id: id
        }
    })

     console.log(response)
}

deleteAllCustomers()

