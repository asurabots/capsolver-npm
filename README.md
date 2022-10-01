# captchaai api task handler

Want you to get captcha verified tokens with a simple function call in you node application?

Just install axios and run with this repo. You will find a fast way to perform web testing (and simple automations).

# Install
    npm i captchaai-npm

# Usage

1. Import module.

`import Captchaai from 'captchaai-npm';`

2. Declare singleton.

`const captchaai = new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 1);`

**balance check + hcaptcha example:**

```
import Captchaai from 'captchaai-npm';
const captchaai = new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 1);
let b = await captchaai.balance()
if(b > 0){  // usd balance
    await captchaai.hcaptchaproxyless('https://websiteurl.com/', '000000-000000000-0000000')
        .then(async r => {
            if(r.error === 0)
                console.log('got token!\n' + JSON.stringify(r.apiResponse));
        })
}
```

# What its returned

All methods returns response with a simple format described below.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `error` | `number` | [*-1*] Request or captcha **error**. [*0*] **Success** solving. |
| `statusText` | `string` | A composed string that includes http status. |
| `apiResponse` | `object` | Captchaai response. Task result. |

success object example

`{
  error: 0,
  statusText: '200 OK',
  apiResponse: {
    errorId: 0,
    taskId: '4e6c33f5-bc14-44d0-979e-d5f37b072c59',
    status: 'ready',
    solution: {
      gRecaptchaResponse: '03AIIukzgCys9brSNnrVbwXE9mTesvkxQ-ocK ...'
    }
  }
}`


# Supported API methods
Each method is a easy way to **launch and handle a request** to captchaai API so you have to pass some args which mostly are of type string or type object. Anycase, this is described in captchaai docs page.
[**reffered docs.**](https://docs.captchaai.io/)

an example is:

    const proxyInfo = // proxyInfo schema for non-proxyless methods.
    {
        "proxyType": 'http',
        "proxyAddress": 'proxy.provider.io',
        "proxyPort": 32221,
        "proxyLogin": "******",
        "proxyPassword": "************"
    }

*balance*
-
`await handler.balance()` - returns directly the float value or an error object.

`await handler.getBalance()` - returns succes or error object.

*hcaptcha*
-

**pass null instead of empty**

`await handler.hcaptcha(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, enterprisePayload=null)`

`await handler.hcaptchaproxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, enterprisePayload=null)`

*recaptcha*
-
`await handler.recaptchav2(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null)`

`await handler.recaptchav2proxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null)`

`await handler.recaptchav2enterprise(websiteURL, websiteKey, proxyInfo, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null)`

`await handler.recaptchav2enterpriseproxyless(websiteURL, websiteKey, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null)`

`await handler.recaptchav3(websiteURL, websiteKey, proxyInfo, pageAction, minScore=null)`

`await handler.recaptchav3proxyless(websiteURL, websiteKey, pageAction, minScore=null)`

*datadome*
-
`await handler.datadome(websiteURL, userAgent, captchaUrl, proxyInfo)`

*funcaptcha*
-
`await handler.funcaptcha(websiteURL, websitePublicKey, proxyInfo, funcaptchaApiJSSubdomain, userAgent = null, data=null)`

`await handler.funcaptchaproxyless(websiteURL, websitePublicKey, funcaptchaApiJSSubdomain, userAgent = null, data=null)`

# Verbose level

When singleton is initialized, verbose level must be passed as 2nd argument. Default is 0.

    new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 1);

Verbose level `undefined`: Dont print logs, just get response.

Verbose level `1`: Print logs about performed requests during execution.

Verbose level `2`: Appends full captchaai api response in verbose level 1 outputs.

# More code examples
```
import Captchaai from 'captchaai-npm';
const captchaai = new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
await captchaai.recaptchav3(
    'https://websiteurl.com/', '0000000000000_0000000',
    {	// proxyInfo
        "proxyType": 'http', "proxyAddress": 'proxy.provider.io', "proxyPort": 32221, "proxyLogin": "******", "proxyPassword": "************"
    }
    ,'sign_in'	// required in recaptchav3
).then(response => { console.log(response); })
```

[this is a list of simple scripts I built with it](https://imgur.com/a/jVRPsO6)

