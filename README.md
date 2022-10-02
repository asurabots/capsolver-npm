# captchaai.io api🧠 task handler


Want you to get captcha verified tokens with a simple function call in you node application?

Just install axios and run with this repo. You will find a fast way to perform web testing (and simple automations).


# Install
[![1.1.0 - captchaai-npm](https://img.shields.io/static/v1?label=1.1.0&message=captchaai-npm&color=%234075D9&logo=npm)](https://www.npmjs.com/package/captchaai-npm)

    npm i captchaai-npm

# Usage

1. Import module.

`import Captchaai from 'captchaai-npm';`

2. Declare singleton.

`const captchaai = new Captchaai('CAI-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 1);`

**balance check + hcaptcha example:**


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

# What its returned

All methods returns response with a simple schema described below.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `error` | `number` | [*-1*] Request or captcha **error**. [*0*] **Success** solving. |
| `statusText` | `string` | A composed string that includes http status. |
| `apiResponse` | `object` | Captchaai response. Task result. |

success object example

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


# Supported API methods
Each method is a easy way to **launch and handle a request** to captchaai API so you have to pass some args which mostly are of type string or type object. Anycase, this is described in captchaai docs page.
[**reffered docs.**](https://docs.captchaai.io/)

an example is:

```javascript
    const proxyInfo = // proxyInfo schema for non-proxyless methods.
    {
        "proxyType": 'http',
        "proxyAddress": 'proxy.provider.io',
        "proxyPort": 32221,
        "proxyLogin": "******",
        "proxyPassword": "************"
    }
```



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

**currently unsupported methods:**

❌ GeeTest Task Types

❌ ReCaptchaV2Classification

❌ HCaptchaClassification

*❌ It has not been tested in big larger workloads or in a multithreading environment. (supposed to come soon)*

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

[this is a list of simple scripts I built with it](https://imgur.com/a/jVRPsO6)

