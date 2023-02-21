const CapSolver = require('../src/CapSolver');
const handler = new CapSolver('CAI-XXXX ...');

(async function() {
    await handler.antiturnstile(
'https://website.com/',
'sitekey',
        {'proxy': 'proxy.provider.io:23331:user1:password1'},
        {'type':'turnstile'}
    ).then((captcha) => { if(captcha.error !== 0){ console.log(captcha.apiResponse) }else{ console.log(captcha.solution) } })
})();