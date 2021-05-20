(()=>{"use strict";var e={383:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function i(e){try{c(o.next(e))}catch(e){s(e)}}function a(e){try{c(o.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,o,r,s,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((r=(r=i.trys).length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],o=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.builds=void 0;var s=n(376),i=n(331);t.builds={fetchByBuildType:function(e){return o(void 0,void 0,void 0,(function(){return r(this,(function(t){switch(t.label){case 0:return[4,i.default("\n    SELECT *\n    FROM builds\n    WHERE build_type = '"+e+"'\n    ORDER BY id DESC\n  ")];case 1:return[2,t.sent()]}}))}))},getMasterUrl:function(){return o(void 0,void 0,void 0,(function(){var e,n,o,i,a,c,u;return r(this,(function(r){switch(r.label){case 0:return[4,t.builds.fetchByBuildType("StandaloneLinux64")];case 1:return e=r.sent(),(n=e[0]).uses_unity_cloud_build?(i=n.version,a="https://build-api.cloud.unity3d.com/api/v1/orgs/"+process.env.UNITY_ORGANIZATION+"/projects/masters-of-conquest-master/buildtargets/masters-of-conquest-headless/builds/"+i+"/share",[4,s.default.get(a,{headers:{Authorization:"Basic "+process.env.TOKEN_UNITY_CLOUD}})]):[3,4];case 2:return c=r.sent(),u="https://build-api.cloud.unity3d.com/api/v1/shares/"+c.data.shareid,[4,s.default.get(u,{headers:{Authorization:"Basic "+process.env.TOKEN_UNITY_CLOUD}})];case 3:return c=r.sent(),o=c.data.links.artifacts[0].files[0].href,console.log(o),[3,5];case 4:o=n.url,r.label=5;case 5:return[2,{build:n,url:o}]}}))}))}}},669:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function i(e){try{c(o.next(e))}catch(e){s(e)}}function a(e){try{c(o.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,o,r,s,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((r=(r=i.trys).length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],o=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.deploy=void 0;var s,i=n(376),a=n(622),c=n(129).spawn,u=n(383);process.env.NODE_TLS_REJECT_UNAUTHORIZED="0",t.deploy={deploy:function(e){return o(void 0,void 0,void 0,(function(){var t,n,o,l,d,f,p,h,v,b,_;return r(this,(function(r){switch(r.label){case 0:return console.log("deploy"),t=a.dirname(__filename)+"/bash/deploy.sh",[4,u.builds.fetchByBuildType("StandaloneLinux64")];case 1:return n=r.sent(),o=n[0],l=o.version,d=o.url,o.uses_unity_cloud_build?(f="https://build-api.cloud.unity3d.com/api/v1/orgs/"+process.env.UNITY_ORGANIZATION+"/projects/masters-of-conquest-master/buildtargets/masters-of-conquest-headless/builds/"+l+"/share",[4,i.default.get(f,{headers:{Authorization:"Basic "+process.env.TOKEN_UNITY_CLOUD}})]):[3,5];case 2:return(p=r.sent())?(h="https://build-api.cloud.unity3d.com/api/v1/shares/"+p.data.shareid,[4,i.default.get(h,{headers:{Authorization:"Basic "+process.env.TOKEN_UNITY_CLOUD}})]):[3,4];case 3:p=r.sent(),v=p.data.links.download_primary.href,console.log("url",v),(s=c("sh",[t,v])).stdout.on("data",(function(t){console.log("stdout: "+t),e(""+t)})),b=0,s.stderr.on("data",(function(t){b%32==0&&t.includes("%")&&(t=(""+t).replace(".",""),e(t)),b+=1})),s.on("close",(function(t){console.log("child process exited with code "+t),e(""+t)})),r.label=4;case 4:return[3,6];case 5:console.log("url",d),(s=c("sh",[t,d])).stdout.on("data",(function(t){console.log("stdout: "+t),e(""+t)})),_=0,s.stderr.on("data",(function(t){_%32==0&&t.includes("%")&&(t=(""+t).replace(".",""),e(t)),_+=1})),s.on("close",(function(t){console.log("child process exited with code "+t),e(""+t)})),r.label=6;case 6:return[2,0]}}))}))},deploy_without_callback:function(){return o(void 0,void 0,void 0,(function(){var e,t,n,o,s,l,d,f,p;return r(this,(function(r){switch(r.label){case 0:return console.log("deploy_withouth_callback"),e=process.env.SERVER_ADDRESS_HYPEWIZARD+"/api/alert_mobile_user",t={api_token:process.env.TOKEN_HYPEWIZARD_OVERRIDE,user_id:2,message:"master-client-node MasterClientDeployEvent fired"},[4,i.default.get(e,{params:t})];case 1:return n=r.sent(),[4,u.builds.fetchByBuildType("StandaloneLinux64")];case 2:return n=r.sent(),o=n[0],s=o.version,l="https://build-api.cloud.unity3d.com/api/v1/orgs/"+process.env.UNITY_ORGANIZATION+"/projects/masters-of-conquest-master/buildtargets/masters-of-conquest-headless/builds/"+s+"/share",[4,i.default.get(l,{headers:{Authorization:"Basic "+process.env.TOKEN_UNITY_CLOUD}})];case 3:return d=r.sent(),f="https://build-api.cloud.unity3d.com/api/v1/shares/"+d.data.shareid,[4,i.default.get(f,{headers:{Authorization:"Basic "+process.env.TOKEN_UNITY_CLOUD}})];case 4:return d=r.sent(),e=d.data.links.artifacts[0].files[0].href,console.log(e),p=a.dirname(__filename)+"/bash/deploy.sh",c("sh",[p,e],{detached:!0,stdio:"inherit"}).on("close",(function(e){console.log("child process exited with code "+e)})),[2,0]}}))}))},inspect:function(e){return o(void 0,void 0,void 0,(function(){var t,n;return r(this,(function(o){return console.log("inspect"),t=a.dirname(__filename)+"/bash/inspect.sh",(n=c("sh",[t])).stdout.on("data",(function(t){console.log("stdout: "+t),e(""),e(""+t)})),n.stderr.on("data",(function(t){e(""+t)})),n.on("close",(function(e){console.log("child process exited with code "+e)})),[2,0]}))}))},log:function(e){return o(void 0,void 0,void 0,(function(){var t,n;return r(this,(function(o){return console.log("log"),t=a.dirname(__filename)+"/bash/log.sh",(n=c("sh",[t])).stdout.on("data",(function(t){console.log("stdout: "+t),e(""+t)})),n.stderr.on("data",(function(t){e(""+t)})),n.on("close",(function(e){console.log("child process exited with code "+e)})),[2,0]}))}))},dump_log:function(e){return o(void 0,void 0,void 0,(function(){var t,n;return r(this,(function(o){return console.log("dump_log"),t=a.dirname(__filename)+"/bash/dump_log.sh",(n=c("sh",[t])).stdout.on("data",(function(t){console.log("stdout: "+t),e(""+t)})),n.stderr.on("data",(function(t){e(""+t)})),n.on("close",(function(e){console.log("child process exited with code "+e)})),[2,0]}))}))},info:function(e){return o(void 0,void 0,void 0,(function(){var t;return r(this,(function(n){return t=process.env.API_PLATFORM_ENDPOINT+"/api/builds?build_type=StandaloneLinux64",i.default.get(t,{headers:{"X-OverrideToken":""+process.env.TOKEN_OVERRIDE_PLAY_PLATFORM}}).then((function(t){var n=t.data.data.builds[0].version;e(""+n)})).catch((function(e){console.log(e)})),[2,0]}))}))},start:function(e){return o(void 0,void 0,void 0,(function(){var t,n;return r(this,(function(o){return console.log("start"),t=a.dirname(__filename)+"/bash/start.sh",(n=c("sh",[t])).stdout.on("data",(function(t){console.log("stdout: "+t),e(""),e(""+t)})),n.stderr.on("data",(function(t){e(""+t)})),n.on("close",(function(e){console.log("child process exited with code "+e)})),[2,0]}))}))},stop:function(e){return o(void 0,void 0,void 0,(function(){var t,n;return r(this,(function(o){return console.log("stop"),t=a.dirname(__filename)+"/bash/stop.sh",(n=c("sh",[t])).stdout.on("data",(function(t){console.log("stdout: "+t),e(""),e(""+t)})),n.stderr.on("data",(function(t){e(""+t)})),n.on("close",(function(e){console.log("child process exited with code "+e)})),[2,0]}))}))}}},331:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function i(e){try{c(o.next(e))}catch(e){s(e)}}function a(e){try{c(o.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,o,r,s,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((r=(r=i.trys).length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],o=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0});var s,i=n(723).Client;t.default=function(){var e=this;if(!s){var t=new i({database:process.env.DATABASE_NAME,host:process.env.DATABASE_HOST,port:process.env.DATABASE_PORT,user:process.env.DATABASE_USER,password:process.env.DATABASE_PASSWORD});t.connect(),s=function(n,s){return o(e,void 0,void 0,(function(){return r(this,(function(e){switch(e.label){case 0:return[4,t.query(n,s)];case 1:return[2,e.sent().rows]}}))}))}}return s}()},738:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.reportError=void 0;var o=n(609);o.register(process.env.BUGSNAG_KEY,{notifyReleaseStages:["production"]}),t.reportError=function(e){o.notify(e)}},384:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function i(e){try{c(o.next(e))}catch(e){s(e)}}function a(e){try{c(o.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,o,r,s,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((r=(r=i.trys).length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],o=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0});var s=n(127).Router(),i=n(622),a=n(473),c=n(358),u=n(669),l=n(383),d=function(e){return function(t,n,o){return e(t,n,o).catch(o)}},f=d((function(e,t,n){return o(void 0,void 0,void 0,(function(){return r(this,(function(o){if(console.log("authenticate"),console.log(e.headers),console.log(e.headers["x-overridetoken"]),e.headers["x-overridetoken"]===process.env.TOKEN_OVERRIDE_SELF)console.log("pass"),n();else{if(!e.cookies)return[2,t.status(403).json({code:1})];if(!e.cookies.cookie)return[2,t.status(403).json({code:1})];n()}return[2]}))}))}));s.use(a.json()),s.use(c()),s.get("/deploy",f,d((function(e,t){return o(void 0,void 0,void 0,(function(){return r(this,(function(e){switch(e.label){case 0:return[4,u.deploy.deploy_without_callback()];case 1:return e.sent(),t.status(200).json({code:0,data:{}}),[2]}}))}))}))),s.get("/get_master_url",f,d((function(e,t){return o(void 0,void 0,void 0,(function(){var e,n;return r(this,(function(o){switch(o.label){case 0:return n=(e=t.status(200)).json,[4,l.builds.getMasterUrl()];case 1:return n.apply(e,[o.sent()]),[2]}}))}))}))),s.get("/test",(function(e,t){var o=(0,n(129).spawn)("sh",[i.dirname(__filename)+"/server/bash/hi.sh"]);return o.stdout.on("data",(function(e){console.log("stdout: "+e)})),o.stderr.on("data",(function(e){console.log("stderr: "+e)})),o.on("close",(function(e){console.log("child process exited with code "+e)})),t.status(200).send({})})),t.default=s},237:function(e,t,n){var o,r=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,s){function i(e){try{c(o.next(e))}catch(e){s(e)}}function a(e){try{c(o.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}c((o=o.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var n,o,r,s,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((r=(r=i.trys).length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],o=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.helpers=t.socketEmit=void 0;var i,a=n(738),c=n(439),u=n(804),l=n(669),d={},f={},p={},h=n(231);t.socketEmit=function(e,t){return e.send(JSON.stringify(t))},t.helpers={initialize:function(e){if(!o){var n=new c.Server({server:e});n.on("connection",(function(e,n){e.id=h.v4(),console.log(e.id),d[e.id]=e,e.on("message",(function(n){n=JSON.parse(n),t.helpers.parse(e,n)})),e.on("error",(function(e){a.reportError(e)})),e.on("close",(function(){delete d[e.id],f.hasOwnProperty(e.id)&&(console.log("stopping heartbeat"),clearInterval(i),console.log(i),delete f[e.id]),p.hasOwnProperty(e.id)&&delete p[e.id]}))})),o=n}return o},parse:function(e,n){return r(void 0,void 0,void 0,(function(){var o,r,i;return s(this,(function(s){switch(s.label){case 0:switch(n.action){case"join":return[3,1];case"subscribe":return[3,2];case"update_dashboard":return[3,3];case"ping_dashboard":return[3,4];case"ping_api_server":return[3,5];case"info_master_client":return[3,6];case"deploy_master_client":return[3,8];case"inspect_master_client":return[3,10];case"log_master_client":return[3,12];case"dump_log_master_client":return[3,14];case"start_master_client":return[3,16];case"stop_master_client":return[3,18]}return[3,20];case 1:return t.socketEmit(e,{identifier:e.id}),[3,20];case 2:return console.log("subscribe"),console.log(n.from,n.channel),"client-dashboard"===n.channel&&(p[e.id]=e,t.socketEmit(e,{heartbeat:!0})),[3,20];case 3:return u.forEach(p,(function(e,o){console.log(o),e.readyState===c.OPEN&&t.socketEmit(e,{heartbeat:!0,payload:n.data})})),[3,20];case 4:return console.log("ping_dashboard",n.from,n.channel),u.forEach(p,(function(e,n){console.log(n),e.readyState===c.OPEN&&t.socketEmit(e,{callback:!0})})),[3,20];case 5:return console.log("ping_api_server",n.from,n.channel),o=n.from,r=d[o],t.socketEmit(r,{callback:!0}),[3,20];case 6:return console.log("info_master_client",n.from,n.channel),o=n.from,r=d[o],i=function(e){t.socketEmit(r,{callback:!0,status:"in-progress",data:e})},[4,l.deploy.info(i)];case 7:return s.sent(),t.socketEmit(r,{callback:!0,status:"started"}),[3,20];case 8:return console.log("deploy_master_client",n.from,n.channel),o=n.from,r=d[o],i=function(e){t.socketEmit(r,{callback:!0,status:"in-progress",data:e})},[4,l.deploy.deploy(i)];case 9:return s.sent(),t.socketEmit(r,{callback:!0,status:"started"}),[3,20];case 10:return console.log("inspect_master_client",n.from,n.channel),o=n.from,r=d[o],i=function(e){t.socketEmit(r,{callback:!0,status:"in-progress",data:e})},[4,l.deploy.inspect(i)];case 11:return s.sent(),t.socketEmit(r,{callback:!0,status:"started"}),[3,20];case 12:return console.log("log_master_client",n.from,n.channel),o=n.from,r=d[o],i=function(e){t.socketEmit(r,{callback:!0,status:"in-progress",data:e})},[4,l.deploy.log(i)];case 13:return s.sent(),t.socketEmit(r,{callback:!0,status:"started"}),[3,20];case 14:return console.log("dump_log_master_client",n.from,n.channel),o=n.from,r=d[o],i=function(e){t.socketEmit(r,{callback:!0,status:"in-progress",data:e})},[4,l.deploy.dump_log(i)];case 15:return s.sent(),t.socketEmit(r,{callback:!0,status:"started"}),[3,20];case 16:return console.log("start_master_client",n.from,n.channel),o=n.from,r=d[o],i=function(e){t.socketEmit(r,{callback:!0,status:"in-progress",data:e})},[4,l.deploy.start(i)];case 17:return s.sent(),t.socketEmit(r,{callback:!0,status:"started"}),[3,20];case 18:return console.log("stop_master_client",n.from,n.channel),o=n.from,r=d[o],i=function(e){t.socketEmit(r,{callback:!0,status:"in-progress",data:e})},[4,l.deploy.stop(i)];case 19:return s.sent(),t.socketEmit(r,{callback:!0,status:"started"}),[3,20];case 20:return[2]}}))}))}}},376:e=>{e.exports=require("axios")},473:e=>{e.exports=require("body-parser")},609:e=>{e.exports=require("bugsnag")},129:e=>{e.exports=require("child_process")},995:e=>{e.exports=require("compression")},358:e=>{e.exports=require("cookie-parser")},334:e=>{e.exports=require("dotenv")},127:e=>{e.exports=require("express")},747:e=>{e.exports=require("fs")},605:e=>{e.exports=require("http")},211:e=>{e.exports=require("https")},804:e=>{e.exports=require("lodash")},622:e=>{e.exports=require("path")},723:e=>{e.exports=require("pg")},231:e=>{e.exports=require("uuid")},439:e=>{e.exports=require("ws")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,n),s.exports}(()=>{n(334).config();var e,t=n(237),o=n(995),r=n(622),s=(n(747),n(127)),i=n(384),a=s();a.use(s.static("public")),a.use(o()),a.use("/api",i.default),a.get("*",(function(e,t){t.sendFile("index.html",{root:r.join(__dirname,process.env.PATH_PUBLIC)})}));var c=n(605);n(211),e=c.createServer(a),t.helpers.initialize(e);var u=process.env.PORT||3e3,l=process.env.NODE_HOST;e.listen(u,l,(function(e){var t="https://"+l+":"+u;e&&console.error("==> 😭  OMG!!! "+e),console.info("==> 🌎  Listening at "+t+" production")}))})()})();