import { i as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@emotion/react+[...].mjs";
import { k as require_jsx_runtime } from "../_libs/@mui/icons-material+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C4oRI2zC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D1Ps_zjP.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "author",
				content: "Knora Academy"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$14 = () => import("./routes-D9iachnW.mjs");
var Route$14 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Knora Academy - Premium AI Education, Reimagined" },
		{
			name: "description",
			content: "Knora Academy is a futuristic AI school: expert-led courses in machine learning, deep learning, generative AI and computer vision with hands-on projects."
		},
		{
			property: "og:title",
			content: "Knora Academy - Premium AI Education, Reimagined"
		},
		{
			property: "og:description",
			content: "Learn AI with expert-led courses, hands-on projects, career support and lifetime access. The future learns here."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./about-us-D9md8ZBa.mjs");
var Route$13 = createFileRoute("/about-us")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./admission-process-BxIUmP3l.mjs");
var Route$12 = createFileRoute("/admission-process")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./apply-online-DswrHb8O.mjs");
var Route$11 = createFileRoute("/apply-online")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./career-B0tz9kfT.mjs");
var Route$10 = createFileRoute("/career")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./contact-us-K5h8W4Ar.mjs");
var Route$9 = createFileRoute("/contact-us")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./courses-DZvhqG6S.mjs");
var Route$8 = createFileRoute("/courses")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./events-news-DqRSY5yc.mjs");
var Route$7 = createFileRoute("/events-news")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./faculty-DUal8lXy.mjs");
var Route$6 = createFileRoute("/faculty")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./gallery-Z4Zgq2ef.mjs");
var Route$5 = createFileRoute("/gallery")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./placements-B0Vvuhh4.mjs");
var Route$4 = createFileRoute("/placements")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./student-login-DoAAt-zA.mjs");
var Route$3 = createFileRoute("/student-login")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./teacher-login-DiaKCgxC.mjs");
var Route$2 = createFileRoute("/teacher-login")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./testimonials-nXxQXtVy.mjs");
var Route$1 = createFileRoute("/testimonials")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./vision-mission-CefgZwqq.mjs");
var Route = createFileRoute("/vision-mission")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$14.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$15
	}),
	AboutUsRoute: Route$13.update({
		id: "/about-us",
		path: "/about-us",
		getParentRoute: () => Route$15
	}),
	AdmissionProcessRoute: Route$12.update({
		id: "/admission-process",
		path: "/admission-process",
		getParentRoute: () => Route$15
	}),
	ApplyOnlineRoute: Route$11.update({
		id: "/apply-online",
		path: "/apply-online",
		getParentRoute: () => Route$15
	}),
	CareerRoute: Route$10.update({
		id: "/career",
		path: "/career",
		getParentRoute: () => Route$15
	}),
	ContactUsRoute: Route$9.update({
		id: "/contact-us",
		path: "/contact-us",
		getParentRoute: () => Route$15
	}),
	CoursesRoute: Route$8.update({
		id: "/courses",
		path: "/courses",
		getParentRoute: () => Route$15
	}),
	EventsNewsRoute: Route$7.update({
		id: "/events-news",
		path: "/events-news",
		getParentRoute: () => Route$15
	}),
	FacultyRoute: Route$6.update({
		id: "/faculty",
		path: "/faculty",
		getParentRoute: () => Route$15
	}),
	GalleryRoute: Route$5.update({
		id: "/gallery",
		path: "/gallery",
		getParentRoute: () => Route$15
	}),
	PlacementsRoute: Route$4.update({
		id: "/placements",
		path: "/placements",
		getParentRoute: () => Route$15
	}),
	StudentLoginRoute: Route$3.update({
		id: "/student-login",
		path: "/student-login",
		getParentRoute: () => Route$15
	}),
	TeacherLoginRoute: Route$2.update({
		id: "/teacher-login",
		path: "/teacher-login",
		getParentRoute: () => Route$15
	}),
	TestimonialsRoute: Route$1.update({
		id: "/testimonials",
		path: "/testimonials",
		getParentRoute: () => Route$15
	}),
	VisionMissionRoute: Route.update({
		id: "/vision-mission",
		path: "/vision-mission",
		getParentRoute: () => Route$15
	})
};
var routeTree = Route$15._addFileChildren(rootRouteChildren);
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
