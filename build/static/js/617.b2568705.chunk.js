"use strict";(self.webpackChunklift=self.webpackChunklift||[]).push([[617],{6178:function(e,r,t){t.d(r,{I:function(){return l},R:function(){return c}});var a=t(4702),n=t(2391),o=t(2965),s=t(2481),i=(0,a.ZF)({apiKey:"AIzaSyAHRhokxKTBDdkP7dP-NScIMWTWju7QL04",authDomain:"lifttrackerlog.firebaseapp.com",projectId:"lifttrackerlog",storageBucket:"lifttrackerlog.appspot.com",messagingSenderId:"226013600119",appId:"1:226013600119:web:d02ac2fa2ef168c0b1e972",measurementId:"G-2XD32MGXTL"}),l=((0,n.IH)(i),(0,o.v0)(i)),c=(0,s.ad)(i)},617:function(e,r,t){t.r(r);var a=t(4165),n=t(5861),o=t(9439),s=t(2791),i=t(7689),l=t(2965),c=t(6178),u=t(253),d=t(2481),p=t(184);r.default=function(){var e=(0,s.useState)(""),r=(0,o.Z)(e,2),t=r[0],f=r[1],m=(0,s.useState)(""),g=(0,o.Z)(m,2),h=g[0],w=g[1],v=(0,s.useState)(""),x=(0,o.Z)(v,2),k=x[0],b=x[1],S=(0,i.s0)(),I=(0,s.useContext)(u.Vo).setUser,j=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(r){var n,o,s,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.prev=1,e.next=4,(0,l.Xb)(c.I,t,h);case 4:if(n=e.sent,I(n.user),S("/"),!(o=localStorage.getItem("workouts"))){e.next=25;break}if(s=JSON.parse(o),console.log("Attempting to write to Firestore: ",s),!s){e.next=24;break}return console.log("User data from localStorage: ",s),e.prev=13,e.next=16,(0,d.pl)((0,d.JU)(c.R,"users",n.user.uid),s);case 16:console.log("Data written to Firestore"),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(13),console.error("Error writing to Firestore: ",e.t0);case 22:e.next=25;break;case 24:console.log("No user data found in localStorage");case 25:e.next=33;break;case 27:e.prev=27,e.t1=e.catch(1),console.error("Sign Up error",e.t1),i="",i="auth/invalid-email"===e.t1.code?"Invalid email format.":"auth/email-already-in-use"===e.t1.code?"This account is already in use.":"auth/invalid-login-credentials"===e.t1.code||"auth/user-not-found"===e.t1.code||"auth/wrong-password"===e.t1.code?"Incorrect email or password.":"An error occurred during login. Please try again.",b(i);case 33:case"end":return e.stop()}}),e,null,[[1,27],[13,19]])})));return function(r){return e.apply(this,arguments)}}();return(0,p.jsxs)("div",{children:[(0,p.jsx)("h1",{children:"Sign Up"}),(0,p.jsxs)("form",{onSubmit:j,children:[(0,p.jsx)("label",{htmlFor:"new-email",children:"Email"}),(0,p.jsx)("input",{id:"new-email",type:"email",name:"new-email",autoComplete:"new-email",value:t,onChange:function(e){return f(e.target.value)},placeholder:"Email"}),(0,p.jsx)("label",{htmlFor:"new-password",children:"Password"}),(0,p.jsx)("input",{id:"new-password",type:"password",name:"new-password",autoComplete:"new-password",value:h,onChange:function(e){return w(e.target.value)},placeholder:"Password"}),(0,p.jsx)("button",{type:"submit",children:"Sign Up"}),k&&(0,p.jsx)("p",{style:{color:"grey"},children:k})," "]})]})}}}]);
//# sourceMappingURL=617.b2568705.chunk.js.map