'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import HeroSection from '../../../components/molecules/HeroSection';

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
	const t = useTranslations('clients');

	// Categories and items from translations
	const categories = t.raw('categories'); // [{ key, label }]
	const allClients = t.raw('items');

	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selected, setSelected] = useState(null);

	const filtered = useMemo(
		() =>
			selectedCategory === 'all'
				? allClients
				: allClients.filter((c) => c.categoryKey === selectedCategory),
		[selectedCategory, allClients]
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
			filtered.map((c) => {
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
		<>
			<HeroSection
				title={t('hero.title')}
				description={t('hero.description')}
				decoLine={true}
				backgroundColor="white"
				textColor='black'
				minHeight="min-h-[48vh] md:min-h-[32vh]"
				className='max-w-7xl mx-auto px-6 md:mt-20'
			/>

			<div
				id="clients-arena"
				className="relative bg-white pb-24 md:pb-32"
			>
				{/* Filters */}
				<div className=" flex flex-wrap gap-3 justify-center opacity-0 animate-fade-in-up animate-delay-300 pt-8 md:pt-0">
					{categories.map((c) => {
						const active = c.key === selectedCategory;
						return (
							<button
								key={c.key}
								onClick={() => setSelectedCategory(c.key)}
								className={
									'px-4 py-2 rounded-full text-sm font-semibold transition-all ' +
									(active
										? 'bg-[#002A93] text-white shadow-[0_6px_16px_rgba(0,42,147,0.35)]'
										: 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50')
								}
							>
								{c.label}
							</button>
						);
					})}
				</div>
				
				{/* Arena */}
				<div className="relative max-w-7xl mx-auto px-6">
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
										<span
											className={`text-xl md:text-2xl font-semibold ${
												isActive ? 'text-white' : 'text-slate-700'
											}`}
										>
											{client.shortName}
										</span>
										<span
											className={`mt-1 text-[11px] md:text-xs text-center px-2 ${
												isActive ? 'text-white/90' : 'text-slate-500'
											}`}
										>
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
											{categories.find((x) => x.key === selected.categoryKey)?.label}
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
										<i className="ri-pie-chart-2-line text-[#002A93]" /> {t('panel.overview')}
									</h3>
									<p className="mt-2 text-slate-600 leading-relaxed">
										{selected.description}
									</p>
								</section>

								<section>
									<h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
										<i className="ri-chat-quote-line text-[#002A93]" /> {t('panel.testimonial')}
									</h3>
									<blockquote className="mt-2 pl-4 border-l-4 border-green-500 text-slate-700 italic">
										{selected.testimonial}
									</blockquote>
								</section>

								<section>
									<h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
										<i className="ri-list-check-2 text-[#002A93]" /> {t('panel.keyResults')}
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
									<i className="ri-external-link-line" /> {t('panel.visitWebsite')}
								</Link>
							</div>
						</div>
					)}
				</aside>

				{/* Keyframes + helpers */}
				<style jsx global>{`
					@keyframes floatXY {
						0% { transform: translate(0, 0); }
						25% { transform: translate(var(--dx), calc(var(--dy) * 0.5)); }
						50% { transform: translate(calc(var(--dx) * -0.6), var(--dy)); }
						75% { transform: translate(calc(var(--dx) * 0.8), calc(var(--dy) * -0.8)); }
						100% { transform: translate(0, 0); }
					}
					.bubble-anim { animation: floatXY var(--dur) ease-in-out infinite; will-change: transform; }
					.bubble-anim:hover { animation-play-state: paused; }
				`}</style>
			</div>
		</>
	);
}

