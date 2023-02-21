PM2 Benchmark
-

- **Perform tests for a website with multiple PM2 processes.**

1. Install pm2 globally:  `npm install -g pm2`.
3. Set [pm2 config file](https://github.com/0qwertyy/capsolver-npm/blob/master/examples/ecosystem.config.js) as your preference.
4. Control processes: `pm2 start ecosystem.config.js` & `pm2 delete all`.
5. Print logs for all process: `pm2 logs`.

- [screenshot](https://s3.gifyu.com/images/webstorm64_pvt9zUKloT.gif)


📁 More task examples
-

```javascript
const CapSolver = require('capsolver-npm');
const handler = new CapSolver('apikey');
const taskData =
    { type : 'HCaptchaTaskProxyless', websiteURL : 'https://website.com/', websiteKey : '000000-00000-000000-000000000' }
await handler.runAnyTask(taskData).then(response => { console.log(response); });
```

```javascript
import CapSolver from 'capsolver-npm'; // import as ES6 module
const apikey = 'CAI-XXX...';
const handler = new CapSolver(apikey);

// *proxyType parameter supports for: http, https, socks4, socks5
await handler.recaptchav3(
        'https://websiteurl.com/',
        '0000000000000_0000000',
        { 'proxyType': 'http', 'proxyAddress': 'ip_address', 'proxyPort': 3221, 'proxyLogin': 'username', 'proxyPassword': 'password' },
        'sign_in' // pageAction argument required in recaptchav3
).then(response => { console.log(response); }) 
```

[*Building fast test-project with capsolver-npm](https://www.youtube.com/watch?v=s9OyE_pBPyE)
