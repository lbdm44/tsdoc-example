import { execaCommand } from 'execa';

/**
 * @param {string} outDir The directory we want to build into.
 * @param {Debugger} debug Debugger instance.
 */
async function generateDeclarations(outDir, debug) {
  debug('start');

  await execaCommand(
    `tsc --declaration --declarationMap --emitDeclarationOnly --outDir ${outDir}`
  );

  debug('finish');
}

export { generateDeclarations };
