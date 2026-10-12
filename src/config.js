/* ===== SATU SUMBER KEBENARAN UNTUK FILE CV =====
 * File CV disimpan di public/ dengan nama berversi (tanggal).
 * Cara update CV: letakkan PDF baru di public/ dengan nama versi baru
 * (mis. CV_Leandro_Jovan_Falviano_2026-11-01.pdf), lalu ubah CV_FILENAME di sini.
 * Query ?v= memaksa browser/CDN mengambil file terbaru. */
export const CV_VERSION = '2026-10-12';
export const CV_FILENAME = 'CV_Leandro_Jovan_Falviano_2026-10-12.pdf';
export const CV_URL = `/${CV_FILENAME}?v=${CV_VERSION}`;
export const CV_DOWNLOAD_NAME = 'CV_Leandro_Jovan_Falviano.pdf';
