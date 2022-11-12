# captchaai.io api wrapper🧠 (tasks handler)

Want you to get verified captcha **tokens** calling one function within your NodeJS application?

Run with this repo and find a fast way to perform web/api automations.

- **Manage to solve captcha challenges with AI in a NodeJS app ([captcha service based](https://captchaai.io/)).**
- ❗ An API key it's **required**. [**Get here.**](https://dashboard.captchaai.io/passport/register?inviteCode=CHhA_5os)
- 👀 **Puppeteer integration at**  [**puppeteer-extra-plugin-captchaai**](https://github.com/0qwertyy/puppeteer-extra-plugin-captchaai).


now binded: 🔥 *AntiKasada & AntiAkamaiBMP. 🔥 HCaptcha & FunCaptcha Images Classification.*

[![](https://img.shields.io/badge/1.2.7-captchaai--npm-blue?logo=npm&logoColor=white)](https://www.npmjs.com/package/captchaai-npm)
[![](https://img.shields.io/badge/provider-captchaai.io-blue)](https://dashboard.captchaai.io/passport/register?inviteCode=CHhA_5os)
[![](https://img.shields.io/badge/API_doc-captchaai.atlassian.net-blue)](https://captchaai.atlassian.net/wiki/spaces/CAPTCHAAI/pages/393295/All+task+types+and+price+list)

⬇️ Install
-
    npm i captchaai-npm

✋ Usage
-

1. Import module.

   ```javascript 
    const Captchaai = require('captchaai-npm');
    ```

3. Declare singleton/handler.

   ```javascript 
    const handler = new Captchaai(apikey); // task handler / solver
    ```



**❗ There are 2 different versions in order to handle task results:**

**1️⃣ task-bind methods**

*example: check captchaai.io balance + run for one `.hcaptchaproxyless()`*

```javascript
const Captchaai = require('captchaai-npm');
const handler = new Captchaai('apikey', 1); // verbose level 1
let b = await handler.balance();
if(b > 0){  // usd balance
    await handler.hcaptchaproxyless('https://websiteurl.com/', '000000-000000000-0000000')
        .then(async response => {
            if(response.error === 0){ console.log(response.solution) }
            else{ console.log('error ' + JSON.stringify(response.apiResponse)) }
        });
}
```

*example: run for one HCaptchaTask with `.hcaptcha()` with custom proxy.*

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
    .then(async response => {
        if(response.error === 0){ console.log(response.solution) }
        else{ console.log('error ' + JSON.stringify(response.apiResponse)) }
    });
}
```

**2️⃣ Run any task. Build `taskData` schema for a task type.**

*example: build & run `taskData` schema with custom proxy for HCaptchaTask.*
```javascript
const Captchaai = require('captchaai-npm');
const handler = new Captchaai('apikey');
const taskData =    // build a task
    { 
    type : 'HCaptchaTask',
    websiteURL : 'https://website.com/', 
    websiteKey : '000000-00000-000000-000000000',
    // also string format is supported with `proxy`
    // proxyInfo: { proxy: "proxyType:proxyAddress:proxyPort:proxyLogin:proxyPassword" },
    proxyInfo: { 'proxyType': 'http', 'proxyAddress': 'ip_address', 'proxyPort': 3221, 'proxyLogin': 'username', 'proxyPassword': 'password' },
    }
    
handler.runAnyTask(taskData)
    .then(async response => {
        if(response.error === 0){ console.log(response.solution) }
        else{ console.log('error ' + JSON.stringify(response.apiResponse)) }
    });
```

↩️ Returned object
-
**All methods return the following schema.**

| Parameter     | Type     | Description                                                |
|:--------------| :------- |:-----------------------------------------------------------|
| `error`       | `number` | [*-1*] Request/Solving **error**. [*0*] **Success** solve. |
| `statusText`  | `string` | HTTP status string.                                        |
| `apiResponse` | `object` | **Results/solution** (captchaai.io API response).          |
| `solution`    | `object` | **Solution got from success solve**.                       |


```javascript
// ✅ success response
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

```javascript
// ❌ ERROR_INVALID_TASK_DATA response
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
- Some determinated captcha tasks have required arguments which mostly are of type string or type object. Anycase, this is described in captchaai.io official docs page.
- [**reffered docs.**](https://docs.captchaai.io/)


# ⚙️Supported API methods
| Method                               | Returns                                                                                                                                                               |
|:-------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `await handler.balance()` | directly the float value or an error object |
| `await handler.getBalance()` | succes or error object |
| `await handler.runAnyTask(taskData)` | handle task results for a `taskData` schema passed. In order to build this object, use [**!reffered docs**](https://docs.captchaai.io/) and **check parameters by catpcha task type**. |

* `taskData` schema it's shown in examples.
* `proxyInfo` schema has 2 versions:

`{ 'proxy' : 'proxyType:proxyAddress:proxyPort:proxyLogin:proxyPassword' }`

or

`{ 'proxyType': 'http', 'proxyAddress': 'ip_address', 'proxyPort': 3221, 'proxyLogin': 'username', 'proxyPassword': 'password' }`

*(proxyLogin & proxyPassword are optionals)*

*task-bind methods*
-
retrieve solutions (tokens/coordenates) with the followings:

```javascript
// * check required parameters for a website with API docs.
await handler.hcaptcha(websiteURL, websiteKey, proxyInfo, userAgent, isInvisible, enterprisePayload)
await handler.hcaptchaproxyless(websiteURL, websiteKey, userAgent, isInvisible, enterprisePayload)
await handler.hcaptchaclassification(question, queries, coordinate)

await handler.recaptchav2(websiteURL, websiteKey, proxyInfo, userAgent, isInvisible, recaptchaDataSValue, cookies)
await handler.recaptchav2proxyless(websiteURL, websiteKey, userAgent, isInvisible, recaptchaDataSValue, cookies)
await handler.recaptchav2enterprise(websiteURL, websiteKey, proxyInfo, userAgent, enterprisePayload, apiDomain, cookies)
await handler.recaptchav2enterpriseproxyless(websiteURL, websiteKey, userAgent, enterprisePayload, apiDomain, cookies)
await handler.recaptchav3(websiteURL, websiteKey, proxyInfo, pageAction, minScore)
await handler.recaptchav3proxyless(websiteURL, websiteKey, pageAction, minScore)

await handler.datadome(websiteURL, userAgent, captchaUrl, proxyInfo)

await handler.funcaptcha(websiteURL, websitePublicKey, proxyInfo, funcaptchaApiJSSubdomain, userAgent, data)
await handler.funcaptchaproxyless(websiteURL, websitePublicKey, funcaptchaApiJSSubdomain, userAgent, data)
await handler.funcaptchaclassification(image, question)

await handler.geetest(websiteURL, gt, challenge, geetestApiServerSubdomain, proxyInfo, version, userAgent, geetestGetLib, initParameters)
await handler.geetestproxyless(websiteURL, gt, challenge, geetestApiServerSubdomain, version, userAgent, geetestGetLib, initParameters)

await handler.image2text(body)

await handler.antikasada(pageURL, proxyInfo, onlyCD, userAgent) // *: pageUrl & proxyInfo are always required
await handler.antiakamaibmp(packageName, version, deviceId, deviceName, count) // *: packageName it's always required
```
*pass null instead of empty for optional arguments*

**Currently unsupported API methods:**
❌ ReCaptchaV2Classification

Verbose level
-

```javascript
const handler = new Captchaai(apikey, verbose); // on handler initialization
```

Verbose level `undefined || 0`: Dont print logs, just get response.

Verbose level `1`: Print logs about performed requests during execution.

Verbose level `2`: Appends full captchaai api response in verbose level 1 outputs.

References
-

- [**HCaptchaClassification: Recognize the images that you need to click.**](https://captchaai.atlassian.net/wiki/spaces/CAPTCHAAI/pages/426261/HCaptchaClassification+recognize+the+images+that+you+need+to+click)
    - Responds through image recognition.
    - Send a base64 **images array** with `.hcaptchaclassification(question, queries, coordinate)`.
    - 👀 Find [**here**](https://github.com/0qwertyy/puppeteer-extra-plugin-captchaai) an **integration within `puppeteer-extra`**.

- [**FunCaptchaClassification (beta): Recognize the images that you need to click.**](https://captchaai.atlassian.net/wiki/spaces/CAPTCHAAI/pages/426261/HCaptchaClassification+recognize+the+images+that+you+need+to+click)
    - Send a base64 **screenshot image** with `.funcaptchaclassification(image, question)`.

- [**AntiKasadaTask: Solving Kasada.**](https://captchaai.atlassian.net/wiki/spaces/CAPTCHAAI/pages/426407/AntiKasadaTask+solving+Kasada)
    - This task type AntiKasadaTask require that you send us your proxies.

- [**AntiAkamaiBMPTask: Solving Akamai Mobile.**](https://captchaai.atlassian.net/wiki/spaces/CAPTCHAAI/pages/426407/AntiKasadaTask+solving+Kasada)
    - This task type AntiKasadaTask require that you send us your proxies.