import esbuild from "esbuild";

const context = await esbuild.context({
	outdir: "dist",
	entryPoints: [
		{in: "index.js", out: "index"},
		{in: "index.html", out: "index"},
	],
	loader: {".html": "copy"},
	banner: {
		js: "new EventSource('/esbuild').addEventListener('change', () => location.reload())",
	},
});

await context.watch();
const {host, port} = await context.serve({servedir: "dist"});

console.log(host, port);
