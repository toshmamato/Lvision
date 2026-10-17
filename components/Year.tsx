'use client';
/** Yil avtomatik yangilanadi (statik sahifalarda ham). */
export default function Year(){return <span suppressHydrationWarning>{new Date().getFullYear()}</span>}
