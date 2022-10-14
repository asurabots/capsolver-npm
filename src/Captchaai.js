const Tasker = require("./Tasker");
const axios = require("axios");

class Captchaai {
    constructor(apikey, verboselvl=0, rqdelay=2500) { this.apikey = apikey; this.verbose = verboselvl; this.rqdelay = rqdelay; this.init(); }

    init(){
        if(this.verbose !== 0 ) { require('console-stamp')(console, 'HH:MM:ss.l'); }
        if(this.verbose === 2){ console.log('[' + this.constructor.name + '][Verbose level '+this.verbose+' running at: '+this.apikey+']'); }
    }

    async runAnyTask(taskData) {
        if(taskData.hasOwnProperty('type')){
            let tasker = new Tasker(null, this.apikey, null, null, this.verbose);
            if(tasker.validate(taskData)){
                tasker.taskData = taskData;

                if(taskData.hasOwnProperty('proxyInfo')){
                    this.attachProxy(tasker, taskData.proxyInfo);
                }

                let tasked = await tasker.createTask();
                if(tasked.error !== 0) return tasked;
                return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
            }else{
                return;
            }
        }else{
            throw TypeError('taskData has not type property.');
        }
    }

    async balance(){ let r = await this.getBalance(); return r.apiResponse.balance ? parseFloat(r.apiResponse.balance): null; }

    async getBalance(){
        let self = this;
        let axiosConfig = { method: 'post', url: 'https://api.captchaai.io/getBalance', headers: { }, data: { "clientKey": this.apikey } };
        let r = await axios(axiosConfig)
            .then(async function (response) { return { 'error':0, 'statusText':response.status+' '+response.statusText, 'apiResponse':response.data } })
            .catch(function (error) { return { 'error':-1, 'statusText':error.response.status+' '+error.response.statusText, 'apiResponse':error.response.data } });
        if(this.verbose !== 0) { console.log('[' + self.constructor.name + '][' + axiosConfig.method + '][' + axiosConfig.url + ']['+r.message+'][balance: '+r.apiResponse.balance+' usd]'); }
        return r;
    }

    attachProxy(tasker, proxyInfo){
        if(proxyInfo.proxyType !== null || true){ tasker.taskData.proxyType = proxyInfo.proxyType; }
        tasker.taskData.proxyAddress = proxyInfo.proxyAddress;
        tasker.taskData.proxyPort = proxyInfo.proxyPort;
        if(proxyInfo.proxyLogin !== null || true){ tasker.taskData.proxyLogin = proxyInfo.proxyLogin; }
        if(proxyInfo.proxyPassword !== null || true){ tasker.taskData.proxyPassword = proxyInfo.proxyPassword; }
        if(this.verbose === 1) { console.log('['+ this.constructor.name +'][proxyInfo]['+proxyInfo.proxyAddress+':'+proxyInfo.proxyPort+']'); }
        return tasker;
    }

