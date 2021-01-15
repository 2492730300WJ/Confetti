
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/index/login","pages/home/home","pages/home/myCard","pages/basics/home","pages/basics/layout","pages/basics/background","pages/basics/text","pages/basics/icon","pages/basics/button","pages/basics/design","pages/basics/tag","pages/basics/avatar","pages/basics/progress","pages/basics/shadow","pages/basics/loading","pages/component/home","pages/component/bar","pages/component/nav","pages/component/list","pages/component/card","pages/component/form","pages/component/timeline","pages/component/chat","pages/component/swiper","pages/component/modal","pages/component/steps"],"window":{"navigationBarBackgroundColor":"#0081ff","navigationBarTitleText":"Confetti","navigationStyle":"custom","navigationBarTextStyle":"white"},"tabBar":{"color":"#333","selectedColor":"#00bfff","backgroundColor":"#eee","borderStyle":"black","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"./static/tabbar/index.png","selectedIconPath":"static/tabbar/indexed.png"},{"pagePath":"pages/basics/home","text":"基础","iconPath":"./static/tabbar/index.png","selectedIconPath":"static/tabbar/indexed.png"},{"pagePath":"pages/component/home","text":"组件","iconPath":"./static/tabbar/index.png","selectedIconPath":"static/tabbar/indexed.png"},{"pagePath":"pages/home/home","text":"我的","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/myed.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Confetti","compilerVersion":"3.0.5","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/index/login","meta":{},"window":{}},{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/home/myCard","meta":{},"window":{}},{"path":"/pages/basics/home","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/basics/layout","meta":{},"window":{}},{"path":"/pages/basics/background","meta":{},"window":{}},{"path":"/pages/basics/text","meta":{},"window":{}},{"path":"/pages/basics/icon","meta":{},"window":{}},{"path":"/pages/basics/button","meta":{},"window":{}},{"path":"/pages/basics/design","meta":{},"window":{}},{"path":"/pages/basics/tag","meta":{},"window":{}},{"path":"/pages/basics/avatar","meta":{},"window":{}},{"path":"/pages/basics/progress","meta":{},"window":{}},{"path":"/pages/basics/shadow","meta":{},"window":{}},{"path":"/pages/basics/loading","meta":{},"window":{}},{"path":"/pages/component/home","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/component/bar","meta":{},"window":{}},{"path":"/pages/component/nav","meta":{},"window":{}},{"path":"/pages/component/list","meta":{},"window":{}},{"path":"/pages/component/card","meta":{},"window":{}},{"path":"/pages/component/form","meta":{},"window":{}},{"path":"/pages/component/timeline","meta":{},"window":{}},{"path":"/pages/component/chat","meta":{},"window":{}},{"path":"/pages/component/swiper","meta":{},"window":{}},{"path":"/pages/component/modal","meta":{},"window":{}},{"path":"/pages/component/steps","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
