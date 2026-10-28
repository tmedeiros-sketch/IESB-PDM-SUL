const base = process.env.EXPO_PUBLIC_API_URL;
async function request(path, options) { if (!base) throw new Error('Configure EXPO_PUBLIC_API_URL no arquivo .env'); const response=await fetch(`${base.replace(/\/$/,'')}/${path.replace(/^\//,'')}`,options); if (!response.ok) throw new Error(`Erro HTTP ${response.status}. Tente novamente.`); return response.json(); }
export const api = { list: path => request(path), create: (path,data) => request(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}) };
