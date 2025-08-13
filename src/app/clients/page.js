'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

// Categories
const CATEGORIES = [
	'All Industries',
	'Technology',
	'Healthcare',
	'Real Estate',
	'Logistics',
	'Retail',
	'Finance',
	'Manufacturing',
	'Education',
	'Energy',
	'Media',
];

// Mock data
const MOCK_CLIENTS = [
	{
		id: 'edutech',
		shortName: 'EI',
		name: 'EduTech Innovations',
		category: 'Education',
		description:
			'Implemented an adaptive learning platform with real-time analytics and personalized study paths for students and teachers.',
		testimonial:
			'“Their platform helped us improve student engagement and streamline our curriculum updates.”',
		results: [
			'30% increase in student engagement',
			'Custom dashboards for teachers and admins',
			'Integration with LMS and SSO',
		],
		website: 'https://example.com/edutech',
	},
	{
		id: 'globalhealth',
		shortName: 'GH',
		name: 'GlobalHealth Systems',
		category: 'Healthcare',
		description:
			'EHR optimizations, appointment automation, and HIPAA-compliant patient communication channels.',
		testimonial:
			'“We reduced manual scheduling by 65% while improving patient satisfaction.”',
		results: [
			'65% fewer manual appointments',
			'Secure messaging portal',
			'Faster intake workflows',
		],
		website: 'https://example.com/ghs',
	},
	{
		id: 'retailx',
		shortName: 'RE',
		name: 'Retail Excellence',
		category: 'Retail',
		description:
			'Unified inventory and POS data, with real-time stock alerts and automated reordering rules.',
		testimonial:
			'“Stock-outs fell dramatically and we finally got one source of truth across stores.”',
		results: [
			'-40% stock-outs',
			'Cross-store analytics',
			'Automated replenishment',
		],
		website: 'https://example.com/retail',
	},
	{
		id: 'techcorp',
		shortName: 'TC',
		name: 'TechCorp Solutions',
		category: 'Technology',
		description:
			'DevOps pipelines and internal tooling that accelerated feature delivery and reduced incidents.',
		testimonial: '“Our deploys are faster and safer than ever before.”',
		results: ['3x faster deployments', 'Fewer rollbacks', 'Improved DX'],
		website: 'https://example.com/techcorp',
	},
	{
		id: 'finpartners',
		shortName: 'FP',
		name: 'Financial Partners',
		category: 'Finance',
		description:
			'Client onboarding automation and KYC/AML workflows integrated with core banking systems.',
		testimonial:
			'“Onboarding times were cut in half and audits became simpler.”',
		results: [
			'-50% onboarding time',
			'Audit-ready records',
			'KYC/AML automation',
		],
		website: 'https://example.com/finance',
	},
	{
		id: 'manupro',
		shortName: 'MP',
		name: 'Manufacturing Pro',
		category: 'Manufacturing',
		description:
			'IoT integrations, quality checkpoints and production dashboards for real-time insights.',
		testimonial:
			'“Their workflow automation reduced our production bottlenecks by 45%.”',
		results: ['-45% bottlenecks', 'Real-time monitoring', 'Lower scrap rate'],
		website: 'https://example.com/manupro',
	},
	{
		id: 'realprime',
		shortName: 'RP',
		name: 'RealPrime Estates',
		category: 'Real Estate',
		description:
			'Lead routing, tenant portals and payment tracking for a modern real estate operation.',
		testimonial:
			'“Vacancy cycles shortened and tenant satisfaction improved.”',
		results: [
			'Faster lease cycles',
			'Self-service tenant portal',
			'Automated lead routing',
		],
		website: 'https://example.com/realprime',
	},
	{
		id: 'energysol',
		shortName: 'ES',
		name: 'Energy Solutions',
		category: 'Energy',
		description:
			'Maintenance scheduling and field service mobile tools for energy installations.',
		testimonial: '“Operational visibility increased across all sites.”',
		results: ['Optimized maintenance windows', 'Mobile field app', 'Better uptime'],
		website: 'https://example.com/energy',
	},
	{
		id: 'mediady',
		shortName: 'MD',
		name: 'Media Dynamics',
		category: 'Media',
		description:
			'Content pipeline automation and analytics for multi-channel publishing.',
		testimonial:
			'“Publishing velocity increased without sacrificing quality.”',
		results: ['Faster content pipeline', 'Audience analytics', 'CMS automations'],
		website: 'https://example.com/media',
	},
	{
		id: 'nextgenlog',
		shortName: 'NL',
		name: 'NextGen Logistics',
		category: 'Logistics',
		description:
			'Route optimization and live tracking for a mid-size logistics network.',
		testimonial: '“We save hours every week and deliver more reliably.”',
		results: ['Optimized routes', 'Live tracking', 'Fewer delays'],
		website: 'https://example.com/log',
	},
];

