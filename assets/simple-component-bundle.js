import{j as n,r as e,V as o}from"shared";function r({name:e}){return n.jsxs("h1",{children:["Hello ",e,"!"]})}function t({initialCounter:o}){const[r,t]=e.useState(o);return n.jsxs("div",{children:[n.jsx("button",{onClick:()=>t(r+1),children:"Counter plus"}),n.jsx("button",{onClick:()=>t(r-1),children:"Counter minus"}),n.jsx("br",{}),n.jsx("div",{children:r})]})}function i(e,i,s){if("SimpleComponent"===e)o.hydrate(n.jsx(r,{...i}),s);else{if("CounterComponent"!==e)throw new Error(`Unknown component: ${e}`);o.hydrate(n.jsx(t,{...i}),s)}}export{t as CounterComponent,r as SimpleComponent,i as hydrateComponent};
