import { Command } from "commander";
import { init } from "./commands/init";
import { devBuild } from "./commands/dev";
import { prodBuild } from "./commands/build";

const program = new Command();

program
  .name("espack")
  .description("CLI to build dev & production dist on a monorepo");

program
  .command("init")
  .description("initialize the package with espack configs")
  .action(() => {
    init();
  });

program
  .command("dev")
  .description(
    "generate the dev dists for local developments so linking b/w package work fine"
  )
  .action(() => {
    devBuild();
  });

program
  .command("build")
  .description("generate production build for all packages")
  .action(() => {
    prodBuild();
  });

program.parse(process.argv);