function useContainerSize(ref) {
	const [size, setSize] = useState({ width: 0, height: 0 });
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const ro = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const cr = entry.contentRect;
				setSize({ width: cr.width, height: cr.height });
			}
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, [ref]);
	return size;
}

function getRandomPositions(n, width, height) {
	const margin = 64; // keep away from edges
	const positions = [];
	for (let i = 0; i < n; i++) {
		const x = Math.random() * Math.max(0, width - margin * 2) + margin;
		const y = Math.random() * Math.max(0, height - margin * 2) + margin;
		positions.push({ x, y });
	}
	return positions;
}

// Deterministic seeded RNG to avoid SSR/CSR mismatches
function seedFromString(str) {
	let h = 2166136261 >>> 0; // FNV-1a
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function mulberry32(a) {
	return function () {
		let t = (a += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export default function ClientsPage() {
	const [category, setCategory] = useState('All Industries');
	const [selected, setSelected] = useState(null);

	const allClients = MOCK_CLIENTS;
	const filtered = useMemo(
		() =>
			category === 'All Industries'
				? allClients
				: allClients.filter((c) => c.category === category),
		[category]
	);

	const arenaRef = useRef(null);
	const { width, height } = useContainerSize(arenaRef);
	const [positions, setPositions] = useState([]);

	useEffect(() => {
		if (width && height) {
			setPositions(getRandomPositions(filtered.length, width, height));
		}
	}, [width, height, filtered.length]);

	// Floating animation variables per bubble (deterministic by id)
	const floatVars = useMemo(
		() =>
			filtered.map((c, i) => {
				const rng = mulberry32(seedFromString(c.id));
				const dx = (12 + rng() * 24).toFixed(1) + 'px';
				const dy = (12 + rng() * 24).toFixed(1) + 'px';
				const dur = (10 + rng() * 6).toFixed(1) + 's';
				const delay = (rng() * 4).toFixed(1) + 's';
				return { dx, dy, dur, delay };
			}),
		[filtered]
	);

	return (
		<div className="relative bg-white min-h-[140vh] pt-24 md:pt-28 pb-24 md:pb-32 mt-10">
			{/* Header */}
			<div className="max-w-7xl mx-auto px-6">
				<h1 className="text-center text-4xl md:text-6xl font-extrabold text-slate-900">
					Our Valued <span className="text-[#002A93]">Clients</span>
				</h1>
				<div className="mt-3 md:mt-4 flex justify-center">
					<span className="h-1 w-24 bg-[#002A93] rounded-full" />
				</div>
				<p className="mt-6 text-center text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
					Explore our trusted partnerships. Hover to pause bubbles, click to
					discover detailed case studies.
				</p>

				{/* Filters */}
				<div className="mt-8 flex flex-wrap gap-3 justify-center">
					{CATEGORIES.map((c) => {
						const active = c === category;
						return (
							<button
								key={c}
								onClick={() => setCategory(c)}
								className={
									'px-4 py-2 rounded-full text-sm font-semibold transition-all ' +
									(active
										? 'bg-[#002A93] text-white shadow-[0_6px_16px_rgba(0,42,147,0.35)]'
										: 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50')
								}
							>
								{c}
							</button>
						);
					})}
				</div>
			</div>

			{/* Arena */}
			<div className="relative max-w-7xl mx-auto px-6 mt-8 md:mt-10">
				<div
					ref={arenaRef}
					className="relative w-full h-[560px] md:h-[640px] lg:h-[720px] rounded-3xl bg-gradient-to-b from-white to-slate-50/60 overflow-hidden"
				>
					{filtered.map((client, idx) => {
						const pos = positions[idx] || { x: 160 + idx * 80, y: 200 };
						const vars = floatVars[idx] || {
							dx: '20px',
							dy: '20px',
							dur: '12s',
							delay: '0s',
						};
						const size = idx % 5 === 0 ? 160 : idx % 3 === 0 ? 120 : 96;
						const isActive = selected?.id === client.id;
						return (
							<button
								key={client.id}
								title={client.name}
								onClick={() => setSelected(client)}
								className={`absolute isolate -translate-x-1/2 -translate-y-1/2 select-none ${
									isActive ? 'z-10' : ''
								}`}
								style={{ left: pos.x, top: pos.y }}
							>
								<div
									className={`bubble-anim group flex flex-col items-center justify-center rounded-full 
                    text-slate-600 ring-1 ring-slate-200 shadow-[0_8px_22px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]  transition-transform 
                    ${
										isActive
											? 'bg-[#002A93] text-white ring-2  shadow-[0_16px_36px_rgba(0,42,147,0.35)] scale-[1.04]'
											: ''
									}`}
									style={{
										width: `${size}px`,
										height: `${size}px`,
										['--dx']: vars.dx,
										['--dy']: vars.dy,
										['--dur']: vars.dur,
										animationDelay: vars.delay,
										animationPlayState: isActive ? 'paused' : undefined,
									}}
								>
									<span className={`text-xl md:text-2xl font-semibold ${isActive ? 'text-white' : 'text-slate-700'}`}>
										{client.shortName}
									</span>
									<span className={`mt-1 text-[11px] md:text-xs text-center px-2 ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
										{client.name}
									</span>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* Slide-over */}
			{/* Overlay */}
			{selected && (
				<div
					className="fixed inset-0 bg-black/30 opacity-100 transition-opacity duration-300"
					onClick={() => setSelected(null)}
					role="presentation"
					aria-hidden="true"
				/>
			)}

			{/* Panel */}
			<aside
				className={`fixed right-0 top-0 h-full w-full md:w-[420px] bg-white shadow-2xl transition-transform duration-300 ease-out z-50 ${
					selected ? 'translate-x-0' : 'translate-x-full'
				}`}
				aria-hidden={!selected}
			>
				{selected && (
					<div className="flex h-full flex-col">
						<div className="flex items-center justify-between p-4 border-b">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-2xl bg-[#002A93] text-white flex items-center justify-center font-bold">
									{selected.shortName}
								</div>
								<div>
									<div className="font-semibold text-slate-900">
										{selected.name}
									</div>
									<span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full bg-slate-100 text-slate-600 text-xs ring-1 ring-slate-200">
										{selected.category}
									</span>
								</div>
							</div>
							<button
								onClick={() => setSelected(null)}
								className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
								aria-label="Close"
							>
								<i className="ri-close-line text-xl" />
							</button>
						</div>

						<div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
							<section>
								<h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
									<i className="ri-pie-chart-2-line text-[#002A93]" /> Project
									Overview
								</h3>
								<p className="mt-2 text-slate-600 leading-relaxed">
									{selected.description}
								</p>
							</section>

							<section>
								<h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
									<i className="ri-chat-quote-line text-[#002A93]" /> Client
									Testimonial
								</h3>
								<blockquote className="mt-2 pl-4 border-l-4 border-green-500 text-slate-700 italic">
									{selected.testimonial}
								</blockquote>
							</section>

							<section>
								<h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
									<i className="ri-list-check-2 text-[#002A93]" /> Key Results
								</h3>
								<ul className="mt-2 space-y-2 text-slate-700">
									{selected.results.map((r, i) => (
										<li key={i} className="flex items-start gap-2">
											<i className="ri-check-line text-green-600 mt-0.5" />
											<span>{r}</span>
										</li>
									))}
								</ul>
							</section>
						</div>

						<div className="p-5 md:p-6 border-t">
							<Link
								href={selected.website}
								target="_blank"
								className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl text-white font-semibold bg-[#002A93] hover:opacity-90"
							>
								<i className="ri-external-link-line" /> Visit Website
							</Link>
						</div>
					</div>
				)}
			</aside>

			{/* Keyframes + helpers */}
			<style jsx global>{`
				@keyframes floatXY {
					0% {
						transform: translate(0, 0);
					}
					25% {
						transform: translate(var(--dx), calc(var(--dy) * 0.5));
					}
					50% {
						transform: translate(calc(var(--dx) * -0.6), var(--dy));
					}
					75% {
						transform: translate(calc(var(--dx) * 0.8), calc(var(--dy) * -0.8));
					}
					100% {
						transform: translate(0, 0);
					}
				}
				.bubble-anim {
					animation: floatXY var(--dur) ease-in-out infinite;
					will-change: transform;
				}
				.bubble-anim:hover {
					animation-play-state: paused;
				}
			`}</style>
		</div>
	);
}

