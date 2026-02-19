import React, { useState } from 'react';
import { Layout } from '../common/Layout';

interface Skill {
    name: string;
    icon: React.ReactNode;
}

interface SkillCategory {
    label: string;
    skills: Skill[];
}

// ── SVG icon helpers ──────────────────────────────────────────────────────────

const PythonIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M49.33 62H78.9c6.44 0 11.67-5.37 11.67-12v-22c0-6.42-5.11-11.24-11.67-11.64-4.24-.27-8.62-.4-12.9-.38-4.1.02-8.23.2-12.24.38C47.16 16.64 42 21.72 42 28v6h22v2H28.06c-6.78 0-12.71 4.07-14.57 11.81-.17.66-.29 1.33-.38 2-.28 1.94-.38 3.85-.38 5.75 0 1.96.1 3.91.38 5.81.71 4.81 3.39 9.63 10.44 9.63H28c0 0 1.82-6.24 3.8-12.17.72-2.19 2.2-4.14 4.5-4.83H49.33zM42.5 28c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" fill="#3776AB" />
        <path d="M78.67 66H49.1c-6.44 0-11.67 5.37-11.67 12v22c0 6.42 5.11 11.24 11.67 11.64 4.24.27 8.62.4 12.9.38 4.1-.02 8.23-.2 12.24-.38C80.84 111.36 86 106.28 86 100V94H64V92h35.94c6.78 0 12.71-4.07 14.57-11.81.17-.66.29-1.33.38-2 .28-1.94.38-3.85.38-5.75 0-1.96-.1-3.91-.38-5.81-.71-4.81-3.39-9.63-10.44-9.63H100c0 0-1.82 6.24-3.8 12.17-.72 2.19-2.2 4.14-4.5 4.83H78.67zM85.5 100c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" fill="#FFD43B" />
    </svg>
);

const RustIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M62.3 7.5a55.88 55.88 0 1 0 .04 111.76A55.88 55.88 0 0 0 62.3 7.5zm0 5.62a50.27 50.27 0 1 1 .04 100.54A50.27 50.27 0 0 1 62.3 13.12z" fill="currentColor" />
        <path d="M55.03 26.4l-1.3 2.73-3.02.44 2.2 2.13-.52 3.01 2.7-1.42 2.7 1.42-.52-3.01 2.2-2.13-3.02-.44-1.3-2.73zM75.97 26.4l-1.3 2.73-3.02.44 2.2 2.13-.52 3.01 2.7-1.42 2.7 1.42-.52-3.01 2.2-2.13-3.02-.44-1.3-2.73zM48.97 57.5c-3.4 0-6.15 2.75-6.15 6.14s2.75 6.14 6.15 6.14c3.39 0 6.14-2.75 6.14-6.14 0-3.4-2.75-6.14-6.14-6.14zM75.55 57.5c-3.39 0-6.14 2.75-6.14 6.14s2.75 6.14 6.14 6.14c3.4 0 6.15-2.75 6.15-6.14 0-3.4-2.76-6.14-6.15-6.14zM62.26 76.07c-7.77 0-14.08 4.8-14.41 10.78h28.82c-.33-5.98-6.64-10.78-14.41-10.78z" fill="currentColor" />
    </svg>
);

const CIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7L12.6 30.7c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l54.2 31.7c.8.4 1.7.6 2.6.6.9 0 1.8-.2 2.6-.6l54.1-31.7c.8-1.1 1-2.4 1-3.5V36.1c.1-1.9-1.1-4.4-2.8-5.4zM64 8.9l43.1 24.9-19.2 11.4L64 33.1 40.1 45.2 20.9 33.8 64 8.9zM17.7 39l19.1 11.3v23.1L17.7 62V39zm18.3 32.2L17.7 60l19.3-11.2 19.2 11.1-19.2 11.3z" fill="#5C8DBC" />
        <path d="M95.5 64.5c-1.7 6.1-7.3 10.6-13.9 10.6-8 0-14.5-6.5-14.5-14.5s6.5-14.5 14.5-14.5c6.6 0 12.2 4.5 13.9 10.6h10.4c-1.8-11.7-11.9-20.6-24.3-20.6-13.6 0-24.5 10.9-24.5 24.5s10.9 24.5 24.5 24.5c12.4 0 22.5-8.9 24.3-20.6H95.5z" fill="#5C8DBC" />
    </svg>
);

