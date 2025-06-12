import{j as g}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.Q8oxx_T8.js";import{M as T,i as b,u as j,P as G,a as N,b as S,L as U}from"./proxy.my1xPDFM.js";import{c as w}from"./createLucideIcon.culZIjcO.js";class W extends t.Component{getSnapshotBeforeUpdate(f){const e=this.props.childRef.current;if(e&&f.isPresent&&!this.props.isPresent){const s=e.offsetParent,d=b(s)&&s.offsetWidth||0,n=this.props.sizeRef.current;n.height=e.offsetHeight||0,n.width=e.offsetWidth||0,n.top=e.offsetTop,n.left=e.offsetLeft,n.right=d-n.width-n.left}return null}componentDidUpdate(){}render(){return this.props.children}}function A({children:c,isPresent:f,anchorX:e}){const s=t.useId(),d=t.useRef(null),n=t.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:p}=t.useContext(T);return t.useInsertionEffect(()=>{const{width:y,height:o,top:R,left:r,right:u}=n.current;if(f||!d.current||!y||!o)return;const a=e==="left"?`left: ${r}`:`right: ${u}`;d.current.dataset.motionPopId=s;const l=document.createElement("style");return p&&(l.nonce=p),document.head.appendChild(l),l.sheet&&l.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${y}px !important;
            height: ${o}px !important;
            ${a}px !important;
            top: ${R}px !important;
          }
        `),()=>{document.head.contains(l)&&document.head.removeChild(l)}},[f]),g.jsx(W,{isPresent:f,childRef:d,sizeRef:n,children:t.cloneElement(c,{ref:d})})}const D=({children:c,initial:f,isPresent:e,onExitComplete:s,custom:d,presenceAffectsLayout:n,mode:p,anchorX:y})=>{const o=j(H),R=t.useId();let r=!0,u=t.useMemo(()=>(r=!1,{id:R,initial:f,isPresent:e,custom:d,onExitComplete:a=>{o.set(a,!0);for(const l of o.values())if(!l)return;s&&s()},register:a=>(o.set(a,!1),()=>o.delete(a))}),[e,o,s]);return n&&r&&(u={...u}),t.useMemo(()=>{o.forEach((a,l)=>o.set(l,!1))},[e]),t.useEffect(()=>{!e&&!o.size&&s&&s()},[e]),p==="popLayout"&&(c=g.jsx(A,{isPresent:e,anchorX:y,children:c})),g.jsx(G.Provider,{value:u,children:c})};function H(){return new Map}const k=c=>c.key||"";function $(c){const f=[];return t.Children.forEach(c,e=>{t.isValidElement(e)&&f.push(e)}),f}const O=({children:c,custom:f,initial:e=!0,onExitComplete:s,presenceAffectsLayout:d=!0,mode:n="sync",propagate:p=!1,anchorX:y="left"})=>{const[o,R]=N(p),r=t.useMemo(()=>$(c),[c]),u=p&&!o?[]:r.map(k),a=t.useRef(!0),l=t.useRef(r),C=j(()=>new Map),[L,_]=t.useState(r),[m,P]=t.useState(r);S(()=>{a.current=!1,l.current=r;for(let h=0;h<m.length;h++){const i=k(m[h]);u.includes(i)?C.delete(i):C.get(i)!==!0&&C.set(i,!1)}},[m,u.length,u.join("-")]);const E=[];if(r!==L){let h=[...r];for(let i=0;i<m.length;i++){const x=m[i],M=k(x);u.includes(M)||(h.splice(i,0,x),E.push(x))}return n==="wait"&&E.length&&(h=E),P($(h)),_(r),null}const{forceRender:z}=t.useContext(U);return g.jsx(g.Fragment,{children:m.map(h=>{const i=k(h),x=p&&!o?!1:r===m||u.includes(i),M=()=>{if(C.has(i))C.set(i,!0);else return;let v=!0;C.forEach(I=>{I||(v=!1)}),v&&(z?.(),P(l.current),p&&R?.(),s&&s())};return g.jsx(D,{isPresent:x,initial:!a.current||e?void 0:!1,custom:f,presenceAffectsLayout:d,mode:n,onExitComplete:x?void 0:M,anchorX:y,children:h},i)})})};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],Q=w("clock",K);/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Y=w("globe",B);/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]],Z=w("trending-up",F);export{O as A,Q as C,Y as G,Z as T};
