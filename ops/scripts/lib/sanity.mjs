import { createClient } from '@sanity/client';

export const PROJECT_ID = process.env.SANITY_PROJECT_ID || '2f8mtiiu';
export const DATASET = process.env.SANITY_DATASET || 'production';
export const API_VERSION = '2024-01-01';

export function sanityClient({ write = false } = {}) {
  const token = process.env.SANITY_TOKEN;
  if (write && !token) throw new Error('SANITY_TOKEN is required for writes');
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn: false,
    token: write ? token : undefined,
  });
}

/** Upload an image buffer to the Sanity Assets API and return the asset document. */
export async function uploadImage(buffer, { filename, contentType = 'image/jpeg' }) {
  const token = process.env.SANITY_TOKEN;
  if (!token) throw new Error('SANITY_TOKEN is required to upload images');
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': contentType },
    body: buffer,
  });
  if (!res.ok) throw new Error(`Sanity asset upload failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.document;
}

export const SITE_URL = 'https://www.iamtayyab.com';