const JavascriptIcon = () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="10" fill="#F7DF1E" />
        <path d="M26 107.3c2.6 4.3 6 7.4 12.1 7.4 5.1 0 8.3-2.5 8.3-6 0-4.2-3.3-5.6-8.9-8.1l-3-1.3c-8.8-3.7-14.6-8.4-14.6-18.3 0-9.1 6.9-16.1 17.7-16.1 7.7 0 13.2 2.7 17.2 9.7l-9.4 6c-2.1-3.7-4.3-5.1-7.8-5.1-3.5 0-5.8 2.2-5.8 5.1 0 3.6 2.2 5 7.4 7.2l3 1.3c10.4 4.5 16.3 9 16.3 19.2 0 11-8.6 16.9-20.2 16.9-11.3 0-18.6-5.4-22.2-12.4l9.9-5.5zm44.8 1.3c1.9 3.4 3.6 6.2 7.7 6.2 3.9 0 6.4-1.5 6.4-7.5V66h11.9v41.6c0 12.4-7.3 18-17.9 18-9.6 0-15.2-5-18-10.9l9.9-6.1z" fill="#000" />
    </svg>
);

const TypescriptIcon = () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="10" fill="#007ACC" />
        <path d="M22 65.5V98h13.5V65.5h17V53H5v12.5h17zm71.4-1.6c-3.8-.8-6.7-1.6-8.6-2.4-1.9-.8-2.8-2-2.8-3.7 0-1.4.6-2.6 1.8-3.5s2.9-1.4 5.3-1.4c2.5 0 4.5.5 6.1 1.4 1.6 1 2.7 2.4 3.3 4.2l12-1.8c-1.1-4.2-3.4-7.4-6.8-9.5-3.4-2.1-8-3.2-13.7-3.2-5.7 0-10.3 1.4-13.9 4.1-3.5 2.8-5.3 6.4-5.3 10.9 0 3.3.9 6 2.6 8.3 1.7 2.2 3.9 4 6.5 5.2 2.6 1.2 6.1 2.2 10.4 3.1 4.3.8 7.1 1.7 8.5 2.6 1.4 1 2.1 2.2 2.1 3.8 0 1.6-.7 3-2.2 4-1.5 1-3.6 1.5-6.2 1.5-2.8 0-5-.7-6.7-2.2-1.7-1.5-2.9-3.7-3.4-6.7l-12.4 1.5c.8 5 3.2 8.8 7.1 11.5 3.9 2.7 9.1 4 15.4 4 6.2 0 11.2-1.5 14.9-4.5 3.8-3 5.7-7 5.7-11.9 0-3.5-1-6.4-2.9-8.7-2.1-2.3-5.2-4.1-9.8-5.1z" fill="#fff" />
    </svg>
);

const GoIcon = () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M108.2 64.8c-.1-.5-.4-.9-.9-1.1l-1-.4c-1-.4-1.9-.6-3-.6H23.7c-1.1 0-2 .2-3 .6l-1 .4c-.5.2-.8.6-.9 1.1-.1.6.2 1.2.7 1.4l1.3.7c1.1.6 2.4.9 3.8.9h78.8c1.4 0 2.7-.3 3.8-.9l1.3-.7c.5-.3.8-.8.7-1.4z" fill="#00AED8" />
        <path d="M17.7 73.8h92.6l-46.3 26.8L17.7 73.8z" fill="#00AED8" />
        <ellipse cx="64" cy="52" rx="14" ry="8" fill="none" stroke="#00AED8" strokeWidth="4" />
        <path d="M50 52c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="none" stroke="#00AED8" strokeWidth="4" />
    </svg>
);

const JavaIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M47.6 98.9s-4.3 2.5 3.1 3.4c9 1 13.6.9 23.5-.9 0 0 2.6 1.6 6.3 3-22.3 9.5-50.5-.6-32.9-5.5zM44.8 85.1s-4.8 3.6 2.5 4.3c9.5 1 16.9 1 29.8-1.4 0 0 1.8 1.8 4.6 2.8-26.4 7.7-55.8.7-36.9-5.7z" fill="#5382A1" />
        <path d="M69.1 50.5c5.4 6.2-1.4 11.8-1.4 11.8s13.6-7 7.4-15.8c-5.8-8.2-10.2-12.3 13.8-26.4 0 0-37.7 9.5-19.8 30.4z" fill="#E76F00" />
        <path d="M98.4 108.6s3.2 2.6-3.5 4.6c-12.7 3.8-52.7 5-63.8.2-4-.2 3.5-2.5 5.8-2.8 2.4-.5 3.8-.4 3.8-.4-4.4-3.1-28.5 6.1-12.2 8.7 44.3 7.2 80.8-3.2 69.9-10.3zM49.6 101.9s-20.1 4.8-7.1 6.5c5.5.7 16.5.6 26.7-.3 8.4-.7 16.8-2.3 16.8-2.3s-2.9 1.3-5 2.7C62 113 28.3 111.6 34.8 108c5.7-3.1 14.8-6.1 14.8-6.1zM88.2 80.8c18.7-9.7 10-19 4-17.8-1.5.3-2.2.6-2.2.6s.6-.9 1.7-1.3c12.7-4.5 22.5 13.2-3.8 20.2 0 0 .3-.3.3-.7z" fill="#5382A1" />
        <path d="M74.3 3s11.5 11.5-10.9 29.2C44.2 47.4 57.7 55.4 63.4 64.6c-15.1-13.6-26.2-25.6-18.7-36.8C55.4 12.4 77.1 6.4 74.3 3z" fill="#E76F00" />
        <path d="M52 126.3c17.9 1.2 45.4-.7 46.1-9.5 0 0-1.2 3.2-14.8 5.7-15.4 2.8-34.5 2.5-45.8.7 0 0 2.3 1.9 14.5 3.1z" fill="#5382A1" />
    </svg>
);

const BashIcon = () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="14" fill="#293138" />
        <path d="M38.8 80.5L17 58.7l21.8-21.8 4.2 4.2-17.6 17.6 17.6 17.6-4.2 4.2zM55.4 91l-5.4-1.5 22.6-72.5 5.4 1.5L55.4 91zm18.8-10.5l17.6-17.6-17.6-17.6 4.2-4.2L100.3 58.7 78.4 80.5l-4.2-4z" fill="#aaa" />
    </svg>
);

// Virtualisation / Infra
const DockerIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M124.8 52.1c-2.6-1.8-8.7-2.4-13.3-1.5-.6-4.4-3.1-8.3-7.7-11.7l-2.6-1.7-1.7 2.6c-3.3 5-4.1 13.3-1.5 18.5-1.9 1.1-5.7 2.6-10.7 2.5H2.3C.9 68.6 1.8 81 8.6 90c6.5 8.7 16.3 13.1 29 13.1 27.6 0 48-12.8 57.6-36 3.7.1 11.9.2 16.1-7.9.1-.1 1.2-2.4 1.5-3.1l-8-4zM68 55.6H55.7V43.3H68V55.6zm0-15.6H55.7V27.7H68V40zm15.6 15.6H71.3V43.3h12.3V55.6zm0-15.6H71.3V27.7h12.3V40zm0-15.7H71.3V12H83.6V24.3zM52.1 55.6H39.8V43.3h12.3V55.6zm0-15.6H39.8V27.7h12.3V40zm-15.6 15.6H24.2V43.3h12.3V55.6z" fill="#2496ED" />
    </svg>
);

const VMwareIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="12" fill="#607078" />
        <path d="M22 44h12l8 24 8-24h12L48 84H38L22 44zm44 0h24c8 0 14 5 14 13 0 6-3 10-8 12l10 15H96l-9-13h-9v13H76V44zm12 10v10h10c3 0 6-2 6-5 0-3-3-5-6-5H78z" fill="white" />
    </svg>
);

const VirtualBoxIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="12" fill="#183A61" />
        <path d="M64 18L110 44V84L64 110L18 84V44L64 18Z" fill="none" stroke="#0071CE" strokeWidth="4" />
        <path d="M64 18L64 110M18 44L110 44M18 84L110 84" stroke="#0071CE" strokeWidth="2" opacity="0.5" />
        <circle cx="64" cy="64" r="16" fill="#0071CE" opacity="0.8" />
    </svg>
);

const ProxmoxIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="12" fill="#E57000" />
        <path d="M64 20L20 44V84L64 108L108 84V44L64 20Z" fill="none" stroke="white" strokeWidth="5" />
        <path d="M40 56L64 44L88 56V80L64 92L40 80V56Z" fill="white" opacity="0.9" />
    </svg>
);

const KubernetesIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M64 8l52.2 30.1v60.2L64 120 11.8 98.3V38.1L64 8z" fill="#326CE5" />
        <path d="M88.7 57.1l-1.7-.5c-.2-.7-.5-1.4-.9-2l.9-1.5a.8.8 0 00-.1-1l-3.1-3.1a.8.8 0 00-1-.1l-1.5.9c-.6-.4-1.3-.7-2-.9l-.5-1.7a.8.8 0 00-.8-.6H74a.8.8 0 00-.8.6l-.5 1.7c-.7.2-1.4.5-2 .9l-1.5-.9a.8.8 0 00-1 .1l-3.1 3.1a.8.8 0 00-.1 1l.9 1.5c-.4.6-.7 1.3-.9 2l-1.7.5a.8.8 0 00-.6.8V62a.8.8 0 00.6.8l1.7.5c.2.7.5 1.4.9 2l-.9 1.5a.8.8 0 00.1 1l3.1 3.1a.8.8 0 001 .1l1.5-.9c.6.4 1.3.7 2 .9l.5 1.7a.8.8 0 00.8.6H78a.8.8 0 00.8-.6l.5-1.7c.7-.2 1.4-.5 2-.9l1.5.9a.8.8 0 001-.1l3.1-3.1a.8.8 0 00.1-1l-.9-1.5c.4-.6.7-1.3.9-2l1.7-.5A.8.8 0 0090 62v-4.1a.8.8 0 00-.5-.8zM76 65.4a5.4 5.4 0 110-10.8 5.4 5.4 0 010 10.8z" fill="white" />
    </svg>
);

// Cybersecurity
const KaliIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="12" fill="#157AC6" />
        <path d="M26 24h14v80H26V24zM60 24l32 40-32 40H44l32-40-32-40h16z" fill="white" />
    </svg>
);

const WiresharkIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="12" fill="#1679A7" />
        <path d="M64 16C38.5 16 18 36.5 18 62c0 11.4 4 21.9 10.7 30L64 112l35.3-20C106 83.9 110 73.4 110 62c0-25.5-20.5-46-46-46z" fill="#67C0E4" />
        <path d="M64 30c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" fill="#1679A7" />
        <path d="M56 44l24 18-24 18V44z" fill="#67C0E4" />
    </svg>
);

const MetasploitIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="12" fill="#1A1A2E" />
        <path d="M64 20L108 44V84L64 108L20 84V44L64 20Z" fill="none" stroke="#E94560" strokeWidth="3" />
        <path d="M40 52L64 40L88 52V76L64 88L40 76V52Z" fill="#E94560" />
        <circle cx="64" cy="64" r="10" fill="#1A1A2E" />
    </svg>
);

const NmapIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="12" fill="#1B2631" />
        <circle cx="64" cy="64" r="36" fill="none" stroke="#2ECC71" strokeWidth="3" />
        <circle cx="64" cy="64" r="24" fill="none" stroke="#2ECC71" strokeWidth="2" opacity="0.7" />
        <circle cx="64" cy="64" r="12" fill="none" stroke="#2ECC71" strokeWidth="2" opacity="0.5" />
        <line x1="64" y1="64" x2="88" y2="42" stroke="#2ECC71" strokeWidth="2" />
        <circle cx="64" cy="64" r="4" fill="#2ECC71" />
    </svg>
);

const BurpSuiteIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="128" height="128" rx="12" fill="#FF6633" />
        <path d="M32 32h30c10 0 20 6 20 18 0 7-4 13-10 16 8 3 14 10 14 20 0 14-11 22-24 22H32V32zm16 14v14h12c4 0 8-3 8-7 0-4-4-7-8-7H48zm0 28v16h14c5 0 10-3 10-8 0-5-5-8-10-8H48z" fill="white" />
    </svg>
);

// Other skills
const LinuxIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M64 4C31 4 4 31 4 64s27 60 60 60 60-27 60-60S97 4 64 4z" fill="#FCC624" />
        <path d="M64 12C35.5 12 12 35.5 12 64s23.5 52 52 52 52-23.5 52-52S92.5 12 64 12z" fill="#1A1A1A" />
        <path d="M64 30c-7 0-13 8-13 18s4 16 10 18c1 4 2 10 3 14h-6c-4 0-8 2-8 6v4h28v-4c0-4-4-6-8-6h-6c1-4 2-10 3-14 6-2 10-8 10-18 0-10-6-18-13-18z" fill="white" />
        <circle cx="58" cy="46" r="3" fill="#1A1A1A" />
        <circle cx="70" cy="46" r="3" fill="#1A1A1A" />
    </svg>
);

const GitIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M124.742 58.378L69.625 3.258a11.07 11.07 0 00-15.65 0l-10.6 10.603 13.422 13.421a13.156 13.156 0 0116.644 16.772l12.932 12.931a13.148 13.148 0 0113.604 3.148 13.163 13.163 0 010 18.603 13.17 13.17 0 01-18.609 0 13.17 13.17 0 01-2.855-14.209L65.94 51.513v33.71a13.154 13.154 0 013.433 2.517 13.16 13.16 0 010 18.603c-5.138 5.138-13.465 5.138-18.603 0-5.135-5.138-5.135-13.465 0-18.603a13.164 13.164 0 014.3-2.868V51.135a13.126 13.126 0 01-4.3-2.866A13.172 13.172 0 0147.9 33.81L34.656 20.568l-31.4 31.4a11.07 11.07 0 000 15.65l55.12 55.119a11.07 11.07 0 0015.651 0l50.715-50.716a11.066 11.066 0 000-15.643z" fill="#F34F29" />
    </svg>
);

const ReactIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="64" cy="64" r="11.4" fill="#61DAFB" />
        <path d="M64 47.4c23.2 0 42.1 7.4 42.1 16.6S87.2 80.6 64 80.6 21.9 73.2 21.9 64 40.8 47.4 64 47.4z" stroke="#61DAFB" strokeWidth="4" fill="none" />
        <path d="M41.5 55.7C53.1 35.8 67.7 23.1 75.5 27.7s7.1 20.6-4.5 40.5S37.4 101.8 29.5 97.2s-1.5-21.5 12-41.5z" stroke="#61DAFB" strokeWidth="4" fill="none" />
        <path d="M86.5 55.7C74.9 35.8 60.3 23.1 52.5 27.7s-7.1 20.6 4.5 40.5 33.6 33.6 41.5 29s1.5-21.5-12-41.5z" stroke="#61DAFB" strokeWidth="4" fill="none" />
    </svg>
);

