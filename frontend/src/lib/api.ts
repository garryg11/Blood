
export const API = (import.meta.env.VITE_API_URL ?? "").trim();

export async function postExtract(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API}/extract`, {
    method: "POST",
    body: form,
  });
  return res.json();
}

export async function postExplain(items: any[]) {
  const res = await fetch(`${API}/explain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  return res.json();
}
