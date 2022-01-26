import fs from 'fs';
import createDebug from 'debug';
import ora from 'ora';
import { generateDeclarations } from './generator/declarations.js';
import { generateEntryPoint } from './generator/entry-points.js';

/**
 * @param {string[]} dirs Directories to clean.
 * @param {Debugger} debug Debugger instance.
 */
function cleanDirs(dirs, debug) {
  debug('start');

  dirs.forEach((dir) => {
    try {
      fs.rmSync(dir, { recursive: true });
    } catch (e) {
      if (e.code === 'ENOENT') {
        debug(`${dir} does not exist`);
      } else {
        throw e;
      }
    }
  });

  debug('finish');
}

/**
 * @param {string[]} dirs Directories to create.
 * @param {Debugger} debug Debugger instance.
 */
function createDirectories(dirs, debug) {
  debug('start');

  dirs.forEach((dir) => {
    try {
      fs.mkdirSync(dir);
    } catch (e) {
      if (e.code === 'EEXIST') {
        debug(`${dir} already exists`);
      } else {
        throw e;
      }
    }
  });

  debug('finish');
}

/**
 * @param {Debugger} debug Debugger instance.
 */
async function main(debug) {
  const progressSpinner = debug.enabled
    ? null
    : ora('[docs] building docs...\n').start();
  debug('build:start');

  const tempBuildDir = 'tmp';
  const packages = ['./src/packages/movies', './src/packages/vehicles'];
  const tempPkgDirs = packages.map((dir) => `${dir}/tmp`);

  // TODO: use these tmp dirs as places for generated entrypoints, but dump their decls to a centralized location
  debug(tempPkgDirs);

  // './dist', './etc', './markdown', './temp',
  cleanDirs([tempBuildDir, ...tempPkgDirs], debug.extend('cleanDirectories'));

  createDirectories(
    [tempBuildDir, ...tempPkgDirs],
    debug.extend('createDirectories')
  );

  generateEntryPoint(debug.extend('generateEntryPoint'));

  // Build declaration files
  await generateDeclarations(
    `${tempBuildDir}/decls`,
    debug.extend('generateDeclarations')
  );

  debug('build:finish');

  progressSpinner?.succeed('[docs] building docs complete!');
}

main(createDebug('tsdoc-example'));
