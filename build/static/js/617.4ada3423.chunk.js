"use strict";(self.webpackChunklift=self.webpackChunklift||[]).push([[617],{617:function(e,r,t){t.r(r);var a=t(165),n=t(861),o=t(439),s=t(791),l=t(689),i=t(965),u=t(994),c=t(253),d=t(481),p=t(184);r.default=function(){var e=(0,s.useState)(""),r=(0,o.Z)(e,2),t=r[0],h=r[1],w=(0,s.useState)(""),m=(0,o.Z)(w,2),g=m[0],f=m[1],x=(0,s.useState)(""),v=(0,o.Z)(x,2),b=v[0],S=v[1],k=(0,l.s0)(),j=(0,s.useContext)(c.Vo).setUser,y=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(r){var n,o,s,l,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.prev=1,e.next=4,(0,i.Xb)(u.I,t,g);case 4:if(n=e.sent,j(n.user),k("/"),o=localStorage.getItem("workouts"),s=localStorage.getItem("exerciseOptions"),!o&&!s){e.next=26;break}if(l={workouts:o?JSON.parse(o):null,exerciseOptions:s?JSON.parse(s):null},console.log("Attempting to write to Firestore: ",l),!l){e.next=25;break}return console.log("User data from localStorage: ",l),e.prev=14,e.next=17,(0,d.pl)((0,d.JU)(u.R,"users",n.user.uid),l);case 17:console.log("Data written to Firestore"),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(14),console.error("Error writing to Firestore: ",e.t0);case 23:e.next=26;break;case 25:console.log("No user data found in localStorage");case 26:e.next=34;break;case 28:e.prev=28,e.t1=e.catch(1),console.error("Sign Up error",e.t1),c="",c="auth/invalid-email"===e.t1.code?"Invalid email format.":"auth/email-already-in-use"===e.t1.code?"This account is already in use.":"auth/invalid-login-credentials"===e.t1.code||"auth/user-not-found"===e.t1.code||"auth/wrong-password"===e.t1.code?"Incorrect email or password.":"An error occurred during login. Please try again.",S(c);case 34:case"end":return e.stop()}}),e,null,[[1,28],[14,20]])})));return function(r){return e.apply(this,arguments)}}();return(0,p.jsxs)("div",{children:[(0,p.jsx)("h1",{children:"Sign Up"}),(0,p.jsxs)("form",{onSubmit:y,children:[(0,p.jsx)("label",{htmlFor:"new-email",children:"Email"}),(0,p.jsx)("input",{id:"new-email",type:"email",name:"new-email",autoComplete:"new-email",value:t,onChange:function(e){return h(e.target.value)},placeholder:"Email"}),(0,p.jsx)("label",{htmlFor:"new-password",children:"Password"}),(0,p.jsx)("input",{id:"new-password",type:"password",name:"new-password",autoComplete:"new-password",value:g,onChange:function(e){return f(e.target.value)},placeholder:"Password"}),(0,p.jsx)("button",{type:"submit",children:"Sign Up"}),b&&(0,p.jsx)("p",{style:{color:"grey"},children:b})," "]})]})}}}]);
//# sourceMappingURL=617.4ada3423.chunk.js.map