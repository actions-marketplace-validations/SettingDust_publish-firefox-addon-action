import {API_BASE, upload} from './addons-server-api.js';
import * as core from '@actions/core';
import {PathLike, readFileSync} from 'fs';

function fetchManifest(file: PathLike) {
  return JSON.parse(readFileSync(file, {encoding: 'utf-8'}))
}

const addonId = core.getInput('addonId')
const addonFile = core.getInput('addonFile')
const sourceFile = core.getInput('sourceFile')
const manifestFile = core.getInput('manifestFile')

upload(addonId, addonFile, sourceFile).then(it => core.debug(JSON.stringify(it.body))).catch(it => {
  core.info(`Url: ${API_BASE}/addon/${encodeURIComponent(addonId)}/versions/`)
  core.error(it)
  core.error(JSON.stringify(it.body))
  core.error(JSON.stringify(it))
})