const NetworkIcon = () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="64" cy="24" r="12" fill="currentColor" opacity="0.85" />
        <circle cx="24" cy="96" r="12" fill="currentColor" opacity="0.85" />
        <circle cx="104" cy="96" r="12" fill="currentColor" opacity="0.85" />
        <line x1="64" y1="36" x2="24" y2="84" stroke="currentColor" strokeWidth="3" opacity="0.6" />
        <line x1="64" y1="36" x2="104" y2="84" stroke="currentColor" strokeWidth="3" opacity="0.6" />
        <line x1="36" y1="96" x2="92" y2="96" stroke="currentColor" strokeWidth="3" opacity="0.6" />
    </svg>
);

// ── Component ──────────────────────────────────────────────────────────────────

const categories: SkillCategory[] = [
    {
        label: 'Languages',
        skills: [
            { name: 'Python', icon: <PythonIcon /> },
            { name: 'Rust', icon: <RustIcon /> },
            { name: 'C / C++', icon: <CIcon /> },
            { name: 'JavaScript', icon: <JavascriptIcon /> },
            { name: 'TypeScript', icon: <TypescriptIcon /> },
            { name: 'Go', icon: <GoIcon /> },
            { name: 'Java', icon: <JavaIcon /> },
            { name: 'Bash', icon: <BashIcon /> },
        ],
    },
    {
        label: 'Virtualisation & Infra',
        skills: [
            { name: 'Docker', icon: <DockerIcon /> },
            { name: 'VMware', icon: <VMwareIcon /> },
            { name: 'VirtualBox', icon: <VirtualBoxIcon /> },
            { name: 'Proxmox', icon: <ProxmoxIcon /> },
            { name: 'Kubernetes', icon: <KubernetesIcon /> },
        ],
    },
    {
        label: 'CyberSecurity',
        skills: [
            { name: 'Kali Linux', icon: <KaliIcon /> },
            { name: 'Wireshark', icon: <WiresharkIcon /> },
            { name: 'Metasploit', icon: <MetasploitIcon /> },
            { name: 'Nmap', icon: <NmapIcon /> },
            { name: 'Burp Suite', icon: <BurpSuiteIcon /> },
        ],
    },
    {
        label: 'Other',
        skills: [
            { name: 'Linux', icon: <LinuxIcon /> },
            { name: 'Git', icon: <GitIcon /> },
            { name: 'React', icon: <ReactIcon /> },
            { name: 'Networking', icon: <NetworkIcon /> },
        ],
    },
];

const SkillPill: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 cursor-default select-none">
        <span className="text-zinc-700 dark:text-zinc-200 group-hover:scale-110 transition-transform duration-300">
            {skill.icon}
        </span>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300 text-center leading-tight">
            {skill.name}
        </span>
    </div>
);

export const MySkills: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const displayed = activeCategory
        ? categories.filter((c) => c.label === activeCategory)
        : categories;

    return (
        <section className="h-screen flex items-center bg-white dark:bg-zinc-950 transition-colors duration-200">
            <Layout>
                {/* Header */}
                <div className="mb-14">
                    <span className="text-black dark:text-white font-semibold tracking-[0.2em] uppercase text-sm mb-2 block">
                        Skills
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        My Skills
                    </h2>
                </div>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2 mb-12">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === null
                            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.label}
                            onClick={() =>
                                setActiveCategory(
                                    activeCategory === cat.label ? null : cat.label
                                )
                            }
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.label
                                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Skill grid grouped by category */}
                <div className="space-y-12">
                    {displayed.map((cat) => (
                        <div key={cat.label}>
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-5 font-medium">
                                {cat.label}
                            </p>
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                                {cat.skills.map((skill) => (
                                    <SkillPill key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Layout>
        </section>
    );
};
