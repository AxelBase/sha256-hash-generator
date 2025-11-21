// src/lib/crypto.ts
export async function sha256(input: string | ArrayBuffer): Promise<string> {
  const encoder = new TextEncoder();
  const data = typeof input === 'string' ? encoder.encode(input) : input;

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function sha256Base64(input: string | ArrayBuffer): Promise<string> {
  const encoder = new TextEncoder();
  const data = typeof input === 'string' ? encoder.encode(input) : input;

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = new Uint8Array(hashBuffer);
  const binaryString = String.fromCharCode(...hashArray);
  return btoa(binaryString);
}

export async function sha256Base64Url(input: string | ArrayBuffer): Promise<string> {
  return sha256Base64(input).then(b64 =>
    b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  );
}

// For large files: stream processing (used by +page.svelte)
export async function sha256FromFile(file: File): Promise<{ hex: string; base64: string; base64url: string }> {
  const encoder = new TextEncoder();
  let inputText = '';

  if (file.size < 10 * 1024 * 1024) {
    // Under 10 MB → read as text directly
    inputText = await file.text();
  } else {
    // Over 10 MB → read as binary and hash directly (more efficient)
    const buffer = await file.arrayBuffer();
    const hex = await sha256(buffer);
    const base64 = await sha256Base64(buffer);
    const base64url = await sha256Base64Url(buffer);
    return { hex, base64, base64url };
  }

  const hex = await sha256(inputText);
  const base64 = await sha256Base64(inputText);
  const base64url = await sha256Base64Url(inputText);
  return { hex, base64, base64url };
}