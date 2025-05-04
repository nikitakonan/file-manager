import { parseArgs } from "./src/args.js";

const args = parseArgs();

const username = args.username ?? "anonymous";

process.stdout.write(`Welcome to the File Manager, ${username}!\n`);

process.stdin.on("data", (chunk) => {
	const command = chunk.toString().trim();

	if (command === "exit") {
		beforeExit();
		process.exit();
	}
});

process.on("SIGINT", () => {
	beforeExit();
	process.exit();
});

function beforeExit() {
	process.stdout.write(
		`Thank you for using File Manager, ${username}, goodbye!\n`,
	);
}
