const axios = require('axios')
const _ = require('lodash')
const instance = axios.create({
    baseURL: 'https://api.production.fidelidade.cplug.info/',
})
instance.interceptors.request.use(config => {
    config.headers[
        'Authorization'
    ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtYXRoZXVzdGVpeGVpcmEuY3BsdWdAZ21haWwuY29tIiwidWlkX3R5cGUiOiJhZG1pbiIsImp0aSI6ImQ5Y2NmUUhFZ0JYcVJ1dWs1djMyS3IiLCJpc3MiOiJDb25uZWN0UGx1ZyIsImlhdCI6MTYxMzU3NjY1NDY5OSwiZXhwIjoxNjEzNjEyNjU0Njk5LCJuYW1lIjoibWF0aGV1cyB0ZWl4ZWlyYSBjcGx1ZyIsInJvbGVzIjpbeyJjb21wYW55X2lkIjoidnkxRlNtTEZkWWpUN3M4Q2hwZmJkQiIsInJvbGUiOiJhZG1pbiJ9XSwiY29tcGFueV9pZCI6InZ5MUZTbUxGZFlqVDdzOENocGZiZEIifQ.q27AO_MfonfjgdLez6L5wXlvjmu4kbBk5e2vksMQ0TU`
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

async function findByEmail() {
    for (let i = 1; i < 2000; i++) {
        await getCustomers(i)
    }
}

async function getCustomers(page) {
    let emailRequested = "matheusteixeira.cplug@gmail.com"
    let response = await instance.get('customer/list', {
        params: {
            per_page: 5,
            page,
        },
    })

    let user = response.data.find(
        ele => ele.email === emailRequested
    )

    if(user) {

        console.log(user)

        return user
    }

}

findByEmail()
