const Tasker = require("./Tasker");
const axios = require("axios");

class Captchaai {
    constructor(apikey, verboselvl=0, reqdelay=2500) { this.apikey = apikey; this.verbose = verboselvl; this.reqdelay = reqdelay; this.init(); }

    init(){ if(this.verbose === 1 || this.verbose === 2) {require('console-stamp')(console, 'HH:MM:ss.l'); console.log('[' + this.constructor.name + '][Verbose level '+this.verbose+' running at: '+this.apikey+']');} }

    async balance(){ let r = await this.getBalance(); return r.apiResponse.balance ? parseFloat(r.apiResponse.balance): null; }

    async getBalance(){
        let self = this;
        let axiosConfig = { method: 'post', url: 'https://api.captchaai.io/getBalance', headers: { }, data: { "clientKey": this.apikey } };
        let r = await axios(axiosConfig)
            .then(async function (response) { return { 'error':0, 'message':response.status+' '+response.statusText, 'apiResponse':response.data } })
            .catch(function (error) { return { 'error':-1, 'message':error.response.status+' '+error.response.statusText, 'apiResponse':error.response.data } });
        if(this.verbose === 1 || this.verbose === 2) { console.log('[' + self.constructor.name + '][' + axiosConfig.method + '][' + axiosConfig.url + ']['+r.message+'][balance: '+r.apiResponse.balance+' usd]'); }
        return r;
    }

    attachProxy(tasker, proxyInfo){
        tasker.taskData.proxyType = proxyInfo.proxyType;
        tasker.taskData.proxyAddress = proxyInfo.proxyAddress;
        tasker.taskData.proxyPort = proxyInfo.proxyPort;
        if(proxyInfo.proxyLogin !== null || true){ tasker.taskData.proxyLogin = proxyInfo.proxyLogin; }
        if(proxyInfo.proxyPassword !== null || true){ tasker.taskData.proxyPassword = proxyInfo.proxyPassword; }
        if(this.verbose === 1) { console.log('['+ this.constructor.name +'][attached proxy]['+proxyInfo.proxyAddress+':'+proxyInfo.proxyPort+']'); }
        return tasker;
    }

    // ## HCAPTCHA
    async hcaptcha(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, enterprisePayload=null){
        let tasker = new Tasker('HCaptchaTask', this.apikey, websiteURL, websiteKey, this.verbose);
        // binding
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    async hcaptchaproxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, enterprisePayload=null){
        let tasker = new Tasker('HCaptchaTaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    // ## RECAPTCHA
    async recaptchav2(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2Task', this.apikey, websiteURL, websiteKey, this.verbose);
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(recaptchaDataSValue!==null) { tasker.taskData.recaptchaDataSValue = recaptchaDataSValue }
        if(cookies!==null) { tasker.taskData.cookies = cookies }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    async recaptchav2proxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2TaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(recaptchaDataSValue!==null) { tasker.taskData.recaptchaDataSValue = recaptchaDataSValue }
        if(cookies!==null) { tasker.taskData.cookies = cookies }
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    async recaptchav2enterprise(websiteURL, websiteKey, proxyInfo, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2EnterpriseTask', this.apikey, websiteURL, websiteKey, this.verbose);
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        if(apiDomain!==null) { tasker.taskData.apiDomain = apiDomain; }
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(cookies!==null) { tasker.taskData.cookies = cookies; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    async recaptchav2enterpriseproxyless(websiteURL, websiteKey, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2EnterpriseTaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        if(apiDomain!==null) { tasker.taskData.apiDomain = apiDomain; }
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(cookies!==null) { tasker.taskData.cookies = cookies; }
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    async recaptchav3(websiteURL, websiteKey, proxyInfo, pageAction, minScore=null){
        let tasker = new Tasker('RecaptchaV3TaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        tasker.taskData.pageAction = pageAction;     // APPEND SPECIAL PARAMETER
        if(minScore!==null) { tasker.taskData.minScore = minScore; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    async recaptchav3proxyless(websiteURL, websiteKey, pageAction, minScore=null){
        let tasker = new Tasker('RecaptchaV3TaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        tasker.taskData.pageAction = pageAction;     // APPEND SPECIAL PARAMETER
        if(minScore!==null) { tasker.taskData.minScore = minScore; }
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    // ## DATADOME
    async datadome(websiteURL, userAgent, captchaUrl, proxyInfo){
        let tasker = new Tasker('DataDomeSliderTask', this.apikey, websiteURL, null, this.verbose);
        tasker.taskData.captchaUrl = captchaUrl;
        tasker.taskData.userAgent = userAgent;
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    // ## FUNCAPTCHA
    async funcaptcha(websiteURL, websitePublicKey, proxyInfo, funcaptchaApiJSSubdomain, userAgent = null, data=null){
        let tasker = new Tasker('FunCaptchaTask', this.apikey, websiteURL, null, this.verbose);
        tasker.taskData.websitePublicKey = websitePublicKey;
        tasker.taskData.funcaptchaApiJSSubdomain = funcaptchaApiJSSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(data!==null) { tasker.taskData.data = data; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

    async funcaptchaproxyless(websiteURL, websitePublicKey, funcaptchaApiJSSubdomain, userAgent = null, data=null){
        let tasker = new Tasker('FunCaptchaTaskProxyless', this.apikey, websiteURL, null, this.verbose);
        tasker.taskData.websitePublicKey = websitePublicKey;
        tasker.taskData.funcaptchaApiJSSubdomain = funcaptchaApiJSSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(data!==null) { tasker.taskData.data = data; }
        let tasked = await tasker.createTask();
        return await tasker.getTaskResult(tasked.apiResponse.taskId);
    }

}

module.exports = Captchaai;