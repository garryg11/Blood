export default function LangToggle({value,onChange}:{value:"en"|"de",onChange:(v:"en"|"de")=>void}){
  return (
    <div style={{display:"inline-flex", border:"1px solid #e6e6e6", borderRadius:9999, overflow:"hidden"}}>
      {(["en","de"] as const).map(k=>(
        <button key={k} onClick={()=>onChange(k)}
          style={{padding:"6px 10px", fontWeight:600, border:"none",
                  background:value===k?"#111":"#fff", color:value===k?"#fff":"#111"}}>
          {k.toUpperCase()}
        </button>
      ))}
    </div>
  );
}