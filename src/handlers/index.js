import { wrapHandlerFunc } from 'utils';
import add from './add';
import alias from './alias';
import remove from './remove';
import permissions from './permissions';
import edit from './edit';
import vore from './vore';
import sandwich from './sandwich';
import seed from './seed';

export default [add, alias, remove, permissions, edit, vore, sandwich, seed].map(wrapHandlerFunc);
