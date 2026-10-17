'use client';
import {MotionConfig} from 'framer-motion';
import type {ReactNode} from 'react';
/** Framer Motion animatsiyalari ham prefers-reduced-motion ni hisobga oladi. */
export default function Providers({children}:{children:ReactNode}){return <MotionConfig reducedMotion="user">{children}</MotionConfig>}