    // ## fast-bind commands ## //
    // hcap
    async hcaptcha(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, enterprisePayload=null){
        let tasker = new Tasker('HCaptchaTask', this.apikey, websiteURL, websiteKey, this.verbose);
        // binding
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async hcaptchaproxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, enterprisePayload=null){
        let tasker = new Tasker('HCaptchaTaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    // recap
    async recaptchav2(websiteURL, websiteKey, proxyInfo, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2Task', this.apikey, websiteURL, websiteKey, this.verbose);
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(recaptchaDataSValue!==null) { tasker.taskData.recaptchaDataSValue = recaptchaDataSValue }
        if(cookies!==null) { tasker.taskData.cookies = cookies }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav2proxyless(websiteURL, websiteKey, userAgent=null, isInvisible=null, recaptchaDataSValue=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2TaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent }
        if(isInvisible!==null) { tasker.taskData.isInvisible = true }
        if(recaptchaDataSValue!==null) { tasker.taskData.recaptchaDataSValue = recaptchaDataSValue }
        if(cookies!==null) { tasker.taskData.cookies = cookies }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav2enterprise(websiteURL, websiteKey, proxyInfo, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2EnterpriseTask', this.apikey, websiteURL, websiteKey, this.verbose);
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        if(apiDomain!==null) { tasker.taskData.apiDomain = apiDomain; }
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(cookies!==null) { tasker.taskData.cookies = cookies; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav2enterpriseproxyless(websiteURL, websiteKey, userAgent=null, enterprisePayload=null, apiDomain=null, cookies=null){
        let tasker = new Tasker('RecaptchaV2EnterpriseTaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        if(enterprisePayload!==null) { tasker.taskData.isEnterprise = true; tasker.taskData.enterprisePayload = enterprisePayload }
        if(apiDomain!==null) { tasker.taskData.apiDomain = apiDomain; }
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(cookies!==null) { tasker.taskData.cookies = cookies; }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav3(websiteURL, websiteKey, proxyInfo, pageAction, minScore=null){
        let tasker = new Tasker('RecaptchaV3TaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        tasker.taskData.pageAction = pageAction;
        if(minScore!==null) { tasker.taskData.minScore = minScore; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async recaptchav3proxyless(websiteURL, websiteKey, pageAction, minScore=null){
        let tasker = new Tasker('RecaptchaV3TaskProxyless', this.apikey, websiteURL, websiteKey, this.verbose);
        tasker.taskData.pageAction = pageAction;
        if(minScore!==null) { tasker.taskData.minScore = minScore; }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    // datadome
    async datadome(websiteURL, userAgent, captchaUrl, proxyInfo){
        let tasker = new Tasker('DataDomeSliderTask', this.apikey, websiteURL, null, this.verbose);
        tasker.taskData.captchaUrl = captchaUrl;
        tasker.taskData.userAgent = userAgent;
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    // funcap
    async funcaptcha(websiteURL, websitePublicKey, proxyInfo, funcaptchaApiJSSubdomain, userAgent = null, data=null){
        let tasker = new Tasker('FunCaptchaTask', this.apikey, websiteURL, null, this.verbose);
        tasker.taskData.websitePublicKey = websitePublicKey;
        tasker.taskData.funcaptchaApiJSSubdomain = funcaptchaApiJSSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(data!==null) { tasker.taskData.data = data; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async funcaptchaproxyless(websiteURL, websitePublicKey, funcaptchaApiJSSubdomain, userAgent = null, data=null){
        let tasker = new Tasker('FunCaptchaTaskProxyless', this.apikey, websiteURL, null, this.verbose);
        tasker.taskData.websitePublicKey = websitePublicKey;
        tasker.taskData.funcaptchaApiJSSubdomain = funcaptchaApiJSSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(data!==null) { tasker.taskData.data = data; }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    // geetest
    async geetest(websiteURL, gt, challenge, geetestApiServerSubdomain, proxyInfo, version=null, userAgent=null, geetestGetLib=null, initParameters=null){
        let tasker = new Tasker('GeeTestTask', this.apikey, websiteURL, null, this.verbose);
        tasker.taskData.gt = gt;
        tasker.taskData.challenge = challenge;
        tasker.taskData.geetestApiServerSubdomain = geetestApiServerSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(geetestGetLib!==null) { tasker.taskData.geetestGetLib = geetestGetLib; }
        if(version!==null) { tasker.taskData.version = version; }
        if(initParameters!==null) { tasker.taskData.initParameters = initParameters; }
        this.attachProxy(tasker, proxyInfo);
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    async geetestproxyless(websiteURL, gt, challenge, geetestApiServerSubdomain, version=null, userAgent=null, geetestGetLib=null, initParameters=null){
        let tasker = new Tasker('GeeTestTaskProxyless', this.apikey, websiteURL, null, this.verbose);
        tasker.taskData.gt = gt;
        tasker.taskData.challenge = challenge;
        tasker.taskData.geetestApiServerSubdomain = geetestApiServerSubdomain;
        if(userAgent!==null) { tasker.taskData.userAgent = userAgent; }
        if(geetestGetLib!==null) { tasker.taskData.geetestGetLib = geetestGetLib; }
        if(version!==null) { tasker.taskData.version = version; }
        if(initParameters!==null) { tasker.taskData.initParameters = initParameters; }
        let tasked = await tasker.createTask();
        if(tasked.error !== 0) return tasked;
        return await tasker.getTaskResult(tasked.apiResponse.taskId, this.rqdelay);
    }

    // unsupported methods:
    // ❌ ReCaptchaV2Classification
    // ❌ HCaptchaClassification

}

module.exports = Captchaai;