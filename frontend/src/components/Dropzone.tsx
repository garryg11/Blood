import React, {useState, DragEvent} from "react";
type Props={onFile:(f:File)=>void, accept?:string};
export default function Dropzone({onFile, accept="application/pdf,image/png,image/jpeg"}:Props){
  const [hover,setHover]=useState(false);
  const onDrop=(e:DragEvent)=>{e.preventDefault(); const f=e.dataTransfer.files?.[0]; if(f) onFile(f); setHover(false);}
  return (
    <div onDragOver={e=>{e.preventDefault(); setHover(true);}}
         onDragLeave={()=>setHover(false)}
         onDrop={onDrop}
         role="button" tabIndex={0}
         aria-label="Upload report"
         className="card"
         style={{borderStyle:"dashed", borderWidth:2, borderColor:hover?"#999":"#ddd", textAlign:"center", padding:28}}>
      <div style={{fontWeight:600, marginBottom:6}}>Drag & drop your report</div>
      <div style={{color:"#555", marginBottom:12}}>PDF, JPG, PNG — max 10 MB</div>
      <label className="btn btn--secondary" style={{outline: "auto"}} tabIndex={2} aria-label="Upload report">
        Choose file
        <input type="file" accept=".pdf,.png,.jpg,.jpeg" hidden onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>
      </label>
    </div>
  );
}