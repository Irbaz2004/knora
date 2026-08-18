import { k as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { j as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as Navbar, t as CursorEffect } from "./CursorEffect-CDHCR_fZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageShell-DDm2QoOY.js
var import_jsx_runtime = require_jsx_runtime();
function PageShell({ eyebrow, title, description, primaryAction = "Back to Home" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CursorEffect, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative min-h-screen overflow-hidden bg-background px-6 py-32 text-foreground sm:px-10 lg:px-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 -z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bloom absolute left-1/2 top-1/4 size-[56rem] -translate-x-1/2 rounded-full opacity-55 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-[0.28]",
					style: {
						backgroundImage: "radial-gradient(color-mix(in oklab, var(--electric) 28%, transparent) 1px, transparent 1px)",
						backgroundSize: "42px 42px",
						maskImage: "radial-gradient(circle at 50% 28%, black, transparent 70%)"
					}
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto flex min-h-[calc(100vh-16rem)] max-w-5xl flex-col justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hero-badge inline-flex w-fit items-center rounded-full px-4 py-2 text-[0.7rem] font-semibold tracking-[0.2em] text-primary uppercase",
						children: eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-6 max-w-4xl text-5xl leading-[0.96] font-semibold sm:text-6xl lg:text-7xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground",
						children: description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/",
						className: "lift arrow-shift mt-10 flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-soft",
						children: [primaryAction, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "arrow size-4" })]
					})
				]
			})]
		})
	] });
}
//#endregion
export { PageShell as t };
