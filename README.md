# captchaai.io api🧠 task handler



Want you to get captcha verified tokens with a simple function call in you node application?

Just install axios and run with this repo. You will find a fast way to perform web testing (and simple automations).

[![1.2.0 - captchaai-npm](https://img.shields.io/badge/provider-captchaai.io-blue)](https://www.captchaai.io/)
[![1.2.0 - captchaai-npm](https://img.shields.io/badge/1.2.0-captchaai--npm-blue?logo=npm&logoColor=white)](https://www.npmjs.com/package/captchaai-npm)
# Install
    npm i captchaai-npm

# Usage

1. Import module.

`import Captchaai from 'captchaai-npm';`

2. Declare singleton.

`const captchaai = new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 1);`


**👀There are 2 different versions in order to handle task results:**

**Version 1: fast-bind methods**

*balance check + `.hcaptchaproxyless()` example:*

```javascript
import Captchaai from 'captchaai-npm';
const handler = new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 1);
let b = await handler.balance()
if(b > 0){  // usd balance
    await handler.hcaptchaproxyless('https://websiteurl.com/', '000000-000000000-0000000')
        .then(async r => {
            if(r.error === 0)
                console.log('got token!\n' + JSON.stringify(r.apiResponse));
        })
}
```

**Version 2: `.runAnyTask(taskData)`**



*proxyless example*
```javascript
import Captchaai from 'captchaai-npm';
const handler = new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 1);
const taskData =
    { type : 'HCaptchaTaskProxyless', websiteURL : 'https://website.com/', websiteKey : '000000-00000-000000-000000000' }
handler.runAnyTask(taskData).then(response => { console.log(response); });
```

*proxyInfo example*
```javascript
import Captchaai from 'captchaai-npm';
const handler = new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 1);
const taskData =
    { type : 'HCaptchaTask', websiteURL : 'https://website.com/', websiteKey : '000000-00000-000000-000000000',
            proxyInfo: {
                "proxyType": 'http',
                "proxyAddress": 'proxy.provider.io',
                "proxyPort": 32221,
                "proxyLogin": "******",
                "proxyPassword": "************"
            }
    }
handler.runAnyTask(taskData).then(response => { console.log(response); });
```



# What its returned

All methods returns response with a simple schema described below.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `error` | `number` | [*-1*] Request or captcha **error**. [*0*] **Success** solving. |
| `statusText` | `string` | A composed string that includes http status. |
| `apiResponse` | `object` | Captchaai response. Task result. |

✅success object example

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

❌ invalid task example
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

# Supported API methods
Each method is a easy way to **launch and handle a request** to captchaai API so you have to pass some args which mostly are of type string or type object. Anycase, this is described in captchaai docs page.
[**reffered docs.**](https://docs.captchaai.io/)





| Method                               | Returns                                                                                                                                                               |
|:-------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `await handler.runAnyTask(taskData)` | handle tasks for a determined taskData. In order to build this object, use [**!reffered docs**](https://docs.captchaai.io/) and check parameters by catpcha task type |

* taskData examples are shown above.

* proxy credentials must be passed as `proxyInfo` schema shown above too.


*balance*
-

| Method | Returns     |
| :-------- | :------- | 
| `await handler.balance()` | directly the float value or an error object |
| `await handler.getBalance()` | succes or error object |





*hcaptcha*
-
**pass null instead of empty**

| Method |
| :-------- |
| `await handler.hcaptcha(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, enterprisePayload=null)` |
| `await handler.hcaptchaproxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, enterprisePayload=null)` |


*recaptcha*
-
| Method |
| :-------- |
| `await handler.recaptchav2(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null)` |
| `await handler.recaptchav2proxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null)` |
| `await handler.recaptchav2enterprise(websiteURL, websiteKey, proxyInfo, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null)` |
| `await handler.recaptchav2enterpriseproxyless(websiteURL, websiteKey, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null)` |
| `await handler.recaptchav3(websiteURL, websiteKey, proxyInfo, pageAction, minScore=null)` |
| `await handler.recaptchav3proxyless(websiteURL, websiteKey, pageAction, minScore=null)` |

*datadome*
-
| Method |
| :-------- |
| `await handler.datadome(websiteURL, userAgent, captchaUrl, proxyInfo)` |

*funcaptcha*
-
| Method |
| :-------- |
| `await handler.funcaptcha(websiteURL, websitePublicKey, proxyInfo, funcaptchaApiJSSubdomain, userAgent = null, data=null)` |
| `await handler.funcaptchaproxyless(websiteURL, websitePublicKey, funcaptchaApiJSSubdomain, userAgent = null, data=null)` |

*geetest*
-
| Method                                                                                                                                                          |
|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `await handler.geetest(websiteURL, gt, challenge, geetestApiServerSubdomain, proxyInfo, version=null, userAgent=null, geetestGetLib=null, initParameters=null)` |
| `await handler.geetestproxyless(websiteURL, gt, challenge, geetestApiServerSubdomain, version=null, userAgent=null, geetestGetLib=null, initParameters=null)`   |


**currently unsupported methods:**

❌ ReCaptchaV2Classification

❌ HCaptchaClassification

*❌ It has not been tested in larger workloads or in a multithreading environment. (supposed to come soon, appreciate any feedback🙏)*

# Verbose level

When singleton is initialized, verbose level must be passed as 2nd argument. Default is 0.

    new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 1);

Verbose level `undefined`: Dont print logs, just get response.

Verbose level `1`: Print logs about performed requests during execution.

Verbose level `2`: Appends full captchaai api response in verbose level 1 outputs.

# More code examples
[! Building fast test-project with captchaai-npm](https://www.youtube.com/watch?v=s9OyE_pBPyE)

proxyInfo use example:

```javascript
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
