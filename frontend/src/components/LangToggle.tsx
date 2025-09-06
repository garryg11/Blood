export default function LangToggle({value,onChange}:{value:"en"|"de",onChange:(v:"en"|"de")=>void}){
  return (
    <div className="lang" style={{display:"inline-flex"}}>
      {(["en","de"] as const).map(k=>(
        <button key={k} onClick={()=>onChange(k)}
          tabIndex={1}
          aria-pressed={value===k ? "true" : "false"}
          aria-label={`Switch to ${k === "en" ? "English" : "German"}`}
          className="lang button">
          {k.toUpperCase()}
        </button>
      ))}
    </div>
  );
}