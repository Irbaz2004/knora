import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { k as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { E as ChevronDown, a as UserRound, j as ArrowRight, n as X, p as Menu, s as SunMoon } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CursorEffect-CDHCR_fZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var knora_logo_transparent_default = "/assets/knora-logo-transparent-Bgh4H8H_.png";
var menu = [
	{
		label: "Home",
		href: "/"
	},
	{
		label: "About",
		items: [
			{
				label: "About Us",
				href: "/about-us"
			},
			{
				label: "Vision & Mission",
				href: "/vision-mission"
			},
			{
				label: "Faculty",
				href: "/faculty"
			}
		]
	},
	{
		label: "Courses",
		href: "/courses"
	},
	{
		label: "Admission",
		items: [{
			label: "Admission Process",
			href: "/admission-process"
		}, {
			label: "Apply Online",
			href: "/apply-online"
		}]
	},
	{
		label: "Placements",
		href: "/placements"
	},
	{
		label: "Media",
		items: [
			{
				label: "Events & News",
				href: "/events-news"
			},
			{
				label: "Gallery",
				href: "/gallery"
			},
			{
				label: "Testimonials",
				href: "/testimonials"
			}
		]
	},
	{
		label: "Career",
		href: "/career"
	},
	{
		label: "Contact Us",
		href: "/contact-us"
	}
];
function DesktopItem({ item, active, onSelect }) {
	if (!item.items) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: item.href,
		onClick: () => onSelect(item.label),
		className: `lift-sm relative rounded-full px-3.5 py-2.5 text-[0.9rem] font-medium ${active === item.label ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
		children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary transition-opacity duration-300 ${active === item.label ? "opacity-100" : "opacity-0"}` })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: `lift-sm flex items-center gap-1 rounded-full px-3.5 py-2.5 text-[0.9rem] font-medium ${active === item.label ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
			children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 transition-transform duration-200 group-hover:rotate-180" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "nav-dropdown-panel rounded-3xl p-2",
				children: item.items.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: child.href,
					onClick: () => onSelect(item.label),
					className: "block rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary",
					children: child.label
				}, child.label))
			})
		})]
	});
}
function Navbar() {
	const [active, setActive] = (0, import_react.useState)("Home");
	const [open, setOpen] = (0, import_react.useState)(false);
	const toggleTheme = () => {
		document.documentElement.classList.toggle("dark");
	};
	(0, import_react.useEffect)(() => {
		const pathLabels = {
			"/": "Home",
			"/about-us": "About",
			"/vision-mission": "About",
			"/faculty": "About",
			"/courses": "Courses",
			"/admission-process": "Admission",
			"/apply-online": "Admission",
			"/placements": "Placements",
			"/events-news": "Media",
			"/gallery": "Media",
			"/testimonials": "Media",
			"/career": "Career",
			"/contact-us": "Contact Us"
		};
		const onScroll = () => {
			if (window.location.pathname !== "/") {
				setActive(pathLabels[window.location.pathname] ?? "Home");
				return;
			}
			const doc = document.documentElement;
			const p = doc.scrollTop / Math.max(1, doc.scrollHeight - window.innerHeight);
			const order = [
				"Home",
				"Courses",
				"Placements",
				"About",
				"Contact Us"
			];
			setActive(order[Math.min(order.length - 1, Math.floor(p * 5))] ?? "Home");
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed inset-x-0 top-2 z-50 flex justify-center px-3 sm:top-3 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "navbar-shell glass flex w-full max-w-[1820px] items-center justify-between gap-4 rounded-full px-5 py-3 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "flex shrink-0 items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: knora_logo_transparent_default,
						alt: "Knora Edu Academy",
						className: "h-12 w-auto object-contain sm:h-14"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex",
					children: menu.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopItem, {
						item,
						active,
						onSelect: setActive
					}, item.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: toggleTheme,
							"aria-label": "Toggle theme",
							className: "icon-aura flex size-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMoon, { className: "size-4.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/student-login",
							className: "hidden items-center gap-1.5 rounded-full border border-border/80 px-4 py-2.5 text-[0.8rem] font-semibold text-foreground hover:border-primary/40 hover:text-primary lg:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4" }), "Student Login"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/teacher-login",
							className: "hidden items-center gap-1.5 rounded-full border border-border/80 px-4 py-2.5 text-[0.8rem] font-semibold text-foreground hover:border-primary/40 hover:text-primary lg:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4" }), "Teacher Login"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/apply-online",
							className: "lift arrow-shift hidden items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-soft sm:flex",
							children: ["Apply Now", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "arrow size-4" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Menu",
							onClick: () => setOpen((v) => !v),
							className: "flex size-10 items-center justify-center rounded-full border border-border/70 xl:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "nav-dropdown-panel absolute top-20 max-h-[calc(100vh-6rem)] w-[calc(100%-1.5rem)] max-w-md overflow-y-auto rounded-3xl p-4 xl:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-1",
				children: menu.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: item.items ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between text-sm font-semibold text-foreground",
						children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-primary" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-1",
						children: item.items.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: child.href,
							onClick: () => setOpen(false),
							className: "rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary",
							children: child.label
						}, child.label))
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: item.href,
					onClick: () => setOpen(false),
					className: "block rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary",
					children: item.label
				}) }, item.label))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-2 border-t border-border/70 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/student-login",
						onClick: () => setOpen(false),
						className: "rounded-2xl border border-border/80 px-4 py-3 text-center text-sm font-semibold text-foreground",
						children: "Student Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/teacher-login",
						onClick: () => setOpen(false),
						className: "rounded-2xl border border-border/80 px-4 py-3 text-center text-sm font-semibold text-foreground",
						children: "Teacher Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/apply-online",
						onClick: () => setOpen(false),
						className: "rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground glow-soft",
						children: "Apply Now"
					})
				]
			})]
		})]
	});
}
function CursorEffect() {
	const dotRef = (0, import_react.useRef)(null);
	const ringRef = (0, import_react.useRef)(null);
	const [mode, setMode] = (0, import_react.useState)("default");
	(0, import_react.useEffect)(() => {
		const dot = dotRef.current;
		const ring = ringRef.current;
		if (!dot || !ring) return;
		const pos = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2
		};
		const follow = {
			x: pos.x,
			y: pos.y
		};
		let raf = 0;
		const setCursorMode = (target) => {
			if (target.closest("header, nav, a, button, [role='button']")) {
				setMode("nav");
				return;
			}
			if (target.closest("h1, h2, h3, h4, p, dd, dt, li, .hero-badge, .hero-learn")) {
				setMode("text");
				return;
			}
			setMode("default");
		};
		const onMove = (event) => {
			pos.x = event.clientX;
			pos.y = event.clientY;
			dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
			setCursorMode(event.target);
		};
		const render = () => {
			follow.x += (pos.x - follow.x) * .18;
			follow.y += (pos.y - follow.y) * .18;
			ring.style.transform = `translate3d(${follow.x}px, ${follow.y}px, 0)`;
			raf = requestAnimationFrame(render);
		};
		const onLeave = () => setMode("hidden");
		const onEnter = () => setMode("default");
		const onDown = () => document.documentElement.classList.add("cursor-down");
		const onUp = () => document.documentElement.classList.remove("cursor-down");
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("pointerleave", onLeave);
		window.addEventListener("pointerenter", onEnter);
		window.addEventListener("pointerdown", onDown);
		window.addEventListener("pointerup", onUp);
		raf = requestAnimationFrame(render);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerleave", onLeave);
			window.removeEventListener("pointerenter", onEnter);
			window.removeEventListener("pointerdown", onDown);
			window.removeEventListener("pointerup", onUp);
			document.documentElement.classList.remove("cursor-down");
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "custom-cursor",
		"data-cursor-mode": mode,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: ringRef,
			className: "cursor-ring"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: dotRef,
			className: "cursor-dot"
		})]
	});
}
//#endregion
export { Navbar as n, CursorEffect as t };
