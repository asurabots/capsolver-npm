const Captchaai = require('captchaai-npm');
const handler = new Captchaai('CAI-XXX', 1);

(async function () {
    await handler.recaptchav2proxyless('https://www.nakedcph.com/en/auth/view', '6LeNqBUUAAAAAFbhC-CS22rwzkZjr_g4vMmqD_qo')
        .then(response => {
            if (response.error === 0) {
                console.log(response.solution)
            } else {
                console.log('error ' + JSON.stringify(response.apiResponse))
            }
        })
})();