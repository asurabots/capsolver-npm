# captchaai.io api🧠 task handler

Want you to get captcha verified tokens with a simple function call in your NodeJS application?

Just install Axios and run with this repo. You will find a fast way to perform some automations.

- **Manage to solve captcha challenges with AI. ([Captcha service](https://captchaai.io/) based)**
- ‼ An API key is **required**.
- 🔥 *HCaptcha Image Classification it's now supported.*


[![](https://img.shields.io/badge/provider-captchaai.io-blue)](https://dashboard.captchaai.io/passport/register?inviteCode=CHhA_5os)
[![](https://img.shields.io/badge/1.2.2-captchaai--npm-blue?logo=npm&logoColor=white)](https://www.npmjs.com/package/captchaai-npm)
[![](https://img.shields.io/badge/API_doc-captchaai.atlassian.net-blue)](https://captchaai.atlassian.net/wiki/spaces/CAPTCHAAI/pages/393295/All+task+types+and+price+list)

# ⬇️ Install
    npm i captchaai-npm

# ✋ Usage

1. Import module.

   ```javascript 
    const Captchaai = require('captchaai-npm');
    ```

3. Declare singleton/handler.

   ```javascript 
    const handler = new Captchaai(apikey); // task handler / solver
    ```



**❗ There are 2 different versions in order to handle task results:**

**1️⃣ fast-bind methods**

*example: balance check + `.hcaptchaproxyless()`*

```javascript
const Captchaai = require('captchaai-npm');
const handler = new Captchaai('apikey', 1); // verbose level 1
let b = await handler.balance();
if(b > 0){  // usd balance
    await handler.hcaptchaproxyless('https://websiteurl.com/', '000000-000000000-0000000')
        .then(async r => {
            if(r.error === 0)
                console.log('got token!\n' + JSON.stringify(r.apiResponse));
        });
}
```

*example: handle for hcaptcha task with `.hcaptcha()` using custom proxy server.*

```javascript
const Captchaai = require('captchaai-npm');
const handler = new Captchaai('apikey', 1); // verbose level 1
let b = await handler.balance();
if(b > 0){  // usd balance
    await handler.hcaptcha(
        'https://websiteurl.com/', 
        '000000-000000000-0000000',
        { proxy: "proxyType:proxyAddress:proxyPort:proxyLogin:proxyPassword" }   // 2nd proxyInfo format
    )
     .then(async r => {
         if(r.error === 0)
             console.log('got token!\n' + JSON.stringify(r.apiResponse));
     });
}
```

**2️⃣ `.runAnyTask(taskData)`**


*example: build proxyless `taskData` schema performing HCaptchaTaskProxyless.*
```javascript
const Captchaai = require('captchaai-npm');
const handler = new Captchaai('apikey');
const taskData = 
    { type : 'HCaptchaTaskProxyless', websiteURL : 'https://website.com/', websiteKey : '000000-00000-000000-000000000' }
await handler.runAnyTask(taskData).then(response => { console.log(response); });
```

*example: build custom proxy `taskData` schema for HCaptchaTask.*
```javascript
const Captchaai = require('captchaai-npm');
const handler = new Captchaai('apikey');
const taskData =
    { 
    type : 'HCaptchaTask',
    websiteURL : 'https://website.com/', 
    websiteKey : '000000-00000-000000-000000000',
    // proxyInfo: { proxy: "proxyType:proxyAddress:proxyPort:proxyLogin:proxyPassword" }, // also string format is supported with `proxy`
    proxyInfo: { 'proxyType': 'http', 'proxyAddress': 'ip_address', 'proxyPort': 3221, 'proxyLogin': 'username', 'proxyPassword': 'password' },
    }
handler.runAnyTask(taskData).then(response => { console.log(response); });
```

# ↩️ Returned object:

**All methods return the following schema.**

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `error` | `number` | [*-1*] Request/solving **error**. [*0*] **Success** solving. |
| `statusText` | `string` | http status string |
| `apiResponse` | `object` | Task result. Captchaai.io API response.  |

✅Success object example:

```javascript
{
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
}
```

❌Invalid task object example:
```javascript
{
  error: -1,
  statusText: '400 Bad Request',
  apiResponse: {
        errorCode: "ERROR_INVALID_TASK_DATA",
        errorDescription: "clientKey error",
        errorId: 1
    }
}
```

- Each method it's an easy way to **launch and handle multiple requests** to captchaai API.
- Some determinated captchas task have required arguments which mostly are of type string or type object. Anycase, this is described in captchaai.io official docs page.
- [**reffered docs.**](https://docs.captchaai.io/)


# ⚙️ Supported API methods
| Method                               | Returns                                                                                                                                                               |
|:-------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `await handler.runAnyTask(taskData)` | handle task results for a taskData schema passed. In order to build this object, use [**!reffered docs**](https://docs.captchaai.io/) and **check parameters by catpcha task type**. |

* `taskData` schema it's shown above.
* `proxyInfo` can be passed as `{ 'proxy' : 'proxystring...' }` or as `{ proxyType:''}`


*balance*
-
| Method | Returns     |
| :-------- | :------- | 
| `await handler.balance()` | directly the float value or an error object |
| `await handler.getBalance()` | succes or error object |


*fast-bind methods*
-
| Method                                                                                                                                      |
|:--------------------------------------------------------------------------------------------------------------------------------------------|
| `await handler.hcaptcha(websiteURL, websiteKey, proxyInfo, userAgent, isInvisible, enterprisePayload)`                                     |
| `await handler.hcaptchaproxyless(websiteURL, websiteKey, userAgent, isInvisible, enterprisePayload)`                                        |
| `await handler.hcaptchaclassification(question, queries, coordinate)`                                                                       |
| `await handler.recaptchav2(websiteURL, websiteKey, proxyInfo, userAgent, isInvisible, recaptchaDataSValue, cookies)`                        |
| `await handler.recaptchav2proxyless(websiteURL, websiteKey, userAgent, isInvisible, recaptchaDataSValue, cookies)`                          |
| `await handler.recaptchav2enterprise(websiteURL, websiteKey, proxyInfo, userAgent, enterprisePayload, apiDomain, cookies)`                  |
| `await handler.recaptchav2enterpriseproxyless(websiteURL, websiteKey, userAgent, enterprisePayload, apiDomain, cookies)`                    |
| `await handler.recaptchav3(websiteURL, websiteKey, proxyInfo, pageAction, minScore)`                                                        |
| `await handler.recaptchav3proxyless(websiteURL, websiteKey, pageAction, minScore)`                                                          |
| `await handler.datadome(websiteURL, userAgent, captchaUrl, proxyInfo)`                                                                      |
| `await handler.funcaptcha(websiteURL, websitePublicKey, proxyInfo, funcaptchaApiJSSubdomain, userAgent, data)`                              |
| `await handler.funcaptchaproxyless(websiteURL, websitePublicKey, funcaptchaApiJSSubdomain, userAgent, data)`                                |
| `await handler.geetest(websiteURL, gt, challenge, geetestApiServerSubdomain, proxyInfo, version, userAgent, geetestGetLib, initParameters)` |
| `await handler.geetestproxyless(websiteURL, gt, challenge, geetestApiServerSubdomain, version, userAgent, geetestGetLib, initParameters)`   |

*pass null instead of empty for optional arguments*

🆕 `hcaptchaclassification(question, queries, coordinate)`:
- see [HCaptchaClassification: recognize the images that you need to click](https://captchaai.atlassian.net/wiki/spaces/CAPTCHAAI/pages/426261/HCaptchaClassification+recognize+the+images+that+you+need+to+click).

**Currently unsupported API methods:**

❌ ReCaptchaV2Classification
❌ ImageToTextTask
❌ AntiKasadaTask
❌ AntiAkamaiBMPTask

# Verbose level

```javascript
const handler = new Captchaai(apikey, verbose); // on handler initialization
```

Verbose level `undefined || 0`: Dont print logs, just get response.

Verbose level `1`: Print logs about performed requests during execution.

Verbose level `2`: Appends full captchaai api response in verbose level 1 outputs.

# More code examples

```javascript
import Captchaai from 'captchaai-npm'; // import as ES6 module
const apikey = 'CAI-XXX...';
const captchaai = new Captchaai(apikey);

// proxyType: (http, https, socks4, socks5)
await captchaai.recaptchav3(
        'https://websiteurl.com/',
        '0000000000000_0000000',
        { 'proxyType': 'http', 'proxyAddress': 'ip_address', 'proxyPort': 3221, 'proxyLogin': 'username', 'proxyPassword': 'password' },
        'sign_in'
).then(response => { console.log(response); }) // actionMethod argument required in recaptchav3
```

[*Building fast test-project with captchaai-npm](https://www.youtube.com/watch?v=s9OyE_pBPyE)
