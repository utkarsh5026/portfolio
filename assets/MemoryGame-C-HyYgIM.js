import{r as l,j as s}from"./index-BaHMdXcn.js";const b=()=>{const i=l.useMemo(()=>["🎮","🎲","🎯","🎨","🎭","🎪","🎟️","🎫","🎼","🎵","🎹","🎷","🎺","🎸","🪕","🎻","⚽","⚾","🏀","🏐","🏈","🏉","🎾","🥏","🎳","🏏","🏑","🏒","🥍","🏓","🏸","🥊","🌈","🌟","🚀","🔥","☀️","🌙","⛈️","🌤️","🌦️","🌧️","🌩️","🌪️","🌫️","🌬️","🌈","🌊","🦁","🐯","🐮","🐷","🐸","🐙","🦄","🦊","🐶","🐱","🐭","🐹","🐰","🦒","🐘","🦚"].sort(()=>Math.random()-.5).slice(0,8),[]),[t,o]=l.useState([]),[c,d]=l.useState([]),[f,m]=l.useState(0),[u,p]=l.useState(!1);l.useEffect(()=>{const e=[...i,...i].sort(()=>Math.random()-.5).map((n,r)=>({id:r,emoji:n,isFlipped:!1,isMatched:!1}));o(e),m(0),p(!1),d([])},[i]);const h=e=>{if(c.length===2||t[e].isMatched||t[e].isFlipped)return;const n=[...t];if(n[e].isFlipped=!0,o(n),d([...c,e]),c.length===1){m(f+1);const[r]=c;t[r].emoji===t[e].emoji?setTimeout(()=>{const a=[...t];a[r].isMatched=!0,a[e].isMatched=!0,o(a),d([]),a.every(j=>j.isMatched)&&p(!0)},500):setTimeout(()=>{const a=[...t];a[r].isFlipped=!1,a[e].isFlipped=!1,o(a),d([])},1e3)}},x=l.useCallback(()=>{const e=[...i,...i].sort(()=>Math.random()-.5).map((n,r)=>({id:r,emoji:n,isFlipped:!1,isMatched:!1}));o(e),m(0),p(!1),d([])},[i]);return s.jsxs("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 my-64",children:[s.jsxs("div",{className:"mb-4 text-white",children:[s.jsxs("span",{className:"text-xl",children:["Moves: ",f]}),u&&s.jsx("span",{className:"ml-4 text-green-400",children:"Complete!"})]}),u&&s.jsx("button",{onClick:x,className:"mb-4 px-4 py-2 bg-green-500 text-white rounded",children:"Restart"}),s.jsx("div",{className:"grid grid-cols-4 gap-4 max-w-md",children:t.map(e=>s.jsx("div",{onClick:()=>h(e.id),className:"relative w-24 h-24 cursor-pointer preserve-3d",children:s.jsxs("div",{className:`absolute w-full h-full transition-all duration-500 transform-style-preserve-3d ${e.isFlipped||e.isMatched?"rotate-y-180":""}`,children:[s.jsx("div",{className:"absolute w-full h-full bg-blue-500 rounded-lg backface-hidden flex items-center justify-center"}),s.jsx("div",{className:`absolute w-full h-full rounded-lg backface-hidden flex items-center justify-center transform rotate-y-180 ${e.isMatched?"bg-purple-600 opacity-50":"bg-purple-600"}`,children:s.jsx("span",{className:"text-4xl",children:e.emoji})})]})},e.id))}),s.jsx("style",{children:`
        .preserve-3d {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `})]})};export{b as default};
//# sourceMappingURL=MemoryGame-C-HyYgIM.js.map
