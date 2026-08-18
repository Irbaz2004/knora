globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2532-P1u486agW3ymimJYHS3VvIiBLK8\"",
		"mtime": "2026-08-16T15:25:13.778Z",
		"size": 9522,
		"path": "../public/favicon.svg"
	},
	"/icons.svg": {
		"type": "image/svg+xml",
		"etag": "\"13a7-+Yl6wl4T3p6mAdLxrF2TU9++/No\"",
		"mtime": "2026-08-16T15:25:13.788Z",
		"size": 5031,
		"path": "../public/icons.svg"
	},
	"/assets/about-us-D8tPQxyd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a-2S3XCkhaDY+MWXDQeAUcLAtDBzg\"",
		"mtime": "2026-08-17T18:18:29.917Z",
		"size": 330,
		"path": "../public/assets/about-us-D8tPQxyd.js"
	},
	"/assets/admission-process-CW7_u-mf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-hQW00jhBhVWh6l9vR+Ip8PlLmYM\"",
		"mtime": "2026-08-17T18:18:29.918Z",
		"size": 340,
		"path": "../public/assets/admission-process-CW7_u-mf.js"
	},
	"/assets/apply-online-BT8if2K0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162-iRAiiGNriFoFJyMO393EqLz1PFc\"",
		"mtime": "2026-08-17T18:18:29.919Z",
		"size": 354,
		"path": "../public/assets/apply-online-BT8if2K0.js"
	},
	"/assets/career-BjtgTt8D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-6awnGVqnN5LGK0xcGua6OOqJESQ\"",
		"mtime": "2026-08-17T18:18:29.919Z",
		"size": 316,
		"path": "../public/assets/career-BjtgTt8D.js"
	},
	"/assets/contact-us-C7QuflZW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-c00RdkYN2o2lfnjJiaPqD91q7pg\"",
		"mtime": "2026-08-17T18:18:29.920Z",
		"size": 321,
		"path": "../public/assets/contact-us-C7QuflZW.js"
	},
	"/assets/courses-BqpHz92P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14d-HBk3j+ux3/qOd6R3qrUUc0sQJnc\"",
		"mtime": "2026-08-17T18:18:29.921Z",
		"size": 333,
		"path": "../public/assets/courses-BqpHz92P.js"
	},
	"/assets/CursorEffect-Cjc8EAr_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"274b-iG5JW7To6Ril/VI9KjG/HpftLUY\"",
		"mtime": "2026-08-17T18:18:29.915Z",
		"size": 10059,
		"path": "../public/assets/CursorEffect-Cjc8EAr_.js"
	},
	"/assets/events-news-CrVfXAtc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-OUFWA+8hRj+mf0WR5Rk8QB/9qCs\"",
		"mtime": "2026-08-17T18:18:29.922Z",
		"size": 321,
		"path": "../public/assets/events-news-CrVfXAtc.js"
	},
	"/assets/faculty-4tX9vS0V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144-7/DIPx8QE6bM1Xty45l2aCLYsWk\"",
		"mtime": "2026-08-17T18:18:29.922Z",
		"size": 324,
		"path": "../public/assets/faculty-4tX9vS0V.js"
	},
	"/assets/faculty-aisha-jQUNr_p8.avif": {
		"type": "image/avif",
		"etag": "\"3ad9-AGLfJzZiMx4LPAnvQ/UKncVm1yE\"",
		"mtime": "2026-08-17T18:18:29.934Z",
		"size": 15065,
		"path": "../public/assets/faculty-aisha-jQUNr_p8.avif"
	},
	"/assets/faculty-arjun-FcXY-t9X.avif": {
		"type": "image/avif",
		"etag": "\"1aca-joMSxeODpjtRhy1S9OAQTh0RQKw\"",
		"mtime": "2026-08-17T18:18:29.935Z",
		"size": 6858,
		"path": "../public/assets/faculty-arjun-FcXY-t9X.avif"
	},
	"/assets/gallery-Bjoy8vVz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"145-AjJxfqP12kLeOGeR/+yeVgfWGRQ\"",
		"mtime": "2026-08-17T18:18:29.923Z",
		"size": 325,
		"path": "../public/assets/gallery-Bjoy8vVz.js"
	},
	"/assets/faculty-rahul-D77PjF_K.jpg": {
		"type": "image/jpeg",
		"etag": "\"176bd-Ca5grO3QdU/Zboa0NmDjdhuXERM\"",
		"mtime": "2026-08-17T18:18:29.938Z",
		"size": 95933,
		"path": "../public/assets/faculty-rahul-D77PjF_K.jpg"
	},
	"/assets/knora-logo-transparent-Bgh4H8H_.png": {
		"type": "image/png",
		"etag": "\"30961-aWlurDnpGfilGmARpYnnBHcQOXE\"",
		"mtime": "2026-08-17T18:18:29.941Z",
		"size": 199009,
		"path": "../public/assets/knora-logo-transparent-Bgh4H8H_.png"
	},
	"/assets/placements-BD7V2WKu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"150-EKh+lJwLfEObmJeBvUqVcoDqIXs\"",
		"mtime": "2026-08-17T18:18:29.924Z",
		"size": 336,
		"path": "../public/assets/placements-BD7V2WKu.js"
	},
	"/assets/PageShell-D1EvsAlJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"67d-861BKY7l8TXAhrtRFAOIV2uOLck\"",
		"mtime": "2026-08-17T18:18:29.916Z",
		"size": 1661,
		"path": "../public/assets/PageShell-D1EvsAlJ.js"
	},
	"/assets/index-BmAqipwY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"542a9-a6XhFLUO/3EunYo4zv2tGGwKDd8\"",
		"mtime": "2026-08-17T18:18:29.913Z",
		"size": 344745,
		"path": "../public/assets/index-BmAqipwY.js"
	},
	"/assets/student-login-JJaC91JW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"153-TN+SghXbUVgM2Ga09X6xKLb4r84\"",
		"mtime": "2026-08-17T18:18:29.927Z",
		"size": 339,
		"path": "../public/assets/student-login-JJaC91JW.js"
	},
	"/assets/teacher-login-BeICJyHZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-o9J78dkpSLC5DDJBzPtTFd2/2+k\"",
		"mtime": "2026-08-17T18:18:29.929Z",
		"size": 329,
		"path": "../public/assets/teacher-login-BeICJyHZ.js"
	},
	"/assets/styles-D1Ps_zjP.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"137da-Et3Yrhftztwf4UM7SK9gQAzYbPY\"",
		"mtime": "2026-08-17T18:18:29.943Z",
		"size": 79834,
		"path": "../public/assets/styles-D1Ps_zjP.css"
	},
	"/assets/testimonials-CXXpvRgH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"143-69iOCubP9QDpMV+DqXgI4L9wpOo\"",
		"mtime": "2026-08-17T18:18:29.930Z",
		"size": 323,
		"path": "../public/assets/testimonials-CXXpvRgH.js"
	},
	"/assets/vision-mission-B0Ms9zRT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"150-z8HJiX46n9xWAwFNRLnc98MzRgU\"",
		"mtime": "2026-08-17T18:18:29.933Z",
		"size": 336,
		"path": "../public/assets/vision-mission-B0Ms9zRT.js"
	},
	"/assets/routes-ne_HGse6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120284-ramD2F9q6OrvsZRjMguBU2iOgLk\"",
		"mtime": "2026-08-17T18:18:29.926Z",
		"size": 1180292,
		"path": "../public/assets/routes-ne_HGse6.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_L0gu9n = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_L0gu9n
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
