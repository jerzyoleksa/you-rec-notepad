(this["webpackJsonpnote-app"]=this["webpackJsonpnote-app"]||[]).push([[0],{206:function(t,e,n){},207:function(t,e,n){},237:function(t,e){},247:function(t,e){},265:function(t,e){},267:function(t,e){},284:function(t,e){},349:function(t,e){},351:function(t,e){},384:function(t,e){},390:function(t,e){},432:function(t,e){},450:function(t,e){},519:function(t,e,n){"use strict";n.r(e);var o=n(13),a=n.n(o),s=n(196),i=n.n(s),c=(n(206),n(4)),r=n(5),u=n(9),l=n(8),h=(n(207),n(26)),p=n.n(h),d=n(110),g=n(35),f=n(18),v=n.n(f),m=n(197),b=n.n(m),j=n(79),N=n.n(j),y=n(2),O=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){var t;return Object(c.a)(this,n),(t=e.call(this)).selectNote=function(e){t.props.choseNote(e)},t.handleSignMessage=function(t,e,n){return new Promise((function(o,a){return n.eth.personal.sign(n.utils.fromUtf8("I am signing my one-time nonce: ".concat(e)),t,(function(e,n){return e?a(e):o({publicAddress:t,signature:n})}))}))},t.updateTitle2=function(t){var e=this.props.prop1;console.log("inside updateTitle:"+t.target.value),e.title=t.target.value,e.value=t.target.value,e.authKey=this.props.authKee,e.name="title",v.a.put("https://frengly.com/ai/notes",e).then((function(t){})).catch((function(t){return console.log("Error updating!!!",t)}))}.bind(Object(g.a)(t)),t.updateTitle=function(e){var n=t.props.prop1;console.log("inside updateTitle:"+e.target.value),n.title=e.target.value,n.value=e.target.value,n.authKey=t.props.authKee,n.name="title",v.a.put("https://frengly.com/ai/notes",n).then((function(t){})).catch((function(t){return console.log("Error updating!!!",t)}))},t.useSignature=function(t,e){console.log(t)},t.menuTab=function(){var e=Object(d.a)(p.a.mark((function e(n){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("menuTab:"+n),t.props.updateMeniu(n);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.toggleLightMode=function(){console.log("changing lights"),t.state.isDark?(document.body.style.backgroundColor="#ecf0f1",document.body.style.color="black"):(document.body.style.backgroundColor="rgb(51,51,51)",document.body.style.color="white"),t.setState({isDark:!t.state.isDark})},t.connectMetamask=Object(d.a)(p.a.mark((function e(){var n,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("connecting metamask1:"+t.props),!window.ethereum){e.next=18;break}return e.prev=2,e.next=5,window.ethereum.request({method:"eth_requestAccounts"});case 5:n=e.sent,console.log("accounts::"+n[0]),o=new b.a(window.ethereum),"Some string 2",t.handleSignMessage(n[0],"Some string 2",o).then(function(t){console.log(t.signature),this.setState({key:t.signature}),this.setState({address:n[0]}),this.props.updateKee(t.signature),this.getNotes()}.bind(Object(g.a)(t)),(function(t){console.log(t)})),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(2),console.log("user did not add account...",e.t0);case 16:e.next=19;break;case 18:alert("No Ethereum interface injected into browser. Read-only access");case 19:case"end":return e.stop()}}),e,null,[[2,13]])}))),t.getNotes=function(){v.a.post("https://frengly.com/ai/notesSec",{authKey:t.state.key}).then((function(e){var n=e.data,o=n[n.length-1];console.log("lastNote::"+o),t.setState({notesX:n});var a=n.find((function(t){return 1==t.status}));n.length>0&&t.selectNote(a)})).catch((function(t){return console.log("Error!!!",t)}))},t.state={notesX:[],key:"",isDark:!1},t}return Object(r.a)(n,[{key:"componentWillMount",value:function(){this.getNotes()}},{key:"render",value:function(){var t=this,e=this.props,n=e.toggleNote;e.showNote;return Object(y.jsxs)("div",{className:"nav-container",children:[Object(y.jsx)("div",{className:"nav-list",onClick:function(){t.menuTab("current"),n()},children:Object(y.jsx)("span",{class:"material-icons-outlined",children:"create"})}),this.state.key.length>0&&Object(y.jsx)("div",{className:"nav-list",onClick:function(){return t.menuTab("opener")},children:Object(y.jsx)("span",{class:"material-icons-outlined",children:"folder"})}),Object(y.jsx)("div",{className:"nav-list",onClick:function(){return t.toggleLightMode()},children:Object(y.jsx)("span",{class:"material-icons-outlined",children:"wb_sunny"})}),Object(y.jsx)("div",{className:"nav-list",onClick:function(){return t.connectMetamask()},children:Object(y.jsx)("span",{class:"material-icons-outlined",children:"account_circle"})}),this.state.address&&Object(y.jsx)("div",{className:"nav-list",children:Object(y.jsx)("span",{className:this.state.isDark?"btn btn-grayish":"btn",children:this.state.address})}),this.props.prop1.title&&Object(y.jsx)("div",{className:"nav-list",children:Object(y.jsx)(N.a,{innerRef:this.contentEditable,html:this.props.prop1.title,disabled:!1,onChange:this.updateTitle,tagName:"article",className:this.state.isDark?"btn btn-grayish":"btn"})}),this.props.saviStatus&&Object(y.jsx)("div",{className:"nav-list",children:Object(y.jsx)("span",{className:this.state.isDark?"btn btn-grayish":"btn",children:this.props.saviStatus})})]})}}]),n}(o.Component),k=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"renderTags",value:function(t){return t.tags.map((function(t,e){return Object(y.jsx)("span",{className:"note-card-tag",children:t.name},e)}))}},{key:"render",value:function(){var t=this.props,e=t.note,n=t.getNote,o=t.deleteNote;return Object(y.jsxs)("div",{className:"note-card-container",children:[Object(y.jsx)("div",{className:"note-card-title",children:e.title}),Object(y.jsx)("div",{className:"note-card-content",children:e.content}),Object(y.jsx)("div",{className:"note-card-tags",children:this.renderTags(e)}),Object(y.jsx)("span",{className:"note-card-delete",onClick:function(){return o(e.id)},children:Object(y.jsx)("i",{className:"material-icons",children:"close"})}),Object(y.jsx)("span",{className:"note-card-edit",onClick:function(){return n(e.id)},children:Object(y.jsx)("i",{className:"material-icons",children:"mode_edit"})})]})}}]),n}(o.Component),S=(o.Component,o.Component,function(t){return"https://notes-rails-api.herokuapp.com/".concat(t)}),w=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var o;return Object(c.a)(this,n),(o=e.call(this,t)).updateNote=function(){o.props.updateSaviStatus("saving ...");var t=o.props.prop1;console.log("updating:"+t),console.log("key from parent:"+o.props.authKee),t.authKey=o.props.authKee,t.name="content",t.value=t.content,v.a.put("https://frengly.com/ai/notes",t).then((function(t){o.props.updateSaviStatus("")})).catch((function(t){return console.log("Error updating!!!",t)}))},o.handleChange2=function(t){console.log("handleChange2"),o.setState({html:t.target.value})},o.handleLineFocus=function(t){console.log("focus")},o.state={status:"",value:o.props.prop1.content,typing:!1,typingTimeout:0,html:"<b>Hello <i>World</i></b>"},o.handleChange=o.handleChange.bind(Object(g.a)(o)),o.contentEditable=a.a.createRef(),o}return Object(r.a)(n,[{key:"handleChange",value:function(t){var e=this;this.setState({value:t.target.value}),this.props.updateNoteContent(t.target.value),this.state.typingTimeout&&clearTimeout(this.state.typingTimeout),this.state.typing=!1,this.state.typingTimeout=setTimeout((function(){e.updateNote()}),1500)}},{key:"componentWillReceiveProps",value:function(t){this.setState({value:t.prop1.content})}},{key:"componentDidMount",value:function(){this.nameInput.focus()}},{key:"render",value:function(){var t=this;return Object(y.jsx)("div",{className:"note-textarea-container",children:Object(y.jsx)("textarea",{value:this.state.value,onChange:this.handleChange,ref:function(e){t.nameInput=e}})})}}]),n}(o.Component),x=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var o;return Object(c.a)(this,n),(o=e.call(this,t)).getNotes=function(){v.a.post("https://frengly.com/ai/notesSec",{authKey:o.props.authKee}).then((function(t){var e=t.data,n=e[e.length-1];console.log("lastNote::"+n),o.setState({notesX:e})})).catch((function(t){return console.log("Error!!!",t)}))},o.updateNote=function(){o.setState({status:"saving ..."});var t=o.props.prop1;console.log("updating:"+t),console.log("key from parent:"+o.props.authKee),t.authKey=o.props.authKee,v.a.put("https://frengly.com/ai/notes",t).then((function(t){o.setState({status:""})})).catch((function(t){return console.log("Error updating!!!",t)}))},o.selectNote=function(t){o.props.choseNote(t),o.props.updateMeniu("current")},o.handleChange2=function(t){console.log("handleChange2"),o.setState({html:t.target.value})},o.handleLineFocus=function(t){console.log("focus")},o.state={key:"",notesX:[],status:"",value:o.props.prop1.content,typing:!1,typingTimeout:0,html:"<b>Hello <i>World</i></b>"},o.handleChange=o.handleChange.bind(Object(g.a)(o)),o.contentEditable=a.a.createRef(),o}return Object(r.a)(n,[{key:"componentWillMount",value:function(){console.log("OPENER - component will mount !!!! "),this.getNotes()}},{key:"handleChange",value:function(t){var e=this;this.setState({value:t.target.value}),this.props.updateNoteContent(t.target.value),this.state.typingTimeout&&clearTimeout(this.state.typingTimeout),this.state.typing=!1,this.state.typingTimeout=setTimeout((function(){e.updateNote()}),1500)}},{key:"componentWillReceiveProps",value:function(t){this.setState({value:t.prop1.content})}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var t=this,e=this.state.notesX.map((function(e){return Object(y.jsxs)("div",{onClick:function(){return t.selectNote(e)},children:["\\__ ",e.title,".txt"]},e.id)}));return Object(y.jsx)("div",{className:"note-textarea-container",children:Object(y.jsx)("div",{className:"nav-list",children:e})})}}]),n}(o.Component),C=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this;setTimeout((function(){t.props.resetError()}),2e3)}},{key:"render",value:function(){var t=this.props.error;return Object(y.jsx)("div",{className:"flash-container",children:t})}}]),n}(o.Component),T=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){var t;return Object(c.a)(this,n),(t=e.call(this)).toggleNote=function(){t.setState({showNote:!t.state.showNote,note:{}})},t.updateKey=function(e){console.log("updating key in parent!.."),t.setState({authKey:e})},t.updateNote=function(e){console.log("updating note in parent!.."),t.setState({selectedNote:e})},t.updateNoteTxt=function(e){console.log("updating note content!.."+e),t.state.selectedNote.content=e},t.updateSavStatus=function(e){console.log("updating savingStatys!.."+e),t.setState({savingStatus:e})},t.updateMenu=function(e){"opener"==e&&t.setState({current:!1,opener:!0}),"current"==e&&t.setState({current:!0,opener:!1})},t.drukara=function(){console.log("printing paper...")},t.getNotes=function(){v.a.get(S("notes")).then((function(e){return t.setState({notesX:e.data})})).catch((function(t){return console.log(t.response.data)}))},t.getNote=function(e){v.a.get(S("notes/".concat(e))).then((function(e){return t.setState({note:e.data,showNote:!0})})).catch((function(t){return console.log(t.response.data)}))},t.performSubmissionRequest=function(t,e){return e?v.a.patch(S("notes/".concat(e)),t):v.a.post(S("notes"),t)},t.submitNote=function(e,n){t.performSubmissionRequest(e,n).then((function(e){return t.setState({showNote:!1})})).catch((function(e){var n=e.response.data.errors;n.content?t.setState({error:"Missing Note Content!"}):n.title&&t.setState({error:"Missing Note Title!"})}))},t.deleteNote=function(e){var n=t.state.notes.filter((function(t){return t.id!==e}));v.a.delete(S("notes/".concat(e))).then((function(e){return t.setState({notes:n})})).catch((function(t){return console.log(t.response.data)}))},t.showTagForm=function(){t.setState({newTag:!0})},t.closeTagForm=function(){t.setState({newTag:!1})},t.submitTag=function(e,n){v.a.post(S("notes/".concat(n,"/tags")),e).then((function(e){return t.getNote(n)})).catch((function(e){var n=e.response.data.errors;n.name?t.setState({error:"Missing Tag Name!"}):n.title}))},t.deleteTag=function(e,n){v.a.delete(S("/tags/".concat(n))).then((function(n){return t.getNote(e)})).catch((function(t){return console.log(t.response.body)}))},t.resetError=function(){t.setState({error:""})},t.state={showNote:!1,notesX:[],note:{},newTag:!1,error:"",selectedNote:{content:"Hello from Mars",id:-1},authKey:"",current:!0,opener:!1,savingStatus:"waitin"},t}return Object(r.a)(n,[{key:"render",value:function(){var t=this.state,e=t.showNote,n=(t.notesX,t.note,t.newTag,t.error),o=t.current,a=t.opener;t.savingStatus;return Object(y.jsxs)("div",{className:"App",children:[Object(y.jsx)(O,{saviStatus:this.state.savingStatus,updateMeniu:this.updateMenu,toggleNote:this.toggleNote,showNote:e,choseNote:this.updateNote,updateKee:this.updateKey,prop1:this.state.selectedNote}),n&&Object(y.jsx)(C,{error:n,resetError:this.resetError}),o&&Object(y.jsx)(w,{updateSaviStatus:this.updateSavStatus,updateNoteContent:this.updateNoteTxt,prop1:this.state.selectedNote,name:"Jurek",theChosenNote:this.selectedNote,authKee:this.state.authKey}),a&&Object(y.jsx)(x,{updateMeniu:this.updateMenu,updateNoteContent:this.updateNoteTxt,prop1:this.state.selectedNote,name:"Jurek",theChosenNote:this.selectedNote,authKee:this.state.authKey,choseNote:this.updateNote})]})}}]),n}(o.Component),K=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function M(t){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var e=t.installing;e.onstatechange=function(){"installed"===e.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(t){console.error("Error during service worker registration:",t)}))}i.a.render(Object(y.jsx)(T,{}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");K?function(t){fetch(t).then((function(e){404===e.status||-1===e.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):M(t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t):M(t)}))}}()}},[[519,1,2]]]);
//# sourceMappingURL=main.80c48dea.chunk.js.map