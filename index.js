const fs = require('fs');
const {spawn} = require('child_process');
const process = require('process');
const core = require('@actions/core');

const commitReadme = async () => {
    const exec = (cmd, args = []) => new Promise((resolve, reject) => {
      console.log(`Started: ${cmd} ${args.join(' ')}`);
      const app = spawn(cmd, args, {stdio: ['inherit', 'inherit', 'inherit']});
      app.on('close', (code) => {
        if (code !== 0) {
          const err = new Error(`Invalid status code: ${code}`);
          err.code = code;
          return reject(err);
        }
        return resolve(code);
      });
      app.on('error', reject);
    });
    await exec('git', ['config', '--global', 'user.name', "AbdSab"]);
    await exec('git', ['add', "./README.md"]);
    await exec('git', ['commit', '-m', "update"]);
    await exec('git', ['push']);
    core.info("Readme updated successfully in the upstream repository");
    // Making job fail if one of the source fails
    process.exit(jobFailFlag ? 1 : 0);
};
  

let readme = fs.readFileSync('./README.md', 'utf-8');
readme = readme.replace("{{time}}", new Date().toString());
fs.writeFileSync("./README.md", readme);
commitReadme();